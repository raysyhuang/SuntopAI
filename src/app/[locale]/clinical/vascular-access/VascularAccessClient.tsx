'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Activity, Stethoscope, Syringe, Heart, Shield, Clock, Users, Building2, ChevronLeft, ChevronRight, X, Cpu, Wifi, Brain, FileText } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface VascularAccessClientProps {
  locale: Locale
  dictionary: Dictionary
}

const featureImages = [
  '/images/vascular-access/icon-diagnosis.png',
  '/images/vascular-access/icon-equipment.png',
  '/images/vascular-access/icon-one-stop.png',
  '/images/vascular-access/icon-comfortable-env.png',
  '/images/vascular-access/icon-rapid-process.png',
  '/images/vascular-access/icon-consultation.png',
  '/images/vascular-access/icon-referral.png',
  '/images/vascular-access/icon-complications.png',
  '/images/vascular-access/icon-intl-team.png',
]

const galleryImages = [
  '/images/vascular-access/activity-1.jpg',
  '/images/vascular-access/activity-2.jpg',
  '/images/vascular-access/activity-3.jpg',
  '/images/vascular-access/activity-4.jpg',
  '/images/vascular-access/activity-5.jpg',
  '/images/vascular-access/activity-6.jpg',
]

const serviceIcons = [Stethoscope, Syringe, Activity, Heart, Shield, Syringe]

export default function VascularAccessClient({ locale, dictionary }: VascularAccessClientProps) {
  const t = dictionary.vascularAccess
  const { theme } = useTheme()
  const [activeImage, setActiveImage] = useState<number | null>(null)

  const handlePrev = () => {
    if (activeImage !== null) {
      setActiveImage(activeImage === 0 ? galleryImages.length - 1 : activeImage - 1)
    }
  }

  const handleNext = () => {
    if (activeImage !== null) {
      setActiveImage(activeImage === galleryImages.length - 1 ? 0 : activeImage + 1)
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-700" />
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
              <Activity className="w-4 h-4" />
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

      {/* AI Smart Feature Section */}
      {t.smartFeature && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-teal-900/50 to-cyan-900/50 border border-teal-800/50' 
                  : 'bg-gradient-to-r from-teal-50 to-cyan-50'
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                <div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    theme === 'dark' ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-700'
                  }`}>
                    <Brain className="w-4 h-4" />
                    {t.smartFeature.tag}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t.smartFeature.title}
                  </h3>
                  <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.smartFeature.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {t.smartFeature.features.map((feature: string, index: number) => {
                      const featureIcons = [Wifi, Cpu, Brain, FileText]
                      const FeatureIcon = featureIcons[index % featureIcons.length]
                      return (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            theme === 'dark' ? 'bg-white/5' : 'bg-white/50'
                          }`}
                        >
                          <FeatureIcon className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className={`w-full max-w-md p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white shadow-lg'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
                      }`}>
                        <Wifi className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5G</div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Real-time</div>
                      </div>
                    </div>
                    <div className={`h-32 rounded-xl mb-4 flex items-center justify-center ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <Activity className={`w-16 h-16 ${theme === 'dark' ? 'text-teal-500/50' : 'text-teal-300'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>AI Analysis</div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        Processing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.servicesTitle}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.servicesDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((service: { title: string; description: string }, index: number) => {
              const Icon = serviceIcons[index % serviceIcons.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg transition-colors`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.featuresTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {t.features.map((feature: { title: string; description: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`text-center p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={featureImages[index]}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.galleryTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={src}
                  alt={`${t.galleryTitle} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setActiveImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[activeImage]}
              alt={`${t.galleryTitle} ${activeImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

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
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors"
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
