'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'How long does it take to build a website?',
      a: 'Typically 7-10 days depending on the plan and complexity. Starter sites can be delivered in 7 days, while Premium projects may take up to 10 days.'
    },
    {
      q: 'Do I own the website after it\'s built?',
      a: 'Yes, absolutely. You get full source code access and complete ownership of your website.'
    },
    {
      q: 'What technologies do you use?',
      a: 'We use modern technologies like Next.js, React, and Tailwind CSS for fast, scalable, and maintainable websites.'
    },
    {
      q: 'Can I update the website myself?',
      a: 'Yes, we provide documentation and a training session. For non-technical updates, we offer maintenance packages.'
    },
    {
      q: 'Do you provide hosting?',
      a: 'We deploy your website on Vercel (free tier available) and help with domain setup. Hosting is included in the setup.'
    },
    {
      q: 'What if I need changes after launch?',
      a: 'All plans include post-launch support (30-90 days). After that, we offer maintenance packages or hourly rates.'
    },
    {
      q: 'Do you offer SEO services?',
      a: 'Yes, all websites include basic SEO setup. Professional and Premium plans include advanced SEO optimization.'
    },
    {
      q: 'Can you redesign my existing website?',
      a: 'Absolutely. We offer website redesign services to modernize your existing site with better design and performance.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bank transfers, UPI, and online payments. 50% upfront, 50% before launch.'
    },
    {
      q: 'Do you work with clients outside India?',
      a: 'Yes, we work with clients globally. All communication is remote via email, WhatsApp, and video calls.'
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
            <p className="text-xl text-muted text-center mb-16">
              Everything you need to know about our services and process.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
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
              <p className="text-muted mb-8">We're here to help. Get in touch with us.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition inline-block">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
