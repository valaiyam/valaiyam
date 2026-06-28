import type { Metadata } from 'next'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import PromoBanner from '@/components/PromoBanner'
import { ThemeProvider } from '@/lib/ThemeContext'


export const metadata: Metadata = {
  title: 'Valaiyam - Preview Your Business Website First',
  description: 'Valaiyam helps local businesses get found, earn trust, and receive more enquiries with preview-first professional websites.',
  keywords: 'local business website, WhatsApp orders, business website India, business website preview, small business website',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Valaiyam - Preview Your Business Website First',
    description: 'Professional local business websites with preview-first approval.',
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
    <html lang="en" className="scroll-smooth dark">
      <body>
        <ThemeProvider>
          <PromoBanner />
          {children}
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
