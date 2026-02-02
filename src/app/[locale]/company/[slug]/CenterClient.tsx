'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Ruler, CheckCircle, Building2 } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface Center {
  slug: string
  name: string
  shortName: string
  city: string
  province: string
  address: string
  contact?: string
  area?: string
  established?: string
  description: string
  features: string[]
  gallery?: string[]
}

interface CenterClientProps {
  locale: Locale
  dictionary: Dictionary
  center: Center
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function CenterClient({ locale, dictionary, center }: CenterClientProps) {
  const t = dictionary.company
  const centerLabels = t.centers?.centerDetail || {
    location: 'Address',
    contact: 'Contact',
    area: 'Area',
    features: 'Features',
    gallery: 'Gallery',
    backToList: 'Back'
  }
  const { theme } = useTheme()
  const [activeGalleryItem, setActiveGalleryItem] = useState<{ src: string; alt: string } | null>(null)

  // Close lightbox on escape key
  useEffect(() => {
    if (!activeGalleryItem) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveGalleryItem(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeGalleryItem])

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
                href={`/${locale}/company#centers`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }}
              >
                <ArrowLeft className="w-4 h-4" />
                {centerLabels.backToList}
              </Link>
            </motion.div>
            
            <motion.span variants={fadeInUp} className="label-tag mb-6 inline-block">
              {center.city}, {center.province}
            </motion.span>
            
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {center.name}
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl leading-relaxed"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {center.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Center Details */}
      <section 
        className="relative py-24"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6"
                style={{ 
                  backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                  border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                  >
                    <MapPin style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                  </div>
                  <h3 
                    className="font-semibold"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                  >
                    {centerLabels.location}
                  </h3>
                </div>
                <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                  {center.address}
                </p>
              </motion.div>

              {/* Contact */}
              {center.contact && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                    >
                      <Phone style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                    </div>
                    <h3 
                      className="font-semibold"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {centerLabels.contact}
                    </h3>
                  </div>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                    {center.contact}
                  </p>
                </motion.div>
              )}

              {/* Area */}
              {center.area && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl p-6"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                    >
                      <Ruler style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5" />
                    </div>
                    <h3 
                      className="font-semibold"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {centerLabels.area}
                    </h3>
                  </div>
                  <p style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }} className="text-sm">
                    {center.area}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Features */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 
                  className="font-display text-2xl font-semibold mb-8"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {centerLabels.features}
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {center.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 rounded-xl p-4"
                      style={{ 
                        backgroundColor: theme === 'light' ? '#f5f5f7' : 'rgba(15,23,42,0.5)',
                        border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                      }}
                    >
                      <CheckCircle style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-5 h-5 flex-shrink-0" />
                      <span style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Standard Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <h3 
                  className="font-display text-xl font-semibold mb-6"
                  style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                >
                  {t.centers?.features?.equipment || 'Standard Equipment'}
                </h3>
                
                <div 
                  className="rounded-2xl p-8"
                  style={{ 
                    backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.06)' : 'rgba(20,184,166,0.1)',
                    border: theme === 'light' ? '1px solid rgba(0,125,115,0.1)' : '1px solid rgba(20,184,166,0.2)'
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    <div className="text-center">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                      >
                        <Building2 style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
                      </div>
                      <h4 className="font-semibold mb-2" style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                        {t.centers?.features?.equipment || 'Equipment'}
                      </h4>
                      <p className="text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                        {t.centers?.features?.equipmentDesc || 'Advanced dialysis equipment'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                      >
                        <Building2 style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
                      </div>
                      <h4 className="font-semibold mb-2" style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                        {t.centers?.features?.team || 'Team'}
                      </h4>
                      <p className="text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                        {t.centers?.features?.teamDesc || 'Professional medical staff'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(0,125,115,0.1)' : 'rgba(20,184,166,0.15)' }}
                      >
                        <Building2 style={{ color: theme === 'light' ? '#007d73' : '#2dd4bf' }} className="w-7 h-7" />
                      </div>
                      <h4 className="font-semibold mb-2" style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}>
                        {t.centers?.features?.environment || 'Environment'}
                      </h4>
                      <p className="text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}>
                        {t.centers?.features?.environmentDesc || 'Comfortable care experience'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {center.gallery && center.gallery.length > 0 && (
        <section 
          className="relative py-24"
          style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 
                className="font-display text-2xl font-semibold"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {centerLabels.gallery}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {center.gallery.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl overflow-hidden aspect-[4/3] cursor-zoom-in"
                  style={{ 
                    boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                    border: theme === 'dark' ? '1px solid rgba(51,65,85,0.5)' : 'none'
                  }}
                  onClick={() => setActiveGalleryItem({ src: image, alt: `${center.name} - ${index + 1}` })}
                >
                  <img 
                    src={image} 
                    alt={`${center.name} - ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section 
        className="relative py-24"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : undefined }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-display text-3xl font-semibold mb-6"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {t.contact?.title || 'Contact Us'}
            </h2>
            <Link 
              href={`/${locale}/company#contact`}
              className="btn-primary inline-flex"
            >
              {t.contact?.form?.submit || 'Get in Touch'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeGalleryItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveGalleryItem(null)}
        >
          <button
            type="button"
            onClick={() => setActiveGalleryItem(null)}
            className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white transition-colors"
          >
            关闭
          </button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="max-h-[85vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeGalleryItem.src}
              alt={activeGalleryItem.alt}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <p className="mt-3 text-center text-sm font-medium text-white/90">
              {activeGalleryItem.alt}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
