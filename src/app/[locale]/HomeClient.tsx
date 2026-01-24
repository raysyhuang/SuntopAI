'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Database, Brain, Cog, Shield, TrendingUp, Users, Activity, Zap, Server } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 radial-gradient" />
        
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

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
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tightest text-white mb-6 text-balance"
            >
              {t.hero.title1}
              <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed"
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
            <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-accent-500 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative py-32 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="label-tag mb-6 inline-block">{t.pillars.tag}</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {t.pillars.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
                className="card-institutional gradient-border group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-6 group-hover:bg-accent-900/50 transition-colors">
                  <pillar.icon className="w-7 h-7 text-accent-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-neutral-500"
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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {t.flow.title}
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
                    <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 glow-accent">
                      <step.icon className="w-8 h-8 text-accent-400" />
                    </div>
                    <span className="text-white font-medium text-sm">{step.label}</span>
                    <span className="text-neutral-500 text-xs">{step.sublabel}</span>
                  </motion.div>
                  {index < 3 && (
                    <div className="hidden md:block">
                      <ArrowRight className="w-6 h-6 text-accent-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-24 bg-slate-925 border-y border-slate-800/50">
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-900/20 mb-4">
                  <stat.icon className="w-6 h-6 text-accent-400" />
                </div>
                <div className="text-4xl md:text-5xl font-display font-semibold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-tag mb-6 inline-block">{t.why.tag}</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                {t.why.title}
              </h2>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                {t.why.description1}
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
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
                <div key={item.title} className="card-institutional">
                  <item.icon className="w-6 h-6 text-accent-400 mb-4" />
                  <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-slate-925">
        <div className="absolute inset-0 radial-gradient opacity-50" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {t.finalCta.title}
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
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
