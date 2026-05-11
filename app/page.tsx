import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Premium Websites<br />Built <span className="text-gradient">Fast</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
              Modern, conversion-focused websites for businesses that want to grow. AI-assisted development meets professional engineering quality.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold">
                Book Free Consultation
              </Link>
              <Link href="/portfolio" className="border border-white/20 px-8 py-4 rounded-lg hover:bg-white/5 transition text-lg font-semibold">
                View Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 px-6 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What We Build</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Business Websites', desc: 'Complete digital presence for your business with modern design and conversion focus' },
                { title: 'Landing Pages', desc: 'High-converting pages designed to turn visitors into customers' },
                { title: 'Portfolio Sites', desc: 'Showcase your work with elegant, fast-loading portfolio websites' },
              ].map((service, i) => (
                <div key={i} className="border border-white/10 p-8 rounded-lg hover:border-accent/50 transition">
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="text-accent hover:underline">View All Services →</Link>
            </div>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Recent Work</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="bg-secondary aspect-video rounded-lg mb-4 flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition">
                    <span className="text-muted">Project {i}</span>
                  </div>
                  <h3 className="font-semibold mb-2">Client Project {i}</h3>
                  <p className="text-sm text-muted">Business Website</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/portfolio" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition inline-block">
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 px-6 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Transparent Pricing</h2>
            <p className="text-center text-muted mb-12">No hidden fees. Choose the plan that fits your needs.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '₹9,999', features: ['5 Pages', 'Mobile Responsive', 'Contact Form', 'Basic SEO'] },
                { name: 'Professional', price: '₹19,999', features: ['10 Pages', 'Premium Design', 'WhatsApp Integration', 'Advanced SEO', 'Analytics'] },
                { name: 'Premium', price: '₹39,999', features: ['Unlimited Pages', 'Custom Features', 'Priority Support', 'Full SEO Suite', 'Maintenance'] },
              ].map((plan, i) => (
                <div key={i} className="border border-white/10 p-8 rounded-lg hover:border-accent/50 transition">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted">
                        <span className="text-accent">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block text-center border border-accent px-6 py-3 rounded-lg hover:bg-accent transition">
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/pricing" className="text-accent hover:underline">View Detailed Pricing →</Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch Your Website?</h2>
            <p className="text-xl text-muted mb-8">Book a free consultation and let's discuss your project.</p>
            <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold inline-block">
              Book Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
