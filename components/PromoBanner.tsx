'use client'

import Link from 'next/link'

export default function PromoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-brand-blue via-brand-green to-brand-purple text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="inline-flex items-center mx-8">
          <span className="font-bold text-sm">Founding Customer Program: 3 local businesses at 50% off</span>
          <span className="text-xs opacity-90 ml-2">(testimonial requested after launch)</span>
          <Link href="/contact" className="ml-4 bg-white text-accent px-4 py-1 rounded-full font-semibold text-xs hover:bg-gray-100 transition">
            Reserve Slot
          </Link>
        </span>
        <span className="inline-flex items-center mx-8">
          <span className="font-bold text-sm">Founding Customer Program: 3 local businesses at 50% off</span>
          <span className="text-xs opacity-90 ml-2">(testimonial requested after launch)</span>
          <Link href="/contact" className="ml-4 bg-white text-accent px-4 py-1 rounded-full font-semibold text-xs hover:bg-gray-100 transition">
            Reserve Slot
          </Link>
        </span>
        <span className="inline-flex items-center mx-8">
          <span className="font-bold text-sm">Founding Customer Program: 3 local businesses at 50% off</span>
          <span className="text-xs opacity-90 ml-2">(testimonial requested after launch)</span>
          <Link href="/contact" className="ml-4 bg-white text-accent px-4 py-1 rounded-full font-semibold text-xs hover:bg-gray-100 transition">
            Reserve Slot
          </Link>
        </span>
      </div>
    </div>
  )
}
