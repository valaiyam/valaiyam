// lib/intake-flow.ts
// Conversational intake bot that collects all the business information
// Valaiyam needs to generate a website, via WhatsApp.
//
// Session state is stored in Supabase table: whatsapp_sessions
// Schema:
//   id         uuid primary key default gen_random_uuid()
//   wa_id      text unique not null          -- customer's WhatsApp number
//   name       text
//   state      text not null default 'START'
//   data       jsonb not null default '{}'   -- collected fields
//   created_at timestamptz default now()
//   updated_at timestamptz default now()

import { createClient } from '@supabase/supabase-js'
import { sendText, sendButtons, sendList, markAsRead } from '@/lib/whatsapp'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── State machine definition ────────────────────────────────────────────────

type IntakeState =
  | 'START'
  | 'ASK_BUSINESS_NAME'
  | 'ASK_BUSINESS_TYPE'
  | 'ASK_CITY'
  | 'ASK_SERVICES'
  | 'ASK_PHONE'
  | 'ASK_COLOR'
  | 'ASK_LANGUAGES'
  | 'CONFIRM'
  | 'DONE'
  | 'CANCELLED'

interface SessionData {
  businessName?: string
  businessType?: string
  city?: string
  services?: string
  phone?: string
  colorPreference?: string
  languages?: string
}

interface Session {
  id: string
  wa_id: string
  name: string
  state: IntakeState
  data: SessionData
}

// ─── Entry point called from webhook route ────────────────────────────────────

export async function handleIncomingMessage({
  from,
  name,
  text,
  msgId,
}: {
  from: string
  name: string
  text: string
  msgId: string
}): Promise<void> {
  // Mark as read so customer sees double blue ticks
  await markAsRead(msgId).catch(() => {})

  const session = await getOrCreateSession(from, name)
  await processMessage(session, text.trim())
}

// ─── Session management ───────────────────────────────────────────────────────

async function getOrCreateSession(waId: string, name: string): Promise<Session> {
  const { data: existing } = await supabase
    .from('whatsapp_sessions')
    .select('*')
    .eq('wa_id', waId)
    .single()

  if (existing) return existing as Session

  // New customer — create session and send greeting
  const { data: created, error } = await supabase
    .from('whatsapp_sessions')
    .insert({ wa_id: waId, name, state: 'START', data: {} })
    .select()
    .single()

  if (error || !created) throw new Error(`Failed to create session: ${error?.message}`)
  return created as Session
}

async function updateSession(
  waId: string,
  state: IntakeState,
  data: SessionData
): Promise<void> {
  await supabase
    .from('whatsapp_sessions')
    .update({ state, data, updated_at: new Date().toISOString() })
    .eq('wa_id', waId)
}

// ─── Main state machine ───────────────────────────────────────────────────────

