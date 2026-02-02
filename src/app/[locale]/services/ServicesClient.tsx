'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Activity, Heart, Users, GraduationCap, Globe, Wifi, Brain, 
  FileText, Cpu, Video, BookOpen, CalendarHeart, Sparkles, 
  PartyPopper, Utensils, Footprints, Smile, ArrowRight,
  ChevronLeft, ChevronRight, X, Dumbbell, PersonStanding, Footprints as FootIcon
} from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface ServicesClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Vascular access gallery images
const vascularGalleryImages = [
  '/images/vascular-access/activity-1.jpg',
  '/images/vascular-access/activity-2.jpg',
  '/images/vascular-access/activity-3.jpg',
  '/images/vascular-access/activity-4.jpg',
  '/images/vascular-access/activity-5.jpg',
  '/images/vascular-access/activity-6.jpg',
]

// Patient care activity icons
const patientCareIcons = [Users, Globe, CalendarHeart, Globe, Heart, PartyPopper]
const patientCareImages = [
  '/images/patient-care/kidney-friend-association.png',
  '/images/patient-care/online-meetings.png',
  '/images/patient-care/opening-ceremonies.png',
  '/images/patient-care/dialysis-tourism.png',
  '/images/patient-care/humanistic-care.png',
  '/images/patient-care/holiday-events.png',
]

// All expandable images
const onlineTrainingImages = [
  '/images/training/online-training-1.png',
  '/images/training/online-training-2.png',
  '/images/training/online-training-3.png',
]

const nutritionImages = [
  '/images/clinical/营养趣味猜谜活动.jpg',
  '/images/clinical/营养趣味猜谜活动2.jpg',
]

const footCareImages = [
  '/images/clinical/碳酸泉足浴.jpg',
  '/images/clinical/碳酸泉效果.jpg',
  '/images/clinical/足部筛查.jpg',
  '/images/clinical/碳酸泉室.jpg',
]

const rehabilitationImages = [
  '/images/clinical/康复运动设备.jpg',
]

