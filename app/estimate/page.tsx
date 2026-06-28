import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Free Homepage Mockup - Valaiyam',
  description: 'Request a free homepage mockup and preview your business website before paying.',
}

export default function EstimateReplacement() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-accent font-semibold mb-3">Cost estimator replaced with something more useful</p>
            <h1 className="text-5xl font-bold mb-6">Get a Free Homepage Mockup</h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-12">
              Instead of guessing a price, share your business details on WhatsApp and see a real homepage preview first.
            </p>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                ['1', 'Tell us your business'],
                ['2', 'Send logo & photos'],
                ['3', 'Preview by next morning'],
                ['4', 'Approve & go live'],
              ].map(([step, text]) => (
                <div key={step} className="glass p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 font-bold">{step}</div>
                  <p className="font-semibold">{text}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition-all inline-block text-white font-semibold">
              Preview My Website
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
