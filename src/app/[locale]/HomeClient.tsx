'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, Database, Brain, Cog, TrendingUp, Activity, Server, Cpu,
  Stethoscope, PackageCheck, Monitor, Bell, ClipboardList, Wifi,
} from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Stat } from '@/components/ui/Stat'
import { Badge } from '@/components/ui/Badge'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { CenterDashboard } from '@/components/ui/CenterDashboard'

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

export default function HomeClient({ locale, dictionary }: HomeClientProps) {
  const t = dictionary.home
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const headingClass = isLight ? 'text-ink-900' : 'text-white'
  const bodyClass = isLight ? 'text-ink-400' : 'text-neutral-400'
  const mutedClass = isLight ? 'text-ink-400' : 'text-neutral-500'
  const labelClass = isLight ? 'text-ink-600' : 'text-neutral-300'
  const hairlineClass = isLight ? 'border-ink-100' : 'border-slate-800'

  const pillars = [
    { icon: Database, title: t.pillars.iot.title, description: t.pillars.iot.description, features: t.pillars.iot.features },
    { icon: Brain, title: t.pillars.ai.title, description: t.pillars.ai.description, features: t.pillars.ai.features },
    { icon: Cog, title: t.pillars.automation.title, description: t.pillars.automation.description, features: t.pillars.automation.features },
  ]

  const centerSystems = [
    { icon: Server, ...t.center.systems.dialysis },
    { icon: Wifi, ...t.center.systems.infrastructure },
    { icon: Activity, ...t.center.systems.bedside },
    { icon: Monitor, ...t.center.systems.operations },
  ]

  const riskStages = [
    { icon: ClipboardList, ...t.risk.stages.before },
    { icon: Bell, ...t.risk.stages.during },
    { icon: TrendingUp, ...t.risk.stages.after },
  ]

  const flowSteps = [
    { icon: Server, ...t.flow.steps.machines },
    { icon: Database, ...t.flow.steps.data },
    { icon: Brain, ...t.flow.steps.ai },
    { icon: Cog, ...t.flow.steps.automation },
  ]

  return (
    <div className="relative">
      {/* ───────────── Hero ───────────── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ backgroundColor: isLight ? '#ffffff' : '#0b1624' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-28 w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center"
          >
            <div>
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
                  isLight ? 'text-ink-600' : 'text-neutral-200'
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
            </div>

            <motion.div variants={fadeInUp}>
              <Card elevated className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.14em] font-medium mb-2 ${
                      isLight ? 'text-accent-700' : 'text-accent-300'
                    }`}>
                      {t.hero.panel.label}
                    </div>
                    <h2 className={`font-display font-light text-xl leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
                      {t.hero.panel.title}
                    </h2>
                  </div>
                  <div className={`h-10 w-10 rounded flex items-center justify-center flex-shrink-0 ${
                    isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
                  }`}>
                    <Activity className={`h-5 w-5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-x-5 gap-y-4 mb-6 pb-6 border-b ${hairlineClass}`}>
                  {t.hero.panel.rows.map((row) => (
                    <div key={row.label}>
                      <div className={`text-[11px] ${mutedClass}`}>{row.label}</div>
                      <div className={`font-display font-light tabular-nums text-xl mt-1 ${headingClass}`} style={{ letterSpacing: 0 }}>
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mb-6 pb-6 border-b ${hairlineClass}`}>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className={`text-xs font-medium ${labelClass}`}>{t.hero.panel.mapTitle}</span>
                    <span className={`text-[11px] ${mutedClass}`}>{t.hero.panel.mapStatus}</span>
                  </div>
                  <div className="space-y-2">
                    {t.hero.panel.mapRows.map((row, index) => (
                      <div key={row} className="flex items-center gap-3">
                        <div className={`h-[5px] rounded-full ${
                          index === 1 ? 'w-8 bg-amber-400' : 'w-8 bg-accent-500'
                        }`} />
                        <div className={`h-[5px] flex-1 rounded-full ${isLight ? 'bg-ink-100' : 'bg-slate-700'}`} />
                        <span className={`w-24 text-[11px] text-right ${mutedClass}`}>{row}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className={`text-xs font-semibold ${isLight ? 'text-amber-700' : 'text-amber-200'}`}>
                      {t.hero.panel.alarmTitle}
                    </p>
                    <p className={`text-xs mt-1 leading-relaxed ${bodyClass}`}>
                      {t.hero.panel.alarmDescription}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {t.hero.metrics && t.hero.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 mt-16 border-t border-b ${
                isLight ? 'border-ink-100 divide-ink-100' : 'border-slate-800 divide-slate-800'
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

      {/* ───────────── Digital Center ───────────── */}
      <Section tone="subtle">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <Badge variant="eyebrow" className="mb-5">{t.center.tag}</Badge>
          <h2 className={`display-md mb-5 ${headingClass}`}>{t.center.title}</h2>
          <p className={`text-base md:text-lg leading-relaxed ${bodyClass}`}>{t.center.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {centerSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <FeatureCard icon={system.icon} title={system.title} description={system.description} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 md:p-8">
            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <h3 className={`font-display font-light text-2xl mb-3 leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
                  {t.center.operatingLayer.title}
                </h3>
                <p className={`text-sm leading-relaxed ${bodyClass}`}>
                  {t.center.operatingLayer.description}
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-2">
                {t.center.operatingLayer.items.map((item) => (
                  <div
                    key={item}
                    className={`rounded px-3 py-2.5 text-sm font-medium border ${
                      isLight
                        ? 'bg-ink-50 border-ink-100 text-ink-700'
                        : 'bg-slate-800/60 border-slate-700/60 text-neutral-300'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* ───────────── Live Dashboard Preview ───────────── */}
      <Section tone="light">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <Badge variant="eyebrow" className="mb-5">{t.preview.tag}</Badge>
          <h2 className={`display-md mb-5 ${headingClass}`}>{t.preview.title}</h2>
          <p className={`text-base md:text-lg leading-relaxed ${bodyClass}`}>{t.preview.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <CenterDashboard dict={t.preview.dashboard} />
        </motion.div>
      </Section>

      {/* ───────────── Technology Platform Pillars ───────────── */}
      <Section tone="subtle">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="eyebrow" className="mb-5">{t.pillars.tag}</Badge>
          <h2 className={`display-md mb-5 ${headingClass}`}>{t.pillars.title}</h2>
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
                  isLight ? 'bg-white border-ink-100' : 'bg-slate-900/40 border-slate-800/60'
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
                    isLight ? 'bg-white border-ink-100 shadow-stripe-sm' : 'bg-slate-900/40 border-slate-800/60'
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
                    <h3 className={`font-display font-light text-lg mb-2 leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
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

      {/* ───────────── Risk Control ───────────── */}
      <Section tone="light">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <Badge variant="eyebrow" className="mb-5">{t.risk.tag}</Badge>
          <h2 className={`display-md mb-5 ${headingClass}`}>{t.risk.title}</h2>
          <p className={`text-base md:text-lg leading-relaxed ${bodyClass}`}>{t.risk.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
          <div className="grid md:grid-cols-3 gap-5">
            {riskStages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <FeatureCard
                  icon={stage.icon}
                  title={stage.title}
                  description={stage.description}
                  eyebrow={['01', '02', '03'][index]}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-5">
                <span className="mt-2 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className={`font-display font-light text-xl mb-2 leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
                    {t.risk.alarmTitle}
                  </h3>
                  <p className={`text-sm leading-relaxed ${bodyClass}`}>
                    {t.risk.alarmDescription}
                  </p>
                </div>
              </div>
              <div className={`pt-5 border-t ${hairlineClass} flex flex-wrap gap-1.5`}>
                {t.risk.alarms.map((alarm) => (
                  <Badge key={alarm} variant="neutral">{alarm}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
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
            <Badge variant="eyebrow" className="mb-4">{t.clinicalHighlights.tag}</Badge>
            <h2 className={`display-md ${headingClass}`}>{t.clinicalHighlights.title}</h2>
          </motion.div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 border rounded-md overflow-hidden ${
            isLight ? 'border-ink-100 divide-ink-100' : 'border-slate-800 divide-slate-800'
          }`}>
            {t.clinicalHighlights.items.map((item: any, index: number) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`px-6 py-7 ${isLight ? 'bg-white' : 'bg-slate-900/40'}`}
              >
                <div
                  className={`font-display font-light tabular-nums text-3xl md:text-4xl leading-none mb-3 ${
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
          <Badge variant="eyebrow" className="mb-5">{t.router.tag}</Badge>
          <h2 className={`display-md mb-5 ${headingClass}`}>{t.router.title}</h2>
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
                      ? 'bg-white border-ink-100 shadow-stripe-sm hover:shadow-stripe-md hover:border-accent-200'
                      : 'bg-slate-900/40 border-slate-800/60 hover:border-accent-700/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div className={`w-11 h-11 rounded flex items-center justify-center mb-5 ${
                    isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
                  }`}>
                    <door.icon className={`w-5 h-5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
                  </div>
                  <h3 className={`font-display font-light text-xl mb-3 leading-snug ${headingClass}`} style={{ letterSpacing: 0 }}>
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
