'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-accent to-blue-700 text-white py-3 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="font-bold text-sm md:text-base">
            🎉 Limited Offer: 5 FREE Websites for Individual Businesses, Startups & Small Businesses
          </p>
          <p className="text-xs opacity-90 mt-1">
            T&C Apply - Domain fee needs to be paid by client
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/contact" 
            className="bg-white text-accent px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition whitespace-nowrap"
          >
            Claim Now
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition text-xl"
            aria-label="Close banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
