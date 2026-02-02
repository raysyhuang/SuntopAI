'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Target, Eye, Users, Award, Briefcase, Building, Mail, MapPin, Phone, Building2, Send, CheckCircle, ArrowRight, MapPinned } from 'lucide-react'
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

export default function CompanyClient({ locale, dictionary }: CompanyClientProps) {
  const t = dictionary.company
  const { theme } = useTheme()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    reason: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const contactReasons = t.contact ? [
    { ...t.contact.reasons.clinical, icon: Building2 },
    { ...t.contact.reasons.investment, icon: Briefcase },
    { ...t.contact.reasons.collaboration, icon: Users },
  ] : []

  return (
    <div className="relative pt-20">
      {/* Hero */}
      <section 
        className="relative py-24 overflow-hidden"
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
        className="relative py-24"
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
                className="font-display text-lg font-semibold mb-2"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.mission.title}
              </h2>
              {t.mission.headline && (
                <p 
                  className="font-display text-2xl font-semibold mb-4"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.mission.headline}
                </p>
              )}
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
                className="font-display text-lg font-semibold mb-2"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.vision.title}
              </h2>
              {t.vision.headline && (
                <p 
                  className="font-display text-2xl font-semibold mb-4"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.vision.headline}
                </p>
              )}
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="leading-relaxed">{t.vision.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section 
        className="relative py-24"
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
              { icon: Award, value: '100+', label: t.stats.partners },
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

      {/* Centers Section */}
      {t.centers && (
        <section 
          id="centers"
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-6 inline-block">{t.centers.tag}</span>
              <h2 
                className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.centers.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-xl max-w-3xl mx-auto">
                {t.centers.subtitle}
              </p>
            </motion.div>

            {/* Centers Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
              {t.centers.list.slice(0, 6).map((center: { slug: string; shortName: string; city: string; province: string }, index: number) => (
                <motion.div
                  key={center.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/company/${center.slug}`}>
                    <div 
                      className="rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                        boxShadow: theme === 'light' ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
                        border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                        >
                          <MapPinned style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                        </div>
                        <ArrowRight style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                      </div>
                      <h3 
                        className="font-display text-lg font-semibold mb-2"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {center.shortName}
                      </h3>
                      <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">
                        {center.city}, {center.province}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* More Centers Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p style={{ color: theme === 'light' ? '#86868b' : '#71717a' }} className="text-sm mb-4">
                {t.centers.moreComingSoon}
              </p>
              <Link 
                href={`/${locale}/company/centers`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                style={{
                  backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)',
                  color: theme === 'light' ? '#007d73' : '#2dd4bf'
                }}
              >
                {t.centers.viewAll}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {t.partners && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="label-tag mb-6 inline-block">{t.partners.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.partners.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
                {t.partners.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {t.partners.list.map((partner: { name: string; province: string; note?: string }, index: number) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <Building2 style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6 mx-auto mb-2" />
                  <h3 
                    className="font-medium text-sm mb-1"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {partner.name}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#86868b' : '#71717a' }} className="text-xs">
                    {partner.province}
                    {partner.note && <span className="block">{partner.note}</span>}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
              style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}
            >
              {t.partners.more}
            </motion.p>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {t.contact && (
        <>
          <section 
            id="contact"
            className="relative py-24"
            style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="label-tag mb-6 inline-block">{t.contact.tag}</span>
                <h2 
                  className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.contact.title}
                </h2>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-xl max-w-2xl mx-auto">
                  {t.contact.subtitle}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Reasons */}
          <section 
            className="relative py-24"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {contactReasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center rounded-2xl p-8"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                    >
                      <reason.icon style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
                    </div>
                    <h3 
                      className="font-display text-xl font-semibold mb-3"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {reason.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed">{reason.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section 
            className="relative py-24"
            style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Form */}
                <div className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 
                      className="font-display text-2xl font-semibold mb-8"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {t.contact.form.title}
                    </h3>
                    
                    {isSubmitted ? (
                      <div 
                        className="rounded-2xl p-12 text-center"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                          border: theme === 'light' ? '1px solid rgba(0,125,115,0.2)' : '1px solid rgba(20,184,166,0.3)'
                        }}
                      >
                        <CheckCircle style={{ color: '#007d73' }} className="w-16 h-16 mx-auto mb-6" />
                        <h4 
                          className="font-display text-2xl font-semibold mb-3"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {t.contact.form.success.title}
                        </h4>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                          {t.contact.form.success.description}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label 
                              className="block text-sm font-medium mb-2"
                              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                            >
                              {t.contact.form.name}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t.contact.form.namePlaceholder}
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl transition-colors"
                              style={{ 
                                backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                                border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                                color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                                outline: 'none'
                              }}
                            />
                          </div>
                          <div>
                            <label 
                              className="block text-sm font-medium mb-2"
                              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                            >
                              {t.contact.form.email}
                            </label>
                            <input
                              type="email"
                              required
                              placeholder={t.contact.form.emailPlaceholder}
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl transition-colors"
                              style={{ 
                                backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                                border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                                color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                          >
                            {t.contact.form.organization}
                          </label>
                          <input
                            type="text"
                            placeholder={t.contact.form.organizationPlaceholder}
                            value={formState.organization}
                            onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl transition-colors"
                            style={{ 
                              backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                              border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                              color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                              outline: 'none'
                            }}
                          />
                        </div>

                        <div>
                          <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                          >
                            {t.contact.form.reason}
                          </label>
                          <select
                            required
                            value={formState.reason}
                            onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl transition-colors"
                            style={{ 
                              backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                              border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                              color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                              outline: 'none'
                            }}
                          >
                            <option value="">{t.contact.form.reasonPlaceholder}</option>
                            <option value="clinical">{t.contact.form.reasonOptions.clinical}</option>
                            <option value="investment">{t.contact.form.reasonOptions.investment}</option>
                            <option value="collaboration">{t.contact.form.reasonOptions.collaboration}</option>
                            <option value="media">{t.contact.form.reasonOptions.media}</option>
                            <option value="other">{t.contact.form.reasonOptions.other}</option>
                          </select>
                        </div>

                        <div>
                          <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                          >
                            {t.contact.form.message}
                          </label>
                          <textarea
                            required
                            rows={6}
                            placeholder={t.contact.form.messagePlaceholder}
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl transition-colors resize-none"
                            style={{ 
                              backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                              border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                              color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                              outline: 'none'
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn-primary w-full md:w-auto"
                        >
                          <Send size={18} />
                          {t.contact.form.submit}
                        </button>
                      </form>
                    )}
                  </motion.div>
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 
                        className="font-display text-xl font-semibold mb-6"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {t.contact.info.title}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Mail style={{ color: '#007d73' }} className="w-5 h-5 flex-shrink-0 mt-1" />
                          <div>
                            <div 
                              className="text-sm mb-1"
                              style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}
                            >
                              {t.contact.info.email}
                            </div>
                            <div style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                              info@suntopai.com
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <MapPin style={{ color: '#007d73' }} className="w-5 h-5 flex-shrink-0 mt-1" />
                          <div>
                            <div 
                              className="text-sm mb-1"
                              style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}
                            >
                              {t.contact.info.headquarters}
                            </div>
                            <div style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                              {t.contact.info.location}
                            </div>
                            <div 
                              className="text-sm mt-1"
                              style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}
                            >
                              {t.contact.info.global}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Phone style={{ color: '#007d73' }} className="w-5 h-5 flex-shrink-0 mt-1" />
                          <div>
                            <div 
                              className="text-sm mb-1"
                              style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}
                            >
                              {t.contact.info.phone}
                            </div>
                            <div style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                              {t.contact.info.phoneValue}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="rounded-2xl p-6"
                      style={{ 
                        backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                        border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                      }}
                    >
                      <h4 
                        className="font-semibold mb-2"
                        style={{ color: '#007d73' }}
                      >
                        {t.contact.info.response.title}
                      </h4>
                      <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                        {t.contact.info.response.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
