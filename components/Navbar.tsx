import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-8 w-full glass backdrop-blur-2xl z-50 border-b border-default">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M13 5.5A11 11 0 0 1 22.5 10" stroke="#16B84E" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M25 14A11 11 0 0 1 20.5 25" stroke="#FF7A1A" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M17 26.5A11 11 0 0 1 6.8 21" stroke="#6D4BE8" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M5.5 18A11 11 0 0 1 10 7" stroke="#1479E8" strokeWidth="3.5" strokeLinecap="round"/>
            <circle cx="12" cy="6" r="3.5" fill="#16B84E"/>
            <circle cx="25" cy="14" r="3.5" fill="#FF7A1A"/>
            <circle cx="17" cy="27" r="3.5" fill="#6D4BE8"/>
            <circle cx="5.5" cy="18" r="3.5" fill="#1479E8"/>
          </svg>
          <span className="tracking-wide">Valaiyam<span className="text-brand-green">.</span><span className="text-brand-blue">com</span></span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-accent transition-all hover:scale-105">Home</Link>
          <Link href="/services" className="hover:text-accent transition-all hover:scale-105">Services</Link>
          <Link href="/portfolio" className="hover:text-accent transition-all hover:scale-105">Portfolio</Link>
          <Link href="/pricing" className="hover:text-accent transition-all hover:scale-105">Pricing</Link>
          <Link href="/faq" className="hover:text-accent transition-all hover:scale-105">FAQ</Link>
          <Link href="/portfolio" className="hover:text-accent transition-all hover:scale-105">Demo Website</Link>
          <ThemeToggle />
        </div>
        <Link href="/contact" className="bg-accent px-6 py-2 rounded-lg hover:bg-brand-navy transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/50 text-white">
          Build My Website
        </Link>
      </div>
    </nav>
  )
}
