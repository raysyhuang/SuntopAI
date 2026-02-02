'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Network, Brain, Activity, Shield, Users, TrendingUp, Clock, AlertTriangle, CheckCircle, Heart, Monitor, Sparkles, ArrowRight, Cpu, MessageSquare, Layout, Footprints, Workflow, Wifi } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

const sectionIcons: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Users,
  Shield,
  Heart,
  Monitor,
  Sparkles,
  MessageSquare,
  Layout,
  Footprints,
  TrendingUp,
  Workflow,
  Brain,
  Wifi,
}

interface ClinicalClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const outcomeIcons = [Activity, AlertTriangle, Shield, CheckCircle, Network, TrendingUp, Users, Building2, TrendingUp, Activity, Clock, CheckCircle]
type GalleryGroupKey = 'education' | 'quality' | 'engagement' | 'rehab' | 'training'

export default function ClinicalClient({ locale, dictionary }: ClinicalClientProps) {
  const t = dictionary.clinical
  const { theme } = useTheme()
  const [activeGalleryItem, setActiveGalleryItem] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (!activeGalleryItem) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveGalleryItem(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeGalleryItem])

  const infrastructureImages = [
    '/images/clinical/信息化查房.jpg',
    '/images/clinical/化验结果评估.jpg',
    '/images/clinical/质控管理小组周例会.jpg',
    '/images/clinical/指认呼唤.jpg',
  ]

  const galleryItems: Record<string, string> = {
    educationLibrary: '/images/clinical/患者宣教资料库.jpg',
    patientReport: '/images/clinical/患者说明用报告书.jpg',
    nutritionActivity: '/images/clinical/营养趣味猜谜活动.jpg',
    nutritionActivityTwo: '/images/clinical/营养趣味猜谜活动2.jpg',
    rehabRoom: '/images/clinical/康复运动设备.jpg',
    carbonicBath: '/images/clinical/碳酸泉足浴.jpg',
    carbonicRoom: '/images/clinical/碳酸泉室.jpg',
    carbonicEffect: '/images/clinical/碳酸泉效果.jpg',
    trainingPocketGuide: '/images/clinical/教育培训用口袋书.jpg',
    trainingMaterial: '/images/clinical/培训教材.jpg',
    labResultsExplanation: '/images/clinical/化验结果说明.jpg',
    labResultsLiaoning: '/images/clinical/辽宁杏康化验结果说明.jpg',
    dailySharing: '/images/clinical/每日例会经验分享.jpg',
    qualityAlliance: '/images/clinical/新安国际质控小组会议.jpg',
    standardizedOps: '/images/clinical/标准化操作.png',
  }

  const galleryGroups: Array<{ key: GalleryGroupKey; itemKeys: string[] }> = [
    {
      key: 'education',
      itemKeys: ['educationLibrary', 'patientReport', 'labResultsExplanation', 'labResultsLiaoning'],
    },
    {
      key: 'quality',
      itemKeys: ['dailySharing', 'qualityAlliance', 'standardizedOps'],
    },
    {
      key: 'engagement',
      itemKeys: ['nutritionActivity', 'nutritionActivityTwo'],
    },
    {
      key: 'rehab',
      itemKeys: ['rehabRoom', 'carbonicRoom', 'carbonicBath', 'carbonicEffect'],
    },
    {
      key: 'training',
      itemKeys: ['trainingPocketGuide', 'trainingMaterial'],
    },
  ]

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

      {/* Clinical Philosophy Statement */}
      {t.statement && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-6"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.statement.title}
              </h2>
              <p 
                className="text-lg leading-relaxed mb-8"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.statement.description}
              </p>
              <div 
                className="max-w-2xl mx-auto p-6 rounded-2xl"
                style={{ 
                  backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                  border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                }}
              >
                <p style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="text-lg italic leading-relaxed">
                  {t.statement.quote}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Fine Management Section - Three Parts */}
      {t.fineManagement && t.fineManagement.parts && (
        <>
          {/* Hero for Fine Management */}
          <section 
            className="relative py-24"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <span className="label-tag mb-6 inline-block">{t.fineManagement.tag}</span>
                <h2 
                  className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.fineManagement.title}
                </h2>
                <p 
                  className="max-w-4xl mx-auto leading-relaxed"
                  style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                >
                  {t.fineManagement.subtitle}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Part 1: Center Management */}
          {t.fineManagement.parts.centerManagement && (
            <section 
              id="in-center"
              className="relative py-24"
              style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span style={{ color: '#007d73' }} className="text-sm font-medium uppercase tracking-wider mb-2 block">
                      {t.fineManagement.parts.centerManagement.tag}
                    </span>
                    <h3 
                      className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {t.fineManagement.parts.centerManagement.title}
                    </h3>
                    <p style={{ color: '#007d73' }} className="text-lg mb-4">
                      {t.fineManagement.parts.centerManagement.subtitle}
                    </p>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-3xl">
                      {t.fineManagement.parts.centerManagement.description}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden"
                    style={{ 
                      boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <img 
                      src="/images/clinical/每日例会.jpg" 
                      alt="Daily team huddle"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Object.entries(t.fineManagement.parts.centerManagement.sections).map(([key, section]: [string, any], index) => {
                    const IconComponent = sectionIcons[section.icon] || Shield
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col rounded-2xl p-6"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                          boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                        >
                          <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                        </div>
                        <h4 
                          className="font-display font-semibold mb-1"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {section.title}
                        </h4>
                        <p style={{ color: '#007d73' }} className="text-sm mb-3">{section.subtitle}</p>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed mb-4">{section.description}</p>
                        
                        <ul className="space-y-2 mb-4 flex-grow">
                          {section.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                              <CheckCircle style={{ color: '#007d73' }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div 
                          className="mt-auto pt-4"
                          style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)' }}
                        >
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#007d73' }}>
                            <Cpu className="w-4 h-4" />
                            <span>{section.aiSupport}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Part 2: Patient Management */}
          {t.fineManagement.parts.patientManagement && (
            <section 
              id="networked"
              className="relative py-24"
              style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden lg:order-1 order-2"
                    style={{ 
                      boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <img 
                      src="/images/clinical/足部筛查.jpg" 
                      alt="Foot screening"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="lg:order-2 order-1"
                  >
                    <span style={{ color: '#007d73' }} className="text-sm font-medium uppercase tracking-wider mb-2 block">
                      {t.fineManagement.parts.patientManagement.tag}
                    </span>
                    <h3 
                      className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {t.fineManagement.parts.patientManagement.title}
                    </h3>
                    <p style={{ color: '#007d73' }} className="text-lg mb-4">
                      {t.fineManagement.parts.patientManagement.subtitle}
                    </p>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-3xl">
                      {t.fineManagement.parts.patientManagement.description}
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Object.entries(t.fineManagement.parts.patientManagement.sections).map(([key, section]: [string, any], index) => {
                    const IconComponent = sectionIcons[section.icon] || Heart
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col rounded-2xl p-6"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                          boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                        >
                          <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                        </div>
                        <h4 
                          className="font-display font-semibold mb-1"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {section.title}
                        </h4>
                        <p style={{ color: '#007d73' }} className="text-sm mb-3">{section.subtitle}</p>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed mb-4">{section.description}</p>
                        
                        <ul className="space-y-2 mb-4 flex-grow">
                          {section.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                              <CheckCircle style={{ color: '#007d73' }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div 
                          className="mt-auto pt-4"
                          style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)' }}
                        >
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#007d73' }}>
                            <Cpu className="w-4 h-4" />
                            <span>{section.aiSupport}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Part 3: IT Infrastructure */}
          {t.fineManagement.parts.itInfrastructure && (
            <section 
              id="decision-support"
              className="relative py-24"
              style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span style={{ color: '#007d73' }} className="text-sm font-medium uppercase tracking-wider mb-2 block">
                      {t.fineManagement.parts.itInfrastructure.tag}
                    </span>
                    <h3 
                      className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {t.fineManagement.parts.itInfrastructure.title}
                    </h3>
                    <p style={{ color: '#007d73' }} className="text-lg mb-4">
                      {t.fineManagement.parts.itInfrastructure.subtitle}
                    </p>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-3xl">
                      {t.fineManagement.parts.itInfrastructure.description}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {infrastructureImages.map((image, i) => (
                      <div 
                        key={i}
                        className="rounded-xl overflow-hidden"
                        style={{ 
                          boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        <img src={image} alt="" className="w-full h-32 object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Object.entries(t.fineManagement.parts.itInfrastructure.sections).map(([key, section]: [string, any], index) => {
                    const IconComponent = sectionIcons[section.icon] || Monitor
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col rounded-2xl p-6"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                          boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                        >
                          <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                        </div>
                        <h4 
                          className="font-display font-semibold mb-1"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {section.title}
                        </h4>
                        <p style={{ color: '#007d73' }} className="text-sm mb-3">{section.subtitle}</p>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed mb-4">{section.description}</p>
                        
                        <ul className="space-y-2 mb-4 flex-grow">
                          {section.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                              <CheckCircle style={{ color: '#007d73' }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div 
                          className="mt-auto pt-4"
                          style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)' }}
                        >
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#007d73' }}>
                            <Cpu className="w-4 h-4" />
                            <span>{section.aiSupport}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Clinical Results / Proven Outcomes */}
      {t.results && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-6 inline-block">{t.results.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.results.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto text-lg">
                {t.results.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {Object.entries(t.results.categories).map(([key, category]: [string, any], catIndex) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="rounded-2xl p-6 md:p-8"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <span className="label-tag mb-4 inline-block">{category.tag}</span>
                  <h3 
                    className="font-display text-xl md:text-2xl font-semibold mb-2"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {category.title}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm mb-6">
                    {category.subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.metrics.map((metric: any, index: number) => (
                      <div 
                        key={metric.id}
                        className="rounded-xl p-4"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.8)',
                          boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.3)' : 'none'
                        }}
                      >
                        <div className="text-xs font-medium mb-2" style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}>
                          {metric.title}
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span 
                            className="text-lg line-through"
                            style={{ color: theme === 'light' ? '#d1d1d6' : '#52525b' }}
                          >
                            {metric.before}
                          </span>
                          <span className="text-lg" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>→</span>
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: '#007d73' }}
                          >
                            {metric.after}
                          </span>
                          <span className="text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                            {metric.unit}
                          </span>
                        </div>
                        <div 
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: 'rgba(0,125,115,0.1)',
                            color: '#007d73'
                          }}
                        >
                          <TrendingUp className="w-3 h-3" />
                          {metric.improvement}
                        </div>
                        <p className="text-xs mt-2" style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}>
                          {metric.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-xs" style={{ color: theme === 'light' ? '#86868b' : '#52525b' }}>
              {t.results.disclaimer}
            </p>
          </div>
        </section>
      )}

      {/* Clinical Gallery */}
      {t.gallery && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="label-tag mb-6 inline-block">{t.gallery.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.gallery.title}
              </h2>
              <p 
                className="max-w-4xl mx-auto leading-relaxed"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.gallery.subtitle}
              </p>
            </motion.div>

            <div className="space-y-12">
              {galleryGroups.map((group, groupIndex) => {
                const groupTitle = t.gallery.groups?.[group.key]?.title ?? group.key
                return (
                  <div key={group.key}>
                    <h3
                      className="text-lg font-semibold tracking-tight mb-5"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#e2e8f0' }}
                    >
                      {groupTitle}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.itemKeys.map((itemKey, index) => {
                        const image = galleryItems[itemKey]
                        if (!image) {
                          return null
                        }
                        const label = (t.gallery.items as Record<string, { title: string } | undefined>)?.[itemKey]?.title ?? itemKey
                        const transitionIndex = groupIndex * 10 + index
                        return (
                          <motion.div
                            key={itemKey}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: transitionIndex * 0.03 }}
                          >
                            <button
                              type="button"
                              onClick={() => setActiveGalleryItem({ src: image, alt: label })}
                              aria-label={`Open ${label}`}
                              className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007d73]/60"
                            >
                              <div 
                                className="rounded-2xl overflow-hidden cursor-zoom-in"
                                style={{ 
                                  boxShadow: theme === 'light' ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                                  border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                                }}
                              >
                                <img 
                                  src={image} 
                                  alt={label} 
                                  className="w-full h-56 object-cover"
                                />
                              </div>
                            </button>
                            <p 
                              className="mt-3 text-sm font-medium"
                              style={{ color: theme === 'light' ? '#1d1d1f' : '#e2e8f0' }}
                            >
                              {label}
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {activeGalleryItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveGalleryItem(null)}
        >
          <button
            type="button"
            onClick={() => setActiveGalleryItem(null)}
            className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-900 shadow"
          >
            Close
          </button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="max-h-[85vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeGalleryItem.src}
              alt={activeGalleryItem.alt}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <p className="mt-3 text-center text-sm font-medium text-white/90">
              {activeGalleryItem.alt}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Cross Links */}
      {t.crossLinks && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : undefined }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { href: `/${locale}/platform`, ...t.crossLinks.platform },
                { href: `/${locale}/deployment`, ...t.crossLinks.deployment },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="block rounded-2xl p-6 group transition-all"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <h3 
                      className="font-display font-semibold mb-2 transition-colors group-hover:text-[#007d73]"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {link.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm mb-4">{link.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#007d73' }}>
                      {link.button}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
