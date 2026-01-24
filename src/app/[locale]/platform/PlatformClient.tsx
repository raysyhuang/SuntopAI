'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Database, Brain, Cog, Server, Wifi, Shield, Activity, Cpu, GitBranch, Target, 
  Layers, Zap, ArrowRight, Mic, FileText, ClipboardList, Bell, Heart, AlertTriangle,
  Monitor, Building2, Building, Hospital
} from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import HeroCarousel from '@/components/HeroCarousel'

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

const moduleIcons: { [key: string]: any } = {
  consultation: Mic,
  labEvaluation: FileText,
  careManagement: Heart,
  medicalRecords: ClipboardList,
  labReminder: Bell,
}

const monitoringIcons: { [key: string]: any } = {
  Activity: Activity,
  AlertTriangle: AlertTriangle,
  Monitor: Monitor,
  Cpu: Cpu,
}

export default function PlatformClient({ locale, dictionary }: PlatformClientProps) {
  const t = dictionary.platform

  // Hero carousel slides
  const heroSlides = [
    {
      id: 1,
      title: locale === 'zh-CN' ? '智能查房系统' : locale === 'zh-TW' ? '智能查房系統' : locale === 'ja' ? 'スマート回診システム' : 'Smart Consultation System',
      subtitle: locale === 'zh-CN' ? '查房模块' : locale === 'zh-TW' ? '查房模組' : locale === 'ja' ? '回診モジュール' : 'Consultation Module',
      description: locale === 'zh-CN' ? '语音输入+AI即时优化，让电子病历书写不再是负担。解决医生「说一遍、再写一遍」的痛点。' : locale === 'zh-TW' ? '語音輸入+AI即時優化，讓電子病歷書寫不再是負擔。解決醫師「說一遍、再寫一遍」的痛點。' : locale === 'ja' ? '音声入力+AIリアルタイム最適化、電子カルテ記録を負担なく。' : 'Voice input + AI real-time optimization, making EMR documentation effortless.',
      image: '/images/consultation.jpg',
      gradient: 'bg-gradient-to-br from-accent-900/40 via-slate-900 to-slate-950',
    },
    {
      id: 2,
      title: locale === 'zh-CN' ? '化验结果智能评估' : locale === 'zh-TW' ? '化驗結果智能評估' : locale === 'ja' ? '検査結果インテリジェント評価' : 'Intelligent Lab Evaluation',
      subtitle: locale === 'zh-CN' ? '化验结果评估模块' : locale === 'zh-TW' ? '化驗結果評估模組' : locale === 'ja' ? '検査結果評価モジュール' : 'Lab Evaluation Module',
      description: locale === 'zh-CN' ? '深度集成专家智慧，图形化化验趋势对比，精准用药调整对化验指标的真实影响。' : locale === 'zh-TW' ? '深度整合專家智慧，圖形化化驗趨勢對比，精準用藥調整對化驗指標的真實影響。' : locale === 'ja' ? '専門家の知恵を深く統合、グラフィカルな検査トレンド比較。' : 'Deep integration of expert wisdom, graphical lab trend comparison.',
      image: '/images/lab-evaluation.jpg',
      gradient: 'bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950',
    },
    {
      id: 3,
      title: locale === 'zh-CN' ? '透析中央监控系统' : locale === 'zh-TW' ? '透析中央監控系統' : locale === 'ja' ? '透析中央監視システム' : 'Dialysis Central Monitoring',
      subtitle: locale === 'zh-CN' ? '守护神' : locale === 'zh-TW' ? '守護神' : locale === 'ja' ? 'ガーディアン' : 'Guardian',
      description: locale === 'zh-CN' ? '守护透析治疗安全，系统自动同步透析机与患者血压，颜色分级预警让异常状态一目了然。' : locale === 'zh-TW' ? '守護透析治療安全，系統自動同步透析機與病患血壓，顏色分級預警讓異常狀態一目了然。' : locale === 'ja' ? '透析治療の安全を守り、透析機と患者血圧を自動同期。' : 'Protecting dialysis safety with automatic BP synchronization and color-coded alerts.',
      image: '/images/monitoring.jpg',
      gradient: 'bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950',
    },
    {
      id: 4,
      title: locale === 'zh-CN' ? '智能管护与预警' : locale === 'zh-TW' ? '智能管護與預警' : locale === 'ja' ? 'インテリジェントケアと警告' : 'Intelligent Care & Alerts',
      subtitle: locale === 'zh-CN' ? '管护模块' : locale === 'zh-TW' ? '管護模組' : locale === 'ja' ? 'ケア管理モジュール' : 'Care Management Module',
      description: locale === 'zh-CN' ? '精细化储存、智能化分类、预测风险早预警，多维数据自动完成风险分级分类。' : locale === 'zh-TW' ? '精細化儲存、智慧化分類、預測風險早預警，多維資料自動完成風險分級分類。' : locale === 'ja' ? '精密な保存、インテリジェントな分類、予測的早期警告。' : 'Refined storage, intelligent classification, predictive early warning.',
      image: '/images/care-management.jpg',
      gradient: 'bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950',
    },
  ]

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
      {/* Hero Carousel */}
      <section className="relative py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <HeroCarousel slides={heroSlides} autoPlayInterval={6000} />
        </div>
      </section>

      {/* Title Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 radial-gradient" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {t.tag}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tightest text-white mb-6"
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-neutral-400 leading-relaxed mb-8"
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 justify-center flex-wrap"
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

      {/* Core Modules Section */}
      {t.coreModules && (
        <section className="relative py-24 bg-slate-925">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.coreModules.tag}</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                {t.coreModules.title}
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                {t.coreModules.description}
              </p>
            </motion.div>

            <div className="space-y-8">
              {Object.entries(t.coreModules.modules).map(([key, module]: [string, any], index) => {
                const IconComponent = moduleIcons[key] || FileText
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-accent-400" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-white">
                            {module.title}
                          </h3>
                          <p className="text-sm text-accent-400">{module.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-neutral-400 mb-6 leading-relaxed">
                        {module.description}
                      </p>
                      <div className="space-y-4">
                        {module.features.map((feature: any, featureIndex: number) => (
                          <div key={featureIndex} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                            <h4 className="font-medium text-white mb-2">{feature.title}</h4>
                            <p className="text-sm text-neutral-500">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-accent-900/20 border border-accent-800/30 rounded-lg">
                        <p className="text-sm text-accent-400">
                          <span className="font-medium">AI</span>: {module.aiHighlight}
                        </p>
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 flex items-center justify-center overflow-hidden">
                        <div className="text-center p-8">
                          <IconComponent className="w-16 h-16 text-accent-400/50 mx-auto mb-4" />
                          <p className="text-neutral-500 text-sm">{module.title}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Monitoring System Section */}
      {t.monitoringSystem && (
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.monitoringSystem.tag}</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                {t.monitoringSystem.title}
              </h2>
              <p className="text-lg text-accent-400 mb-4">{t.monitoringSystem.subtitle}</p>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                {t.monitoringSystem.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {t.monitoringSystem.features.map((feature: any, index: number) => {
                const IconComponent = monitoringIcons[feature.icon] || Activity
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-institutional text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent-900/30 border border-accent-800/30 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-7 h-7 text-accent-400" />
                    </div>
                    <h3 className="font-display font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-neutral-500">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Monitoring Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {Object.entries(t.monitoringSystem.stats).map(([key, stat]: [string, any], index) => (
                <div key={key} className="text-center p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                  <div className="text-3xl md:text-4xl font-display font-semibold text-accent-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

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

      {/* Partners Section */}
      {t.partners && (
        <section className="relative py-24 bg-slate-925">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.partners.tag}</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                {t.partners.title}
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                {t.partners.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-institutional text-center"
              >
                <Building2 className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {t.partners.categories.selfOperated}
                </h3>
                <div className="text-4xl font-display font-semibold text-accent-400 mb-2">30+</div>
                <p className="text-sm text-neutral-500">
                  {locale === 'zh-CN' ? '自营智慧透析中心' : locale === 'zh-TW' ? '自營智慧透析中心' : locale === 'ja' ? '自社運営スマート透析センター' : 'Self-operated smart dialysis centers'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-institutional text-center"
              >
                <Hospital className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {t.partners.categories.publicHospitals}
                </h3>
                <div className="text-4xl font-display font-semibold text-accent-400 mb-2">5+</div>
                <p className="text-sm text-neutral-500">
                  {locale === 'zh-CN' ? '标杆性公立医院' : locale === 'zh-TW' ? '標杆性公立醫院' : locale === 'ja' ? '著名公立病院' : 'Landmark public hospitals'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-institutional text-center"
              >
                <Building className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {t.partners.categories.privateHospitals}
                </h3>
                <div className="text-4xl font-display font-semibold text-accent-400 mb-2">20+</div>
                <p className="text-sm text-neutral-500">
                  {locale === 'zh-CN' ? '知名民营医院' : locale === 'zh-TW' ? '知名民營醫院' : locale === 'ja' ? '著名民間病院' : 'Renowned private hospitals'}
                </p>
              </motion.div>
            </div>

            {/* Partner CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-accent-900/20 via-slate-900 to-accent-900/20 border border-accent-800/30 rounded-2xl p-8"
            >
              <h3 className="font-display text-2xl font-semibold text-white mb-4">
                {t.partners.cta.title}
              </h3>
              <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
                {t.partners.cta.description}
              </p>
              <Link href={`/${locale}/contact`} className="btn-primary inline-flex">
                {t.partners.cta.button}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Technical Differentiators */}
      <section className="relative py-32">
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

      {/* Cross Links */}
      {t.crossLinks && (
        <section className="relative py-24 bg-slate-925">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/${locale}/clinical`} className="block card-institutional group hover:border-accent-500/50 transition-colors">
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {t.crossLinks.clinical.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-4">{t.crossLinks.clinical.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium">
                    {t.crossLinks.clinical.button}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/${locale}/deployment`} className="block card-institutional group hover:border-accent-500/50 transition-colors">
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {t.crossLinks.deployment.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-4">{t.crossLinks.deployment.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium">
                    {t.crossLinks.deployment.button}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
