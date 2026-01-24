'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Database, Brain, Cog, Shield, TrendingUp, Users, Activity, Zap, Server } from 'lucide-react'
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

  const impactStats = [
    { value: '40%', label: t.stats.reduction, icon: Shield },
    { value: '3x', label: t.stats.response, icon: Zap },
    { value: '5s', label: t.stats.monitoring, icon: Activity },
    { value: '3000+', label: t.stats.stations, icon: Server },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: theme === 'light' ? '#fbfbfd' : undefined }}
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
              <Link href={`/${locale}/contact`} className="btn-secondary">
                {t.cta.contact}
              </Link>
            </motion.div>
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

      {/* Pillars Section */}
      <section className={`relative py-32 ${
        theme === 'dark' ? 'bg-slate-925' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
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

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/50 border border-slate-800/50 hover:border-accent-700/30 hover:bg-slate-900/70'
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-accent-300'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  theme === 'dark'
                    ? 'bg-accent-900/30 border border-accent-800/30 group-hover:bg-accent-900/50'
                    : 'bg-accent-50 border border-accent-200'
                }`}>
                  <pillar.icon className={`w-7 h-7 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                </div>
                <h3 className={`font-display text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {pillar.title}
                </h3>
                <p className={`mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
                }`}>
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'
                      }`}
                    >
                      <div className="w-1 h-1 bg-accent-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Flow Diagram */}
      <section className={`relative py-32 overflow-hidden ${
        theme === 'light' ? 'bg-white' : ''
      }`}>
        {theme === 'dark' && <div className="absolute inset-0 grid-pattern opacity-50" />}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.flow.title}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              {t.flow.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
              {[
                { icon: Server, ...t.flow.steps.machines },
                { icon: Database, ...t.flow.steps.data },
                { icon: Brain, ...t.flow.steps.ai },
                { icon: Cog, ...t.flow.steps.automation },
              ].map((step, index) => (
                <div key={step.label} className="flex items-center gap-4 md:gap-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${
                      theme === 'dark'
                        ? 'bg-slate-900 border border-slate-700 glow-accent'
                        : 'bg-white border border-gray-200 shadow-lg'
                    }`}>
                      <step.icon className={`w-8 h-8 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                    </div>
                    <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.label}</span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{step.sublabel}</span>
                  </motion.div>
                  {index < 3 && (
                    <div className="hidden md:block">
                      <ArrowRight className={`w-6 h-6 ${theme === 'dark' ? 'text-accent-600' : 'text-accent-500'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className={`relative py-24 border-y ${
        theme === 'dark'
          ? 'bg-slate-925 border-slate-800/50'
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  theme === 'dark' ? 'bg-accent-900/20' : 'bg-accent-50'
                }`}>
                  <stat.icon className={`w-6 h-6 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-display font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className={`relative py-32 ${theme === 'light' ? 'bg-white' : ''}`}>
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Shield, ...t.why.clinical },
                { icon: TrendingUp, ...t.why.operational },
                { icon: Users, ...t.why.strategic },
                { icon: Activity, ...t.why.longterm },
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

      {/* CTA Section */}
      <section className={`relative py-32 ${
        theme === 'dark' ? 'bg-slate-925' : 'bg-gray-50'
      }`}>
        {theme === 'dark' && <div className="absolute inset-0 radial-gradient opacity-50" />}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.finalCta.title}
            </h2>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              {t.finalCta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-primary">
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
