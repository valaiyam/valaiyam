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
      a: 'Draft delivered in 72 hours, website live in 7 days for standard projects. Rush delivery available in 3-5 days with priority support.'
    },
    {
      q: 'Do I need technical knowledge to manage my website?',
      a: 'No technical knowledge required. We provide documentation and a training session. For updates, we offer ongoing support packages.'
    },
    {
      q: 'Do you buy the domain for me?',
      a: 'We help you purchase and configure your domain. You maintain full ownership. We can guide you through the entire process.'
    },
    {
      q: 'Can I update the website later myself?',
      a: 'Yes, we provide full source code access and documentation. You can make updates yourself or use our maintenance packages.'
    },
    {
      q: 'Do you provide support after launch?',
      a: 'Yes! All plans include post-launch support (30-90 days depending on plan). After that, we offer maintenance packages or hourly rates.'
    },
    {
      q: 'How many revisions do I get?',
      a: 'Starter: 2 rounds, Professional: 3 rounds, Premium: unlimited revisions during development phase.'
    },
    {
      q: 'What if I don\'t like the design?',
      a: 'We show you the homepage design first for approval before building the full site. You can request changes during the revision rounds.'
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
      q: 'Do you work with clients outside India?',
      a: 'Yes, we work with clients globally. All communication is remote via email, WhatsApp, and video calls.'
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-36">
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
