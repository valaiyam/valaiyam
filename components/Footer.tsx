import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="glass border-t py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M8 8L16 24L24 8" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Valaiyam
          </h3>
          <p className="text-muted text-sm">Premium business websites built fast with AI-assisted development.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/services" className="hover:text-white transition hover:translate-x-1 inline-block">Services</Link>
            <Link href="/portfolio" className="hover:text-white transition hover:translate-x-1 inline-block">Portfolio</Link>
            <Link href="/pricing" className="hover:text-white transition hover:translate-x-1 inline-block">Pricing</Link>
            <Link href="/faq" className="hover:text-white transition hover:translate-x-1 inline-block">FAQ</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="text-sm text-muted space-y-2">
            <p>Bangalore, Karnataka, India</p>
            <p>hello@valaiyam.com</p>
            <p>Mon-Sat: 9 AM - 8 PM IST</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Get Started</h4>
          <Link href="/contact" className="inline-block bg-accent px-6 py-2 rounded-lg hover:bg-blue-600 transition text-sm hover:scale-105 hover:shadow-lg hover:shadow-accent/50">
            Book Free Consultation
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Valaiyam. All rights reserved.</p>
      </div>
    </footer>
  )
}
