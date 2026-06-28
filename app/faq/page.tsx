'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: 'Can I use my own domain?', a: 'Yes. You can use your existing domain or we can guide you to buy one in your own name.' },
    { q: 'Who owns the website?', a: 'You own the website content, domain, and final approved website files after payment is completed.' },
    { q: 'How long does it take?', a: 'For founding customers, we collect details on WhatsApp and aim to share the first preview by the next morning.' },
    { q: 'Can I edit later?', a: 'Yes. You can request updates from us, and we can also set up simple editable sections depending on your needs.' },
    { q: 'Can I pay after preview?', a: 'Yes. Reserve your slot first, review the homepage preview, then pay the remaining amount only after approval.' },
    { q: 'Will it work on mobile?', a: 'Yes. Every Valaiyam website is designed mobile-first because most local customers search from phones.' },
    { q: 'Can I request changes?', a: 'Yes. You can request changes after the preview so the website matches your business, photos, offers, and services.' },
    { q: 'Can customers contact me on WhatsApp?', a: 'Yes. WhatsApp enquiry buttons are included so customers can message you directly from the website.' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
            <p className="text-xl text-muted text-center mb-16">
              Clear answers for local businesses starting online.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={faq.q} className="border border-white/10 rounded-lg overflow-hidden glass">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <span className="text-2xl">{openIndex === i ? '−' : '+'}</span>
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-6 text-muted">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center bg-secondary p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-muted mb-8">Send a WhatsApp message and we will guide you step by step.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition inline-block text-white">
                Start on WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