async function processMessage(session: Session, text: string): Promise<void> {
  const { wa_id: from, name, state, data } = session

  // Allow restart at any point
  if (['restart', 'start over', 'reset', 'start again'].includes(text.toLowerCase())) {
    await updateSession(from, 'START', {})
    await sendText(from, '♻️ No problem! Let\'s start fresh.')
    await askBusinessName(from, name)
    return
  }

  switch (state) {
    case 'START':
      await greetAndAsk(from, name)
      await updateSession(from, 'ASK_BUSINESS_NAME', data)
      break

    case 'ASK_BUSINESS_NAME': {
      if (text.length < 2) {
        await sendText(from, 'Please enter your business name (at least 2 characters).')
        return
      }
      const newData = { ...data, businessName: text }
      await updateSession(from, 'ASK_BUSINESS_TYPE', newData)
      await askBusinessType(from)
      break
    }

    case 'ASK_BUSINESS_TYPE': {
      const type = normalizeBusinessType(text)
      if (!type) {
        await sendText(
          from,
          'Please choose one of the options above, or type the number (1-9).'
        )
        await askBusinessType(from)
        return
      }
      const newData = { ...data, businessType: type }
      await updateSession(from, 'ASK_CITY', newData)
      await sendText(from, `Got it — *${type}*. 📍 Which city and area is your business in?\n\nExample: _Anna Nagar, Chennai_`)
      break
    }

    case 'ASK_CITY': {
      if (text.length < 3) {
        await sendText(from, 'Please enter your city and area (e.g. "Velachery, Chennai").')
        return
      }
      const newData = { ...data, city: text }
      await updateSession(from, 'ASK_SERVICES', newData)
      await sendText(
        from,
        `📝 What are the main services or products your business offers?\n\nTip: List 3–5 things.\nExample: _Haircut, Hair colour, Facial, Bridal makeup_`
      )
      break
    }

    case 'ASK_SERVICES': {
      if (text.length < 5) {
        await sendText(from, 'Please describe at least a few of your services.')
        return
      }
      const newData = { ...data, services: text }
      await updateSession(from, 'ASK_PHONE', newData)
      await sendText(
        from,
        `📞 What phone number should customers use to contact your business?\n\n(This will appear on the website)`
      )
      break
    }

    case 'ASK_PHONE': {
      const phone = text.replace(/\s/g, '')
      if (phone.length < 10) {
        await sendText(from, 'Please enter a valid phone number (at least 10 digits).')
        return
      }
      const newData = { ...data, phone }
      await updateSession(from, 'ASK_COLOR', newData)
      await askColorPreference(from)
      break
    }

    case 'ASK_COLOR': {
      const color = normalizeColor(text)
      const newData = { ...data, colorPreference: color }
      await updateSession(from, 'ASK_LANGUAGES', newData)
      await sendText(
        from,
        `🌐 Should your website be in *English* only, or do you want *Tamil + English* both?\n\nReply:\n1️⃣ English only\n2️⃣ Tamil + English`
      )
      break
    }

    case 'ASK_LANGUAGES': {
      const lang = text.includes('2') || text.toLowerCase().includes('tamil')
        ? 'Tamil + English'
        : 'English'
      const newData = { ...data, languages: lang }
      await updateSession(from, 'CONFIRM', newData)
      await sendConfirmation(from, name, newData)
      break
    }

    case 'CONFIRM': {
      const reply = text.toLowerCase()
      if (reply.includes('yes') || reply === '1' || reply.includes('confirm') || reply.includes('ok')) {
        await updateSession(from, 'DONE', data)
        await submitIntake(from, name, data)
      } else if (reply.includes('no') || reply === '2' || reply.includes('change') || reply.includes('edit')) {
        await updateSession(from, 'START', {})
        await sendText(from, 'No problem! Let\'s redo it. 👇')
        await greetAndAsk(from, name)
        await updateSession(from, 'ASK_BUSINESS_NAME', {})
      } else {
        await sendText(from, 'Please reply *Yes* to confirm or *No* to start over.')
      }
      break
    }

    case 'DONE':
      await sendText(
        from,
        '✅ Your details are already submitted! Our team is building your website. We\'ll send you a preview link shortly.\n\nIf you have any questions, just message here.'
      )
      break

    case 'CANCELLED':
      await sendText(from, 'Type *restart* to begin a new website request.')
      break

    default:
      await sendText(from, 'Type *restart* to begin.')
  }
}

// ─── Question helpers ─────────────────────────────────────────────────────────

async function greetAndAsk(from: string, name: string): Promise<void> {
  await sendText(
    from,
    `👋 Hi ${name}! Welcome to *Valaiyam* — we build beautiful websites for Indian businesses.\n\nI'll ask you a few quick questions (takes about 2 minutes) and we'll create a professional website for your business.\n\nLet's start! 🚀\n\n*What is the name of your business?*`
  )
}

async function askBusinessName(from: string, name: string): Promise<void> {
  await sendText(from, `*What is the name of your business?*`)
}

async function askBusinessType(from: string): Promise<void> {
  await sendList(
    from,
    'What type of business do you run? Select one:',
    'Choose type',
    [
      {
        title: 'Business Types',
        rows: [
          { id: 'clinic',    title: '🏥 Clinic / Hospital',    description: 'Doctor, specialist, dental, etc.' },
          { id: 'salon',     title: '✂️ Salon / Spa',          description: 'Hair, beauty, massage, etc.' },
          { id: 'gym',       title: '🏋️ Gym / Fitness',        description: 'Gym, yoga studio, dance, etc.' },
          { id: 'school',    title: '🎒 School / Tuition',     description: 'School, coaching, institute, etc.' },
          { id: 'bakery',    title: '🧁 Bakery / Food',        description: 'Bakery, restaurant, catering, etc.' },
          { id: 'hardware',  title: '🔧 Hardware / Retail',    description: 'Shop, store, wholesale, etc.' },
          { id: 'pharmacy',  title: '💊 Pharmacy / Medical',   description: 'Medical shop, lab, etc.' },
          { id: 'restaurant',title: '🍽️ Restaurant / Hotel',   description: 'Dine-in, takeaway, cloud kitchen' },
          { id: 'other',     title: '🏢 Other Business',       description: 'Any other type' },
        ],
      },
    ]
  )
}

