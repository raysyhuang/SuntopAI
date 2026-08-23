'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, Store, Cable, PackageCheck, GraduationCap } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Stat } from '@/components/ui/Stat'
import { publicFact } from '@/content/facts'

/**
 * Partners page.
 *
 * Named collaborations are cleared but marked low-key in facts.ts, so they appear
 * as body copy rather than a logo wall or hero claim. The partner-hospital list is
 * not duplicated here — it already lives on the company page, and this links to it.
 */

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
}

const MODEL_ICONS = [Building2, Store, Cable, PackageCheck, GraduationCap]

interface PartnersClientProps {
  locale: Locale
  dictionary: Dictionary
}

export default function PartnersClient({ locale, dictionary }: PartnersClientProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const t = dictionary.partnersPage

  const heading = isLight ? 'text-ink-900' : 'text-white'
  const body = isLight ? 'text-warm-ink-500' : 'text-neutral-400'
  const hairline = isLight ? 'border-[#e8e6dc]' : 'border-slate-800'

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

      {/* Partnership models */}
      <Section tone="subtle">
        <motion.h2
          {...fade}
          className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-12 ${heading}`}
        >
          {t.modelsTitle}
        </motion.h2>

        <div className={`border-t ${hairline}`}>
          {t.models.map((m, i) => {
            const Icon = MODEL_ICONS[i] ?? Building2
            return (
              <motion.div
                key={m.title}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.05 }}
                className={`grid gap-4 md:grid-cols-[40px_minmax(180px,240px)_1fr] md:gap-8 py-8 border-b ${hairline}`}
              >
                <Icon
                  className="w-5 h-5 mt-1"
                  style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
                  aria-hidden="true"
                />
                <h3 className={`text-base font-semibold ${heading}`}>{m.title}</h3>
                <p className={`text-[0.95rem] leading-relaxed ${body}`}>{m.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Network + selected collaborations */}
      <Section tone="light">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <motion.div {...fade}>
            <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-5 ${heading}`}>
              {t.networkTitle}
            </h2>
            <p className={`leading-relaxed mb-9 ${body}`}>{t.networkDescription}</p>

            <div className={`grid grid-cols-2 gap-8 border-t pt-8 ${hairline}`}>
              <Stat
                value={publicFact('group.cooperativeCenters').value}
                label={dictionary.company.stats.partners}
              />
              <Stat
                value={publicFact('group.vascularAccessCenters').value}
                label={dictionary.footer.links.vascularAccess}
              />
            </div>

            <Link
              href={`/${locale}/company#partners`}
              className="mt-9 inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
            >
              {t.networkCta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.08 }}>
            <h2 className={`font-display font-light text-2xl md:text-[2.1rem] leading-tight mb-8 ${heading}`}>
              {t.collaborationsTitle}
            </h2>
            <div className={`border-t ${hairline}`}>
              {t.collaborations.map((c) => (
                <div key={c.partner} className={`py-6 border-b ${hairline}`}>
                  <p className={`text-[0.95rem] font-semibold mb-2 ${heading}`}>{c.partner}</p>
                  <p className={`text-sm leading-relaxed ${body}`}>{c.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="dark" className="!py-24 md:!py-28">
        <motion.div {...fade} className="max-w-2xl">
          <h2 className="font-display font-light text-3xl md:text-[2.5rem] leading-tight mb-5 text-white">
            {t.ctaTitle}
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-9">{t.ctaDescription}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium bg-accent-500 text-slate-950 hover:bg-accent-400 transition-colors"
          >
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Section>
    </>
  )
}
