'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Estimate() {
  const [formData, setFormData] = useState({
    websiteType: 'business',
    pages: '5',
    features: [] as string[],
    timeline: 'standard',
    design: 'professional',
  })

  const [estimate, setEstimate] = useState(0)

  const calculateEstimate = () => {
    let basePrice = 0

    // Base price by website type
    switch (formData.websiteType) {
      case 'landing':
        basePrice = 7999
        break
      case 'portfolio':
        basePrice = 11999
        break
      case 'business':
        basePrice = 17999
        break
      case 'ecommerce':
        basePrice = 34999
        break
      case 'custom':
        basePrice = 24999
        break
    }

    // Pages cost (first 5 included, then ₹800 per page)
    const pageCount = parseInt(formData.pages)
    if (pageCount > 5) {
      basePrice += (pageCount - 5) * 800
    }

    // Features cost
    const featureCosts: { [key: string]: number } = {
      seo: 1500,
      analytics: 800,
      blog: 3000,
      booking: 5000,
      payment: 6000,
      cms: 4000,
      multilingual: 3500,
      animations: 2000,
      chat: 1500,
    }

    formData.features.forEach(feature => {
      basePrice += featureCosts[feature] || 0
    })

    // Timeline adjustment
    if (formData.timeline === 'priority') {
      basePrice *= 1.2 // 20% priority fee
    } else if (formData.timeline === 'flexible') {
      basePrice *= 0.9 // 10% discount
    }

    // Design complexity
    if (formData.design === 'signature') {
      basePrice += 6500
    } else if (formData.design === 'premium') {
      basePrice += 3500
    }

    setEstimate(Math.round(basePrice))
  }

  useEffect(() => {
    calculateEstimate()
  }, [formData])

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Cost Estimator</h1>
            <p className="text-xl text-muted text-center max-w-3xl mx-auto mb-16">
              Get an instant estimate for your website project. Customize the options below to see pricing.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Form */}
              <div className="md:col-span-2 space-y-8">
                {/* Website Type */}
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Website Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'landing', label: 'Landing Page', base: '₹7,999' },
                      { value: 'portfolio', label: 'Portfolio Site', base: '₹11,999' },
                      { value: 'business', label: 'Business Website', base: '₹17,999' },
                      { value: 'ecommerce', label: 'E-commerce', base: '₹34,999' },
                      { value: 'custom', label: 'Custom Web Solution', base: '₹24,999+' },
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, websiteType: type.value })}
                        className={`p-4 rounded-lg border transition text-left ${
                          formData.websiteType === type.value
                            ? 'border-accent bg-accent/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-sm text-muted">Base: {type.base}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Pages */}
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Number of Pages</h3>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted mt-2">
                    <span>1 page</span>
                    <span className="text-white font-semibold">{formData.pages} pages</span>
                    <span>20 pages</span>
                  </div>
                  <p className="text-xs text-muted mt-2">1-5 pages included • +₹800 per additional page</p>
                </div>

                {/* Features */}
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  
                  {/* Always Included */}
                  <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <p className="text-sm font-semibold mb-3 text-accent">Always Included (Free)</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted">
                      <p>✓ WhatsApp Button</p>
                      <p>✓ Contact Form</p>
                      <p>✓ Google Maps</p>
                      <p>✓ Mobile Responsive</p>
                      <p>✓ Basic SEO</p>
                      <p>✓ SSL Setup</p>
                    </div>
                  </div>

                  <p className="text-sm font-semibold mb-3">Premium Add-ons</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'seo', label: 'Advanced SEO Setup', cost: '+₹1,500' },
                      { value: 'analytics', label: 'Analytics + Search Console', cost: '+₹800' },
                      { value: 'blog', label: 'Blog CMS', cost: '+₹3,000' },
                      { value: 'booking', label: 'Booking System', cost: '+₹5,000' },
                      { value: 'payment', label: 'Payment Gateway', cost: '+₹6,000' },
                      { value: 'cms', label: 'CMS Integration', cost: '+₹4,000' },
                      { value: 'multilingual', label: 'Multi-language', cost: '+₹3,500' },
                      { value: 'animations', label: 'Custom Animations', cost: '+₹2,000' },
                      { value: 'chat', label: 'Live Chat', cost: '+₹1,500' },
                    ].map(feature => (
                      <button
                        key={feature.value}
                        onClick={() => toggleFeature(feature.value)}
                        className={`p-3 rounded-lg border transition text-left text-sm ${
                          formData.features.includes(feature.value)
                            ? 'border-accent bg-accent/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="font-semibold">{feature.label}</div>
                        <div className="text-xs text-muted">{feature.cost}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Timeline</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'flexible', label: 'Flexible (2-3 weeks)', modifier: '-10%' },
                      { value: 'standard', label: 'Standard (7-10 days)', modifier: 'Included' },
                      { value: 'priority', label: 'Priority (3-5 days)', modifier: '+20%' },
                    ].map(timeline => (
                      <button
                        key={timeline.value}
                        onClick={() => setFormData({ ...formData, timeline: timeline.value })}
                        className={`p-4 rounded-lg border transition text-center ${
                          formData.timeline === timeline.value
                            ? 'border-accent bg-accent/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="font-semibold text-sm">{timeline.label}</div>
                        <div className="text-xs text-muted mt-1">{timeline.modifier}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Design Complexity */}
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Design Complexity</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'professional', label: 'Professional Template', cost: 'Included' },
                      { value: 'premium', label: 'Premium Custom Design', cost: '+₹3,500' },
                      { value: 'signature', label: 'Signature Fully Custom', cost: '+₹6,500' },
                    ].map(design => (
                      <button
                        key={design.value}
                        onClick={() => setFormData({ ...formData, design: design.value })}
                        className={`p-4 rounded-lg border transition text-center ${
                          formData.design === design.value
                            ? 'border-accent bg-accent/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="font-semibold text-sm">{design.label}</div>
                        <div className="text-xs text-muted mt-1">{design.cost}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Summary */}
              <div className="md:col-span-1">
                <div className="border border-accent p-6 rounded-lg sticky top-24 bg-secondary">
                  <h3 className="text-xl font-semibold mb-4">Estimated Investment</h3>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gradient mb-2">
                      ₹{Math.round(estimate * 0.95).toLocaleString('en-IN')} - ₹{Math.round(estimate * 1.05).toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-muted">Professional consultation estimate</p>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Website Type:</span>
                      <span className="capitalize">{formData.websiteType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Pages:</span>
                      <span>{formData.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Add-ons:</span>
                      <span>{formData.features.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Timeline:</span>
                      <span className="capitalize">{formData.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Design:</span>
                      <span className="capitalize">{formData.design}</span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6 p-4 bg-white/5 rounded-lg">
                    <p className="text-sm font-semibold mb-3">Includes:</p>
                    <div className="space-y-2 text-xs text-muted">
                      <p>✓ Mobile responsive design</p>
                      <p>✓ Fast Vercel deployment</p>
                      <p>✓ SEO-ready setup</p>
                      <p>✓ WhatsApp integration</p>
                      <p>✓ 2 revision rounds</p>
                      <p>✓ 14 days post-launch support</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link 
                      href="/contact" 
                      className="block text-center bg-accent px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
                    >
                      Get Started
                    </Link>
                    <Link 
                      href="/pricing" 
                      className="block text-center border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5 transition text-sm"
                    >
                      View Standard Plans
                    </Link>
                  </div>

                  <p className="text-xs text-muted mt-6 text-center">
                    Final pricing may vary based on specific requirements
                  </p>
                </div>
              </div>
            </div>

            {/* Not Sure Section */}
            <div className="mt-16 text-center glass p-12 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4">Not Sure What You Need?</h3>
              <p className="text-muted mb-8 max-w-2xl mx-auto">
                Book a free 15-minute strategy call and we'll recommend the best package for your business goals.
              </p>
              <Link href="/contact" className="inline-block bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 font-semibold">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
