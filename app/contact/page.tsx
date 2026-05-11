'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here (e.g., API call, email service)
    alert('Thank you! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Get In Touch</h1>
            <p className="text-xl text-muted text-center max-w-3xl mx-auto mb-16">
              Ready to start your project? Fill out the form below or reach out via WhatsApp.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="glass p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interested In</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 focus:border-accent outline-none transition"
                    >
                      <option value="">Select a service</option>
                      <option value="free">🎉 Free Website (Limited Offer)</option>
                      <option value="business">Business Website</option>
                      <option value="landing">Landing Page</option>
                      <option value="portfolio">Portfolio Website</option>
                      <option value="redesign">Website Redesign</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 focus:border-accent outline-none transition"
                    />
                  </div>
                  <button type="submit" className="w-full bg-accent px-6 py-4 rounded-lg hover:bg-blue-600 transition-all font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="glass glass-hover p-6 rounded-lg transition-all">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4 text-muted">
                    <p><strong className="text-white">Email:</strong><br/>hello@valaiyam.com</p>
                    <p><strong className="text-white">Location:</strong><br/>Bangalore, Karnataka, India</p>
                    <p><strong className="text-white">Business Hours:</strong><br/>Monday - Saturday<br/>9:00 AM - 8:00 PM IST</p>
                  </div>
                </div>

                <div className="glass glass-hover p-6 rounded-lg transition-all">
                  <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
                  <a
                    href="https://wa.me/YOUR_PHONE_NUMBER?text=Hi%20Valaiyam,%20I%27d%20like%20to%20discuss%20a%20website%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="font-semibold">Chat on WhatsApp</span>
                  </a>
                </div>

                <div className="glass rounded-lg overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085284235143!3d12.953945613752363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
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
