'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, CircleCheck, CircleDot, FlaskConical } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { REGISTRATION, BRAND } from '@/content/facts'

/**
 * Regulatory page — the site's primary trust asset.
 *
 * Certificate values come from `REGISTRATION` in facts.ts so they can never be
 * mistyped per locale; only the field labels are translated. The registered scope
 * is reproduced verbatim, because narrowing or paraphrasing it would misstate what
 * the certificate actually covers.
 */

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
}

interface RegulatoryClientProps {
  locale: Locale
  dictionary: Dictionary
}

export default function RegulatoryClient({ locale, dictionary }: RegulatoryClientProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const t = dictionary.regulatoryPage

  const heading = isLight ? 'text-ink-900' : 'text-white'
  const body = isLight ? 'text-warm-ink-500' : 'text-neutral-400'
  const hairline = isLight ? 'border-[#e8e6dc]' : 'border-slate-800'

  const rows: Array<{ label: string; value: string; mono?: boolean }> = [
    { label: t.fields.number, value: REGISTRATION.number, mono: true },
    { label: t.fields.registrant, value: BRAND.subsidiary[locale] },
    { label: t.fields.device, value: REGISTRATION.deviceName[locale] },
    { label: t.fields.model, value: `${REGISTRATION.model} · v${REGISTRATION.release}`, mono: true },
    { label: t.fields.structure, value: REGISTRATION.structure },
    { label: t.fields.scope, value: REGISTRATION.scope[locale] },
    { label: t.fields.authority, value: REGISTRATION.authority[locale] },
    { label: t.fields.approved, value: REGISTRATION.approved, mono: true },
    { label: t.fields.expires, value: REGISTRATION.expires, mono: true },
  ]

  const tiers = [
    { key: 'registered', icon: CircleCheck, ...t.tiers.registered },
    { key: 'support', icon: CircleDot, ...t.tiers.support },
    { key: 'validation', icon: FlaskConical, ...t.tiers.validation },
  ]

  return (
    <>
      {/* ───────── Header ───────── */}
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

      {/* ───────── Certificate ───────── */}
      <Section tone="subtle" className="!py-20 md:!py-24">
        <motion.div {...fade}>
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck
              className="w-6 h-6 shrink-0"
              style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
              aria-hidden="true"
            />
            <h2 className={`font-display font-light text-2xl md:text-3xl ${heading}`}>{t.certTitle}</h2>
          </div>

          <dl className={`border-t ${hairline}`}>
            {rows.map((row) => (
              <div
                key={row.label}
                className={`grid gap-2 sm:grid-cols-[minmax(150px,220px)_1fr] sm:gap-8 py-4 border-b ${hairline}`}
              >
                <dt className={`text-sm font-medium ${body}`}>{row.label}</dt>
                <dd
                  className={`text-sm leading-relaxed ${heading} ${
                    row.mono ? 'font-mono tabular-nums' : ''
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className={`mt-7 text-xs leading-relaxed max-w-2xl ${body}`}>{t.renewalNote}</p>
        </motion.div>
      </Section>

      {/* ───────── Capability tiers ───────── */}
      <Section tone="light">
        <motion.div {...fade} className="max-w-2xl mb-12">
          <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-5 ${heading}`}>
            {t.tiersTitle}
          </h2>
          <p className={`leading-relaxed ${body}`}>{t.tiersIntro}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              className={`rounded-2xl border p-7 ${
                isLight
                  ? '[background-color:#faf9f5] [border-color:#e8e6dc]'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <tier.icon
                className="w-5 h-5 mb-5"
                style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
                aria-hidden="true"
              />
              <h3 className={`text-base font-semibold mb-3 ${heading}`}>{tier.label}</h3>
              <p className={`text-sm leading-relaxed ${body}`}>{tier.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  )
}
