'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Activity, Heart, Users, Shield, Brain, Wifi, Cpu, FileText,
  Stethoscope, Syringe, CircleDot, Scissors, AlertTriangle, 
  CheckCircle, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, X,
  Building2, Clock, UserCheck, Microscope, HeartPulse, Sparkles
} from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface VascularAccessClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Service icons mapping
const serviceIcons = [
  Brain,        // AI-Assisted Pre-operative Assessment
  HeartPulse,   // Autologous AV Fistula Surgery
  Syringe,      // Central Venous Catheter Insertion
  CircleDot,    // Prosthetic AV Fistula Surgery
  AlertTriangle, // Thrombosis & Aneurysm Surgery
  Microscope,   // Minimally Invasive Procedures
]

// Feature icons mapping
const featureIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'icon-diagnosis.png': Stethoscope,
  'icon-equipment.png': Cpu,
  'icon-one-stop.png': Building2,
  'icon-comfortable-env.png': Heart,
  'icon-rapid-process.png': Clock,
  'icon-consultation.png': UserCheck,
  'icon-referral.png': ArrowRight,
  'icon-complications.png': Shield,
  'icon-intl-team.png': Users,
}

const featureIcons = [
  Stethoscope,  // Professional Diagnosis
  Cpu,          // Advanced Equipment
  Building2,    // One-Stop Service
  Heart,        // Comfortable Environment
  Clock,        // Efficient Process
  UserCheck,    // Personal Consultation
  ArrowRight,   // Referral Service
  Shield,       // Complication Management
  Users,        // Expert Team
]

// Gallery images
const galleryImages = [
  '/images/vascular-access/activity-1.jpg',
  '/images/vascular-access/activity-2.jpg',
  '/images/vascular-access/activity-3.jpg',
  '/images/vascular-access/activity-4.jpg',
  '/images/vascular-access/activity-5.jpg',
  '/images/vascular-access/activity-6.jpg',
]

