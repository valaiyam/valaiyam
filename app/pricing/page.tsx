import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing - Valaiyam',
  description: 'Preview-first pricing for local business websites delivered overnight.',
}

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Preview First. Pay Later.</h1>
            <p className="text-xl text-muted text-center max-w-3xl mx-auto mb-16">
              Reserve your slot, approve your homepage preview, then pay the remaining amount only when you are happy.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { step: '1', title: 'Reserve', price: '₹999', desc: 'Start on WhatsApp and secure your founding-customer slot.' },
                { step: '2', title: 'Approve', price: '₹0', desc: 'Review your homepage preview before committing to the full build.' },
                { step: '3', title: 'Go Live', price: 'Balance', desc: 'Pay the remaining approved amount and launch your website.' },
              ].map((item, i) => (
                <div key={item.step} className={`glass glass-hover p-8 rounded-2xl transition-all hover:scale-105 relative ${i === 0 ? 'border-accent' : ''}`}>
                  {i === 0 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 rounded-full text-sm text-white">Low-risk start</div>}
                  <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center text-2xl font-bold mb-5">{item.step}</div>
                  <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-4xl font-bold mb-4">{item.price}</p>
                  <p className="text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass p-8 rounded-2xl mb-16">
              <h2 className="text-2xl font-bold mb-6">Every website is built to help your business:</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-muted">
                <div className="space-y-3">
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Get found on Google</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Accept WhatsApp orders</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Build trust instantly</p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Look professional on mobile</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Show photos, timings, and services</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Stay open 24/7</p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Use your own domain</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Request changes before launch</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Own your website</p>
                </div>
              </div>
            </div>

            <div className="text-center glass border-accent p-12 rounded-3xl">
              <h2 className="text-3xl font-bold mb-4">Founding Customer Program</h2>
              <p className="text-muted mb-8 max-w-2xl mx-auto">We're selecting 3 local businesses for premium websites at 50% discount. In return, we ask for a testimonial after launch.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition inline-block text-white font-semibold">
                Preview My Website
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
