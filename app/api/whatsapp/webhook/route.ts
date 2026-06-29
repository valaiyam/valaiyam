// app/api/whatsapp/webhook/route.ts
// Meta requires two things from this endpoint:
//   GET  — verify the webhook (one-time setup)
//   POST — receive incoming messages in real time

import { NextRequest, NextResponse } from 'next/server'
import { handleIncomingMessage } from '@/lib/intake-flow'

// ─── Step 3a: Webhook Verification ─────────────────────────────────────────
// Meta sends a GET with hub.mode, hub.verify_token, hub.challenge.
// We echo back hub.challenge if the verify_token matches our env var.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const mode      = searchParams.get('hub.mode')
  const token     = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[WhatsApp] Webhook verified ✓')
    return new NextResponse(challenge, { status: 200 })
  }

  console.warn('[WhatsApp] Webhook verification failed — token mismatch')
  return new NextResponse('Forbidden', { status: 403 })
}

// ─── Step 3b: Receive Incoming Messages ────────────────────────────────────
// Meta POSTs a JSON payload whenever a user messages your number.
// We always return 200 immediately — processing is async.

export async function POST(req: NextRequest) {
  let body: WhatsAppWebhookPayload

  try {
    body = await req.json()
  } catch {
    return new NextResponse('Bad Request', { status: 400 })
  }

  // Acknowledge quickly — Meta retries if no 200 within 20s
  processWebhook(body).catch((err) =>
    console.error('[WhatsApp] Processing error:', err)
  )

  return new NextResponse('OK', { status: 200 })
}

// ─── Async Processing ───────────────────────────────────────────────────────

async function processWebhook(body: WhatsAppWebhookPayload) {
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== 'messages') continue

      const value = change.value

      // Log delivery/read receipts
      for (const status of value.statuses ?? []) {
        console.log(`[WhatsApp] Message ${status.id} → ${status.status}`)
      }

      // Handle incoming messages
      for (const msg of value.messages ?? []) {
        const from    = msg.from
        const msgId   = msg.id
        const contact = value.contacts?.find((c) => c.wa_id === from)
        const name    = contact?.profile?.name ?? 'Customer'

        if (msg.type === 'text') {
          const text = msg.text?.body ?? ''
          console.log(`[WhatsApp] From ${name} (${from}): "${text}"`)
          await handleIncomingMessage({ from, name, text, msgId })
        } else {
          const { sendText } = await import('@/lib/whatsapp')
          await sendText(
            from,
            'Hi! Please send your message as text — I can help you get your business website set up 🙏'
          )
        }
      }
    }
  }
}

// ─── TypeScript types ────────────────────────────────────────────────────────

interface WhatsAppWebhookPayload {
  object: string
  entry: Array<{
    id: string
    changes: Array<{
      field: string
      value: {
        messaging_product: string
        metadata: { display_phone_number: string; phone_number_id: string }
        contacts?: Array<{ wa_id: string; profile: { name: string } }>
        messages?: Array<{
          id: string
          from: string
          timestamp: string
          type: string
          text?: { body: string }
        }>
        statuses?: Array<{
          id: string
          status: string
          timestamp: string
          recipient_id: string
        }>
      }
    }>
  }>
}
