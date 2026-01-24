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
      <section 
        className="relative py-32 overflow-hidden"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        {theme === 'dark' && (
          <>
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 radial-gradient" />
          </>
        )}
        
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
              className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl leading-relaxed"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8"
              style={{ 
                backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                boxShadow: theme === 'light' ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
                border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
              >
                <Target style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
              </div>
              <h2 
                className="font-display text-2xl font-semibold mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.mission.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="leading-relaxed">{t.mission.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-8"
              style={{ 
                backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                boxShadow: theme === 'light' ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
                border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
              >
                <Eye style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
              </div>
              <h2 
                className="font-display text-2xl font-semibold mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.vision.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="leading-relaxed">{t.vision.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-8"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.about.title}
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                {t.about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.values.title}
            </h2>
            <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
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
                  className="text-center rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                  >
                    <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                  </div>
                  <h3 
                    className="font-display font-semibold mb-2"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section 
        id="leadership" 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.leadership.title}
            </h2>
            <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
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
                <div 
                  className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: theme === 'light' 
                      ? 'linear-gradient(135deg, #e5e5e5, #f5f5f5)' 
                      : 'linear-gradient(135deg, #334155, #475569)'
                  }}
                >
                  <Users style={{ color: theme === 'light' ? '#86868b' : '#64748b' }} className="w-12 h-12" />
                </div>
                <h3 
                  className="font-display font-semibold mb-1"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {person.name}
                </h3>
                <p style={{ color: '#007d73' }} className="text-sm mb-2">{person.titleKey}</p>
                <p style={{ color: theme === 'light' ? '#86868b' : '#64748b' }} className="text-xs">{person.credential}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm mt-12 italic"
            style={{ color: theme === 'light' ? '#86868b' : '#64748b' }}
          >
            {t.leadership.note}
          </motion.p>
        </div>
      </section>

      {/* Company Stats */}
      <section 
        className="relative py-24"
        style={{ 
          backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
          borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)',
          borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)'
        }}
      >
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
                <stat.icon style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6 mx-auto mb-3" />
                <div 
                  className="text-3xl font-display font-semibold mb-1"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {stat.value}
                </div>
                <div style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