export default function VascularAccessClient({ locale, dictionary }: VascularAccessClientProps) {
  const t = dictionary.vascularAccess
  const { theme } = useTheme()
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setActiveImageIndex(index)
  }

  const closeLightbox = () => {
    setActiveImageIndex(null)
    setLightboxImages([])
  }

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex(activeImageIndex === 0 ? lightboxImages.length - 1 : activeImageIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex(activeImageIndex === lightboxImages.length - 1 ? 0 : activeImageIndex + 1)
    }
  }

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        {theme === 'dark' && (
          <>
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 radial-gradient" />
          </>
        )}
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Back Link */}
          <Link 
            href={`/${locale}/services`}
            className={`inline-flex items-center gap-2 text-sm mb-8 transition-colors ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToServices || t.backToClinical}
          </Link>

          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-4xl"
          >
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {t.tag}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl leading-relaxed"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI-Powered Smart Feature */}
      <section 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-8 md:p-12 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border border-teal-800/50' 
                : 'bg-gradient-to-br from-teal-50 to-cyan-50'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
                  }`}>
                    <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                  </div>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                    {t.smartFeature?.tag}
                  </span>
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.smartFeature?.title}
                </h2>
                <p className={`text-lg mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.smartFeature?.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.smartFeature?.features?.map((feature: string, index: number) => {
                    const featureIcons = [Wifi, Cpu, Brain, FileText]
                    const FeatureIcon = featureIcons[index % featureIcons.length]
                    return (
                      <div 
                        key={index}
                        className={`flex items-center gap-3 p-4 rounded-xl ${
                          theme === 'dark' ? 'bg-white/5' : 'bg-white/70'
                        }`}
                      >
                        <FeatureIcon className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className={`w-full max-w-md p-8 rounded-3xl ${
                  theme === 'dark' ? 'bg-gray-800/60' : 'bg-white shadow-xl'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
                      }`}>
                        <Wifi className={`w-6 h-6 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                      </div>
                      <div>
                        <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5G</div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Real-time</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      Connected
                    </div>
                  </div>
                  <div className={`h-40 rounded-2xl mb-6 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <div className="text-center">
                      <Activity className={`w-16 h-16 mx-auto mb-2 ${theme === 'dark' ? 'text-teal-500/60' : 'text-teal-300'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Ultrasound Stream</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>AI Analysis</span>
                      <div className={`w-24 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className="w-3/4 h-full bg-teal-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Risk Assessment</span>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-display text-3xl md:text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.servicesTitle}
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.servicesDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services?.map((service: { title: string; description: string }, index: number) => {
              const Icon = serviceIcons[index % serviceIcons.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group p-6 rounded-2xl transition-all hover:-translate-y-1 ${
                    theme === 'dark' 
                      ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50' 
                      : 'bg-white hover:shadow-xl'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-teal-500/15 group-hover:bg-teal-500/25' 
                      : 'bg-teal-50 group-hover:bg-teal-100'
                  }`}>
                    <Icon className={`w-7 h-7 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Center Features */}
      <section 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="label-tag mb-4 inline-block">Center Excellence</span>
            <h2 className={`font-display text-3xl md:text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.featuresTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {t.features?.map((feature: { title: string; description: string }, index: number) => {
              const Icon = featureIcons[index % featureIcons.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-5 md:p-6 rounded-2xl text-center ${
                    theme === 'dark' 
                      ? 'bg-slate-800/30 border border-slate-700/30' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    theme === 'dark' ? 'bg-teal-500/15' : 'bg-teal-100'
                  }`}>
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                  </div>
                  <h4 className={`font-semibold mb-2 text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h4>
                  <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="label-tag mb-4 inline-block">Activities</span>
            <h2 className={`font-display text-3xl md:text-4xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.galleryTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(galleryImages, index)}
              >
                <Image
                  src={src}
                  alt={`${t.galleryTitle} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">
                    {t.galleryTitle} {index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-6 md:p-10 text-center ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border border-teal-800/30' 
                : 'bg-gradient-to-br from-teal-50 to-cyan-50'
            }`}
          >
            <Sparkles className={`w-10 h-10 mx-auto mb-4 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
            <h2 className={`font-display text-2xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.cta?.title}
            </h2>
            <p className={`text-base mb-6 max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.cta?.description}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors"
            >
              {t.cta?.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cross Links */}
      <section 
        className="py-16"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/${locale}/services`}
                className={`block rounded-2xl p-6 group transition-all ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50' 
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <h3 className={`font-display font-semibold mb-2 transition-colors group-hover:text-teal-600 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {locale === 'zh-CN' ? '查看更多服务' : locale === 'zh-TW' ? '查看更多服務' : locale === 'ja' ? 'その他のサービス' : 'Explore More Services'}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {locale === 'zh-CN' ? '患者关怀、康复训练、营养管理等' : locale === 'zh-TW' ? '患者關懷、康復訓練、營養管理等' : locale === 'ja' ? '患者ケア、リハビリ、栄養管理など' : 'Patient care, rehabilitation, nutrition management and more'}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600">
                  {locale === 'zh-CN' ? '查看服务' : locale === 'zh-TW' ? '查看服務' : locale === 'ja' ? 'サービスを見る' : 'View Services'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/${locale}/clinical`}
                className={`block rounded-2xl p-6 group transition-all ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50' 
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <h3 className={`font-display font-semibold mb-2 transition-colors group-hover:text-teal-600 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {locale === 'zh-CN' ? '探索临床应用' : locale === 'zh-TW' ? '探索臨床應用' : locale === 'ja' ? '臨床アプリケーションを探る' : 'Explore Clinical Applications'}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {locale === 'zh-CN' ? 'AI平台如何赋能精细化管理' : locale === 'zh-TW' ? 'AI平台如何賦能精細化管理' : locale === 'ja' ? 'AIプラットフォームによる精密管理' : 'How AI platform enables refined management'}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600">
                  {locale === 'zh-CN' ? '查看临床' : locale === 'zh-TW' ? '查看臨床' : locale === 'ja' ? '臨床を見る' : 'View Clinical'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImageIndex !== null && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImages[activeImageIndex]}
              alt={`Image ${activeImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {activeImageIndex + 1} / {lightboxImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
