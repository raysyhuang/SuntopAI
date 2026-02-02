'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Users, Globe, CalendarHeart, Sparkles, PartyPopper, Cpu } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface PatientCareClientProps {
  locale: Locale
  dictionary: Dictionary
}

const activityIcons = [Users, Globe, CalendarHeart, Globe, Heart, PartyPopper]

const activityImages = [
  '/images/patient-care/kidney-friend-association.png',
  '/images/patient-care/online-meetings.png',
  '/images/patient-care/opening-ceremonies.png',
  '/images/patient-care/dialysis-tourism.png',
  '/images/patient-care/humanistic-care.png',
  '/images/patient-care/holiday-events.png',
]

export default function PatientCareClient({ locale, dictionary }: PatientCareClientProps) {
  const t = dictionary.patientCare
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-700" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/clinical`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToClinical}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              {t.tag}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center max-w-4xl mx-auto p-8 rounded-2xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <Sparkles className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.description}
            </p>
            <p className={`text-2xl font-semibold mt-6 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>
              {t.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.activitiesTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.activities.map((activity: { title: string; description: string }, index: number) => {
              const Icon = activityIcons[index]
              const imageSrc = activityImages[index]
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group rounded-2xl overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="relative h-48 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <Image
                      src={imageSrc}
                      alt={activity.title}
                      width={120}
                      height={120}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
                        <Icon className={`w-5 h-5 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
                      </div>
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {activity.title}
                      </h3>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured: Dialysis Tourism */}
      <section id="dialysis-tourism" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl overflow-hidden ${
              theme === 'dark' ? 'bg-gradient-to-r from-rose-900/50 to-pink-900/50' : 'bg-gradient-to-r from-rose-50 to-pink-50'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700'
                }`}>
                  {t.featured.tag}
                </span>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.featured.title}
                </h3>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.featured.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {t.featured.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-100'
                      }`}>
                        <span className={`text-sm ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>✓</span>
                      </div>
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {/* Smart Feature Highlight */}
                {t.featured.smartFeature && (
                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-rose-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className={`w-4 h-4 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
                      <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-700'}`}>
                        {t.featured.smartFeature.title}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t.featured.smartFeature.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <Image
                    src="/images/patient-care/dialysis-tourism.png"
                    alt={t.featured.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured: Kidney Friend Association */}
      <section id="kidney-association" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl overflow-hidden ${
              theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50' : 'bg-gradient-to-r from-indigo-50 to-purple-50'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div className="flex items-center justify-center lg:order-1">
                <div className="relative w-64 h-64">
                  <Image
                    src="/images/patient-care/kidney-friend-association.png"
                    alt={t.association.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="lg:order-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {t.association.tag}
                </span>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.association.title}
                </h3>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.association.description}
                </p>
                <ul className="space-y-3">
                  {t.association.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
                      }`}>
                        <span className={`text-sm ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>✓</span>
                      </div>
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.cta.description}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-colors"
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
