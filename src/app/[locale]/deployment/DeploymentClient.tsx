'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Server, Cloud, Shield, Settings, Lock, Globe, CheckCircle, ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

interface DeploymentClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const featureIcons = [Settings, Cloud, Server, Shield, Lock, Globe]

export default function DeploymentClient({ locale, dictionary }: DeploymentClientProps) {
  const t = dictionary.deployment

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

      {/* Key Statement */}
      <section className="relative py-16 bg-slate-925 border-y border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl text-white font-display"
          >
            {t.statement.split('.')[0]}.
            <span className="text-accent-400"> {t.statement.split('.').slice(1).join('.')}</span>
          </motion.p>
        </div>
      </section>

      {/* Deployment Features */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t.features.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => {
              const IconComponent = featureIcons[index % featureIcons.length]
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-institutional"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-accent-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Deployment Process */}
      <section className="relative py-32 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {t.process.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t.process.description}
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.process.steps.map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="card-institutional text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-6">
                      <span className="font-display text-2xl font-semibold text-accent-400">{process.step}</span>
                    </div>
                    <h3 className="font-display font-semibold text-white mb-2">{process.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-tag mb-6 inline-block">{t.security.tag}</span>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-white mb-6">
                {t.security.title}
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                {t.security.description}
              </p>
              
              <ul className="space-y-4">
                {t.security.features.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-neutral-300"
                  >
                    <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent rounded-3xl" />
              <div className="relative p-8 border border-slate-700/50 rounded-3xl">
                <div className="grid grid-cols-2 gap-6">
                  {Object.values(t.security.stats).map((item) => (
                    <div key={item.label} className="text-center p-4 bg-slate-900/50 rounded-xl">
                      <div className="text-2xl font-display font-semibold text-accent-400 mb-1">{item.value}</div>
                      <div className="text-neutral-500 text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-slate-925">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-neutral-400 mb-8">
              {t.cta.description}
            </p>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t.cta.button}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
