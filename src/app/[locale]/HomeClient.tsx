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
import {
  publicFact,
  REGISTRATION,
  OUTCOMES,
  OUTCOMES_ATTRIBUTION,
  type FactId,
} from '@/content/facts'
import { NetworkMap } from '@/components/NetworkMap'

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

/*
  Deliberately empty, and kept as a named object so the call sites do not all have
  to change to say the same thing.

  This used to fade every section up on scroll. Two problems, and they point the
  same way. Framer writes `initial` into the server HTML, so opacity:0 shipped in
  the markup on 35 blocks and none of them were readable until hydration finished —
  blank on a slow connection, permanently blank if the bundle failed. And an
  identical entrance on every section is not motion design; it is a tic. The site
  keeps one authored moment, the network map assembling itself, which carries
  meaning the page would otherwise have to state.
*/
const fade = {}

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
      focus: 'center 42%',
    },
    {
      icon: HeartPulse,
      title: home.audiences.patients.title,
      desc: home.audiences.patients.description,
      href: `/${locale}/services`,
      label: d.nav.services,
      photo: '/images/centers/lujiang-xingkang/3.jpg',
      focus: 'center 34%',
    },
    {
      icon: Handshake,
      title: home.audiences.partners.title,
      desc: home.audiences.partners.description,
      href: `/${locale}/deployment`,
      label: d.nav.deployment,
      photo: '/images/partnership/building.jpg',
      focus: 'center 45%',
    },
    {
      icon: TrendingUp,
      title: home.audiences.investors.title,
      desc: home.audiences.investors.description,
      href: `/${locale}/company`,
      label: d.nav.company,
      photo: '/images/centers/hefei-pufukang/3.jpg',
      focus: 'center center',
    },
  ]

  const outcomes = OUTCOMES.filter((o) => FEATURED_OUTCOMES.includes(o.id))

  return (
    <>
      {/* ───────── 1. Hero ─────────
          Full-bleed and dark, because the subject is a clinical floor and the page
          should open inside one rather than describe it from a beige page. The
          photograph is the only thing above the fold that proves the system is in
          use; everything else is a claim.

          No eyebrow label above the heading — the heading carries its own weight,
          and a small tag over a big line is the shape of a template. */}
      <section className="relative isolate grain overflow-hidden bg-[#060d18]">
        <div className="absolute inset-0">
          <Image
            src="/images/partnership/center-5.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
          {/*
            Two scrims, not one. A single flat overlay greys the photograph out; a
            dark wash from the left for the text plus a gentle lift from the bottom
            keeps the clinical detail readable on the right where nothing sits on it.
          */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, #060d18 0%, rgba(6,13,24,0.94) 38%, rgba(6,13,24,0.62) 62%, rgba(6,13,24,0.30) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(to top, rgba(6,13,24,0.85), transparent)' }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-40 pb-28 md:pt-52 md:pb-36">
          <div className="max-w-[46rem]">
            {/* The claim leads; the descriptor sits under it at a size that still
                carries, rather than shrinking to a label above the headline. */}
            <h1
              className="font-display font-light text-white leading-[1.04] tracking-[-0.035em] text-[3.1rem] sm:text-[3.9rem] lg:text-[4.7rem]"
              style={{ textWrap: 'balance' }}
            >
              {d.home.hero.title1}
            </h1>
            <p className="mt-6 text-accent-300 text-[1.35rem] md:text-[1.7rem] font-light leading-snug tracking-tight">
              {d.home.hero.title2}
            </p>
            {/* The two figures in this sentence are the same ones the proof bar
                below renders. They are interpolated rather than written into the
                dictionary so a change in facts.ts reaches all four locales at once
                and cannot leave the headline contradicting the bar under it. */}
            <p className="mt-8 max-w-[38rem] text-[1.05rem] md:text-lg leading-[1.85] text-neutral-300">
              {d.home.hero.subtitle
                .replace('{centers}', publicFact('platform.institutionsDeployed').value)
                .replace('{direct}', publicFact('group.idcOperating').value)}
            </p>

            <div className="mt-11 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/platform`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:bg-neutral-200"
              >
                {d.home.cta.explore}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {d.home.cta.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 2. Proof bar — canonical figures, one line each ───────── */}
      <Section tone="subtle" className="!py-16 md:!py-20">
        <motion.div {...fade}>
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

      {/* ───────── 3. Not a concept ─────────
          The claim in the hero is that conventional units become smart ones. This is
          where that claim gets its evidence, and the evidence is deliberately
          platform-side: devices actually connected, patients actually on the system,
          records actually held. Those are countable and current, unlike a treatment
          volume that has to be asserted. See POSITIONING.md. */}
      <Section tone="dark">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-20">
          <div>
            <h2 className="font-display font-light text-3xl md:text-[2.6rem] leading-tight text-white">
              {home.shift.title}
            </h2>
            <p className="mt-7 leading-[1.85] text-neutral-300">{home.shift.body}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 self-center">
            {([
              ['platform.machinesConnected', home.shift.labels.machines],
              ['platform.patientsOnSystem', home.shift.labels.patients],
              ['platform.monitoringRecords', home.shift.labels.sessions],
              ['platform.iotRecords', home.shift.labels.telemetry],
            ] as Array<[FactId, string]>).map(([id, label]) => (
              <div key={id}>
                <div className="font-display font-light tabular-nums text-[2.1rem] md:text-[2.5rem] leading-none text-white">
                  {publicFact(id).value}
                </div>
                <div className="mt-2.5 text-sm leading-snug text-neutral-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 max-w-3xl text-xs leading-relaxed text-neutral-500">
          {home.shift.note}
        </p>
      </Section>

      {/* ───────── 4. What the AI actually changed ─────────
          The one section an expert audience has not read on a competitor's site.
          Scale, chain operation and management systems are familiar to them; a
          clinician regaining the hours to re-check a plan at every session is not.

          The claim here is deliberately about REVIEW FREQUENCY, not about outcomes.
          Frequency is a workflow fact the registered scope (transmit, display,
          process) fully supports, and it needs no trial to stand up. The clinical
          consequence — fewer intradialytic hypotension events from more accurate
          ultrafiltration — is real but is an outcome claim: it needs an N and a
          documented study design before it can be published, and dry-weight
          prediction sits in CAPABILITY_TIERS as in-validation. See POSITIONING.md. */}
      <Section tone="light">
        <motion.div {...fade} className="max-w-3xl">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] font-medium" style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}>
            {home.loop.eyebrow}
          </p>
          <h2 className={`mt-5 font-display font-light text-3xl md:text-[2.6rem] leading-tight ${heading}`}>
            {home.loop.title}
          </h2>
        </motion.div>

        {/* Before and after, weighted. The past is stated without disdain — the
            constraint was hours, not care — so the contrast lands as capacity
            returned rather than as a competitor being criticised. */}
        <div className="mt-14 grid md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            {...fade}
            className={`rounded-2xl border p-8 lg:p-10 ${hairline}`}
            style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.015)' : 'rgba(255,255,255,0.02)' }}
          >
            <div className={`text-xs uppercase tracking-[0.18em] ${isLight ? 'text-warm-ink-400' : 'text-neutral-500'}`}>
              {home.loop.beforeLabel}
            </div>
            <p className={`mt-5 leading-[1.85] ${isLight ? 'text-warm-ink-500' : 'text-neutral-400'}`}>
              {home.loop.beforeBody}
            </p>
          </motion.div>

          <motion.div
            {...fade}
            className="rounded-2xl border p-8 lg:p-10"
            style={{
              borderColor: isLight ? '#0f766e33' : '#2dd4bf33',
              backgroundColor: isLight ? '#0f766e0a' : '#2dd4bf0d',
            }}
          >
            <div className="text-xs uppercase tracking-[0.18em] font-medium" style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}>
              {home.loop.afterLabel}
            </div>
            <p className={`mt-5 leading-[1.85] ${heading}`}>{home.loop.afterBody}</p>
          </motion.div>
        </div>

        {/* The four parts, as a loop rather than a feature list — the point of the
            section is that none of them delivers anything on its own. */}
        <motion.div {...fade} className={`mt-20 pt-14 border-t ${hairline}`}>
          <div className="max-w-2xl">
            <h3 className={`font-display font-light text-2xl md:text-[1.9rem] leading-snug ${heading}`}>
              {home.loop.loopTitle}
            </h3>
            <p className={`mt-5 leading-relaxed ${body}`}>{home.loop.loopBody}</p>
          </div>

          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {home.loop.steps.map((step, i) => (
              <li key={step.title} className={`border-t pt-6 ${hairline}`}>
                <div className="font-mono text-xs tabular-nums" style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className={`mt-4 font-display text-lg font-light ${heading}`}>{step.title}</div>
                <p className={`mt-3 text-sm leading-[1.8] ${body}`}>
                  {step.body.replace('{machines}', publicFact('platform.machinesConnected').value)}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>

        <p className={`mt-14 max-w-3xl text-xs leading-relaxed ${isLight ? 'text-warm-ink-400' : 'text-neutral-500'}`}>
          {home.loop.note}
        </p>
      </Section>

      {/* ───────── 5. How the market is counted ─────────
          The single most important paragraph for an investor, and it was missing
          from the site entirely — it existed only in the deck. Because we sell
          transformation rather than replacement, the installed base is addressable
          too, which inverts the usual arithmetic where a maturing sector shrinks
          the opportunity. Stated as an argument about addressable market, never as
          a claim about customers already signed. See POSITIONING.md. */}
      <Section tone="dark">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-20">
          <motion.div {...fade}>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] font-medium text-accent-300">
              {home.opportunity.eyebrow}
            </p>
            <h2 className="mt-5 font-display font-light text-3xl md:text-[2.6rem] leading-tight text-white">
              {home.opportunity.title}
            </h2>
            <p className="mt-7 leading-[1.85] text-neutral-300">{home.opportunity.body}</p>

            <div className="mt-12 border-t border-slate-800 pt-8">
              <div className="font-display font-light tabular-nums text-[3rem] md:text-[3.6rem] leading-none text-white">
                {publicFact('market.chinaCenters').value}
              </div>
              <div className="mt-3 text-sm text-neutral-400">{home.opportunity.figureLabel}</div>
            </div>
          </motion.div>

          {/* Old arithmetic above, new below, so the reader arrives at the second
              one having just agreed with the first. */}
          <div className="space-y-px self-center overflow-hidden rounded-2xl bg-slate-800">
            {([
              [home.opportunity.oldLabel, home.opportunity.oldBody, false],
              [home.opportunity.newLabel, home.opportunity.newBody, true],
            ] as Array<[string, string, boolean]>).map(([label, text, isNew]) => (
              <motion.div
                key={label}
                {...fade}
                className="p-8 lg:p-10"
                style={{ backgroundColor: isNew ? '#0d1f2b' : '#0b1624' }}
              >
                <div
                  className="text-xs uppercase tracking-[0.18em] font-medium"
                  style={{ color: isNew ? '#2dd4bf' : '#64748b' }}
                >
                  {label}
                </div>
                <p className={`mt-4 leading-[1.85] ${isNew ? 'text-white' : 'text-neutral-400'}`}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-14 max-w-3xl text-xs leading-relaxed text-neutral-500">
          {home.opportunity.note}
        </p>
      </Section>

      {/* ───────── 6. Network — where the centers actually are ─────────
          The SVG is generated by scripts/make-network-map.mjs from the same
          centers-zh-CN.json the map page reads, so it cannot drift from the
          network it depicts. Re-run `npm run map:build` after changing a center. */}
      <Section tone="subtle">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center">
          <motion.div {...fade}>
            <NetworkMap alt={home.network.title} />
          </motion.div>

          <motion.div {...fade}>
            <h2 className={`font-display font-light text-3xl md:text-[2.5rem] leading-tight ${heading}`}>
              {home.network.title}
            </h2>
            <p className={`mt-6 leading-relaxed ${body}`}>{home.network.description}</p>

            <div className={`mt-9 pt-7 border-t space-y-3.5 ${hairline}`}>
              {[
                { swatch: <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#0b1d33' }} />, text: home.network.legendDirect },
                { swatch: <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#0b5f58' }} />, text: home.network.legendPartner },
                { swatch: <span className="w-3.5 h-2.5 rounded-sm shrink-0 border" style={{ backgroundColor: '#7ecdc0', borderColor: '#ffffff' }} />, text: home.network.legendProvince },
                { swatch: <span className="w-3.5 h-2.5 rounded-sm shrink-0 border" style={{ backgroundColor: '#cfe9e3', borderColor: '#ffffff' }} />, text: home.network.legendReach },
                { swatch: <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#4b9c92' }} />, text: home.network.legendEnabled },
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

      {/* ───────── 7. Evidence — raw pairs lead, attribution attached ───────── */}
      <Section tone="dark">
        <motion.div {...fade} className="max-w-2xl mb-14">
          <h2 className="font-display font-light text-3xl md:text-[2.5rem] leading-tight text-white">
            {home.evidence.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {outcomes.map((o, i) => (
            <motion.div key={o.id} {...fade}>
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
                {o.measure[locale]}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} className="mt-14 pt-8 border-t border-slate-800">
          {/* From facts.ts, not the dictionary. These outcomes carry no documented
              study design yet, so the attribution is the condition of publishing
              them at all — it cannot be allowed to drift out of sync in one locale
              the way a copied string can. */}
          <p className="text-xs leading-relaxed text-neutral-500 max-w-2xl">
            {OUTCOMES_ATTRIBUTION[locale]}
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

      {/* ───────── 8. Registration — the trust asset, stated plainly ───────── */}
      <Section tone="subtle" className="!py-20 md:!py-24">
        <motion.div {...fade} className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-start">
          <ShieldCheck
            className="w-8 h-8 shrink-0"
            style={{ color: isLight ? '#0f766e' : '#2dd4bf' }}
            aria-hidden="true"
          />
          <div>
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

      {/* ───────── 9. Audience router ─────────
          Sits after the argument, not inside it. These cards are navigation: put
          between the evidence and the market case they interrupt a line of
          reasoning that is meant to be read straight through. */}
      <Section tone="light">
        <motion.div {...fade} className="mb-14 max-w-2xl">
          <h2 className={`font-display font-light text-3xl md:text-[2.5rem] leading-tight ${heading}`}>
            {home.audiences.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px overflow-hidden rounded-2xl border"
             style={{ borderColor: isLight ? '#e8e6dc' : '#1e293b', backgroundColor: isLight ? '#e8e6dc' : '#1e293b' }}>
          {audiences.map((a, i) => (
            <motion.div key={a.title} {...fade}>
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
                    style={{ objectPosition: a.focus }}
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

      {/* ───────── 10. Close ───────── */}
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