export default function ServicesClient({ locale, dictionary }: ServicesClientProps) {
  const t = dictionary.services
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
      {/* Hero */}
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

      {/* Service Navigation Cards */}
      <section className="py-16" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {t.serviceCards.map((card: { id: string; title: string; description: string; icon: string }, index: number) => {
              const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
                Activity, Heart, GraduationCap, Utensils, Dumbbell
              }
              const Icon = icons[card.icon] || Activity
              return (
                <motion.a
                  key={card.id}
                  href={`#${card.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl transition-all hover:scale-[1.02] ${
                    theme === 'dark' 
                      ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {card.description}
                  </p>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 1: Vascular Access */}
      <section 
        id="vascular-access" 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="label-tag mb-4 inline-block">{t.vascularAccess.tag}</span>
            <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.vascularAccess.title}
            </h2>
            <p className={`text-lg max-w-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.vascularAccess.subtitle}
            </p>
          </motion.div>

          {/* AI Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 mb-12 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-teal-900/50 to-cyan-900/50 border border-teal-800/50' 
                : 'bg-gradient-to-r from-teal-50 to-cyan-50'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                    {t.vascularAccess.smartFeature.tag}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.vascularAccess.smartFeature.title}
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.vascularAccess.smartFeature.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {t.vascularAccess.smartFeature.features.map((feature: string, index: number) => {
                    const featureIcons = [Wifi, Cpu, Brain, FileText]
                    const FeatureIcon = featureIcons[index % featureIcons.length]
                    return (
                      <div 
                        key={index}
                        className={`flex items-center gap-2 p-3 rounded-xl ${
                          theme === 'dark' ? 'bg-white/5' : 'bg-white/50'
                        }`}
                      >
                        <FeatureIcon className={`w-4 h-4 flex-shrink-0 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className={`w-full max-w-sm p-6 rounded-2xl ${
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
                  <div className={`h-24 rounded-xl mb-4 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <Activity className={`w-12 h-12 ${theme === 'dark' ? 'text-teal-500/50' : 'text-teal-300'}`} />
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

          {/* Services Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl mb-12 ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-sm'
            }`}
          >
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.vascularAccess.servicesSummary?.title}
            </h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.vascularAccess.servicesSummary?.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {t.vascularAccess.servicesSummary?.highlights?.map((highlight: string, index: number) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {vascularGalleryImages.slice(0, 3).map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(vascularGalleryImages, index)}
              >
                <Image
                  src={src}
                  alt={`${t.vascularAccess.title} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Patient Care */}
      <section 
        id="patient-care" 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="label-tag mb-4 inline-block">{t.patientCare.tag}</span>
            <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.patientCare.title}
            </h2>
            <p className={`text-lg max-w-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.patientCare.subtitle}
            </p>
          </motion.div>

          {/* Activities Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl mb-12 ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-sm'
            }`}
          >
            <div className="flex items-start gap-6">
              <div className="grid grid-cols-3 gap-2 flex-shrink-0">
                {patientCareImages.slice(0, 3).map((src, idx) => (
                  <div key={idx} className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center overflow-hidden">
                    <Image src={src} alt="" width={50} height={50} className="object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.patientCare.activitiesSummary?.title}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.patientCare.activitiesSummary?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.patientCare.activitiesSummary?.highlights?.map((highlight: string, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        theme === 'dark' ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Smart Tourism Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-rose-900/30 to-pink-900/30 border border-rose-800/50' 
                : 'bg-gradient-to-r from-rose-50 to-pink-50'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className={`w-5 h-5 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-700'}`}>
                    {t.patientCare.smartFeature.tag}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.patientCare.smartFeature.title}
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.patientCare.smartFeature.description}
                </p>
                <ul className="space-y-2">
                  {t.patientCare.smartFeature.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className={`text-sm ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>✓</span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/patient-care/dialysis-tourism.png"
                  alt={t.patientCare.smartFeature.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Training */}
      <section 
        id="training" 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-tag mb-4 inline-block">{t.training.tag}</span>
              <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t.training.title}
              </h2>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.training.subtitle}
              </p>

              {/* Training Types */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-sm'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.training.offline.title}
                    </h4>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.training.offline.description}
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-sm'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Video className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.training.online.title}
                    </h4>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.training.online.description}
                  </p>
                </div>
              </div>

              {/* Pillars */}
              <div className="flex flex-wrap gap-2 mb-6">
                {t.training.offline.pillars.map((pillar: { title: string }, index: number) => (
                  <span 
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      theme === 'dark' ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    {pillar.title}
                  </span>
                ))}
              </div>

              {/* Online Platform Link */}
              <a 
                href="https://www.yiroyiro.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'
                }`}
              >
                {t.training.online.link} →
              </a>
            </motion.div>

            {/* Images Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3"
            >
              {onlineTrainingImages.map((src, index) => (
                <div 
                  key={index}
                  className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(onlineTrainingImages, index)}
                >
                  <Image src={src} alt="Training" width={200} height={150} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Rehabilitation */}
      {t.rehabilitation && (
        <section 
          id="rehabilitation" 
          className="py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="label-tag mb-4 inline-block">{t.rehabilitation.tag}</span>
                <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.rehabilitation.title}
                </h2>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.rehabilitation.subtitle}
                </p>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.rehabilitation.intro}
                </p>
                
                {/* AI Feature */}
                <div className={`p-6 rounded-2xl mb-6 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                      {t.rehabilitation.smartFeature?.tag}
                    </span>
                  </div>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t.rehabilitation.smartFeature?.title}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.rehabilitation.smartFeature?.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {t.rehabilitation.benefits?.items?.map((item: { title: string }, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(rehabilitationImages, 0)}
              >
                <Image src="/images/clinical/康复运动设备.jpg" alt="康复运动设备" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Nutrition */}
      <section 
        id="nutrition" 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-tag mb-4 inline-block">{t.nutrition.tag}</span>
              <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t.nutrition.title}
              </h2>
              <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.nutrition.subtitle}
              </p>
              {t.nutrition.brand && (
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.nutrition.intro}
                </p>
              )}
              
              {/* Smart Nutrition Feature */}
              {t.nutrition.smartFeature && (
                <div className={`p-6 rounded-2xl mb-6 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-800/50' 
                    : 'bg-gradient-to-r from-green-50 to-emerald-50'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                      {t.nutrition.smartFeature.tag}
                    </span>
                  </div>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t.nutrition.smartFeature.title}
                  </h4>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.nutrition.smartFeature.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.nutrition.smartFeature.features?.map((feature: string, index: number) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs ${
                          theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-sm'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.nutrition.importance?.title}
                </h4>
                <ul className="space-y-2">
                  {t.nutrition.importance?.items?.slice(0, 3).map((item: { title: string }, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-green-400' : 'bg-green-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {nutritionImages.map((src, index) => (
                <div 
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(nutritionImages, index)}
                >
                  <Image src={src} alt="营养活动" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Foot Care */}
      {t.footCare && (
        <section 
          id="foot-care" 
          className="py-24"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="label-tag mb-4 inline-block">{t.footCare.tag}</span>
                <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.footCare.title}
                </h2>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.footCare.subtitle}
                </p>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.footCare.intro}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {t.footCare.highlights?.map((highlight: string, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {footCareImages.map((src, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(footCareImages, index)}
                  >
                    <Image src={src} alt={`足部护理 ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Section 6: Skin Care */}
      {t.skinCare && (
        <section 
          id="skin-care" 
          className="py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="label-tag mb-4 inline-block">{t.skinCare.tag}</span>
              <h2 className={`font-display text-4xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t.skinCare.title}
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.skinCare.subtitle}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-base max-w-4xl mx-auto text-center mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {t.skinCare.intro}
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {t.skinCare.services?.map((service: { title: string; description: string }, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-slate-800/50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                  }`}>
                    <Smile className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center flex-wrap gap-2">
              {t.skinCare.highlights?.map((highlight: string, index: number) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section 
        className="py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-display text-3xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.cta.description}
            </p>
            <Link
              href={`/${locale}/company#contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-xl font-semibold transition-colors"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      {activeImageIndex !== null && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          {lightboxImages.length > 1 && (
            <>
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
