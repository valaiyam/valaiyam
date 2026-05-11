import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Valaiyam</h3>
          <p className="text-muted text-sm">Premium business websites built fast with AI-assisted development.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/portfolio" className="hover:text-white transition">Portfolio</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/faq" className="hover:text-white transition">FAQ</Link>
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
          <Link href="/contact" className="inline-block bg-accent px-6 py-2 rounded-lg hover:bg-blue-600 transition text-sm">
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
