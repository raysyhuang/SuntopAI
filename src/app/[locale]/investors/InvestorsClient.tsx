'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Check, Minus, FileText } from 'lucide-react'
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

/**
 * Same four facts, in the same order, as the homepage proof bar — so a reader who
 * arrives here from the homepage sees consistent numbers rather than a second set.
 *
 * The labels come from the dictionary, not from `Fact.basis`. `basis` is an English
 * description of what is being counted, written for whoever maintains facts.ts; it is
 * not translated, so rendering it as a label put English text on the Chinese,
 * Japanese and Traditional Chinese pages.
 */
const SCALE_FACTS: FactId[] = [
  'platform.institutionsDeployed',
  'platform.machinesConnected',
  'group.idcOperating',
  'group.cooperativeCenters',
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
            {SCALE_FACTS.map((id, i) => {
              const f = publicFact(id)
              const labels = [
                dictionary.home.hero.metrics?.[0]?.label ?? '',
                dictionary.home.hero.metrics?.[1]?.label ?? '',
                dictionary.company.stats.team,
                dictionary.company.stats.partners,
              ]
              return <Stat key={id} value={f.value} label={labels[i]} detail={f.asOf} />
            })}
          </div>
        </motion.div>
      </Section>

      {/* Positioning: which segments of the chain we hold.
          The comparison table is our own read of market structure, not an assessment
          of named companies — pillarsCompareNote says so under the table. */}
      <Section tone="light">
        <motion.div {...fade} className="max-w-3xl mb-12">
          <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-6 ${heading}`}>
            {t.pillarsTitle}
          </h2>
          <p className={`leading-relaxed ${body}`}>{t.pillarsIntro}</p>
        </motion.div>

        <motion.div {...fade} className="grid md:grid-cols-3 gap-6 mb-14">
          {t.pillars.map((p) => (
            <div
              key={p.tag}
              className={`rounded-lg border p-6 flex flex-col ${
                isLight ? 'border-[#e8e6dc] bg-white' : 'border-slate-800 bg-slate-925'
              }`}
            >
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-accent-600 dark:text-accent-400">
                {p.tag}
              </span>
              <h3 className={`mt-2 text-xl font-display font-light ${heading}`}>{p.title}</h3>
              <p className={`mt-3 flex-1 text-sm leading-relaxed ${body}`}>{p.description}</p>
              <p className={`mt-4 pt-4 border-t text-xs font-medium ${hairline} ${
                isLight ? 'text-accent-700' : 'text-accent-400'
              }`}>
                {p.metric}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fade} className="max-w-3xl">
          <h3 className={`text-sm font-medium mb-4 ${heading}`}>{t.pillarsCompareTitle}</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className={`border-b ${hairline}`}>
                  <th className={`py-2.5 pr-4 text-left font-medium ${muted}`}>{t.pillarsCompareHead.role}</th>
                  {(['system', 'supply', 'endpoint'] as const).map((c) => (
                    <th key={c} className={`py-2.5 px-3 text-center font-medium w-24 ${muted}`}>
                      {t.pillarsCompareHead[c]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.pillarsCompareRows.map((r) => (
                  <tr key={r.label} className={`border-b ${hairline}`}>
                    <td className={`py-3 pr-4 ${heading}`}>{r.label}</td>
                    {(['system', 'supply', 'endpoint'] as const).map((c) => (
                      <td key={c} className="py-3 px-3 text-center">
                        {r[c] ? (
                          <Check className="inline w-4 h-4 text-accent-600 dark:text-accent-400" aria-hidden />
                        ) : (
                          <Minus className={`inline w-4 h-4 ${isLight ? 'text-warm-ink-300' : 'text-slate-700'}`} aria-hidden />
                        )}
                        <span className="sr-only">{r[c] ? '✓' : '—'}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-5 text-xs leading-relaxed ${muted}`}>{t.pillarsCompareNote}</p>
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
                  <span className="text-sm text-neutral-300">
                    {t.prevalenceLabels[p.key]}
                    {/* The four registries publish for different years, so each bar
                        carries its own — without it the comparison misleads. */}
                    <span className="ml-2 font-mono text-[0.68rem] tabular-nums text-neutral-500">
                      {publicFact(p.fact).asOf}
                    </span>
                  </span>
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

      {/* Policy environment — stated as issued, with the year on each entry. */}
      <Section tone="subtle">
        <motion.div {...fade} className="max-w-3xl mb-12">
          <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-6 ${heading}`}>
            {t.policyTitle}
          </h2>
          <p className={`leading-relaxed ${body}`}>{t.policyIntro}</p>
        </motion.div>

        <motion.div {...fade} className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
          {t.policyItems.map((item) => (
            <div key={item.title}>
              <h3 className={`text-[0.95rem] font-medium mb-2 ${heading}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed ${body}`}>{item.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.p {...fade} className={`mt-10 max-w-3xl text-xs leading-relaxed ${muted}`}>
          {t.policyNote}
        </motion.p>
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

          {/* Listed, not linked. The profile is sent after a request is reviewed, so
              there is no file in /public that would bypass the gate. */}
          <div className={`mb-9 border-t pt-6 ${hairline}`}>
            <h3 className={`text-xs font-medium tracking-wide mb-4 ${muted}`}>{t.materialsItemsTitle}</h3>
            <ul className="space-y-2.5">
              {t.materialsItems.map((item) => (
                <li key={item} className={`flex items-start gap-2.5 text-sm ${body}`}>
                  <FileText className="w-4 h-4 mt-0.5 shrink-0 text-accent-600 dark:text-accent-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

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
