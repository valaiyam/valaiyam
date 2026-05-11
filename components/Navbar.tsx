import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-8 w-full glass backdrop-blur-2xl z-50 border-b border-default">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M8 8L16 24L24 8" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Valaiyam
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-accent transition-all hover:scale-105">Home</Link>
          <Link href="/services" className="hover:text-accent transition-all hover:scale-105">Services</Link>
          <Link href="/portfolio" className="hover:text-accent transition-all hover:scale-105">Portfolio</Link>
          <Link href="/pricing" className="hover:text-accent transition-all hover:scale-105">Pricing</Link>
          <Link href="/faq" className="hover:text-accent transition-all hover:scale-105">FAQ</Link>
          <Link href="/estimate" className="hover:text-accent transition-all hover:scale-105">Cost Estimator</Link>
          <ThemeToggle />
        </div>
        <Link href="/contact" className="bg-accent px-6 py-2 rounded-lg hover:bg-blue-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/50 text-white">
          Book Consultation
        </Link>
      </div>
    </nav>
  )
}
