'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, Award, Briefcase, Building } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface CompanyClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const valueIcons = [Heart, Target, Eye, Users]

const leadership = [
  { name: 'Dr. James Chen', titleKey: 'ceo', credential: '20+ years healthcare technology' },
  { name: 'Dr. Sarah Liu', titleKey: 'cmo', credential: '15+ years nephrology' },
  { name: 'Michael Zhang', titleKey: 'cto', credential: 'AI systems expert' },
  { name: 'Lisa Wang', titleKey: 'vp', credential: 'Dialysis operations' },
]

export default function CompanyClient({ locale, dictionary }: CompanyClientProps) {
  const t = dictionary.company
  const { theme } = useTheme()

  return (
    <div className="relative pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 radial-gradient" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-4xl"
          >
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {t.tag}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl font-semibold tracking-tightest text-white mb-6"
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-400 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-32 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-institutional gradient-border"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-accent-400" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white mb-4">{t.mission.title}</h2>
              <p className="text-neutral-400 leading-relaxed">{t.mission.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-institutional gradient-border"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent-400" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white mb-4">{t.vision.title}</h2>
              <p className="text-neutral-400 leading-relaxed">{t.vision.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8">
                {t.about.title}
              </h2>
              <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
                {t.about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-32 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {t.values.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t.values.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((value, index) => {
              const IconComponent = valueIcons[index % valueIcons.length]
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-institutional text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-accent-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {t.leadership.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t.leadership.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <Users className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="font-display font-semibold text-white mb-1">{person.name}</h3>
                <p className="text-accent-400 text-sm mb-2">{person.titleKey}</p>
                <p className="text-neutral-500 text-xs">{person.credential}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-neutral-500 text-sm mt-12 italic"
          >
            {t.leadership.note}
          </motion.p>
        </div>
      </section>

      {/* Company Stats */}
      <section className="relative py-24 bg-slate-925 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Building, value: '50+', label: t.stats.founded },
              { icon: Users, value: '30+', label: t.stats.team },
              { icon: Award, value: '25+', label: t.stats.partners },
              { icon: Briefcase, value: '3000+', label: t.stats.stations },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-accent-400 mx-auto mb-3" />
                <div className="text-3xl font-display font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-neutral-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
