import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Services - Valaiyam',
  description: 'Professional web development services including business websites, landing pages, portfolio sites, and more.',
}

export default function Services() {
  const services = [
    {
      title: 'Business Website Development',
      desc: 'Complete website solution for your business with modern design, mobile responsiveness, and conversion optimization.',
      features: ['Custom Design', 'Mobile-First', 'SEO Optimized', 'Fast Loading', 'Contact Forms']
    },
    {
      title: 'Landing Page Design',
      desc: 'High-converting landing pages designed to capture leads and drive business growth.',
      features: ['Conversion Focus', 'A/B Testing Ready', 'Analytics Integration', 'Lead Capture', 'Fast Deployment']
    },
    {
      title: 'Portfolio Websites',
      desc: 'Showcase your work with elegant portfolio websites that highlight your expertise.',
      features: ['Gallery Layouts', 'Project Showcases', 'Client Testimonials', 'Contact Integration', 'Premium Design']
    },
    {
      title: 'Website Redesign',
      desc: 'Modernize your existing website with fresh design and improved performance.',
      features: ['Modern UI/UX', 'Performance Boost', 'Mobile Optimization', 'SEO Improvement', 'Content Migration']
    },
    {
      title: 'Domain + Deployment Setup',
      desc: 'Complete technical setup including domain configuration and hosting deployment.',
      features: ['Domain Setup', 'SSL Certificate', 'Vercel Deployment', 'DNS Configuration', 'Email Setup']
    },
    {
      title: 'SEO Optimization',
      desc: 'Improve your search engine visibility with technical and on-page SEO.',
      features: ['Keyword Research', 'Meta Optimization', 'Schema Markup', 'Performance Tuning', 'Local SEO']
    },
    {
      title: 'Maintenance & Support',
      desc: 'Ongoing website maintenance and technical support to keep your site running smoothly.',
      features: ['Regular Updates', 'Bug Fixes', 'Content Updates', 'Performance Monitoring', 'Priority Support']
    },
    {
      title: 'AI-Assisted Rapid Delivery',
      desc: 'Leverage AI-powered development for faster turnaround without compromising quality.',
      features: ['Fast Delivery', 'Quality Code', 'Modern Stack', 'Best Practices', 'Professional Results']
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-36">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Our Services</h1>
            <p className="text-xl text-muted text-center max-w-3xl mx-auto mb-16">
              Comprehensive web development services designed to help your business succeed online.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <div key={i} className="border border-white/10 p-8 rounded-lg hover:border-accent/50 transition">
                  <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
                  <p className="text-muted mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted">
                        <span className="text-accent">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center bg-secondary p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted mb-8">Let's discuss your project and find the right solution for your needs.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition inline-block">
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
