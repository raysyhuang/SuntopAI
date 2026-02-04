'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Server, Cloud, Shield, Settings, ArrowRight, Package, Wrench, Truck, TrendingDown, Brain, Wifi, Monitor, GitMerge, Compass, GraduationCap, CheckCircle, Users, BookOpen, Video, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

const supplyChainIcons: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Package,
  Wrench,
  Truck,
  TrendingDown,
}

const turnkeyIcons: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Compass,
  GraduationCap,
  Settings,
}

const archIcons: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Wifi,
  Brain,
  Monitor,
}

const deployIcons: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Cloud,
  Server,
  GitMerge,
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

export default function DeploymentClient({ locale, dictionary }: DeploymentClientProps) {
  const t = dictionary.deployment
  const { theme } = useTheme()

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

      {/* Section Group 1: Technical Solution */}
      {t.sectionGroups?.technical && (
        <div 
          className="relative py-8"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span 
                className="text-5xl md:text-6xl font-bold"
                style={{ color: theme === 'light' ? 'rgba(0,125,115,0.15)' : 'rgba(45,212,191,0.15)' }}
              >
                {t.sectionGroups.technical.number}
              </span>
              <div>
                <h2 
                  className="font-display text-2xl font-semibold"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.sectionGroups.technical.title}
                </h2>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                  {t.sectionGroups.technical.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Architecture Section */}
      {t.architecture && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-6 inline-block">{t.architecture.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.architecture.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
                {t.architecture.subtitle}
              </p>
            </motion.div>

            {/* Architecture Layers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.architecture.layers.map((layer: any, index: number) => {
                const IconComponent = archIcons[layer.icon] || Wifi
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl p-6"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                    >
                      <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                    </div>
                    <div 
                      className="text-xs font-medium mb-2"
                      style={{ color: '#007d73' }}
                    >
                      Layer {index + 1}
                    </div>
                    <h3 
                      className="font-display text-xl font-semibold mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {layer.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm leading-relaxed mb-4">
                      {layer.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {layer.features.map((feature: string, fIndex: number) => (
                        <div key={fIndex} className="flex items-start gap-2">
                          <CheckCircle style={{ color: '#007d73' }} className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Deployment Options */}
      {t.deployment && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="label-tag mb-6 inline-block">{t.deployment.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.deployment.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-2xl mx-auto">
                {t.deployment.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.deployment.options.map((option: any, index: number) => {
                const IconComponent = deployIcons[option.icon] || Cloud
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl p-6 text-center"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                      boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                    >
                      <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
                    </div>
                    <h3 
                      className="font-display text-lg font-semibold mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {option.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section Group 2: Turnkey Services */}
      {t.sectionGroups?.turnkey && (
        <div 
          className="relative py-8"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span 
                className="text-5xl md:text-6xl font-bold"
                style={{ color: theme === 'light' ? 'rgba(0,125,115,0.15)' : 'rgba(45,212,191,0.15)' }}
              >
                {t.sectionGroups.turnkey.number}
              </span>
              <div>
                <h2 
                  className="font-display text-2xl font-semibold"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.sectionGroups.turnkey.title}
                </h2>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                  {t.sectionGroups.turnkey.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Turnkey Services */}
      {t.turnkeyServices && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-6 inline-block">{t.turnkeyServices.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.turnkeyServices.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-3xl mx-auto text-lg">
                {t.turnkeyServices.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.turnkeyServices.services.map((service: any, index: number) => {
                const IconComponent = turnkeyIcons[service.icon] || Settings
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <div className="p-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                      >
                        <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                      </div>
                      <h3 
                        className="font-display text-xl font-semibold mb-1"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {service.title}
                      </h3>
                      <p style={{ color: '#007d73' }} className="text-sm font-medium mb-3">{service.subtitle}</p>
                      <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* Steps */}
                      <div className="space-y-2 mb-4">
                        {service.steps.slice(0, 4).map((step: any, stepIndex: number) => (
                          <div key={stepIndex} className="flex items-start gap-2">
                            <span 
                              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                              style={{ 
                                backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.2)',
                                color: '#007d73'
                              }}
                            >
                              {stepIndex + 1}
                            </span>
                            <span style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.slice(0, 3).map((highlight: string, hIndex: number) => (
                          <span 
                            key={hIndex}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)',
                              color: theme === 'light' ? '#007d73' : '#2dd4bf'
                            }}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section Group 3: Supply Chain */}
      {t.sectionGroups?.supplyChain && (
        <div 
          className="relative py-8"
          style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span 
                className="text-5xl md:text-6xl font-bold"
                style={{ color: theme === 'light' ? 'rgba(0,125,115,0.15)' : 'rgba(45,212,191,0.15)' }}
              >
                {t.sectionGroups.supplyChain.number}
              </span>
              <div>
                <h2 
                  className="font-display text-2xl font-semibold"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.sectionGroups.supplyChain.title}
                </h2>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                  {t.sectionGroups.supplyChain.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Supply Chain Section */}
      {t.supplyChain && (
        <section 
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
              <span className="label-tag mb-6 inline-block">{t.supplyChain.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.supplyChain.title}
              </h2>
              <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="max-w-3xl mx-auto text-lg">
                {t.supplyChain.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {t.supplyChain.features.map((feature: any, index: number) => {
                const IconComponent = supplyChainIcons[feature.icon] || Package
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl p-5"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                      boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                      border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                    >
                      <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                    </div>
                    <h3 
                      className="font-display text-base font-semibold mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.items.slice(0, 3).map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle style={{ color: '#007d73' }} className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span style={{ color: theme === 'light' ? '#86868b' : '#71717a' }} className="text-xs">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>


            {/* Suppliers */}
            {t.supplyChain.suppliers && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-8">
                  <span className="label-tag mb-4 inline-block">{t.supplyChain.suppliers.tag}</span>
                  <h3 
                    className="font-display text-2xl font-semibold mb-2"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {t.supplyChain.suppliers.title}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm max-w-2xl mx-auto">
                    {t.supplyChain.suppliers.subtitle}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {t.supplyChain.suppliers.list.map((supplier: any, index: number) => (
                    <motion.div
                      key={supplier.nameEn}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="rounded-xl p-4 text-center"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,0.5)',
                        boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.04)' : 'none',
                        border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : '1px solid rgba(0,0,0,0.04)'
                      }}
                    >
                      <div 
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                      >
                        {supplier.name}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: theme === 'light' ? '#86868b' : '#71717a' }}
                      >
                        {supplier.nameEn}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Section Group 3: Implementation Support */}
      {t.sectionGroups?.implementation && (
        <div 
          className="relative py-8"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span 
                className="text-5xl md:text-6xl font-bold"
                style={{ color: theme === 'light' ? 'rgba(0,125,115,0.15)' : 'rgba(45,212,191,0.15)' }}
              >
                {t.sectionGroups.implementation.number}
              </span>
              <div>
                <h2 
                  className="font-display text-2xl font-semibold"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.sectionGroups.implementation.title}
                </h2>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                  {t.sectionGroups.implementation.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Process & Security Combined */}
      <section 
        className="relative py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Process */}
            {t.process && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="label-tag mb-4 inline-block">{t.process.tag}</span>
                <h3 
                  className="font-display text-2xl font-semibold mb-2"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.process.title}
                </h3>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="mb-6 text-sm">
                  {t.process.subtitle}
                </p>
                <div className="space-y-4">
                  {t.process.steps.map((step: any, index: number) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ 
                          backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.2)',
                          color: '#007d73'
                        }}
                      >
                        {step.step}
                      </div>
                      <div>
                        <h4 
                          className="font-semibold mb-1"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {step.title}
                        </h4>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Security */}
            {t.security && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="label-tag mb-4 inline-block">{t.security.tag}</span>
                <h3 
                  className="font-display text-2xl font-semibold mb-2"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.security.title}
                </h3>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="mb-6 text-sm">
                  {t.security.subtitle}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {t.security.features.map((feature: any, index: number) => (
                    <div 
                      key={index}
                      className="rounded-xl p-4"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                        border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Shield style={{ color: '#007d73' }} className="w-4 h-4" />
                        <span 
                          className="font-medium text-sm"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {feature.title}
                        </span>
                      </div>
                      <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-xs">
                        {feature.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Cross Links */}
      {t.crossLinks && (
        <section 
          className="relative py-24"
          style={{ 
            backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
            borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(51,65,85,0.5)'
          }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(t.crossLinks).map(([key, link]: [string, any]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-8"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <h3 
                    className="font-display text-xl font-semibold mb-2"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {link.title}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="mb-4">
                    {link.description}
                  </p>
                  <Link 
                    href={`/${locale}/${key}`}
                    className="inline-flex items-center gap-2 font-medium"
                    style={{ color: '#007d73' }}
                  >
                    {link.button}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
