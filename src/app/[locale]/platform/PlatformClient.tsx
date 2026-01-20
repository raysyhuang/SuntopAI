'use client'

import { motion } from 'framer-motion'
import { Database, Brain, Cog, Server, Wifi, Shield, Activity, Cpu, GitBranch, Target, Layers, Zap } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

interface PlatformClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const capabilityIcons = [Server, Activity, Wifi, Shield, Activity, Target, Cpu, Zap, GitBranch, Layers, Target, Shield]

export default function PlatformClient({ locale, dictionary }: PlatformClientProps) {
  const t = dictionary.platform

  const platformLayers = [
    {
      id: 'data',
      icon: Database,
      title: t.layers.data.title,
      subtitle: t.layers.data.subtitle,
      description: t.layers.data.description,
      signal: t.layers.data.signal,
      capabilities: t.layers.data.capabilities,
    },
    {
      id: 'intelligence',
      icon: Brain,
      title: t.layers.intelligence.title,
      subtitle: t.layers.intelligence.subtitle,
      description: t.layers.intelligence.description,
      signal: t.layers.intelligence.signal,
      capabilities: t.layers.intelligence.capabilities,
    },
    {
      id: 'automation',
      icon: Cog,
      title: t.layers.automation.title,
      subtitle: t.layers.automation.subtitle,
      description: t.layers.automation.description,
      signal: t.layers.automation.signal,
      capabilities: t.layers.automation.capabilities,
    },
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
              className="text-xl text-neutral-400 leading-relaxed mb-8"
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent-500" />
                <span className="text-neutral-400 text-sm">{t.features.native}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent-500" />
                <span className="text-neutral-400 text-sm">{t.features.realtime}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent-500" />
                <span className="text-neutral-400 text-sm">{t.features.guardrails}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Architecture Overview */}
      <section className="relative py-24 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {t.architecture.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t.architecture.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative mb-24"
          >
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
              {platformLayers.map((layer, index) => (
                <div key={layer.id} className="flex items-center gap-4 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center glow-accent">
                      <layer.icon className="w-10 h-10 md:w-12 md:h-12 text-accent-400" />
                    </div>
                    <span className="mt-4 text-white font-medium text-sm text-center max-w-[120px]">
                      {layer.title}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:flex items-center">
                      <div className="w-12 h-px bg-gradient-to-r from-accent-600 to-accent-400" />
                      <div className="w-2 h-2 bg-accent-400 rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Layer Sections */}
      {platformLayers.map((layer, index) => (
        <section
          key={layer.id}
          id={layer.id}
          className={`relative py-32 ${index % 2 === 0 ? '' : 'bg-slate-925'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center">
                    <layer.icon className="w-7 h-7 text-accent-400" />
                  </div>
                  <span className="text-accent-400 text-sm font-medium tracking-wider uppercase">
                    Layer {index + 1}
                  </span>
                </div>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-white mb-3">
                  {layer.title}
                </h2>
                <p className="text-xl text-accent-400/80 mb-6">{layer.subtitle}</p>
                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                  {layer.description}
                </p>
                <p className="text-neutral-500 italic border-l-2 border-accent-600 pl-4">
                  {layer.signal}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                {layer.capabilities.map((cap, capIndex) => {
                  const IconComponent = capabilityIcons[(index * 4 + capIndex) % capabilityIcons.length]
                  return (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: capIndex * 0.1 }}
                      className="card-institutional"
                    >
                      <IconComponent className="w-6 h-6 text-accent-400 mb-3" />
                      <p className="text-neutral-300 text-sm">{cap}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Technical Differentiators */}
      <section className="relative py-32 bg-slate-925">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {t.differentiators.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t.differentiators.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.differentiators.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-institutional text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent-400 font-display font-semibold">{index + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
