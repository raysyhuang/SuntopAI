import type { Metadata } from 'next'
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Suntop AI | AI-Driven Dialysis Intelligence and Automation',
  description: 'Building the operating system for next-generation dialysis care. We integrate dialysis machines, patient data, and clinical workflows through AI, IoT, and automation.',
  keywords: ['dialysis', 'AI', 'healthcare', 'IoT', 'automation', 'clinical intelligence', 'hemodialysis'],
  authors: [{ name: 'Suntop AI' }],
  openGraph: {
    title: 'Suntop AI | AI-Driven Dialysis Intelligence',
    description: 'Building the operating system for next-generation dialysis care.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
