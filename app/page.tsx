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
        <section className="pt-44 pb-20 px-6 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              Premium Websites Built to<br /><span className="text-gradient">Grow Your Business</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Modern, fast, conversion-focused websites for businesses that want more leads, more trust, and faster growth.
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up mb-8" style={{animationDelay: '0.2s'}}>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                Book Free Consultation
              </Link>
              <Link href="/portfolio" className="glass glass-hover px-8 py-4 rounded-lg transition-all text-lg font-semibold hover:scale-105">
                See Live Demos
              </Link>
            </div>
            
            {/* Launch Guarantee Badge */}
            <div className="glass inline-block px-6 py-3 rounded-full animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <p className="text-sm"><span className="text-accent font-semibold">⚡ Launch Guarantee:</span> Draft in 72 hours • Website live in 7 days</p>
            </div>
          </div>
        </section>

        {/* Trust Metrics */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Free Offer Highlight */}
            <div className="glass border-accent p-8 rounded-2xl mb-12 scroll-fade text-center">
              <div className="inline-block bg-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">
                🎉 INTRODUCTORY OFFER
              </div>
              <h3 className="text-3xl font-bold mb-3">Get Your Website FREE</h3>
              <p className="text-lg text-muted mb-4">
                We're offering 5 FREE professional websites for individual businesses, startups, and small businesses
              </p>
              <Link href="/contact" className="inline-block bg-accent px-8 py-3 rounded-lg hover:bg-blue-600 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 font-semibold">
                Claim Your Free Website
              </Link>
              <p className="text-xs text-muted mt-4">*T&C Apply - Domain registration fee to be paid by client</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 scroll-fade">
              {[
                { label: 'Fast Delivery', value: '7 Days', icon: '⚡' },
                { label: 'Mobile-First', value: '100%', icon: '📱' },
                { label: 'SEO-Ready', value: 'Built-in', icon: '🚀' },
                { label: 'Founder Support', value: 'Direct', icon: '💬' },
              ].map((metric, i) => (
                <div key={i} className="glass glass-hover p-6 rounded-lg text-center transition-all hover:scale-105">
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-accent mb-1">{metric.value}</div>
                  <div className="text-sm text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A Website That Works While You Sleep */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">A Website That Works While You Sleep</h2>
            <p className="text-center text-muted mb-12 scroll-fade">Your 24/7 business growth engine</p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: 'Capture Leads Automatically', desc: 'Contact forms and WhatsApp integration turn visitors into customers', icon: '📧' },
                { title: 'Build Instant Trust', desc: 'Professional design establishes credibility in seconds', icon: '⭐' },
                { title: 'Turn Visitors Into Customers', desc: 'Conversion-focused design guides users to take action', icon: '💰' },
                { title: 'Stay Open 24/7', desc: 'Your website never sleeps, never takes breaks', icon: '🌙' },
              ].map((benefit, i) => (
                <div key={i} className="glass glass-hover p-6 rounded-lg transition-all scroll-fade hover:scale-105" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Valaiyam */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">Why Valaiyam?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'AI-Assisted Speed', desc: 'Launch faster without sacrificing quality. Modern technology meets professional engineering.', icon: '⚡' },
                { title: 'Engineer-Built Reliability', desc: 'Built with clean code and modern standards. No shortcuts, no template mess.', icon: '🛠️' },
                { title: 'Conversion-First Design', desc: 'Every element designed to generate leads and grow your business.', icon: '🎯' },
                { title: 'Ongoing Support', desc: 'We stay after launch. Direct founder support when you need it.', icon: '🤝' },
              ].map((reason, i) => (
                <div key={i} className="glass glass-hover p-8 rounded-lg transition-all scroll-fade hover:scale-105" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-4xl mb-4">{reason.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{reason.title}</h3>
                  <p className="text-muted">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Live Portfolio</h2>
            <p className="text-center text-muted mb-12 scroll-fade">Real websites, real results</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Doraemon Playschool', category: 'Educational Website', url: 'https://doraemonplayschool.in/' },
                { name: 'Coming Soon', category: 'Restaurant Website', url: '' },
                { name: 'Coming Soon', category: 'Consultant Portfolio', url: '' },
              ].map((project, i) => (
                <div key={i} className="group scroll-fade" style={{animationDelay: `${i * 0.1}s`}}>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <div className="glass glass-hover aspect-video rounded-lg mb-4 flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-accent">
                        <span className="text-accent font-semibold">View Live →</span>
                      </div>
                    </a>
                  ) : (
                    <div className="glass aspect-video rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-muted">Coming Soon</span>
                    </div>
                  )}
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted">{project.category}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 scroll-fade">
              <Link href="/portfolio" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all inline-block hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">Simple, Predictable Process</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: '1', title: 'Discover', desc: 'We learn your business and goals' },
                { step: '2', title: 'Design', desc: 'You approve homepage first' },
                { step: '3', title: 'Develop', desc: 'Fast, premium build' },
                { step: '4', title: 'Launch', desc: 'Go live smoothly' },
                { step: '5', title: 'Grow', desc: 'Ongoing support' },
              ].map((phase, i) => (
                <div key={i} className="text-center scroll-fade" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="glass glass-hover w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent transition-all hover:scale-110">
                    {phase.step}
                  </div>
                  <h3 className="font-semibold mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Transparent Pricing</h2>
            <p className="text-center text-muted mb-12 scroll-fade">No hidden fees. No surprises.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Starter', 
                  price: '₹9,999', 
                  features: ['5 pages', 'Mobile responsive', 'Contact form', 'SEO setup', '7-day launch'],
                  best: ''
                },
                { 
                  name: 'Business', 
                  price: '₹19,999', 
                  features: ['Custom design', 'WhatsApp integration', 'Analytics', 'Premium animations', '14-day support'],
                  best: 'Most Popular',
                  popular: true
                },
                { 
                  name: 'Premium', 
                  price: '₹39,999', 
                  features: ['Strategy consultation', 'Custom conversion copy', 'Advanced integrations', 'Priority support'],
                  best: ''
                },
              ].map((plan, i) => (
                <div key={i} className={`glass glass-hover p-8 rounded-lg transition-all scroll-fade hover:scale-105 relative ${plan.popular ? 'border-accent' : ''}`} style={{animationDelay: `${i * 0.1}s`}}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 rounded-full text-sm">
                      {plan.best}
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-muted">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-sm">{f}</span>
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

        {/* Performance Trust Badges */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass p-8 rounded-lg scroll-fade">
              <h3 className="text-center text-xl font-semibold mb-6">Built With Professional Standards</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                {[
                  { label: 'SEO Optimized', icon: '🔍' },
                  { label: 'Mobile Ready', icon: '📱' },
                  { label: 'Lightning Fast', icon: '⚡' },
                  { label: 'Secure SSL', icon: '🔒' },
                  { label: 'Hosted on Vercel', icon: '☁️' },
                ].map((badge, i) => (
                  <div key={i}>
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-medium">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-12 rounded-2xl scroll-fade text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold">
                P
              </div>
              <h3 className="text-2xl font-bold mb-4">Built by Pavithran</h3>
              <p className="text-muted max-w-2xl mx-auto">
                Combining engineering precision with modern web technology to help businesses grow online. Direct founder support on every project.
              </p>
            </div>
          </div>
        </section>

        {/* Free Offer CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl scroll-fade">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get a Free Homepage Mockup</h2>
            <p className="text-xl text-muted mb-8">See how your website could look before committing. No obligation.</p>
            <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold inline-block hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
              Request Free Mockup
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
