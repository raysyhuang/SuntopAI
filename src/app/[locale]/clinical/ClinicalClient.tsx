'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Network, Brain, Activity, Shield, Users, TrendingUp, Clock, AlertTriangle, CheckCircle, Heart, Monitor, Sparkles, ArrowRight, Cpu, MessageSquare, Layout, Footprints, Workflow, Wifi } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

const sectionIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 radial-gradient" />
        
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
              className="font-display text-5xl md:text-6xl font-semibold tracking-tightest text-white mb-6"
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-400 leading-relaxed"
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
          className={`relative py-32 ${index % 2 === 0 ? 'bg-slate-925' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center">
                    <app.icon className="w-7 h-7 text-accent-400" />
                  </div>
                </div>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-white mb-4">
                  {app.title}
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
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
                        className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                      >
                        <IconComponent className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-300 text-sm">{outcome}</span>
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
                <div className="card-institutional">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">
                      {t.beforeAfter.before}
                    </span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">{app.before}</p>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gradient-to-b from-neutral-600 to-accent-500" />
                </div>

                <div className="card-institutional gradient-border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-accent-500" />
                    <span className="text-accent-400 text-sm font-medium uppercase tracking-wider">
                      {t.beforeAfter.after}
                    </span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">{app.after}</p>
                </div>

                <div className="mt-8 p-6 bg-accent-900/10 rounded-xl border border-accent-800/20">
                  <h4 className="text-accent-400 text-sm font-medium uppercase tracking-wider mb-3">
                    {t.aiRoleLabel}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{app.aiRole}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Clinical Focus Statement */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              {t.statement.title}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              {t.statement.description}
            </p>
            <p className="text-neutral-500 italic">
              {t.statement.quote}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fine Management Section - Three Parts */}
      {t.fineManagement && t.fineManagement.parts && (
        <>
          {/* Hero for Fine Management */}
          <section className="relative py-24 bg-slate-925">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <span className="label-tag mb-6 inline-block">{t.fineManagement.tag}</span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                  {t.fineManagement.title}
                </h2>
                <p className="text-neutral-400 max-w-4xl mx-auto leading-relaxed">
                  {t.fineManagement.subtitle}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Part 1: Center Management */}
          {t.fineManagement.parts.centerManagement && (
            <section className="relative py-20">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-accent-400 text-sm font-medium uppercase tracking-wider mb-2 block">
                      {t.fineManagement.parts.centerManagement.tag}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                      {t.fineManagement.parts.centerManagement.title}
                    </h3>
                    <p className="text-accent-400 text-lg mb-4">
                      {t.fineManagement.parts.centerManagement.subtitle}
                    </p>
                    <p className="text-neutral-400 max-w-3xl">
                      {t.fineManagement.parts.centerManagement.description}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden border border-slate-700"
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
                        className="card-institutional flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-accent-400" />
                        </div>
                        <h4 className="font-display font-semibold text-white mb-1">{section.title}</h4>
                        <p className="text-accent-400/80 text-sm mb-3">{section.subtitle}</p>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-4">{section.description}</p>
                        
                        <ul className="space-y-2 mb-4 flex-grow">
                          {section.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-neutral-400 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-4 border-t border-slate-700/50">
                          <div className="flex items-center gap-2 text-accent-400 text-sm">
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
            <section className="relative py-20 bg-slate-925">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden border border-slate-700 lg:order-1 order-2"
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
                    <span className="text-accent-400 text-sm font-medium uppercase tracking-wider mb-2 block">
                      {t.fineManagement.parts.patientManagement.tag}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                      {t.fineManagement.parts.patientManagement.title}
                    </h3>
                    <p className="text-accent-400 text-lg mb-4">
                      {t.fineManagement.parts.patientManagement.subtitle}
                    </p>
                    <p className="text-neutral-400 max-w-3xl">
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
                        className="card-institutional flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-accent-400" />
                        </div>
                        <h4 className="font-display font-semibold text-white mb-1">{section.title}</h4>
                        <p className="text-accent-400/80 text-sm mb-3">{section.subtitle}</p>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-4">{section.description}</p>
                        
                        <ul className="space-y-2 mb-4 flex-grow">
                          {section.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-neutral-400 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-4 border-t border-slate-700/50">
                          <div className="flex items-center gap-2 text-accent-400 text-sm">
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
            <section className="relative py-20">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-accent-400 text-sm font-medium uppercase tracking-wider mb-2 block">
                      {t.fineManagement.parts.itInfrastructure.tag}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                      {t.fineManagement.parts.itInfrastructure.title}
                    </h3>
                    <p className="text-accent-400 text-lg mb-4">
                      {t.fineManagement.parts.itInfrastructure.subtitle}
                    </p>
                    <p className="text-neutral-400 max-w-3xl">
                      {t.fineManagement.parts.itInfrastructure.description}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="rounded-xl overflow-hidden border border-slate-700">
                      <img 
                        src="/images/central-monitoring.jpg" 
                        alt="Central Monitoring"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-700">
                      <img 
                        src="/images/digital-rounds.jpg" 
                        alt="Digital Rounds"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-700">
                      <img 
                        src="/images/smart-terminal.jpg" 
                        alt="Smart Terminal"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-700">
                      <img 
                        src="/images/bp-weight-assistant.jpg" 
                        alt="BP Assessment"
                        className="w-full h-32 object-cover"
                      />
                    </div>
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
                        className="card-institutional flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-accent-400" />
                        </div>
                        <h4 className="font-display font-semibold text-white mb-1">{section.title}</h4>
                        <p className="text-accent-400/80 text-sm mb-3">{section.subtitle}</p>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-4">{section.description}</p>
                        
                        <ul className="space-y-2 mb-4 flex-grow">
                          {section.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-neutral-400 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-4 border-t border-slate-700/50">
                          <div className="flex items-center gap-2 text-accent-400 text-sm">
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
        <section className="relative py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/${locale}/platform`} className="block card-institutional group hover:border-accent-500/50 transition-colors">
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {t.crossLinks.platform.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-4">{t.crossLinks.platform.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium">
                    {t.crossLinks.platform.button}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/${locale}/deployment`} className="block card-institutional group hover:border-accent-500/50 transition-colors">
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {t.crossLinks.deployment.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-4">{t.crossLinks.deployment.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium">
                    {t.crossLinks.deployment.button}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
