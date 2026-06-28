import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="glass border-t border-default py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M13 5.5A11 11 0 0 1 22.5 10" stroke="#16B84E" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M25 14A11 11 0 0 1 20.5 25" stroke="#FF7A1A" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M17 26.5A11 11 0 0 1 6.8 21" stroke="#6D4BE8" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M5.5 18A11 11 0 0 1 10 7" stroke="#1479E8" strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="12" cy="6" r="3.5" fill="#16B84E"/>
              <circle cx="25" cy="14" r="3.5" fill="#FF7A1A"/>
              <circle cx="17" cy="27" r="3.5" fill="#6D4BE8"/>
              <circle cx="5.5" cy="18" r="3.5" fill="#1479E8"/>
            </svg>
            <span>Valaiyam<span className="text-brand-green">.</span><span className="text-brand-blue">com</span></span>
          </h3>
          <p className="text-muted text-sm">Helping local businesses grow online overnight with websites that build trust and bring enquiries.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/services" className="hover:text-accent transition hover:translate-x-1 inline-block">Services</Link>
            <Link href="/portfolio" className="hover:text-accent transition hover:translate-x-1 inline-block">Portfolio</Link>
            <Link href="/pricing" className="hover:text-accent transition hover:translate-x-1 inline-block">Pricing</Link>
            <Link href="/faq" className="hover:text-accent transition hover:translate-x-1 inline-block">FAQ</Link>
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
          <h4 className="font-semibold mb-4">Questions?</h4>
          <p className="text-sm text-muted mb-4">Chat with us on WhatsApp.</p>
          <Link href="/contact" className="inline-block bg-accent px-6 py-2 rounded-lg hover:bg-brand-navy transition text-sm hover:scale-105 hover:shadow-lg hover:shadow-accent/50 text-white">
            Build My Website
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-default text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Valaiyam. All rights reserved.</p>
      </div>
    </footer>
  )
}
