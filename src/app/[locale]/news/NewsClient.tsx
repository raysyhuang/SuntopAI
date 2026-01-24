'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Building2, Users, Award, Mic } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface NewsClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const newsItems = [
  { id: 1, category: 'deployment', icon: Building2, date: '2026-01-15', featured: true },
  { id: 2, category: 'partnership', icon: Users, date: '2025-12-08', featured: false },
  { id: 3, category: 'milestone', icon: Award, date: '2025-11-20', featured: true },
  { id: 4, category: 'conference', icon: Mic, date: '2025-10-15', featured: false },
  { id: 5, category: 'deployment', icon: Building2, date: '2025-09-01', featured: false },
  { id: 6, category: 'milestone', icon: Award, date: '2025-08-10', featured: true },
]

const newsContent: Record<string, { title: string; summary: string }[]> = {
  en: [
    { title: 'Platform Deployed at Regional Dialysis Network', summary: 'Suntop AI platform now monitoring 50+ dialysis stations across a regional healthcare network, providing real-time intelligence and decision support.' },
    { title: 'Strategic Partnership with Leading Dialysis Equipment Manufacturer', summary: 'New integration partnership expands platform compatibility and enables deeper machine-level data access.' },
    { title: 'AI Model Achieves 95% Early Detection Rate', summary: 'Clinical validation study demonstrates high accuracy in predicting intradialytic hypotension 15 minutes before occurrence.' },
    { title: 'Presented at International Nephrology Conference', summary: 'Research findings on AI-assisted dialysis optimization presented to international audience of nephrologists and researchers.' },
    { title: 'Pilot Program Expansion', summary: 'Following successful initial deployment, three additional dialysis centers join the pilot program.' },
    { title: 'Series A Funding Completed', summary: 'Funding round led by healthcare-focused investors to accelerate platform development and market expansion.' },
  ],
  ja: [
    { title: '地域透析ネットワークでプラットフォーム導入', summary: 'Suntop AIプラットフォームが地域医療ネットワーク全体で50以上の透析ステーションを監視し、リアルタイムインテリジェンスと意思決定支援を提供。' },
    { title: '大手透析装置メーカーとの戦略的パートナーシップ', summary: '新しい統合パートナーシップにより、プラットフォームの互換性が拡大し、より深い装置レベルのデータアクセスが可能に。' },
    { title: 'AIモデルが95%の早期検出率を達成', summary: '臨床検証研究により、透析中低血圧の発生15分前に高精度で予測できることが実証。' },
    { title: '国際腎臓学会議で発表', summary: 'AI支援透析最適化に関する研究成果を腎臓専門医と研究者の国際的な聴衆に発表。' },
    { title: 'パイロットプログラムの拡大', summary: '初期導入の成功に続き、3つの透析センターがパイロットプログラムに参加。' },
    { title: 'シリーズA資金調達完了', summary: 'ヘルスケア重視の投資家主導の資金調達ラウンドにより、プラットフォーム開発と市場拡大を加速。' },
  ],
  'zh-CN': [
    { title: '平台在区域透析网络部署', summary: 'Suntop AI平台现已在区域医疗网络中监控50多个透析站，提供实时智能和决策支持。' },
    { title: '与领先透析设备制造商达成战略合作', summary: '新的整合合作扩展了平台兼容性，实现更深层次的设备级数据访问。' },
    { title: 'AI模型实现95%早期检测率', summary: '临床验证研究表明，在透析中低血压发生前15分钟即可高精度预测。' },
    { title: '在国际肾脏病学会议上发表', summary: 'AI辅助透析优化的研究成果向国际肾脏病专家和研究人员展示。' },
    { title: '试点项目扩展', summary: '在成功初始部署后，三个额外的透析中心加入试点项目。' },
    { title: 'A轮融资完成', summary: '由医疗健康投资者主导的融资轮，加速平台开发和市场扩张。' },
  ],
  'zh-TW': [
    { title: '平台在區域透析網路部署', summary: 'Suntop AI平台現已在區域醫療網路中監控50多個透析站，提供即時智能和決策支援。' },
    { title: '與領先透析設備製造商達成策略合作', summary: '新的整合合作擴展了平台相容性，實現更深層次的設備級資料存取。' },
    { title: 'AI模型實現95%早期檢測率', summary: '臨床驗證研究表明，在透析中低血壓發生前15分鐘即可高精度預測。' },
    { title: '在國際腎臟病學會議上發表', summary: 'AI輔助透析最佳化的研究成果向國際腎臟病專家和研究人員展示。' },
    { title: '試點專案擴展', summary: '在成功初始部署後，三個額外的透析中心加入試點專案。' },
    { title: 'A輪融資完成', summary: '由醫療健康投資者主導的融資輪，加速平台開發和市場擴張。' },
  ],
}

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString)
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'ja': 'ja-JP',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
  }
  return date.toLocaleDateString(localeMap[locale] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsClient({ locale, dictionary }: NewsClientProps) {
  const t = dictionary.news
  const content = newsContent[locale] || newsContent.en
  const { theme } = useTheme()

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'deployment', label: t.categories.deployment },
    { id: 'partnership', label: t.categories.partnership },
    { id: 'milestone', label: t.categories.milestone },
    { id: 'conference', label: t.categories.conference },
  ]

  const enrichedNewsItems = newsItems.map((item, index) => ({
    ...item,
    ...content[index],
  }))

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

      {/* News Feed */}
      <section 
        className="relative py-16"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={category.id === 'all' ? {
                  backgroundColor: '#007d73',
                  color: '#ffffff'
                } : {
                  backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(30,41,59,1)',
                  color: theme === 'light' ? '#6e6e73' : '#a1a1aa'
                }}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Featured News */}
          <div className="mb-16">
            <h2 
              className="text-sm font-medium uppercase tracking-wider mb-6"
              style={{ color: theme === 'light' ? '#86868b' : '#64748b' }}
            >
              {t.featured}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrichedNewsItems
                .filter((item) => item.featured)
                .map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer rounded-2xl p-6"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                      boxShadow: theme === 'light' ? '0 2px 12px rgba(0,125,115,0.06)' : 'none',
                      border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                      >
                        <item.icon style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: theme === 'light' ? '#86868b' : '#64748b' }}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.date, locale)}
                      </div>
                    </div>
                    <h3 
                      className="font-display font-semibold mb-3 transition-colors group-hover:text-[#007d73]"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed mb-4">{item.summary}</p>
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#007d73' }}>
                      {t.readMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>

          {/* All News */}
          <div>
            <h2 
              className="text-sm font-medium uppercase tracking-wider mb-6"
              style={{ color: theme === 'light' ? '#86868b' : '#64748b' }}
            >
              {t.allUpdates}
            </h2>
            <div className="space-y-4">
              {enrichedNewsItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-6 p-6 rounded-xl transition-all cursor-pointer group"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.3)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div 
                    className="hidden sm:flex w-12 h-12 rounded-xl items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30,41,59,0.5)' }}
                  >
                    <item.icon style={{ color: theme === 'light' ? '#86868b' : '#64748b' }} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span 
                        className="text-2xs font-medium uppercase tracking-wider"
                        style={{ color: '#007d73' }}
                      >
                        {item.category}
                      </span>
                      <span style={{ color: theme === 'light' ? '#d2d2d7' : '#4b5563' }}>•</span>
                      <span className="text-xs" style={{ color: theme === 'light' ? '#86868b' : '#64748b' }}>{formatDate(item.date, locale)}</span>
                    </div>
                    <h3 
                      className="font-display font-semibold mb-2 transition-colors group-hover:text-[#007d73]"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm leading-relaxed line-clamp-2">{item.summary}</p>
                  </div>
                  <ArrowRight 
                    className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-all" 
                    style={{ color: theme === 'light' ? '#d2d2d7' : '#4b5563' }}
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section 
        className="relative py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-display text-2xl font-semibold tracking-tight mb-4"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.subscribe.title}
            </h2>
            <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="mb-8">
              {t.subscribe.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.subscribe.placeholder}
                className="flex-1 px-4 py-3 rounded-lg transition-colors focus:outline-none"
                style={{ 
                  backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(15,23,42,1)',
                  border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)',
                  color: theme === 'light' ? '#1d1d1f' : '#ffffff'
                }}
              />
              <button className="btn-primary whitespace-nowrap">
                {t.subscribe.button}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
