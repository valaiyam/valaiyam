import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Valaiyam - Premium Business Websites Built Fast',
  description: 'Modern, AI-assisted business websites for small businesses, startups, and professionals. Fast delivery, premium quality, affordable pricing.',
  keywords: 'business website, web development, website design, small business, startup website, India',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Valaiyam - Premium Business Websites Built Fast',
    description: 'Modern, AI-assisted business websites for small businesses, startups, and professionals.',
    url: 'https://valaiyam.com',
    siteName: 'Valaiyam',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
