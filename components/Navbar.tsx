import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-primary/80 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">Valaiyam</Link>
        <div className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-accent transition">Home</Link>
          <Link href="/services" className="hover:text-accent transition">Services</Link>
          <Link href="/portfolio" className="hover:text-accent transition">Portfolio</Link>
          <Link href="/pricing" className="hover:text-accent transition">Pricing</Link>
          <Link href="/faq" className="hover:text-accent transition">FAQ</Link>
          <Link href="/contact" className="hover:text-accent transition">Contact</Link>
        </div>
        <Link href="/contact" className="bg-accent px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Book Consultation
        </Link>
      </div>
    </nav>
  )
}
