/**
 * The previous homepage, kept temporarily at /{locale}/preview so the two
 * directions can be compared side by side. Delete this file and the preview
 * route once the new homepage is signed off.
 */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, Database, Brain, Cog, Activity, Server, Cpu,
  Stethoscope, PackageCheck, Shield,
} from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Stat } from '@/components/ui/Stat'
import { Badge } from '@/components/ui/Badge'

interface HomeClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55 },
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

export default function LegacyHomeClient({ locale, dictionary }: HomeClientProps) {
  const t = dictionary.home
  const { theme } = useTheme()
  const isLight = theme === 'light'

  // Warm hybrid: warm grays in light mode; cool slate retained in dark for institutional feel
  const headingClass = isLight ? '[color:#141413]' : 'text-white'
  const bodyClass = isLight ? '[color:#5e5d59]' : 'text-neutral-400'
  const mutedClass = isLight ? '[color:#87867f]' : 'text-neutral-500'
  const hairlineClass = isLight ? '[border-color:#e8e6dc]' : 'border-slate-800'

  const pillars = [
    { icon: Database, title: t.pillars.iot.title, description: t.pillars.iot.description, features: t.pillars.iot.features },
    { icon: Brain, title: t.pillars.ai.title, description: t.pillars.ai.description, features: t.pillars.ai.features },
    { icon: Cog, title: t.pillars.automation.title, description: t.pillars.automation.description, features: t.pillars.automation.features },
  ]

  const flowSteps = [
    { icon: Server, ...t.flow.steps.machines },
    { icon: Database, ...t.flow.steps.data },
    { icon: Brain, ...t.flow.steps.ai },
    { icon: Cog, ...t.flow.steps.automation },
  ]

  const whyCards = [
    { icon: Shield, ...t.why.clinical },
    { icon: Activity, ...t.why.operational },
    { icon: Brain, ...t.why.strategic },
    { icon: Database, ...t.why.longterm },
  ]

  return (
    <div className="relative">
      {/* ───────────── Hero ───────────── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ backgroundColor: isLight ? '#f5f4ed' : '#0b1624' }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-28 w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge variant="eyebrow">{t.tag}</Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className={`display-lg mb-6 text-balance ${headingClass}`}
            >
              {t.hero.title1}
              <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-6 ${
                isLight ? '[color:#3d3d3a]' : 'text-neutral-200'
              }`}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className={`text-base leading-relaxed max-w-2xl mb-8 ${bodyClass}`}
            >
              {t.hero.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-10">
              {t.hero.badges.map((badge) => (
                <Badge key={badge} variant="neutral">{badge}</Badge>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Link href={`/${locale}/platform`} className="btn-primary">
                {t.cta.explore}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href={`/${locale}/company#contact`} className="btn-secondary">
                {t.cta.contact}
              </Link>
            </motion.div>

            {t.hero.stats && (
              <motion.div
                variants={fadeInUp}
                className={`mt-10 pt-6 border-t ${hairlineClass}`}
              >
                <p className={`text-sm font-medium ${mutedClass}`}>{t.hero.stats}</p>
              </motion.div>
            )}
          </motion.div>

          {t.hero.metrics && t.hero.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 mt-16 border-t border-b ${
                isLight ? 'border-[#e8e6dc] divide-[#e8e6dc]' : 'border-slate-800 divide-slate-800'
              }`}
            >
              {t.hero.metrics.map((metric) => (
                <div key={metric.label} className="px-6 py-5">
                  <Stat value={metric.value} label={metric.label} />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ───────────── Why This Matters — DARK INTERLUDE ───────────── */}
      <section
        className="relative py-28 md:py-36"
        style={{ backgroundColor: isLight ? '#141413' : '#060d18' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              {/* Editorial chapter marker */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-[#3d3d3a]" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#b0aea5]">
                  {t.why.tag}
                </span>
              </div>

              <h2 className="display-lg mb-8 text-[#faf9f5]">
                {t.why.title}
              </h2>

              {/* Editorial serif body — long-form essay typography */}
              <p className="font-display text-lg md:text-xl leading-[1.65] mb-6 text-[#d6d4c8]">
                {t.why.description1}
              </p>
              <p className="font-display text-lg md:text-xl leading-[1.65] text-[#d6d4c8]">
                {t.why.description2}
              </p>

              {t.why.references && t.why.references.length > 0 && (
                <div className="mt-8 pt-5 border-t border-[#3d3d3a]">
                  <p className="text-[10px] uppercase tracking-[0.18em] font-medium mb-3 text-[#87867f]">
                    References
                  </p>
                  <div className="text-xs leading-relaxed space-y-1.5 text-[#87867f] font-display italic">
                    {t.why.references.map((ref: string, index: number) => (
                      <p key={index}>{ref}</p>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {whyCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#30302e] p-6 md:p-7 bg-[#1c1c1a] transition-colors hover:border-[#4d4c48]"
                >
                  <div className="w-9 h-9 rounded flex items-center justify-center mb-4 bg-accent-900/30 border border-accent-800/40">
                    <item.icon className="w-4 h-4 text-accent-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-medium text-lg mb-2 leading-snug text-[#faf9f5]" style={{ letterSpacing: 0 }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#b0aea5]">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Technology Platform Pillars ───────────── */}
      <Section tone="light">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`h-px w-10 ${isLight ? 'bg-[#d1cfc5]' : 'bg-slate-700'}`} aria-hidden="true" />
            <span className={`text-[10px] uppercase tracking-[0.18em] font-medium ${mutedClass}`}>
              {t.pillars.tag}
            </span>
            <span className={`h-px w-10 ${isLight ? 'bg-[#d1cfc5]' : 'bg-slate-700'}`} aria-hidden="true" />
          </div>
          <h2 className={`display-lg mb-5 ${headingClass}`}>{t.pillars.title}</h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${bodyClass}`}>
            {t.pillars.description}
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`flex flex-col items-center text-center p-4 rounded border ${
                  isLight ? 'bg-[#faf9f5] border-[#f0eee6]' : 'bg-slate-900/40 border-slate-800/60'
                }`}
              >
                <div className={`w-10 h-10 rounded flex items-center justify-center mb-2 ${
                  isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
                }`}>
                  <step.icon className={`w-5 h-5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
                </div>
                <span className={`font-medium text-sm ${headingClass}`}>{step.label}</span>
                <span className={`text-xs ${mutedClass}`}>{step.sublabel}</span>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-center gap-3">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className={`flex flex-col items-center px-6 py-5 rounded border min-w-[150px] ${
                    isLight ? 'bg-[#faf9f5] border-[#f0eee6] shadow-whisper' : 'bg-slate-900/40 border-slate-800/60'
                  }`}
                >
                  <div className={`w-11 h-11 rounded flex items-center justify-center mb-2 ${
                    isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
                  }`}>
                    <step.icon className={`w-5 h-5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
                  </div>
                  <span className={`font-medium text-sm ${headingClass}`}>{step.label}</span>
                  <span className={`text-xs ${mutedClass}`}>{step.sublabel}</span>
                </motion.div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-accent-500' : 'text-accent-400'}`} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded flex items-center justify-center flex-shrink-0 ${
                    isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
                  }`}>
                    <pillar.icon className={`w-4 h-4 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-display font-medium text-lg mb-2 leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
                      {pillar.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${bodyClass}`}>
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.features.map((feature) => (
                        <Badge key={feature} variant="neutral">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ───────────── Clinical Highlights ───────────── */}
      {t.clinicalHighlights && (
        <Section tone="subtle">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Editorial chapter marker */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className={`h-px w-10 ${isLight ? 'bg-[#d1cfc5]' : 'bg-slate-700'}`} aria-hidden="true" />
              <span className={`text-[10px] uppercase tracking-[0.18em] font-medium ${mutedClass}`}>
                {t.clinicalHighlights.tag}
              </span>
              <span className={`h-px w-10 ${isLight ? 'bg-[#d1cfc5]' : 'bg-slate-700'}`} aria-hidden="true" />
            </div>
            <h2 className={`display-lg mb-5 ${headingClass}`}>{t.clinicalHighlights.title}</h2>
          </motion.div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 border rounded-md overflow-hidden ${
            isLight ? 'border-[#e8e6dc] divide-[#e8e6dc]' : 'border-slate-800 divide-slate-800'
          }`}>
            {t.clinicalHighlights.items.map((item: any, index: number) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`px-6 py-7 ${isLight ? 'bg-[#faf9f5]' : 'bg-slate-900/40'}`}
              >
                <div
                  className={`font-display font-medium tabular-nums text-3xl md:text-4xl leading-none mb-3 ${
                    isLight ? 'text-accent-700' : 'text-accent-300'
                  }`}
                  style={{ letterSpacing: 0 }}
                >
                  {item.value}
                </div>
                <div className={`text-sm font-medium mb-1 ${headingClass}`}>{item.label}</div>
                <div className={`text-xs leading-relaxed ${mutedClass}`}>{item.detail}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${locale}/clinical#results`}
              className={`inline-flex items-center gap-2 text-sm font-medium ${
                isLight ? 'text-accent-700 hover:text-accent-800' : 'text-accent-300 hover:text-accent-200'
              }`}
            >
              {t.clinicalHighlights.cta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {t.clinicalHighlights.footnote && (
            <p className={`text-center text-xs mt-4 italic ${mutedClass}`}>
              {t.clinicalHighlights.footnote}
            </p>
          )}

          {t.clinicalHighlights.deployment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`mt-14 pt-10 border-t ${hairlineClass}`}
            >
              <h3 className={`text-center text-xs uppercase tracking-[0.14em] font-medium mb-8 ${mutedClass}`}>
                {t.clinicalHighlights.deployment.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {t.clinicalHighlights.deployment.items.map((item: any) => (
                  <Stat key={item.label} value={item.value} label={item.label} align="center" />
                ))}
              </div>
            </motion.div>
          )}
        </Section>
      )}

      {/* ───────────── Explore & Final CTA ───────────── */}
      <Section tone="light">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`h-px w-10 ${isLight ? 'bg-[#d1cfc5]' : 'bg-slate-700'}`} aria-hidden="true" />
            <span className={`text-[10px] uppercase tracking-[0.18em] font-medium ${mutedClass}`}>
              {t.router.tag}
            </span>
            <span className={`h-px w-10 ${isLight ? 'bg-[#d1cfc5]' : 'bg-slate-700'}`} aria-hidden="true" />
          </div>
          <h2 className={`display-lg mb-5 ${headingClass}`}>{t.router.title}</h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${bodyClass}`}>
            {t.router.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Cpu, key: 'platform', href: `/${locale}/platform` },
            { icon: Stethoscope, key: 'clinical', href: `/${locale}/clinical` },
            { icon: PackageCheck, key: 'deployment', href: `/${locale}/deployment` },
          ].map((door, index) => {
            const doorData = t.router.doors[door.key as keyof typeof t.router.doors]
            return (
              <motion.div
                key={door.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link
                  href={door.href}
                  className={`group block h-full rounded-md border p-6 transition-[border-color,box-shadow,background-color] ${
                    isLight
                      ? 'bg-[#faf9f5] border-[#f0eee6] shadow-whisper hover:shadow-whisper-lg hover:border-accent-200'
                      : 'bg-slate-900/40 border-slate-800/60 hover:border-accent-700/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div className={`w-11 h-11 rounded flex items-center justify-center mb-5 ${
                    isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
                  }`}>
                    <door.icon className={`w-5 h-5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
                  </div>
                  <h3 className={`font-display font-medium text-xl mb-3 leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
                    {doorData.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 ${bodyClass}`}>
                    {doorData.description}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                    isLight ? 'text-accent-700' : 'text-accent-300'
                  }`}>
                    {doorData.cta}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Final CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href={`/${locale}/company#contact`} className="btn-primary">
            {t.cta.start}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href={`/${locale}/platform`} className="btn-secondary">
            {t.cta.learn}
          </Link>
        </motion.div>
      </Section>
    </div>
  )
}
