'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, FileText, Scale } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface LegalPageClientProps {
  locale: Locale
  dictionary: Dictionary
  pageType: 'privacy' | 'terms' | 'compliance'
}

const pageIcons = {
  privacy: Shield,
  terms: FileText,
  compliance: Scale,
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function LegalPageClient({ locale, dictionary, pageType }: LegalPageClientProps) {
  const { theme } = useTheme()
  
  const pageData = pageType === 'privacy' 
    ? dictionary.privacyPage 
    : pageType === 'terms' 
    ? dictionary.termsPage 
    : dictionary.compliancePage

  const Icon = pageIcons[pageType]

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-20"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}
      >
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />
        )}
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              theme === 'dark' 
                ? 'bg-teal-500/20 text-teal-400' 
                : 'bg-teal-100 text-teal-600'
            }`}>
              <Icon className="w-8 h-8" />
            </div>
            <h1 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {pageData?.title}
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {pageData?.lastUpdated}: {pageData?.date}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link
              href={`/${locale}`}
              className={`inline-flex items-center gap-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-teal-400 hover:text-teal-300'
                  : 'text-teal-600 hover:text-teal-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'en' ? 'Back to Home' : locale === 'ja' ? 'ホームに戻る' : locale === 'zh-TW' ? '返回首頁' : '返回首页'}
            </Link>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg mb-10 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {pageData?.intro}
          </motion.div>

          {/* Sections */}
          <div className="space-y-10">
            {pageData?.sections?.map((section: { title: string; content: string; items?: string[] }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`rounded-2xl p-6 md:p-8 ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700/50'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <h2 className={`font-display text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {section.title}
                </h2>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {section.content}
                </p>
                {section.items && (
                  <ul className={`mt-4 space-y-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          theme === 'dark' ? 'bg-teal-400' : 'bg-teal-500'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-12 text-center p-8 rounded-2xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border border-teal-800/30'
                : 'bg-gradient-to-br from-teal-50 to-cyan-50'
            }`}
          >
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {locale === 'en' 
                ? 'Have questions? Contact us for more information.' 
                : locale === 'ja'
                ? 'ご質問がありましたら、お気軽にお問い合わせください。'
                : locale === 'zh-TW'
                ? '有任何問題？請聯繫我們獲取更多資訊。'
                : '有任何问题？请联系我们获取更多信息。'}
            </p>
            <Link
              href={`/${locale}/company#contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors"
            >
              {dictionary.nav?.contact || 'Contact Us'}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
