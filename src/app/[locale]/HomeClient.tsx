'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Database, Brain, Cog, Shield, TrendingUp, Users, Activity, Zap, Server, Cpu, Stethoscope, PackageCheck } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface HomeClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomeClient({ locale, dictionary }: HomeClientProps) {
  const t = dictionary.home
  const { theme } = useTheme()

  const pillars = [
    {
      icon: Database,
      title: t.pillars.iot.title,
      description: t.pillars.iot.description,
      features: t.pillars.iot.features,
    },
    {
      icon: Brain,
      title: t.pillars.ai.title,
      description: t.pillars.ai.description,
      features: t.pillars.ai.features,
    },
    {
      icon: Cog,
      title: t.pillars.automation.title,
      description: t.pillars.automation.description,
      features: t.pillars.automation.features,
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section - White/Dark */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b' }}
      >
        {theme === 'dark' && (
          <>
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 radial-gradient" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          </>
        )}
        {theme === 'light' && (
          <>
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0,125,115,0.03)' }} />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0,125,115,0.03)' }} />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="label-tag">{t.tag}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-balance"
              style={{ 
                color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                letterSpacing: '-0.03em'
              }}
            >
              {t.hero.title1}
              <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#a1a1aa' }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{ color: theme === 'light' ? '#6e6e73' : '#71717a' }}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={`/${locale}/platform`} className="btn-primary">
                {t.cta.explore}
                <ArrowRight size={18} />
              </Link>
              <Link href={`/${locale}/company#contact`} className="btn-secondary">
                {t.cta.contact}
              </Link>
            </motion.div>

            {t.hero.stats && (
              <motion.div
                variants={fadeInUp}
                className={`mt-12 pt-8 border-t ${
                  theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
                }`}
              >
                <p className={`text-sm font-medium tracking-wide ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'
                }`}>
                  {t.hero.stats}
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div 
              className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
              style={{ borderColor: theme === 'light' ? '#d2d2d7' : 'rgba(64,64,64,1)' }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#007d73' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters - Problem Statement - Gray/Darker */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-tag mb-6 inline-block">{t.why.tag}</span>
              <h2 className={`font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.why.title}
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${
                theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
              }`}>
                {t.why.description1}
              </p>
              <p className={`text-lg leading-relaxed ${
                theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
              }`}>
                {t.why.description2}
              </p>
              {t.why.references && (
                <div className={`mt-6 pt-4 border-t ${
                  theme === 'dark' ? 'border-neutral-700' : 'border-gray-200'
                }`}>
                  <p className={`text-xs font-medium mb-2 ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'
                  }`}>
                    References
                  </p>
                  <div className={`text-xs leading-relaxed space-y-1 ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'
                  }`}>
                    {t.why.references.map((ref: string, index: number) => (
                      <p key={index} className="italic">{ref}</p>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Shield, ...t.why.clinical },
                { icon: Activity, ...t.why.operational },
                { icon: Brain, ...t.why.strategic },
                { icon: Database, ...t.why.longterm },
              ].map((item) => (
                <div key={item.title} className={`rounded-2xl p-6 transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/50 border border-slate-800/50'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  <item.icon className={`w-6 h-6 mb-4 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                  <h3 className={`font-display font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{item.title}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Platform Section - White/Dark */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b' }}
      >
        {theme === 'dark' && <div className="absolute inset-0 grid-pattern opacity-30" />}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="label-tag mb-6 inline-block">{t.pillars.tag}</span>
            <h2 className={`font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.pillars.title}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              {t.pillars.description}
            </p>
          </motion.div>

          {/* Flow Diagram - Visual Pipeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            {/* Mobile: 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {[
                { icon: Server, ...t.flow.steps.machines },
                { icon: Database, ...t.flow.steps.data },
                { icon: Brain, ...t.flow.steps.ai },
                { icon: Cog, ...t.flow.steps.automation },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col items-center text-center p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                    theme === 'dark'
                      ? 'bg-accent-900/30 border border-accent-800/30'
                      : 'bg-accent-50 border border-accent-200'
                  }`}>
                    <step.icon className={`w-6 h-6 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                  </div>
                  <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.label}</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{step.sublabel}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Desktop: Horizontal Flow */}
            <div className="hidden md:flex items-center justify-center gap-4">
              {[
                { icon: Server, ...t.flow.steps.machines },
                { icon: Database, ...t.flow.steps.data },
                { icon: Brain, ...t.flow.steps.ai },
                { icon: Cog, ...t.flow.steps.automation },
              ].map((step, index) => (
                <div key={step.label} className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className={`flex flex-col items-center p-6 rounded-xl ${
                      theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${
                      theme === 'dark'
                        ? 'bg-accent-900/30 border border-accent-800/30'
                        : 'bg-accent-50 border border-accent-200'
                    }`}>
                      <step.icon className={`w-7 h-7 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                    </div>
                    <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.label}</span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{step.sublabel}</span>
                  </motion.div>
                  {index < 3 && (
                    <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-accent-600' : 'text-accent-400'}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-6 ${
                  theme === 'dark'
                    ? 'bg-slate-900/50 border border-slate-800/50'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    theme === 'dark'
                      ? 'bg-accent-900/30 border border-accent-800/30'
                      : 'bg-accent-50 border border-accent-200'
                  }`}>
                    <pillar.icon className={`w-5 h-5 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-display text-lg font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-3 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
                    }`}>
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.features.map((feature) => (
                        <span
                          key={feature}
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === 'dark' 
                              ? 'bg-slate-800 text-neutral-400' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Highlights Section - Gray/Darker */}
      {t.clinicalHighlights && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="label-tag mb-4 inline-block">{t.clinicalHighlights.tag}</span>
              <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.clinicalHighlights.title}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {t.clinicalHighlights.items.map((item: any, index: number) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-5 text-center ${
                    theme === 'dark'
                      ? 'bg-slate-900/50 border border-slate-800/50'
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  <div className={`text-3xl md:text-4xl font-display font-bold mb-2 ${
                    theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
                  }`}>
                    {item.value}
                  </div>
                  <div className={`text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'
                  }`}>
                    {item.detail}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link 
                href={`/${locale}/clinical#results`}
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  theme === 'dark' ? 'text-accent-400 hover:text-accent-300' : 'text-accent-600 hover:text-accent-700'
                }`}
              >
                {t.clinicalHighlights.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {t.clinicalHighlights.footnote && (
              <p className={`text-center text-xs mt-6 italic ${
                theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'
              }`}>
                {t.clinicalHighlights.footnote}
              </p>
            )}

            {/* Deployment Stats */}
            {t.clinicalHighlights.deployment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mt-12 pt-10 border-t ${
                  theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
                }`}
              >
                <h3 className={`text-center text-sm font-medium mb-6 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'
                }`}>
                  {t.clinicalHighlights.deployment.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {t.clinicalHighlights.deployment.items.map((item: any, index: number) => (
                    <div key={item.label} className="text-center">
                      <div className={`text-2xl md:text-3xl font-display font-bold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.value}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Explore & CTA Section - White/Dark */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="label-tag mb-6 inline-block">{t.router.tag}</span>
            <h2 className={`font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.router.title}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              {t.router.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Cpu, key: 'platform', href: `/${locale}/platform` },
              { icon: Stethoscope, key: 'clinical', href: `/${locale}/clinical` },
              { icon: PackageCheck, key: 'deployment', href: `/${locale}/deployment` },
            ].map((door, index) => {
              const doorData = t.router.doors[door.key as keyof typeof t.router.doors]
              return (
                <motion.div
                  key={door.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={door.href}
                    className={`block rounded-2xl p-8 h-full transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-slate-900/50 border border-slate-800/50 hover:border-accent-700/50 hover:bg-slate-900/70'
                        : 'bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-accent-300'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      theme === 'dark'
                        ? 'bg-accent-900/30 border border-accent-800/30'
                        : 'bg-accent-50 border border-accent-200'
                    }`}>
                      <door.icon className={`w-7 h-7 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                    </div>
                    
                    <h3 className={`font-display text-xl font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {doorData.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
                    }`}>
                      {doorData.description}
                    </p>
                    
                    <div className={`inline-flex items-center gap-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
                    }`}>
                      {doorData.cta}
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/company#contact`} className="btn-primary">
                {t.cta.start}
                <ArrowRight size={18} />
              </Link>
              <Link href={`/${locale}/platform`} className="btn-secondary">
                {t.cta.learn}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
