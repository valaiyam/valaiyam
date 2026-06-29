import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.json()

  // Validate required fields
  const required = ['customer_name', 'customer_email', 'business_name', 'business_type', 'business_description', 'services', 'address', 'city']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 })
    }
  }

  // Save to Supabase
  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      status: 'intake',
      intake_data: {
        business_name: body.business_name,
        business_type: body.business_type,
        business_description: body.business_description,
        services: body.services.split('\n').filter(Boolean),
        usp: body.usp,
        address: body.address,
        city: body.city,
        opening_hours: body.opening_hours,
        phone_display: body.phone_display,
        whatsapp_number: body.whatsapp_number,
        instagram_url: body.instagram_url,
        facebook_url: body.facebook_url,
        google_maps_url: body.google_maps_url,
      }
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 })
  }

  // Notify yourself (operator) via email
  await resend.emails.send({
    from: 'Valaiyam <noreply@valaiyam.in>',
    to: process.env.OPERATOR_EMAIL!,
    subject: `New project: ${body.business_name} (${body.business_type})`,
    text: `
New project received.

Customer: ${body.customer_name} (${body.customer_email})
Business: ${body.business_name} - ${body.business_type}
City: ${body.city}

Project ID: ${project.id}

Trigger pipeline: ${process.env.NEXT_PUBLIC_BASE_URL}/api/generate?projectId=${project.id}&secret=${process.env.PIPELINE_SECRET}
    `.trim()
  })

  // Confirm to customer
  await resend.emails.send({
    from: 'Valaiyam <hello@valaiyam.in>',
    to: body.customer_email,
    subject: `We received your request — ${body.business_name}`,
    text: `
Hi ${body.customer_name},

We've received your details for ${body.business_name}.

We'll send you a preview link within 24 hours.

If you'd like to send your logo or photos, email them to assets@valaiyam.in with "${body.business_name}" in the subject line.

— Valaiyam Team
    `.trim()
  })

  return NextResponse.json({ projectId: project.id })
}
