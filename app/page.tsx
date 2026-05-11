'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function Home() {
  useScrollAnimation()

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              Premium Websites<br />Built <span className="text-gradient">Fast</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Modern, conversion-focused websites for businesses that want to grow. AI-assisted development meets professional engineering quality.
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                Book Free Consultation
              </Link>
              <Link href="/estimate" className="glass glass-hover px-8 py-4 rounded-lg transition-all text-lg font-semibold hover:scale-105">
                Estimate Cost
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">What We Build</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Business Websites', desc: 'Complete digital presence for your business with modern design and conversion focus' },
                { title: 'Landing Pages', desc: 'High-converting pages designed to turn visitors into customers' },
                { title: 'Portfolio Sites', desc: 'Showcase your work with elegant, fast-loading portfolio websites' },
              ].map((service, i) => (
                <div key={i} className="glass glass-hover p-8 rounded-lg transition-all scroll-fade hover:scale-105" style={{animationDelay: `${i * 0.1}s`}}>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 scroll-fade">
              <Link href="/services" className="text-accent hover:underline hover:scale-105 inline-block transition-transform">View All Services →</Link>
            </div>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">Recent Work</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer scroll-fade" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="glass glass-hover aspect-video rounded-lg mb-4 flex items-center justify-center transition-all group-hover:scale-105">
                    <span className="text-muted">Project {i}</span>
                  </div>
                  <h3 className="font-semibold mb-2">Client Project {i}</h3>
                  <p className="text-sm text-muted">Business Website</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 scroll-fade">
              <Link href="/portfolio" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all inline-block hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Transparent Pricing</h2>
            <p className="text-center text-muted mb-12 scroll-fade">No hidden fees. Choose the plan that fits your needs.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '₹9,999', features: ['5 Pages', 'Mobile Responsive', 'Contact Form', 'Basic SEO'] },
                { name: 'Professional', price: '₹19,999', features: ['10 Pages', 'Premium Design', 'WhatsApp Integration', 'Advanced SEO', 'Analytics'], popular: true },
                { name: 'Premium', price: '₹39,999', features: ['Unlimited Pages', 'Custom Features', 'Priority Support', 'Full SEO Suite', 'Maintenance'] },
              ].map((plan, i) => (
                <div key={i} className={`glass glass-hover p-8 rounded-lg transition-all scroll-fade hover:scale-105 relative ${plan.popular ? 'border-accent' : ''}`} style={{animationDelay: `${i * 0.1}s`}}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted">
                        <span className="text-accent">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block text-center border border-accent px-6 py-3 rounded-lg hover:bg-accent transition-all hover:scale-105">
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 scroll-fade">
              <Link href="/estimate" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all inline-block mr-4 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                Estimate Your Project
              </Link>
              <Link href="/pricing" className="text-accent hover:underline hover:scale-105 inline-block transition-transform">View Detailed Pricing →</Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl scroll-fade">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch Your Website?</h2>
            <p className="text-xl text-muted mb-8">Book a free consultation and let's discuss your project.</p>
            <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold inline-block hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
              Book Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