async function askColorPreference(from: string): Promise<void> {
  await sendButtons(
    from,
    '🎨 What colour theme do you prefer for your website?',
    [
      { id: 'blue',  title: '🔵 Blue / Professional' },
      { id: 'green', title: '🟢 Green / Fresh' },
      { id: 'warm',  title: '🟠 Warm / Energetic' },
    ]
  )
}

async function sendConfirmation(from: string, name: string, data: SessionData): Promise<void> {
  const summary = `
Here's a summary of what you've told us:

🏢 *Business:* ${data.businessName}
📌 *Type:* ${data.businessType}
📍 *Location:* ${data.city}
📋 *Services:* ${data.services}
📞 *Phone:* ${data.phone}
🎨 *Colour:* ${data.colorPreference}
🌐 *Language:* ${data.languages}

Is this correct? Reply *Yes* to submit or *No* to start over.`.trim()

  await sendText(from, summary)
}

// ─── Submit to pipeline ───────────────────────────────────────────────────────

async function submitIntake(from: string, name: string, data: SessionData): Promise<void> {
  // Save to the main projects table that the pipeline reads from
  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      status: 'analyzing',
      customer_name: name,
      customer_whatsapp: from,
      business_name: data.businessName,
      business_type: data.businessType,
      city: data.city,
      services: data.services,
      contact_phone: data.phone,
      color_preference: data.colorPreference,
      languages: data.languages,
      intake_source: 'whatsapp',
    })
    .select()
    .single()

  if (error || !project) {
    console.error('[Intake] Failed to save project:', error)
    await sendText(
      from,
      '⚠️ Something went wrong saving your details. Please message again or contact us directly.'
    )
    return
  }

  await sendText(
    from,
    `✅ *Thank you, ${name}!*\n\nWe've received your request. Our AI is now building your website.\n\n⏱️ You'll receive a preview link within *24 hours*.\n\n📌 Your reference: *${project.id.slice(0, 8).toUpperCase()}*\n\nFeel free to ask us anything here anytime! 🙏`
  )

  // Trigger the pipeline (fire and forget)
  triggerPipeline(project.id).catch((err) =>
    console.error('[Intake] Pipeline trigger failed:', err)
  )
}

async function triggerPipeline(projectId: string): Promise<void> {
  // Call the internal pipeline API route
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  await fetch(`${baseUrl}/api/pipeline/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  })
}

// ─── Normalizers ──────────────────────────────────────────────────────────────

const BUSINESS_TYPE_MAP: Record<string, string> = {
  '1': 'clinic',    clinic: 'clinic',    hospital: 'clinic',    doctor: 'clinic',
  '2': 'salon',     salon: 'salon',      spa: 'salon',          beauty: 'salon',
  '3': 'gym',       gym: 'gym',          fitness: 'gym',        yoga: 'gym',
  '4': 'school',    school: 'school',    tuition: 'school',     coaching: 'school',
  '5': 'bakery',    bakery: 'bakery',    food: 'bakery',        catering: 'bakery',
  '6': 'hardware',  hardware: 'hardware',retail: 'hardware',    shop: 'hardware',
  '7': 'pharmacy',  pharmacy: 'pharmacy',medical: 'pharmacy',   chemist: 'pharmacy',
  '8': 'restaurant',restaurant: 'restaurant', hotel: 'restaurant',
  '9': 'other',     other: 'other',
}

function normalizeBusinessType(text: string): string | null {
  const key = text.toLowerCase().trim()
  // Check direct ID matches from interactive list replies
  if (Object.values(['clinic','salon','gym','school','bakery','hardware','pharmacy','restaurant','other']).includes(key)) {
    return key
  }
  return BUSINESS_TYPE_MAP[key] ?? null
}

function normalizeColor(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('blue') || t === '1')  return 'Blue / Professional'
  if (t.includes('green') || t === '2') return 'Green / Fresh'
  if (t.includes('warm') || t.includes('orange') || t === '3') return 'Warm / Energetic'
  return text // Keep whatever they typed if not matching
}
