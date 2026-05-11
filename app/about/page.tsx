import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About - Valaiyam',
  description: 'Learn about Valaiyam and our mission to help businesses succeed online with premium websites.',
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">About Valaiyam</h1>
            <p className="text-xl text-muted text-center mb-16">
              Building premium digital experiences for businesses that want to grow.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-muted leading-relaxed">
                  We started Valaiyam because we saw small businesses paying too much and waiting too long for basic websites. Traditional agencies charge ₹50,000+ and take 1-3 months for what should be a simple, fast process.
                </p>
                <p className="text-muted leading-relaxed mt-4">
                  As a small, focused team, we deliver professional websites faster and more affordably. No big teams. No overhead. No endless revisions. Just quality work at fair prices.
                </p>
                <p className="text-muted leading-relaxed mt-4">
                  We're currently accepting our first clients at special introductory rates as we build our portfolio.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass glass-hover p-6 rounded-lg transition-all hover:scale-105">
                    <h3 className="font-semibold mb-2">Small Team</h3>
                    <p className="text-sm text-muted">Focused attention, not agency bureaucracy</p>
                  </div>
                  <div className="glass glass-hover p-6 rounded-lg transition-all hover:scale-105">
                    <h3 className="font-semibold mb-2">Fast Delivery</h3>
                    <p className="text-sm text-muted">7-day launch guarantee for most projects</p>
                  </div>
                  <div className="glass glass-hover p-6 rounded-lg transition-all hover:scale-105">
                    <h3 className="font-semibold mb-2">Fair Pricing</h3>
                    <p className="text-sm text-muted">Transparent pricing from ₹4,999</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Simple 4-Step Process</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: '1', title: 'Free Consultation', desc: '15-minute call to discuss your needs' },
                    { step: '2', title: 'Design & Approval', desc: 'We design, you approve within 48 hours' },
                    { step: '3', title: 'Development', desc: 'We build your website in 5 days' },
                    { step: '4', title: 'Launch & Support', desc: 'Go live + 30 days of support included' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="glass glass-hover w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent transition-all hover:scale-110">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Our Guarantee</h2>
                <div className="glass p-8 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-center">30-Day Satisfaction Guarantee</h3>
                  <p className="text-muted text-center mb-6">
                    If you're not completely satisfied with your website within 30 days of launch, we'll fix it or refund your money.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-2">7 Days</div>
                      <div className="text-sm text-muted">Website launch guarantee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-2">30 Days</div>
                      <div className="text-sm text-muted">Money-back guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center bg-secondary p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
              <p className="text-muted mb-8">Let's build something amazing for your business.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition inline-block">
                Start Your Project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
