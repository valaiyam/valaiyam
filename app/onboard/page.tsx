'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BUSINESS_TYPES = [
  'Grocery Store', 'Restaurant', 'Bakery', 'Salon',
  'Clinic', 'Pharmacy', 'Hardware Store', 'Tutor / Coaching',
  'Clothing Store', 'Other'
]

export default function OnboardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    business_name: '',
    business_type: '',
    business_description: '',
    address: '',
    city: '',
    opening_hours: '',
    phone_display: '',
    whatsapp_number: '',
    services: '',
    usp: '',           // unique selling point
    logo_url: '',
    instagram_url: '',
    facebook_url: '',
    google_maps_url: '',
  })

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  async function handleSubmit() {
    setLoading(true)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const { projectId } = await res.json()
      router.push(`/status/${projectId}`)
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Get your business online
        </h1>
        <p className="text-gray-500 mb-8">
          Takes 5 minutes. Your website will be ready in 24 hours.
        </p>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-indigo-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <section className="space-y-4">
            <h2 className="font-semibold text-gray-700">About you</h2>
            <input className="input" placeholder="Your name *"
              value={form.customer_name} onChange={e => update('customer_name', e.target.value)} />
            <input className="input" placeholder="Your email *" type="email"
              value={form.customer_email} onChange={e => update('customer_email', e.target.value)} />
            <input className="input" placeholder="Your phone (WhatsApp)" type="tel"
              value={form.customer_phone} onChange={e => update('customer_phone', e.target.value)} />
            <button className="btn-primary w-full" onClick={() => setStep(2)}
              disabled={!form.customer_name || !form.customer_email}>
              Next →
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <h2 className="font-semibold text-gray-700">About your business</h2>
            <input className="input" placeholder="Business name *"
              value={form.business_name} onChange={e => update('business_name', e.target.value)} />

            <select className="input" value={form.business_type}
              onChange={e => update('business_type', e.target.value)}>
              <option value="">Select business type *</option>
              {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <textarea className="input h-24" placeholder="Describe your business in 2-3 sentences *"
              value={form.business_description}
              onChange={e => update('business_description', e.target.value)} />

            <textarea className="input h-20"
              placeholder="Your main services or products (one per line) *"
              value={form.services}
              onChange={e => update('services', e.target.value)} />

            <input className="input" placeholder="What makes you special? (optional)"
              value={form.usp} onChange={e => update('usp', e.target.value)} />

            <div className="flex gap-2">
              <button className="btn-secondary flex-1" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary flex-1" onClick={() => setStep(3)}
                disabled={!form.business_name || !form.business_type || !form.business_description || !form.services}>
                Next →
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-4">
            <h2 className="font-semibold text-gray-700">Contact & location</h2>

            <input className="input" placeholder="Full address *"
              value={form.address} onChange={e => update('address', e.target.value)} />
            <input className="input" placeholder="City *"
              value={form.city} onChange={e => update('city', e.target.value)} />
            <input className="input" placeholder="Opening hours (e.g. Mon–Sat 9am–8pm)"
              value={form.opening_hours} onChange={e => update('opening_hours', e.target.value)} />
            <input className="input" placeholder="Phone number to display on website"
              value={form.phone_display} onChange={e => update('phone_display', e.target.value)} />
            <input className="input" placeholder="WhatsApp number"
              value={form.whatsapp_number} onChange={e => update('whatsapp_number', e.target.value)} />
            <input className="input" placeholder="Google Maps link (optional)"
              value={form.google_maps_url} onChange={e => update('google_maps_url', e.target.value)} />
            <input className="input" placeholder="Instagram URL (optional)"
              value={form.instagram_url} onChange={e => update('instagram_url', e.target.value)} />

            <p className="text-sm text-gray-500">
              📎 You can email your logo and photos to{' '}
              <strong>assets@valaiyam.in</strong> with your business name in the subject line.
            </p>

            <div className="flex gap-2">
              <button className="btn-secondary flex-1" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary flex-1" onClick={handleSubmit}
                disabled={loading || !form.address || !form.city}>
                {loading ? 'Submitting...' : 'Submit →'}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
