import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { LenisProvider } from '@/components/layout/lenis-provider'
import { Chatbot } from '@/components/layout/chatbot'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Avotein Farms — From Seed to Table',
  description: 'Invest in Hass avocado farming in Uganda. Avotein Farms captures the full supply chain — cultivation, logistics, export, retail. HASS Fund: ~40% projected ROI from year 4.',
  openGraph: {
    title: 'Avotein Farms — From Seed to Table',
    description: 'Invest in Hass avocado farming in Uganda. Avotein Farms captures the full supply chain — cultivation, logistics, export, retail. HASS Fund: ~40% projected ROI from year 4.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </LenisProvider>
      </body>
    </html>
  )
}
