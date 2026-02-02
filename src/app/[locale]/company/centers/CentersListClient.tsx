'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPinned } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface Center {
  slug: string
  name: string
  shortName: string
  city: string
  province: string
  description: string
}

interface CentersListClientProps {
  locale: Locale
  dictionary: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function CentersListClient({ locale, dictionary }: CentersListClientProps) {
  const t = dictionary.company
  const centers = t.centers?.list || []
  const { theme } = useTheme()

  // Group centers by province
  const centersByProvince = centers.reduce((acc: Record<string, Center[]>, center: Center) => {
    if (!acc[center.province]) {
      acc[center.province] = []
    }
    acc[center.province].push(center)
    return acc
  }, {})

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
            <motion.div variants={fadeInUp} className="mb-6">
              <Link 
                href={`/${locale}/company`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t.tag}
              </Link>
            </motion.div>
            
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {t.centers?.tag}
            </motion.span>
            
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.centers?.title}
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl leading-relaxed"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {t.centers?.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Centers by Province */}
      <section 
        className="relative py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {Object.entries(centersByProvince).map(([province, provinceCenters], provinceIndex) => (
            <motion.div
              key={province}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: provinceIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <h2 
                className="font-display text-2xl font-semibold mb-8 pb-4"
                style={{ 
                  color: theme === 'light' ? '#1d1d1f' : '#ffffff',
                  borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)'
                }}
              >
                {province}
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {(provinceCenters as Center[]).map((center, index) => (
                  <motion.div
                    key={center.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/${locale}/company/${center.slug}`}>
                      <div 
                        className="rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        style={{ 
                          backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                          boxShadow: theme === 'light' ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
                          border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                          >
                            <MapPinned style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-6 h-6" />
                          </div>
                          <ArrowRight style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                        </div>
                        <h3 
                          className="font-display text-lg font-semibold mb-2"
                          style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                        >
                          {center.name}
                        </h3>
                        <p style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }} className="text-sm">
                          {center.city}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* More Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 pt-16"
            style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(51,65,85,0.5)' }}
          >
            <p style={{ color: theme === 'light' ? '#86868b' : '#71717a' }} className="text-lg">
              {t.centers?.moreComingSoon}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
