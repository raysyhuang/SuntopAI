'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Database, Brain, Cog, Server, Wifi, Shield, Activity, Cpu, GitBranch, Target, 
  Layers, Zap, ArrowRight, Mic, FileText, ClipboardList, Bell, Heart, AlertTriangle,
  Monitor, Building2, Building, Hospital, Scale
} from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface PlatformClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const capabilityIcons = [Server, Activity, Wifi, Shield, Activity, Target, Cpu, Zap, GitBranch, Layers, Target, Shield]

const moduleIcons: { [key: string]: any } = {
  consultation: Mic,
  labEvaluation: FileText,
  careManagement: Heart,
  medicalRecords: Scale,
  labReminder: Bell,
  fourItemMonitoring: Monitor,
}


export default function PlatformClient({ locale, dictionary }: PlatformClientProps) {
  const t = dictionary.platform
  const { theme } = useTheme()

  // Module images mapping
  const moduleImages: { [key: string]: string } = {
    consultation: '/images/consultation-template.png',
    labEvaluation: '/images/lab-evaluation.jpg',
    careManagement: '/images/foot-management.jpg',
    medicalRecords: '/images/bp-weight-assistant.jpg',
    labReminder: '/images/lab-reminder.jpg',
    fourItemMonitoring: '/images/four-item-monitoring.jpg',
    qualityControl: '/images/clinical-stats-evaluation.png',
  }

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className={`relative py-32 overflow-hidden`} style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}>
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {t.tag}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff', letterSpacing: '-0.025em' }}
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 justify-center flex-wrap"
            >
              {[t.features.native, t.features.realtime, t.features.guardrails].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#007d73' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'light' ? '#1d1d1f' : '#a1a1aa' }}>{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Use Cases Section - Simplified */}
      {t.clinicalApplications && (
        <section className={`relative py-24 ${theme === 'dark' ? 'bg-slate-925' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.clinicalApplications.tag}</span>
              <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.clinicalApplications.title}
              </h2>
              <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                {t.clinicalApplications.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(t.clinicalApplications.apps).map(([key, app]: [string, any], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 ${
                    theme === 'dark' 
                      ? 'bg-slate-900/50 border border-slate-800' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <h3 className={`font-display text-xl font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {app.title}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                    {app.description}
                  </p>
                  
                  {app.capabilities && (
                    <div className="flex flex-wrap gap-2">
                      {app.capabilities.map((cap: string, i: number) => (
                        <span 
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === 'dark' 
                              ? 'bg-accent-900/30 text-accent-400 border border-accent-800/30' 
                              : 'bg-accent-50 text-accent-700 border border-accent-200'
                          }`}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Link to Clinical Page */}
            {t.clinicalApplications.learnMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link 
                  href={`/${locale}/clinical`}
                  className={`inline-flex items-center gap-2 font-medium ${
                    theme === 'dark' ? 'text-accent-400 hover:text-accent-300' : 'text-accent-600 hover:text-accent-700'
                  }`}
                >
                  {t.clinicalApplications.learnMore.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Core Modules Section */}
      {t.coreModules && (
        <section id="data" className="relative py-24" style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.coreModules.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.coreModules.title}
              </h2>
              <p 
                className="max-w-2xl mx-auto text-lg"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.coreModules.description}
              </p>
            </motion.div>

            <div className="space-y-16">
              {Object.entries(t.coreModules.modules).map(([key, module]: [string, any], index) => {
                const IconComponent = moduleIcons[key] || FileText
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-5">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                        >
                          <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 
                            className="font-display text-xl font-semibold"
                            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                          >
                            {module.title}
                          </h3>
                          <p style={{ color: '#007d73' }} className="text-sm font-medium">{module.subtitle}</p>
                        </div>
                      </div>
                      <p 
                        className="mb-6 leading-relaxed text-base"
                        style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                      >
                        {module.description}
                      </p>
                      <div className="space-y-3">
                        {module.features.map((feature: any, featureIndex: number) => (
                          <div 
                            key={featureIndex} 
                            className="rounded-xl p-4"
                            style={{ 
                              backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,0.5)',
                              border: theme === 'light' ? 'none' : '1px solid rgba(51,65,85,0.5)'
                            }}
                          >
                            <h4 
                              className="font-medium mb-1"
                              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                            >
                              {feature.title}
                            </h4>
                            <p 
                              className="text-sm"
                              style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }}
                            >
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div 
                        className="mt-6 p-4 rounded-xl"
                        style={{ 
                          backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                          border: theme === 'light' ? 'none' : '1px solid rgba(20,184,166,0.2)'
                        }}
                      >
                        <p style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="text-sm">
                          <span className="font-semibold">AI</span>: {module.aiHighlight}
                        </p>
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div 
                        className="aspect-video rounded-2xl overflow-hidden"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b',
                          boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        {moduleImages[key] ? (
                          <img 
                            src={moduleImages[key]} 
                            alt={module.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center p-8">
                              <IconComponent 
                                className="w-16 h-16 mx-auto mb-4"
                                style={{ color: theme === 'light' ? '#007d73' : 'rgba(45,212,191,0.5)' }}
                              />
                              <p style={{ color: theme === 'light' ? '#86868b' : '#64748b' }} className="text-sm">{module.title}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Monitoring System Section */}
      {t.monitoringSystem && (
        <section id="intelligence" className="relative py-24" style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Central Monitoring Subsection */}
            {t.monitoringSystem.centralMonitoring && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <div className="text-center mb-10">
                  <span className="label-tag mb-4 inline-block">{t.monitoringSystem.centralMonitoring.tag}</span>
                  <h2 
                    className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {t.monitoringSystem.centralMonitoring.title}
                  </h2>
                  <p 
                    className="max-w-3xl mx-auto text-lg"
                    style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                  >
                    {t.monitoringSystem.centralMonitoring.description}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { src: '/images/central-monitoring.jpg', label: t.monitoringSystem.centralMonitoring.images[0].label },
                    { src: '/images/monitoring-treatment-status.jpg', label: t.monitoringSystem.centralMonitoring.images[1].label },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="rounded-2xl overflow-hidden"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30,41,59,0.8)',
                        boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                        border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                      }}
                    >
                      <img src={item.src} alt={item.label} className="w-full h-64 object-cover" />
                      <div className="p-4">
                        <p 
                          className="font-medium"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bedside Terminal Subsection */}
            {t.monitoringSystem.bedsideTerminal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-10">
                  <span className="label-tag mb-4 inline-block">{t.monitoringSystem.bedsideTerminal.tag}</span>
                  <h2 
                    className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-4"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {t.monitoringSystem.bedsideTerminal.title}
                  </h2>
                  <p 
                    className="max-w-4xl mx-auto text-base md:text-lg leading-relaxed"
                    style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                  >
                    {t.monitoringSystem.bedsideTerminal.description}
                  </p>
                </div>

                {/* Images */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                  {[
                    { src: '/images/smart-terminal.jpg', label: t.monitoringSystem.bedsideTerminal.images[0].label },
                    { src: '/images/four-item-monitoring.jpg', label: t.monitoringSystem.bedsideTerminal.images[1].label },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="rounded-2xl overflow-hidden"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30,41,59,0.8)',
                        boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                        border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                      }}
                    >
                      <img src={item.src} alt={item.label} className="w-full h-64 object-cover" />
                      <div className="p-4">
                        <p 
                          className="font-medium"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features Section */}
                {t.monitoringSystem.bedsideTerminal.features && (
                  <>
                    <h3 
                      className="font-display text-xl md:text-2xl font-semibold text-center mb-10"
                      style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }}
                    >
                      {t.monitoringSystem.bedsideTerminal.sectionTitle}
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {t.monitoringSystem.bedsideTerminal.features.map((feature: any, index: number) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-2xl p-6 ${
                            theme === 'dark' 
                              ? 'bg-slate-900/50 border border-slate-800' 
                              : 'bg-white border border-gray-200 shadow-sm'
                          }`}
                        >
                          <div className="mb-4">
                            <span 
                              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                              style={{ 
                                backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)',
                                color: theme === 'light' ? '#007d73' : '#2dd4bf'
                              }}
                            >
                              {index + 1}
                            </span>
                            <h4 
                              className="font-display text-lg font-semibold"
                              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                            >
                              {feature.title}
                            </h4>
                            <p 
                              className="text-sm font-medium"
                              style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }}
                            >
                              {feature.subtitle}
                            </p>
                          </div>
                          
                          <p 
                            className="text-sm mb-4"
                            style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                          >
                            {feature.intro}
                          </p>
                          
                          <div className="space-y-3">
                            {feature.items.map((item: any, itemIndex: number) => (
                              <div 
                                key={itemIndex}
                                className="rounded-xl p-3"
                                style={{ 
                                  backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,0.5)',
                                }}
                              >
                                <h5 
                                  className="font-medium text-sm mb-1"
                                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                                >
                                  {item.title}
                                </h5>
                                <p 
                                  className="text-xs leading-relaxed"
                                  style={{ color: theme === 'light' ? '#86868b' : '#94a3b8' }}
                                >
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Partners Section */}
      {t.partners && (
        <section id="automation" className={`relative py-24 ${theme === 'dark' ? 'bg-slate-925' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.partners.tag}</span>
              <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.partners.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                {t.partners.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
              {[
                { 
                  icon: Building2, 
                  title: t.partners.categories.smartCenters, 
                  value: t.partners.stats.smartCenters,
                  desc: t.partners.descriptions.smartCenters
                },
                { 
                  icon: Hospital, 
                  title: t.partners.categories.selfOperated, 
                  value: t.partners.stats.selfOperated,
                  desc: t.partners.descriptions.selfOperated
                },
                { 
                  icon: Building, 
                  title: t.partners.categories.partnerCenters, 
                  value: t.partners.stats.partnerCenters,
                  desc: t.partners.descriptions.partnerCenters
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-center rounded-2xl p-6 ${
                    theme === 'dark' 
                      ? 'bg-slate-900/50 border border-slate-800/50' 
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                  <h3 className={`font-display text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <div className={`text-4xl font-display font-semibold mb-2 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`}>{item.value}</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Partner CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-center rounded-2xl p-8 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-accent-900/20 via-slate-900 to-accent-900/20 border border-accent-800/30' 
                  : 'bg-gradient-to-r from-accent-50 via-white to-accent-50 border border-accent-200'
              }`}
            >
              <h3 className={`font-display text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t.partners.cta.title}
              </h3>
              <p className={`mb-6 max-w-xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                {t.partners.cta.description}
              </p>
              <Link href={`/${locale}/company#contact`} className="btn-primary inline-flex">
                {t.partners.cta.button}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Cross Links */}
      {t.crossLinks && (
        <section className={`relative py-24 ${theme === 'dark' ? 'bg-slate-925' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { href: `/${locale}/clinical`, ...t.crossLinks.clinical },
                { href: `/${locale}/deployment`, ...t.crossLinks.deployment },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href} className={`block rounded-2xl p-6 group transition-colors ${
                    theme === 'dark' 
                      ? 'bg-slate-900/50 border border-slate-800/50 hover:border-accent-500/50' 
                      : 'bg-white border border-gray-200 shadow-sm hover:border-accent-300'
                  }`}>
                    <h3 className={`font-display font-semibold mb-2 transition-colors ${
                      theme === 'dark' ? 'text-white group-hover:text-accent-400' : 'text-gray-900 group-hover:text-accent-600'
                    }`}>
                      {link.title}
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{link.description}</p>
                    <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
                    }`}>
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
