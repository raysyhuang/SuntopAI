'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Building2, Users, Briefcase, Send, CheckCircle } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

interface ContactClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const reasonIcons = [Building2, Briefcase, Users]

export default function ContactClient({ locale, dictionary }: ContactClientProps) {
  const t = dictionary.contact

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

      {/* Contact Reasons */}
      <section className="relative py-16 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-institutional"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-semibold text-white mb-8">{t.form.title}</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-institutional gradient-border text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{t.form.success.title}</h3>
                  <p className="text-neutral-400">{t.form.success.description}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                        {t.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-accent-600 transition-colors"
                        placeholder={t.form.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                        {t.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-accent-600 transition-colors"
                        placeholder={t.form.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm text-neutral-400 mb-2">
                      {t.form.organization}
                    </label>
                    <input
                      type="text"
                      id="organization"
                      value={formState.organization}
                      onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-accent-600 transition-colors"
                      placeholder={t.form.organizationPlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm text-neutral-400 mb-2">
                      {t.form.reason}
                    </label>
                    <select
                      id="reason"
                      value={formState.reason}
                      onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-accent-600 transition-colors"
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
                    <label htmlFor="message" className="block text-sm text-neutral-400 mb-2">
                      {t.form.message}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-accent-600 transition-colors resize-none"
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
              <h2 className="font-display text-2xl font-semibold text-white mb-8">{t.info.title}</h2>
              
              <div className="space-y-8">
                <div className="card-institutional">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{t.info.email}</h3>
                      <a href="mailto:contact@suntopai.com" className="text-neutral-400 hover:text-accent-400 transition-colors">
                        contact@suntopai.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-institutional">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{t.info.headquarters}</h3>
                      <p className="text-neutral-400">
                        {t.info.location}<br />
                        {t.info.global}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-institutional">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{t.info.phone}</h3>
                      <p className="text-neutral-400">{t.info.phoneValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-accent-900/10 rounded-xl border border-accent-800/20">
                <h3 className="text-accent-400 text-sm font-medium uppercase tracking-wider mb-3">
                  {t.info.response.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
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
