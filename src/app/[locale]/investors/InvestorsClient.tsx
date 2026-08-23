'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Stat } from '@/components/ui/Stat'
import { publicFact, type FactId } from '@/content/facts'

/**
 * Investors page — public overview only.
 *
 * Financial projections, the expansion plan and the deck stay behind a request
 * flow, so nothing on this page states a forward-looking number. Every figure here
 * comes from `facts.ts` and carries its own "as of" date, since the group and
 * market figures are older than the platform ones and should not read as current.
 */

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
}

const SCALE_FACTS: FactId[] = [
  'platform.institutionsDeployed',
  'platform.machinesConnected',
  'group.idcOperating',
  'group.patientsTreated',
]

const PREVALENCE: Array<{ key: 'china' | 'japan' | 'taiwan' | 'usa'; fact: FactId }> = [
  { key: 'china', fact: 'market.chinaPrevalence' },
  { key: 'japan', fact: 'market.japanPrevalence' },
  { key: 'taiwan', fact: 'market.taiwanPrevalence' },
  { key: 'usa', fact: 'market.usPrevalence' },
]

interface InvestorsClientProps {
  locale: Locale
  dictionary: Dictionary
}

export default function InvestorsClient({ locale, dictionary }: InvestorsClientProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const t = dictionary.investorsPage

  const heading = isLight ? 'text-ink-900' : 'text-white'
  const body = isLight ? 'text-warm-ink-500' : 'text-neutral-400'
  const muted = isLight ? 'text-warm-ink-400' : 'text-neutral-500'
  const hairline = isLight ? 'border-[#e8e6dc]' : 'border-slate-800'

  /** Widest prevalence value sets the bar scale, so the comparison reads honestly. */
  const pct = (v: string) => parseFloat(v.replace(/[^0-9.]/g, '')) || 0
  const maxPct = Math.max(...PREVALENCE.map((p) => pct(publicFact(p.fact).value)))

  return (
    <>
      {/* Header */}
      <Section tone="light" className="!pt-32 !pb-16 md:!pt-40 md:!pb-20">
        <motion.div {...fade} className="max-w-3xl">
          <Badge variant="eyebrow" className="mb-7">
            {t.tag}
          </Badge>
          <h1
            className={`font-display font-light leading-[1.08] tracking-tightest text-[2.4rem] md:text-[3.2rem] ${heading}`}
            style={{ textWrap: 'balance' }}
          >
            {t.title}
          </h1>
          <p className={`mt-7 text-lg leading-relaxed ${body}`}>{t.subtitle}</p>
        </motion.div>
      </Section>

      {/* Position */}
      <Section tone="subtle">
        <motion.div {...fade} className="max-w-3xl">
          <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-6 ${heading}`}>
            {t.positionTitle}
          </h2>
          <p className={`text-[1.05rem] leading-relaxed ${body}`}>{t.positionBody}</p>
        </motion.div>
      </Section>

      {/* Scale */}
      <Section tone="light" className="!py-20 md:!py-24">
        <motion.div {...fade}>
          <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-10 ${heading}`}>
            {t.scaleTitle}
          </h2>
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 border-t pt-10 ${hairline}`}>
            {SCALE_FACTS.map((id) => {
              const f = publicFact(id)
              return <Stat key={id} value={f.value} label={f.basis} detail={f.asOf} />
            })}
          </div>
        </motion.div>
      </Section>

      {/* Market */}
      <Section tone="dark">
        <motion.div {...fade} className="max-w-3xl mb-12">
          <h2 className="font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-6 text-white">
            {t.marketTitle}
          </h2>
          <p className="text-neutral-400 leading-relaxed">{t.marketBody}</p>
        </motion.div>

        <motion.div {...fade} className="max-w-3xl">
          <div className="flex flex-col gap-5">
            {PREVALENCE.map((p) => {
              const value = publicFact(p.fact).value
              const width = Math.max((pct(value) / maxPct) * 100, 4)
              return (
                <div key={p.key} className="grid grid-cols-[minmax(90px,140px)_1fr_auto] items-center gap-4">
                  <span className="text-sm text-neutral-300">{t.prevalenceLabels[p.key]}</span>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: p.key === 'china' ? '#2dd4bf' : '#64748b' }}
                    />
                  </div>
                  <span className="font-mono tabular-nums text-sm text-white">{value}</span>
                </div>
              )
            })}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-neutral-500">{t.marketNote}</p>
        </motion.div>
      </Section>

      {/* Business model */}
      <Section tone="light">
        <motion.h2
          {...fade}
          className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-10 ${heading}`}
        >
          {t.modelTitle}
        </motion.h2>
        <div className={`border-t ${hairline}`}>
          {t.modelItems.map((m, i) => (
            <motion.div
              key={m.title}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.05 }}
              className={`grid gap-2 md:grid-cols-[minmax(200px,280px)_1fr] md:gap-8 py-6 border-b ${hairline}`}
            >
              <h3 className={`text-base font-semibold ${heading}`}>{m.title}</h3>
              <p className={`text-[0.95rem] leading-relaxed ${body}`}>{m.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Governance */}
      <Section tone="subtle" className="!py-20 md:!py-24">
        <motion.div {...fade} className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start max-w-4xl">
          <ShieldCheck
            className="w-7 h-7 shrink-0"
            style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
            aria-hidden="true"
          />
          <div>
            <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-5 ${heading}`}>
              {t.governanceTitle}
            </h2>
            <p className={`leading-relaxed mb-7 ${body}`}>{t.governanceBody}</p>
            <Link
              href={`/${locale}/company/certifications`}
              className="inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
            >
              {t.governanceCta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Gated materials */}
      <Section tone="light" className="!py-24 md:!py-28">
        <motion.div {...fade} className="max-w-2xl">
          <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-5 ${heading}`}>
            {t.materialsTitle}
          </h2>
          <p className={`leading-relaxed mb-8 ${body}`}>{t.materialsBody}</p>
          <Link
            href={`/${locale}/contact`}
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors ${
              isLight
                ? 'bg-accent-700 text-white hover:bg-accent-800'
                : 'bg-accent-500 text-slate-950 hover:bg-accent-400'
            }`}
          >
            {t.materialsCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className={`mt-10 pt-6 border-t text-xs leading-relaxed ${hairline} ${muted}`}>
            {t.materialsNote}
          </p>
        </motion.div>
      </Section>
    </>
  )
}
