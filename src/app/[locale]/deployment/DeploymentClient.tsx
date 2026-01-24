'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Server, Cloud, Shield, Settings, Lock, Globe, CheckCircle, ArrowRight, Package, Wrench, Truck, TrendingDown } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

const supplyChainIcons: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Package,
  Wrench,
  Truck,
  TrendingDown,
}

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

      {/* Key Statement */}
      <section 
        className="relative py-16"
        style={{ 
          backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
          borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)',
          borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-display"
            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
          >
            {t.statement.split('.')[0]}.
            <span style={{ color: '#007d73' }}> {t.statement.split('.').slice(1).join('.')}</span>
          </motion.p>
        </div>
      </section>

      {/* Deployment Features */}
      <section 
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
              {t.features.title}
            </h2>
            <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
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
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                  >
                    <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                  </div>
                  <h3 
                    className="font-display font-semibold mb-2"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Deployment Process */}
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
              {t.process.title}
            </h2>
            <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
              {t.process.description}
            </p>
          </motion.div>

          <div className="relative">
            <div 
              className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: theme === 'light' ? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)' : 'linear-gradient(90deg, transparent, rgba(51,65,85,0.5), transparent)' }}
            />
            
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
                  <div 
                    className="text-center rounded-2xl p-6 relative z-10"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                      boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30,41,59,1)',
                        border: theme === 'light' ? '2px solid rgba(0,125,115,0.2)' : '1px solid rgba(51,65,85,0.8)'
                      }}
                    >
                      <span style={{ color: '#007d73' }} className="font-display text-2xl font-semibold">{process.step}</span>
                    </div>
                    <h3 
                      className="font-display font-semibold mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {process.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section 
        className="relative py-32"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-tag mb-6 inline-block">{t.security.tag}</span>
              <h2 
                className="font-display text-4xl font-semibold tracking-tight mb-6"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.security.title}
              </h2>
              <p 
                className="text-lg leading-relaxed mb-8"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
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
                    className="flex items-center gap-3"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#d1d5db' }}
                  >
                    <CheckCircle style={{ color: '#007d73' }} className="w-5 h-5 flex-shrink-0" />
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
              <div 
                className="relative p-8 rounded-3xl"
                style={{ 
                  backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                  boxShadow: theme === 'light' ? '0 4px 24px rgba(0,125,115,0.08)' : 'none',
                  border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(51,65,85,0.5)'
                }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {Object.values(t.security.stats).map((item) => (
                    <div 
                      key={item.label} 
                      className="text-center p-4 rounded-xl"
                      style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,0.5)' }}
                    >
                      <div style={{ color: '#007d73' }} className="text-2xl font-display font-semibold mb-1">{item.value}</div>
                      <div style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Supply Chain */}
      {t.supplyChain && (
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
              <span className="label-tag mb-6 inline-block">{t.supplyChain.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.supplyChain.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-3xl mx-auto">
                {t.supplyChain.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {t.supplyChain.features.map((feature, index) => {
                const IconComponent = supplyChainIcons[feature.icon] || Package
                return (
                  <motion.div
                    key={feature.title}
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
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                      >
                        <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 
                          className="font-display font-semibold mb-2"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {feature.title}
                        </h3>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                              <CheckCircle style={{ color: '#007d73' }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Supply Chain Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {Object.values(t.supplyChain.stats).map((stat) => (
                <div 
                  key={stat.label} 
                  className="text-center p-6 rounded-xl"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div style={{ color: '#007d73' }} className="text-3xl font-display font-semibold mb-2">{stat.value}</div>
                  <div style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Cross Links */}
      {t.crossLinks && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { href: `/${locale}/platform`, ...t.crossLinks.platform },
                { href: `/${locale}/clinical`, ...t.crossLinks.clinical },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="block rounded-2xl p-6 group transition-all"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                      boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <h3 
                      className="font-display font-semibold mb-2 transition-colors group-hover:text-[#007d73]"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {link.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm mb-4">{link.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#007d73' }}>
                      {link.button}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section 
        className="relative py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-display text-3xl font-semibold tracking-tight mb-4"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.cta.title}
            </h2>
            <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="mb-8">
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
