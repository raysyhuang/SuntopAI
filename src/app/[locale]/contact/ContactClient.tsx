'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Building2, Users, Briefcase, Send, CheckCircle } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface ContactClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function ContactClient({ locale, dictionary }: ContactClientProps) {
  const t = dictionary.contact
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

  const contactReasons = [
    { ...t.reasons.clinical, icon: Building2 },
    { ...t.reasons.investment, icon: Briefcase },
    { ...t.reasons.collaboration, icon: Users },
  ]

  return (
    <div className="relative pt-20">
      {/* Hero */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}
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

      {/* Contact Reasons */}
      <section 
        className="relative py-16"
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
                className="rounded-2xl p-6"
                style={{ 
                  backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                  boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                  border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                >
                  <reason.icon style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                </div>
                <h3 
                  className="font-display font-semibold mb-2"
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
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-display text-2xl font-semibold mb-8"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.form.title}
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 rounded-2xl"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 20px rgba(0,125,115,0.08)' : 'none',
                    border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                  >
                    <CheckCircle style={{ color: '#007d73' }} className="w-8 h-8" />
                  </div>
                  <h3 
                    className="font-display text-xl font-semibold mb-2"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {t.form.success.title}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>{t.form.success.description}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm mb-2"
                        style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                      >
                        {t.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl transition-colors focus:outline-none"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,1)',
                          border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                          color: theme === 'light' ? '#1d1d1f' : '#ffffff'
                        }}
                        placeholder={t.form.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm mb-2"
                        style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                      >
                        {t.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl transition-colors focus:outline-none"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,1)',
                          border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                          color: theme === 'light' ? '#1d1d1f' : '#ffffff'
                        }}
                        placeholder={t.form.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="organization" 
                      className="block text-sm mb-2"
                      style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                    >
                      {t.form.organization}
                    </label>
                    <input
                      type="text"
                      id="organization"
                      value={formState.organization}
                      onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl transition-colors focus:outline-none"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,1)',
                        border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                        color: theme === 'light' ? '#1d1d1f' : '#ffffff'
                      }}
                      placeholder={t.form.organizationPlaceholder}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="reason" 
                      className="block text-sm mb-2"
                      style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                    >
                      {t.form.reason}
                    </label>
                    <select
                      id="reason"
                      value={formState.reason}
                      onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl transition-colors focus:outline-none"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,1)',
                        border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                        color: theme === 'light' ? '#1d1d1f' : '#ffffff'
                      }}
                    >
                      <option value="">{t.form.reasonPlaceholder}</option>
                      <option value="clinical">{t.form.reasonOptions.clinical}</option>
                      <option value="investment">{t.form.reasonOptions.investment}</option>
                      <option value="collaboration">{t.form.reasonOptions.collaboration}</option>
                      <option value="media">{t.form.reasonOptions.media}</option>
                      <option value="other">{t.form.reasonOptions.other}</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm mb-2"
                      style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                    >
                      {t.form.message}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,1)',
                        border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                        color: theme === 'light' ? '#1d1d1f' : '#ffffff'
                      }}
                      placeholder={t.form.messagePlaceholder}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    {t.form.submit}
                    <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-display text-2xl font-semibold mb-8"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.info.title}
              </h2>
              
              <div className="space-y-6">
                <div 
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,1)' }}
                    >
                      <Mail style={{ color: '#007d73' }} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 
                        className="font-medium mb-1"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {t.info.email}
                      </h3>
                      <a 
                        href="mailto:contact@suntopai.com" 
                        className="transition-colors hover:text-[#007d73]"
                        style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                      >
                        contact@suntopai.com
                      </a>
                    </div>
                  </div>
                </div>

                <div 
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,1)' }}
                    >
                      <MapPin style={{ color: '#007d73' }} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 
                        className="font-medium mb-1"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {t.info.headquarters}
                      </h3>
                      <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                        {t.info.location}
                      </p>
                      <p style={{ color: theme === 'light' ? '#86868b' : '#64748b' }} className="text-sm mt-1">
                        {t.info.global}
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,1)' }}
                    >
                      <Phone style={{ color: '#007d73' }} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 
                        className="font-medium mb-1"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {t.info.phone}
                      </h3>
                      <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                        {t.info.phoneValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div 
                className="mt-8 p-6 rounded-xl"
                style={{ 
                  backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                  border: theme === 'light' ? 'none' : '1px solid rgba(20,184,166,0.2)'
                }}
              >
                <h4 
                  className="font-medium mb-2 text-sm"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.info.response.title}
                </h4>
                <p className="text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                  {t.info.response.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
