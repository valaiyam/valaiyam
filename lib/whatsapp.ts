// lib/whatsapp.ts
// Helper functions for sending WhatsApp messages via Meta Cloud API.
// Uses env vars — never hardcode tokens.

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!
const ACCESS_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN!
const API_VERSION     = 'v19.0'
const BASE_URL        = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`

// ─── Core sender ─────────────────────────────────────────────────────────────

async function send(payload: object): Promise<void> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp API error ${res.status}: ${err}`)
  }
}

// ─── Send a plain text message ───────────────────────────────────────────────

export async function sendText(to: string, text: string): Promise<void> {
  await send({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { preview_url: false, body: text },
  })
}

// ─── Send a message with reply buttons (max 3 buttons) ───────────────────────

export async function sendButtons(
  to: string,
  bodyText: string,
  buttons: Array<{ id: string; title: string }>
): Promise<void> {
  await send({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: bodyText },
      action: {
        buttons: buttons.map((b) => ({
          type: 'reply',
          reply: { id: b.id, title: b.title },
        })),
      },
    },
  })
}

// ─── Send a list menu (for longer option sets) ───────────────────────────────

export async function sendList(
  to: string,
  bodyText: string,
  buttonLabel: string,
  sections: Array<{
    title: string
    rows: Array<{ id: string; title: string; description?: string }>
  }>
): Promise<void> {
  await send({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: bodyText },
      action: { button: buttonLabel, sections },
    },
  })
}

// ─── Mark a message as read (removes the clock icon on customer's end) ───────

export async function markAsRead(messageId: string): Promise<void> {
  await send({
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId,
  })
}
