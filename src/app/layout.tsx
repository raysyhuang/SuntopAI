import type { Metadata } from 'next'
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import StructuredData from '@/components/StructuredData'

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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suntopai.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Suntop AI | 智慧透析解决方案',
    template: '%s | Suntop AI',
  },
  description: '领先的AI驱动透析智能平台，为血液透析中心提供全方位的智慧医疗解决方案，包括IoT设备管理、AI辅助决策、患者管理和运营优化。',
  keywords: [
    '血液透析',
    '智慧医疗',
    'AI医疗',
    'IoT医疗设备',
    '透析中心管理',
    '肾病治疗',
    'hemodialysis',
    'dialysis AI',
    'smart healthcare',
  ],
  authors: [{ name: 'Suntop AI', url: baseUrl }],
  creator: 'Suntop AI',
  publisher: 'Suntop AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US', 'ja_JP', 'zh_TW'],
    url: baseUrl,
    siteName: 'Suntop AI',
    title: 'Suntop AI | 智慧透析解决方案',
    description: '领先的AI驱动透析智能平台，为血液透析中心提供全方位的智慧医疗解决方案。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Suntop AI - 智慧透析解决方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suntop AI | 智慧透析解决方案',
    description: '领先的AI驱动透析智能平台，为血液透析中心提供全方位的智慧医疗解决方案。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} light`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <StructuredData />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
