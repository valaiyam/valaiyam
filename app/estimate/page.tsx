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
    design: 'template',
  })

  const [estimate, setEstimate] = useState(0)

  const calculateEstimate = () => {
    let basePrice = 0

    // Base price by website type
    switch (formData.websiteType) {
      case 'business':
        basePrice = 15000
        break
      case 'landing':
        basePrice = 8000
        break
      case 'portfolio':
        basePrice = 12000
        break
      case 'ecommerce':
        basePrice = 35000
        break
      case 'custom':
        basePrice = 25000
        break
    }

    // Pages cost
    const pageCount = parseInt(formData.pages)
    if (pageCount > 5) {
      basePrice += (pageCount - 5) * 1500
    }

    // Features cost
    const featureCosts: { [key: string]: number } = {
      whatsapp: 0,
      contact: 0,
      maps: 0,
      seo: 2000,
      analytics: 1000,
      blog: 5000,
      booking: 8000,
      payment: 10000,
      cms: 7000,
      multilingual: 6000,
      animations: 3000,
      chat: 4000,
    }

    formData.features.forEach(feature => {
      basePrice += featureCosts[feature] || 0
    })

    // Timeline adjustment
    if (formData.timeline === 'rush') {
      basePrice *= 1.3 // 30% rush fee
    } else if (formData.timeline === 'flexible') {
      basePrice *= 0.9 // 10% discount
    }

    // Design complexity
    if (formData.design === 'custom') {
      basePrice += 8000
    } else if (formData.design === 'premium') {
      basePrice += 5000
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
      <main className="pt-36">
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
                      { value: 'business', label: 'Business Website', base: '₹15,000' },
                      { value: 'landing', label: 'Landing Page', base: '₹8,000' },
                      { value: 'portfolio', label: 'Portfolio Site', base: '₹12,000' },
                      { value: 'ecommerce', label: 'E-commerce', base: '₹35,000' },
                      { value: 'custom', label: 'Custom Solution', base: '₹25,000' },
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
                  <p className="text-xs text-muted mt-2">+₹1,500 per page after 5 pages</p>
                </div>

                {/* Features */}
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'whatsapp', label: 'WhatsApp Button', cost: 'Free' },
                      { value: 'contact', label: 'Contact Form', cost: 'Free' },
                      { value: 'maps', label: 'Google Maps', cost: 'Free' },
                      { value: 'seo', label: 'Advanced SEO', cost: '+₹2,000' },
                      { value: 'analytics', label: 'Analytics Setup', cost: '+₹1,000' },
                      { value: 'blog', label: 'Blog System', cost: '+₹5,000' },
                      { value: 'booking', label: 'Booking System', cost: '+₹8,000' },
                      { value: 'payment', label: 'Payment Gateway', cost: '+₹10,000' },
                      { value: 'cms', label: 'CMS Integration', cost: '+₹7,000' },
                      { value: 'multilingual', label: 'Multi-language', cost: '+₹6,000' },
                      { value: 'animations', label: 'Custom Animations', cost: '+₹3,000' },
                      { value: 'chat', label: 'Live Chat', cost: '+₹4,000' },
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
                      { value: 'rush', label: 'Rush (3-5 days)', modifier: '+30%' },
                      { value: 'standard', label: 'Standard (7-10 days)', modifier: 'Standard' },
                      { value: 'flexible', label: 'Flexible (2-3 weeks)', modifier: '-10%' },
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
                      { value: 'template', label: 'Template-based', cost: 'Included' },
                      { value: 'premium', label: 'Premium Design', cost: '+₹5,000' },
                      { value: 'custom', label: 'Fully Custom', cost: '+₹8,000' },
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
                  <h3 className="text-xl font-semibold mb-4">Your Estimate</h3>
                  
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-gradient mb-2">
                      ₹{estimate.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-muted">Estimated project cost</p>
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
                      <span className="text-muted">Features:</span>
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

                  <p className="text-xs text-muted mt-6">
                    * This is an estimate. Final pricing may vary based on specific requirements. Contact us for a detailed quote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
