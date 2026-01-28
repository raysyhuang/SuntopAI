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
import { useTheme } from '@/components/ThemeProvider'

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
  fourItemMonitoring: Activity,
}

const monitoringIcons: { [key: string]: any } = {
  Activity: Activity,
  AlertTriangle: AlertTriangle,
  Monitor: Monitor,
  Cpu: Cpu,
}

export default function PlatformClient({ locale, dictionary }: PlatformClientProps) {
  const t = dictionary.platform
  const { theme } = useTheme()

  // Hero carousel slides with actual images
  const heroSlides = [
    {
      id: 1,
      title: locale === 'zh-CN' ? '智能查房系统' : locale === 'zh-TW' ? '智能查房系統' : locale === 'ja' ? 'スマート回診システム' : 'Smart Consultation System',
      subtitle: locale === 'zh-CN' ? '查房模块' : locale === 'zh-TW' ? '查房模組' : locale === 'ja' ? '回診モジュール' : 'Consultation Module',
      description: locale === 'zh-CN' ? '语音输入+AI即时优化，让电子病历书写不再是负担。解决医生「说一遍、再写一遍」的痛点。' : locale === 'zh-TW' ? '語音輸入+AI即時優化，讓電子病歷書寫不再是負擔。解決醫師「說一遍、再寫一遍」的痛點。' : locale === 'ja' ? '音声入力+AIリアルタイム最適化、電子カルテ記録を負担なく。' : 'Voice input + AI real-time optimization, making EMR documentation effortless.',
      image: '/images/digital-rounds.jpg',
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
      image: '/images/central-monitoring.jpg',
      gradient: 'bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950',
    },
    {
      id: 4,
      title: locale === 'zh-CN' ? '足部管理与风险预警' : locale === 'zh-TW' ? '足部管理與風險預警' : locale === 'ja' ? '足部管理とリスク警告' : 'Foot Management & Risk Alerts',
      subtitle: locale === 'zh-CN' ? '足部管理模块' : locale === 'zh-TW' ? '足部管理模組' : locale === 'ja' ? '足部管理モジュール' : 'Foot Management Module',
      description: locale === 'zh-CN' ? '精细化储存、智能化分类、预测风险早预警，多维数据自动完成风险分级分类。' : locale === 'zh-TW' ? '精細化儲存、智慧化分類、預測風險早預警，多維資料自動完成風險分級分類。' : locale === 'ja' ? '精密な保存、インテリジェントな分類、予測的早期警告。' : 'Refined storage, intelligent classification, predictive early warning.',
      image: '/images/foot-management.jpg',
      gradient: 'bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950',
    },
    {
      id: 5,
      title: locale === 'zh-CN' ? '应用场景' : locale === 'zh-TW' ? '應用場景' : locale === 'ja' ? 'アプリケーションシナリオ' : 'Application Scenarios',
      subtitle: locale === 'zh-CN' ? '数字化透析中心' : locale === 'zh-TW' ? '數位化透析中心' : locale === 'ja' ? 'デジタル透析センター' : 'Digital Dialysis Center',
      description: locale === 'zh-CN' ? '从软件、硬件到数据服务的深度融合方案，打造从数据采集到生态互联的「数字中枢」。' : locale === 'zh-TW' ? '從軟體、硬體到資料服務的深度融合方案，打造從資料採集到生態互聯的「數位中樞」。' : locale === 'ja' ? 'ソフトウェア、ハードウェア、データサービスの深い統合ソリューション。' : 'Deep integration of software, hardware, and data services.',
      image: '/images/application-scenario.jpg',
      gradient: 'bg-gradient-to-br from-cyan-900/40 via-slate-900 to-slate-950',
    },
  ]

  // Module images mapping
  const moduleImages: { [key: string]: string } = {
    consultation: '/images/consultation-template.png',
    labEvaluation: '/images/lab-evaluation.jpg',
    careManagement: '/images/foot-management.jpg',
    medicalRecords: '/images/bp-weight-assistant.jpg',
    labReminder: '/images/consultation-template.png',
    fourItemMonitoring: '/images/four-item-monitoring.jpg',
  }

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
      <section className={`relative py-20 overflow-hidden`} style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}>
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {t.tag}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff', letterSpacing: '-0.025em' }}
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 justify-center flex-wrap"
            >
              {[t.features.native, t.features.realtime, t.features.guardrails].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#007d73' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'light' ? '#1d1d1f' : '#a1a1aa' }}>{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Modules Section */}
      {t.coreModules && (
        <section className="relative py-24" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.coreModules.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.coreModules.title}
              </h2>
              <p 
                className="max-w-2xl mx-auto text-lg"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.coreModules.description}
              </p>
            </motion.div>

            <div className="space-y-16">
              {Object.entries(t.coreModules.modules).map(([key, module]: [string, any], index) => {
                const IconComponent = moduleIcons[key] || FileText
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-5">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                        >
                          <IconComponent style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 
                            className="font-display text-xl font-semibold"
                            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                          >
                            {module.title}
                          </h3>
                          <p style={{ color: '#007d73' }} className="text-sm font-medium">{module.subtitle}</p>
                        </div>
                      </div>
                      <p 
                        className="mb-6 leading-relaxed text-base"
                        style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                      >
                        {module.description}
                      </p>
                      <div className="space-y-3">
                        {module.features.map((feature: any, featureIndex: number) => (
                          <div 
                            key={featureIndex} 
                            className="rounded-xl p-4"
                            style={{ 
                              backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,0.5)',
                              border: theme === 'light' ? 'none' : '1px solid rgba(51,65,85,0.5)'
                            }}
                          >
                            <h4 
                              className="font-medium mb-1"
                              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                            >
                              {feature.title}
                            </h4>
                            <p 
                              className="text-sm"
                              style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }}
                            >
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div 
                        className="mt-6 p-4 rounded-xl"
                        style={{ 
                          backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                          border: theme === 'light' ? 'none' : '1px solid rgba(20,184,166,0.2)'
                        }}
                      >
                        <p style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="text-sm">
                          <span className="font-semibold">AI</span>: {module.aiHighlight}
                        </p>
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div 
                        className="aspect-video rounded-2xl overflow-hidden"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#f5f5f7' : '#1e293b',
                          boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                          border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                        }}
                      >
                        {moduleImages[key] ? (
                          <img 
                            src={moduleImages[key]} 
                            alt={module.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center p-8">
                              <IconComponent 
                                className="w-16 h-16 mx-auto mb-4"
                                style={{ color: theme === 'light' ? '#007d73' : 'rgba(45,212,191,0.5)' }}
                              />
                              <p style={{ color: theme === 'light' ? '#86868b' : '#64748b' }} className="text-sm">{module.title}</p>
                            </div>
                          </div>
                        )}
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
        <section className="relative py-24" style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.monitoringSystem.tag}</span>
              <h2 
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-3"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {t.monitoringSystem.title}
              </h2>
              <p className="text-lg mb-4 font-medium" style={{ color: '#007d73' }}>{t.monitoringSystem.subtitle}</p>
              <p 
                className="max-w-3xl mx-auto text-lg"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {t.monitoringSystem.description}
              </p>
            </motion.div>

            {/* Monitoring System Images Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {[
                { src: '/images/central-monitoring.jpg', label: locale === 'zh-CN' ? '中央监控系统' : locale === 'zh-TW' ? '中央監控系統' : locale === 'ja' ? '中央監視システム' : 'Central Monitoring System' },
                { src: '/images/monitoring-treatment-status.jpg', label: locale === 'zh-CN' ? '治疗状态监控' : locale === 'zh-TW' ? '治療狀態監控' : locale === 'ja' ? '治療状態監視' : 'Treatment Status Monitoring' },
                { src: '/images/smart-terminal.jpg', label: locale === 'zh-CN' ? '智慧床旁终端' : locale === 'zh-TW' ? '智慧床旁終端' : locale === 'ja' ? 'スマートベッドサイド端末' : 'Smart Bedside Terminal' },
                { src: '/images/four-item-monitoring.jpg', label: locale === 'zh-CN' ? '四项监测' : locale === 'zh-TW' ? '四項監測' : locale === 'ja' ? '4項目モニタリング' : 'Four-Item Monitoring' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="rounded-2xl overflow-hidden"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30,41,59,0.8)',
                    boxShadow: theme === 'light' ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <img src={item.src} alt={item.label} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <p 
                      className="font-medium"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
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
                    className={`text-center rounded-2xl p-6 ${
                      theme === 'dark' 
                        ? 'bg-slate-900/50 border border-slate-800/50' 
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      theme === 'dark' 
                        ? 'bg-accent-900/30 border border-accent-800/30' 
                        : 'bg-accent-50 border border-accent-200'
                    }`}>
                      <IconComponent className={`w-7 h-7 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                    </div>
                    <h3 className={`font-display font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{feature.description}</p>
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
              {Object.entries(t.monitoringSystem.stats).map(([key, stat]: [string, any]) => (
                <div key={key} className={`text-center p-6 rounded-xl ${
                  theme === 'dark' 
                    ? 'bg-slate-900/50 border border-slate-800' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  <div className={`text-3xl md:text-4xl font-display font-semibold mb-2 ${
                    theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Platform Architecture Overview */}
      <section className={`relative py-24 ${theme === 'dark' ? 'bg-slate-925' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.architecture.title}
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
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
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 glow-accent' 
                        : 'bg-white border border-gray-200 shadow-lg'
                    }`}>
                      <layer.icon className={`w-10 h-10 md:w-12 md:h-12 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                    </div>
                    <span className={`mt-4 font-medium text-sm text-center max-w-[120px] ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
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
          className={`relative py-32 ${
            index % 2 === 0 
              ? (theme === 'light' ? 'bg-gray-50' : '') 
              : (theme === 'dark' ? 'bg-slate-925' : 'bg-white')
          }`}
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
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-accent-900/30 border border-accent-800/30' 
                      : 'bg-accent-50 border border-accent-200'
                  }`}>
                    <layer.icon className={`w-7 h-7 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                  </div>
                  <span className={`text-sm font-medium tracking-wider uppercase ${
                    theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
                  }`}>
                    Layer {index + 1}
                  </span>
                </div>
                <h2 className={`font-display text-4xl font-semibold tracking-tight mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {layer.title}
                </h2>
                <p className={`text-xl mb-6 ${theme === 'dark' ? 'text-accent-400/80' : 'text-accent-600'}`}>{layer.subtitle}</p>
                <p className={`text-lg leading-relaxed mb-8 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                  {layer.description}
                </p>
                <p className={`italic border-l-2 border-accent-600 pl-4 ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'
                }`}>
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
                      className={`rounded-2xl p-6 ${
                        theme === 'dark' 
                          ? 'bg-slate-900/50 border border-slate-800/50' 
                          : 'bg-white border border-gray-200 shadow-sm'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 mb-3 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                      <p className={`text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{cap}</p>
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
        <section className={`relative py-24 ${theme === 'dark' ? 'bg-slate-925' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-tag mb-4 inline-block">{t.partners.tag}</span>
              <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.partners.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                {t.partners.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Building2, title: t.partners.categories.selfOperated, value: '30+', desc: locale === 'zh-CN' ? '自营智慧透析中心' : locale === 'zh-TW' ? '自營智慧透析中心' : locale === 'ja' ? '自社運営スマート透析センター' : 'Self-operated smart dialysis centers' },
                { icon: Hospital, title: t.partners.categories.publicHospitals, value: '5+', desc: locale === 'zh-CN' ? '标杆性公立医院' : locale === 'zh-TW' ? '標杆性公立醫院' : locale === 'ja' ? '著名公立病院' : 'Landmark public hospitals' },
                { icon: Building, title: t.partners.categories.privateHospitals, value: '20+', desc: locale === 'zh-CN' ? '知名民营医院' : locale === 'zh-TW' ? '知名民營醫院' : locale === 'ja' ? '著名民間病院' : 'Renowned private hospitals' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-center rounded-2xl p-6 ${
                    theme === 'dark' 
                      ? 'bg-slate-900/50 border border-slate-800/50' 
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
                  <h3 className={`font-display text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <div className={`text-4xl font-display font-semibold mb-2 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`}>{item.value}</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Partner CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-center rounded-2xl p-8 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-accent-900/20 via-slate-900 to-accent-900/20 border border-accent-800/30' 
                  : 'bg-gradient-to-r from-accent-50 via-white to-accent-50 border border-accent-200'
              }`}
            >
              <h3 className={`font-display text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t.partners.cta.title}
              </h3>
              <p className={`mb-6 max-w-xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
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
      <section className={`relative py-32 ${theme === 'light' ? 'bg-white' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.differentiators.title}
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
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
                className={`text-center rounded-2xl p-6 ${
                  theme === 'dark' 
                    ? 'bg-slate-900/50 border border-slate-800/50' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  theme === 'dark' 
                    ? 'bg-accent-900/30 border border-accent-800/30' 
                    : 'bg-accent-50 border border-accent-200'
                }`}>
                  <span className={`font-display font-semibold ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`}>{index + 1}</span>
                </div>
                <h3 className={`font-display font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Links */}
      {t.crossLinks && (
        <section className={`relative py-24 ${theme === 'dark' ? 'bg-slate-925' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { href: `/${locale}/clinical`, ...t.crossLinks.clinical },
                { href: `/${locale}/deployment`, ...t.crossLinks.deployment },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href} className={`block rounded-2xl p-6 group transition-colors ${
                    theme === 'dark' 
                      ? 'bg-slate-900/50 border border-slate-800/50 hover:border-accent-500/50' 
                      : 'bg-white border border-gray-200 shadow-sm hover:border-accent-300'
                  }`}>
                    <h3 className={`font-display font-semibold mb-2 transition-colors ${
                      theme === 'dark' ? 'text-white group-hover:text-accent-400' : 'text-gray-900 group-hover:text-accent-600'
                    }`}>
                      {link.title}
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>{link.description}</p>
                    <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
                    }`}>
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
    </div>
  )
}
