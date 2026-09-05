'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, HeartPulse, Handshake, TrendingUp, ShieldCheck } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'
import { Section } from '@/components/ui/Section'
import { Stat } from '@/components/ui/Stat'
import { Badge } from '@/components/ui/Badge'
import { publicFact, REGISTRATION, OUTCOMES, type FactId } from '@/content/facts'

/**
 * Homepage.
 *
 * A router rather than a summary of the whole site: it establishes who Suntop is,
 * proves it once, sends each of the four audiences onward, and stops.
 *
 * Every figure is read from `facts.ts` — never hard-coded here and never taken from
 * the dictionaries — so all four locales state the same numbers and cannot drift.
 */

const HERO_FACTS: FactId[] = [
  'platform.institutionsDeployed',
  'platform.machinesConnected',
  'group.idcOperating',
  'group.cooperativeCenters',
]

/** Outcomes chosen for the homepage — the rest live on the evidence page. */
const FEATURED_OUTCOMES = ['pre-shock-patients', 'lab-evaluation-time', 'iron-deficiency']

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
}

interface HomeClientProps {
  locale: Locale
  dictionary: Dictionary
}

export default function HomeClient({ locale, dictionary }: HomeClientProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const d = dictionary
  const home = d.home

  const heading = isLight ? 'text-ink-900' : 'text-white'
  const body = isLight ? 'text-warm-ink-500' : 'text-neutral-400'
  const hairline = isLight ? 'border-[#e8e6dc]' : 'border-slate-800'

  const audiences = [
    {
      icon: Building2,
      title: home.audiences.hospitals.title,
      desc: home.audiences.hospitals.description,
      href: `/${locale}/platform`,
      label: d.nav.platform,
      photo: '/images/partnership/treatment-floor.jpg',
    },
    {
      icon: HeartPulse,
      title: home.audiences.patients.title,
      desc: home.audiences.patients.description,
      href: `/${locale}/services`,
      label: d.nav.services,
      photo: '/images/centers/lujiang-xingkang/3.jpg',
    },
    {
      icon: Handshake,
      title: home.audiences.partners.title,
      desc: home.audiences.partners.description,
      href: `/${locale}/deployment`,
      label: d.nav.deployment,
      photo: '/images/partnership/building.jpg',
    },
    {
      icon: TrendingUp,
      title: home.audiences.investors.title,
      desc: home.audiences.investors.description,
      href: `/${locale}/company`,
      label: d.nav.company,
      photo: '/images/centers/hefei-pufukang/3.jpg',
    },
  ]

  const outcomes = OUTCOMES.filter((o) => FEATURED_OUTCOMES.includes(o.id))

  return (
    <>
      {/* ───────── 1. Hero — one claim, two actions, one photograph ─────────
          The claim used to sit alone in the left half with the right half empty.
          A treatment floor of our own says more about what the company is than
          another sentence would. */}
      <Section tone="light" className="!pt-32 !pb-20 md:!pt-40 md:!pb-24">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-12 lg:gap-16 items-center">
        <motion.div {...fade} className="max-w-3xl">
          <Badge variant="eyebrow" className="mb-7">
            {d.home.tag}
          </Badge>
          {/* Name carries the weight; the descriptor sits under it rather than
              competing with it at the same size. */}
          <h1
            className={`font-display font-light leading-[1.06] tracking-tightest text-[2.6rem] md:text-[3.6rem] ${heading}`}
            style={{ textWrap: 'balance' }}
          >
            {d.home.hero.title1}
          </h1>
          <p
            className={`mt-4 font-display font-light leading-snug text-[1.35rem] md:text-[1.7rem] ${
              isLight ? 'text-accent-700' : 'text-accent-300'
            }`}
            style={{ textWrap: 'balance' }}
          >
            {d.home.hero.title2}
          </p>
          <p className={`mt-7 text-lg md:text-xl leading-relaxed max-w-2xl ${body}`}>
            {d.home.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/platform`}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                isLight
                  ? 'bg-accent-700 text-white hover:bg-accent-800'
                  : 'bg-accent-500 text-slate-950 hover:bg-accent-400'
              }`}
            >
              {d.home.cta.explore}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border transition-colors ${
                isLight
                  ? 'border-[#d1cfc5] text-ink-800 hover:bg-[#f0eee6]'
                  : 'border-slate-700 text-neutral-200 hover:bg-slate-800/60'
              }`}
            >
              {d.home.cta.contact}
            </Link>
          </div>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-stripe-lg">
            <Image
              src="/images/partnership/center-5.png"
              alt={d.home.hero.title1}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </motion.div>
        </div>
      </Section>

      {/* ───────── 2. Proof bar — canonical figures, one line each ───────── */}
      <Section tone="subtle" className="!py-16 md:!py-20">
        <motion.div {...fade}>
          <Badge variant="eyebrow" className="mb-8">
            {home.proofEyebrow}
          </Badge>
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 border-t pt-10 ${hairline}`}>
            {HERO_FACTS.map((id, i) => {
              const fact = publicFact(id)
              const labels = [
                d.home.hero.metrics?.[0]?.label ?? '',
                d.home.hero.metrics?.[1]?.label ?? '',
                d.company.stats.team,
                d.company.stats.partners,
              ]
              return <Stat key={id} value={fact.value} label={labels[i]} />
            })}
          </div>
        </motion.div>
      </Section>

      {/* ───────── 3. Audience router — the point of the page ───────── */}
      <Section tone="light">
        <motion.div {...fade} className="mb-14 max-w-2xl">
          <Badge variant="eyebrow" className="mb-6">
            {home.audiences.eyebrow}
          </Badge>
          <h2 className={`font-display font-light text-3xl md:text-[2.5rem] leading-tight ${heading}`}>
            {home.audiences.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px overflow-hidden rounded-2xl border"
             style={{ borderColor: isLight ? '#e8e6dc' : '#1e293b', backgroundColor: isLight ? '#e8e6dc' : '#1e293b' }}>
          {audiences.map((a, i) => (
            <motion.div key={a.title} {...fade} transition={{ ...fade.transition, delay: i * 0.06 }}>
              <Link
                href={a.href}
                className={`group flex h-full flex-col overflow-hidden transition-colors ${
                  isLight ? 'bg-[#faf9f5] hover:bg-[#f5f4ed]' : 'bg-[#0b1624] hover:bg-[#0f1e33]'
                }`}
              >
                {/* A photograph of our own network says more than a 20px icon.
                    The icon stays, over the image, so the card is still readable
                    at a glance. */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={a.photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isLight
                        ? 'linear-gradient(to top, rgba(6,27,49,.45), rgba(6,27,49,0) 55%)'
                        : 'linear-gradient(to top, rgba(6,27,49,.75), rgba(6,27,49,.1) 60%)',
                    }}
                  />
                  <a.icon
                    className="absolute left-6 bottom-5 w-5 h-5 text-white/90"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex h-full flex-col p-8 md:p-10">
                <h3 className={`text-lg font-semibold mb-3 ${heading}`}>{a.title}</h3>
                <p className={`text-[0.95rem] leading-relaxed mb-6 ${body}`}>{a.desc}</p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
                >
                  {a.label}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ───────── 3b. Network — where the centers actually are ─────────
          The SVG is generated by scripts/make-network-map.mjs from the same
          centers-zh-CN.json the map page reads, so it cannot drift from the
          network it depicts. Re-run `npm run map:build` after changing a center. */}
      <Section tone="subtle">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center">
          <motion.div {...fade} className="relative">
            <Image
              src="/images/network-map.svg"
              alt={home.network.title}
              width={1000}
              height={830}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div {...fade}>
            <Badge variant="eyebrow" className="mb-6">
              {home.network.eyebrow}
            </Badge>
            <h2 className={`font-display font-light text-3xl md:text-[2.5rem] leading-tight ${heading}`}>
              {home.network.title}
            </h2>
            <p className={`mt-6 leading-relaxed ${body}`}>{home.network.description}</p>

            <div className={`mt-9 pt-7 border-t space-y-3.5 ${hairline}`}>
              {[
                { swatch: <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#0b1d33' }} />, text: home.network.legendDirect },
                { swatch: <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#0b5f58' }} />, text: home.network.legendPartner },
                { swatch: <span className="w-3.5 h-2.5 rounded-sm shrink-0 border" style={{ backgroundColor: '#7ecdc0', borderColor: '#ffffff' }} />, text: home.network.legendProvince },
              /* Colours mirror scripts/make-network-map.mjs — if the map palette
                 changes there, change it here too or the legend starts lying. */
              ].map((row) => (
                <div key={row.text} className={`flex items-center gap-3 text-sm ${body}`}>
                  {row.swatch}
                  {row.text}
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/company/centers`}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
            >
              {home.network.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <p className={`mt-7 text-xs leading-relaxed ${isLight ? 'text-warm-ink-400' : 'text-neutral-500'}`}>
              {home.network.note}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ───────── 4. Evidence — raw pairs lead, attribution attached ───────── */}
      <Section tone="dark">
        <motion.div {...fade} className="max-w-2xl mb-14">
          <Badge variant="eyebrow" className="mb-6">
            {home.evidence.eyebrow}
          </Badge>
          <h2 className="font-display font-light text-3xl md:text-[2.5rem] leading-tight text-white">
            {home.evidence.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {outcomes.map((o, i) => (
            <motion.div key={o.id} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
              <div className="font-display font-light tabular-nums text-[2.5rem] md:text-[2.75rem] leading-none text-white">
                {o.after}
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm tabular-nums text-neutral-500">
                <span className="uppercase tracking-[0.12em] text-[10px] font-sans font-medium">
                  {home.evidence.from}
                </span>
                <span>{o.before}</span>
              </div>
              <p className="mt-4 pt-4 border-t border-slate-800 text-sm text-neutral-300 font-medium">
                {o.measure}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} className="mt-14 pt-8 border-t border-slate-800">
          <p className="text-xs leading-relaxed text-neutral-500 max-w-2xl">
            {d.home.clinicalHighlights.footnote}
          </p>
          <Link
            href={`/${locale}/clinical`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300"
          >
            {home.evidence.link}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </Section>

      {/* ───────── 5. Registration — the trust asset, stated plainly ───────── */}
      <Section tone="subtle" className="!py-20 md:!py-24">
        <motion.div {...fade} className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-start">
          <ShieldCheck
            className="w-8 h-8 shrink-0"
            style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
            aria-hidden="true"
          />
          <div>
            <Badge variant="eyebrow" className="mb-5">
              {home.regulatory.eyebrow}
            </Badge>
            <h2 className={`font-display font-light text-2xl md:text-3xl leading-tight mb-3 ${heading}`}>
              {home.regulatory.title}
            </h2>
            <p className={`font-mono text-sm mb-8 ${isLight ? 'text-accent-700' : 'text-accent-300'}`}>
              {REGISTRATION.number}
            </p>
            <dl className={`grid sm:grid-cols-[130px_1fr] gap-x-8 gap-y-4 text-sm border-t pt-7 ${hairline}`}>
              <dt className={`font-medium ${body}`}>{home.regulatory.scopeLabel}</dt>
              <dd className={heading}>{REGISTRATION.scope[locale]}</dd>
              <dt className={`font-medium ${body}`}>{home.regulatory.validLabel}</dt>
              <dd className={`font-mono tabular-nums ${heading}`}>{REGISTRATION.expires}</dd>
            </dl>
          </div>
        </motion.div>
      </Section>

      {/* ───────── 6. Close ───────── */}
      <Section tone="light" className="!py-24 md:!py-28">
        <motion.div {...fade} className="text-center max-w-2xl mx-auto">
          <h2 className={`font-display font-light text-3xl md:text-[2.5rem] leading-tight mb-8 ${heading}`}>
            {d.home.finalCta.title}
          </h2>
          <Link
            href={`/${locale}/contact`}
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors ${
              isLight
                ? 'bg-accent-700 text-white hover:bg-accent-800'
                : 'bg-accent-500 text-slate-950 hover:bg-accent-400'
            }`}
          >
            {d.home.cta.start}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Section>
    </>
  )
}
