'use client'

import Link from 'next/link'

export default function PromoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-accent to-blue-700 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="inline-flex items-center mx-8">
          <span className="font-bold text-sm">Launching 3 Pilot Projects at 50% Off - ₹4,999</span>
          <span className="text-xs opacity-90 ml-2">(Limited to first 3 clients)</span>
          <Link href="/contact" className="ml-4 bg-white text-accent px-4 py-1 rounded-full font-semibold text-xs hover:bg-gray-100 transition">
            Apply Now
          </Link>
        </span>
        <span className="inline-flex items-center mx-8">
          <span className="font-bold text-sm">Launching 3 Pilot Projects at 50% Off - ₹4,999</span>
          <span className="text-xs opacity-90 ml-2">(Limited to first 3 clients)</span>
          <Link href="/contact" className="ml-4 bg-white text-accent px-4 py-1 rounded-full font-semibold text-xs hover:bg-gray-100 transition">
            Apply Now
          </Link>
        </span>
        <span className="inline-flex items-center mx-8">
          <span className="font-bold text-sm">Launching 3 Pilot Projects at 50% Off - ₹4,999</span>
          <span className="text-xs opacity-90 ml-2">(Limited to first 3 clients)</span>
          <Link href="/contact" className="ml-4 bg-white text-accent px-4 py-1 rounded-full font-semibold text-xs hover:bg-gray-100 transition">
            Apply Now
          </Link>
        </span>
      </div>
    </div>
  )
}
