'use client'

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

export default function ClinicalClient({ locale, dictionary }: ClinicalClientProps) {
  const t = dictionary.clinical
  const { theme } = useTheme()

  const applications = [
    {
      id: 'in-center',
      icon: Building2,
      title: t.apps.inCenter.title,
      description: t.apps.inCenter.description,
      outcomes: t.apps.inCenter.outcomes,
      before: t.apps.inCenter.before,
      after: t.apps.inCenter.after,
      aiRole: t.apps.inCenter.aiRole,
    },
    {
      id: 'networked',
      icon: Network,
      title: t.apps.networked.title,
      description: t.apps.networked.description,
      outcomes: t.apps.networked.outcomes,
      before: t.apps.networked.before,
      after: t.apps.networked.after,
      aiRole: t.apps.networked.aiRole,
    },
    {
      id: 'decision-support',
      icon: Brain,
      title: t.apps.decision.title,
      description: t.apps.decision.description,
      outcomes: t.apps.decision.outcomes,
      before: t.apps.decision.before,
      after: t.apps.decision.after,
      aiRole: t.apps.decision.aiRole,
    },
  ]

  return (
    <div className="relative pt-20">
      {/* Hero */}
      <section 
        className="relative py-32 overflow-hidden"
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

      {/* Applications */}
      {applications.map((app, index) => (
        <section
          key={app.id}
          id={app.id}
          className="relative py-32"
          style={{ 
            backgroundColor: index % 2 === 0 
              ? (theme === 'light' ? '#ffffff' : '#0f172a') 
              : (theme === 'light' ? '#f5f5f7' : undefined)
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)',
                      border: theme === 'dark' ? '1px solid rgba(20,184,166,0.3)' : 'none'
                    }}
                  >
                    <app.icon style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
                  </div>
                </div>
                <h2 
                  className="font-display text-4xl font-semibold tracking-tight mb-4"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {app.title}
                </h2>
                <p 
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                >
                  {app.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {app.outcomes.map((outcome, outcomeIndex) => {
                    const IconComponent = outcomeIcons[(index * 4 + outcomeIndex) % outcomeIcons.length]
                    return (
                      <motion.div
                        key={outcome}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: outcomeIndex * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,0.3)',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span style={{ color: theme === 'light' ? '#1d1d1f' : '#d1d5db' }} className="text-sm">{outcome}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div 
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme === 'light' ? '#86868b' : '#6b7280' }}
                    />
                    <span 
                      className="text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'light' ? '#86868b' : '#6b7280' }}
                    >
                      {t.beforeAfter.before}
                    </span>
                  </div>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="leading-relaxed">{app.before}</p>
                </div>

                <div className="flex justify-center">
                  <div 
                    className="w-px h-8"
                    style={{ background: theme === 'light' ? 'linear-gradient(to bottom, #86868b, #007d73)' : 'linear-gradient(to bottom, #6b7280, #14b8a6)' }}
                  />
                </div>

                <div 
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,125,115,0.1)' : 'none',
                    border: theme === 'light' ? '1px solid rgba(0,125,115,0.2)' : '1px solid rgba(20,184,166,0.3)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#007d73' }} />
                    <span 
                      className="text-sm font-medium uppercase tracking-wider"
                      style={{ color: '#007d73' }}
                    >
                      {t.beforeAfter.after}
                    </span>
                  </div>
                  <p style={{ color: theme === 'light' ? '#1d1d1f' : '#d1d5db' }} className="leading-relaxed">{app.after}</p>
                </div>

                <div 
                  className="mt-8 p-6 rounded-xl"
                  style={{ 
                    backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                    border: theme === 'light' ? 'none' : '1px solid rgba(20,184,166,0.2)'
                  }}
                >
                  <h4 
                    className="text-sm font-medium uppercase tracking-wider mb-3"
                    style={{ color: '#007d73' }}
                  >
                    {t.aiRoleLabel}
                  </h4>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm leading-relaxed">{app.aiRole}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Clinical Focus Statement */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
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
            <p style={{ color: theme === 'light' ? '#86868b' : '#71717a' }} className="italic">
              {t.statement.quote}
            </p>
          </motion.div>
        </div>
      </section>

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
              className="relative py-20"
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
                      src="/images/application-scenario.jpg" 
                      alt="Application Scenario"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="relative py-20"
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
                      src="/images/foot-management.jpg" 
                      alt="Foot Management"
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="relative py-20"
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
                    {['/images/central-monitoring.jpg', '/images/digital-rounds.jpg', '/images/smart-terminal.jpg', '/images/bp-weight-assistant.jpg'].map((src, i) => (
                      <div 
                        key={i}
                        className="rounded-xl overflow-hidden"
                        style={{ 
                          boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        <img src={src} alt="" className="w-full h-32 object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
