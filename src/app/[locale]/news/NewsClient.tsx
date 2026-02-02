'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, ArrowRight, Building2, Users, Heart, Utensils } from 'lucide-react'
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
  { id: 1, category: 'event', icon: Heart, date: '2026-01-15', featured: true, image: '/images/news/news-kidney-care-event.jpg' },
  { id: 2, category: 'health', icon: Utensils, date: '2025-12-20', featured: false, image: '/images/news/news-summer-foods.jpg' },
  { id: 3, category: 'event', icon: Users, date: '2025-11-25', featured: true, image: '/images/news/news-dragon-boat.jpg' },
  { id: 4, category: 'deployment', icon: Building2, date: '2025-10-18', featured: true, image: '/images/news/news-binzhou-opening.jpg' },
]

const newsContent: Record<string, { title: string; summary: string }[]> = {
  en: [
    { title: 'Caring for Kidneys, Quality Dialysis | First Kidney Friend Association Event Successfully Concluded!', summary: 'The first Kidney Friend Association event at Zhongshan Shenkang brought together patients, families, and medical staff for an afternoon of education, sharing, and mutual support.' },
    { title: 'Are Common Summer Foods Suitable for Dialysis Patients?', summary: 'Our nutrition experts share guidance on which refreshing summer foods are safe and beneficial for dialysis patients, and which ones to avoid.' },
    { title: 'A Ceremonial Dragon Boat Festival at Xingkang Dialysis Center!', summary: 'Xingkang Blood Dialysis Center celebrated Dragon Boat Festival with traditional activities, zongzi making, and heartwarming moments with our kidney friends.' },
    { title: 'Walking Together for Kidney Health — Binzhou Xingkang Dialysis Center Now Open!', summary: 'We are excited to announce the grand opening of Binzhou Xingkang Blood Dialysis Center, bringing advanced dialysis care to more patients in the region.' },
  ],
  ja: [
    { title: '腎臓ケア・質の高い透析 | 第1回腎友会イベントが無事終了！', summary: '中山腎康での第1回腎友会イベントでは、患者、家族、医療スタッフが集まり、教育、共有、相互支援の午後を過ごしました。' },
    { title: '一般的な夏の食べ物は透析患者に適していますか？', summary: '栄養専門家が、透析患者にとって安全で有益な夏の爽やかな食べ物と、避けるべきものについてガイダンスを共有します。' },
    { title: '杏康透析センターでの端午の節句！', summary: '杏康血液透析センターは、伝統的な活動、粽作り、腎友との心温まるひとときで端午の節句を祝いました。' },
    { title: '腎臓の健康のために共に歩む — 滨州杏康透析センターオープン！', summary: '滨州杏康血液透析センターのグランドオープンを発表できることを嬉しく思います。この地域のより多くの患者に先進的な透析ケアを提供します。' },
  ],
  'zh-CN': [
    { title: '关爱肾脏 品质透析 | 首届肾友会圆满结束！', summary: '首届肾友会活动在中山肾康成功举办，患者、家属和医护人员共聚一堂，进行健康教育、经验分享和相互支持。' },
    { title: '常见的消暑食品适不适合透析人群？', summary: '我们的营养专家分享了哪些清凉消暑食品对透析患者安全有益，以及应该避免哪些食品的指导建议。' },
    { title: '充满仪式感的端午节，杏康血液透析中心太给力啦！', summary: '杏康血液透析中心与肾友们一起庆祝端午节，包粽子、做手工，共度温馨美好的节日时光。' },
    { title: '携手共"净" 肾爱同行——滨州杏康血液透析中心正式开诊啦！', summary: '滨州杏康血液透析中心盛大开业，为更多肾友带来先进的透析医疗服务，守护肾友健康。' },
  ],
  'zh-TW': [
    { title: '關愛腎臟 品質透析 | 首屆腎友會圓滿結束！', summary: '首屆腎友會活動在中山腎康成功舉辦，患者、家屬和醫護人員共聚一堂，進行健康教育、經驗分享和相互支持。' },
    { title: '常見的消暑食品適不適合透析人群？', summary: '我們的營養專家分享了哪些清涼消暑食品對透析患者安全有益，以及應該避免哪些食品的指導建議。' },
    { title: '充滿儀式感的端午節，杏康血液透析中心太給力啦！', summary: '杏康血液透析中心與腎友們一起慶祝端午節，包粽子、做手工，共度溫馨美好的節日時光。' },
    { title: '攜手共"淨" 腎愛同行——濱州杏康血液透析中心正式開診啦！', summary: '濱州杏康血液透析中心盛大開業，為更多腎友帶來先進的透析醫療服務，守護腎友健康。' },
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
    { id: 'event', label: t.categories.event || '活动' },
    { id: 'deployment', label: t.categories.deployment },
    { id: 'health', label: t.categories.health || '健康' },
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
                    className={`group cursor-pointer rounded-2xl overflow-hidden ${
                      theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white shadow-lg'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm"
                        >
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/90">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.date, locale)}
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h3 
                        className={`font-display font-semibold mb-2 line-clamp-2 transition-colors group-hover:text-[#007d73] ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{item.summary}</p>
                      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#007d73' }}>
                        {t.readMore}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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
                  className={`flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-xl transition-all cursor-pointer group ${
                    theme === 'dark' ? 'bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <span 
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: '#007d73' }}
                      >
                        {item.category}
                      </span>
                      <span className={theme === 'light' ? 'text-gray-300' : 'text-gray-600'}>•</span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{formatDate(item.date, locale)}</span>
                    </div>
                    <h3 
                      className={`font-display font-semibold mb-2 line-clamp-1 md:line-clamp-2 transition-colors group-hover:text-[#007d73] ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed line-clamp-2 hidden md:block ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{item.summary}</p>
                  </div>
                  <ArrowRight 
                    className={`w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-all hidden md:block ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                    }`}
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
