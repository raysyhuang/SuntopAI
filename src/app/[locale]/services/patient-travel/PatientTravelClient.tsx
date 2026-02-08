'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { useCentersData } from '@/hooks/useCentersData'
import { useMapFilters } from '@/hooks/useMapFilters'
import { MapFilters } from '@/components/map/MapFilters'
import { MapLegend } from '@/components/map/MapLegend'
import { useTheme } from '@/components/ThemeProvider'

// Dynamic import to avoid SSR issues with Leaflet
const CentersMap = dynamic(
  () => import('@/components/map/CentersMap').then(mod => ({ default: mod.CentersMap })),
  { ssr: false, loading: () => <MapLoadingSkeleton /> }
)

interface PatientTravelClientProps {
  dictionary: any
  locale: Locale
}

function MapLoadingSkeleton() {
  return (
    <div className="w-full h-full bg-slate-900 dark:bg-slate-900 light:bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 dark:text-slate-400 light:text-gray-600">Loading map...</p>
      </div>
    </div>
  )
}

export function PatientTravelClient({ dictionary, locale }: PatientTravelClientProps) {
  const dict = dictionary.services.patientTravel
  const { theme } = useTheme()
  const { centers, loading, error } = useCentersData(locale)
  const {
    selectedProvinces,
    selectedType,
    searchQuery,
    setSelectedProvinces,
    setSelectedType,
    setSearchQuery,
    clearFilters,
    filteredCenters,
    provinces,
    hasActiveFilters
  } = useMapFilters(centers)
  
  // State for selected center (to focus on map)
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#020617' }}>
      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}
      >
        {theme === 'dark' && (
          <>
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 radial-gradient" />
          </>
        )}

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tag */}
            <span className="label-tag mb-6 inline-block">{dict.tag}</span>

            {/* Headline */}
            <h1
              className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {dict.hero.title}
            </h1>
            <p
              className="text-xl leading-relaxed mb-8"
              style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
            >
              {dict.hero.subtitle}
            </p>

            {/* CTA Button */}
            <a
              href="#map"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-white rounded-lg font-medium transition-colors"
            >
              {dict.cta.button}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2
                className="font-display text-3xl md:text-4xl font-semibold mb-4"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
              >
                {dict.map.title}
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
              >
                {dict.map.subtitle}
              </p>
            </div>

            {/* Map Container */}
            <div
              className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden"
              style={{
                height: '700px',
                backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
                border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#1e293b'}`,
                boxShadow: theme === 'light' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
              }}
            >
              {/* Filters Sidebar */}
              <MapFilters
                provinces={provinces}
                selectedProvinces={selectedProvinces}
                selectedType={selectedType}
                searchQuery={searchQuery}
                onProvincesChange={setSelectedProvinces}
                onTypeChange={setSelectedType}
                onSearchChange={setSearchQuery}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                resultCount={filteredCenters.length}
                dictionary={dict}
                filteredCenters={filteredCenters}
                locale={locale}
                onCenterClick={setSelectedCenterId}
              />

              {/* Map - z-0 creates stacking context so Leaflet z-indexes stay contained */}
              <div className="flex-1 relative z-0">
                {loading ? (
                  <MapLoadingSkeleton />
                ) : error ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>Failed to load map data</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <CentersMap 
                      centers={filteredCenters} 
                      isDarkTheme={theme === 'dark'} 
                      locale={locale}
                      selectedCenterId={selectedCenterId}
                      onCenterSelect={setSelectedCenterId}
                    />
                    <MapLegend dictionary={dict} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20" style={{ backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className="font-display text-3xl md:text-4xl font-semibold mb-12 text-center"
              style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
            >
              {dict.howItWorks.title}
            </h2>

            <div className="relative">
              {/* Connector Line - spans across all circles on desktop */}
              <div
                className="hidden lg:block absolute h-0.5"
                style={{
                  backgroundColor: theme === 'light' ? '#d1d5db' : '#334155',
                  top: '24px',
                  left: 'calc(12.5% - 0px)',
                  right: 'calc(12.5% - 0px)',
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {dict.howItWorks.steps.map((step: any, index: number) => (
                  <div key={index} className="flex flex-col items-center text-center lg:items-center">
                    {/* Step Number */}
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xl mb-4 relative z-10"
                      style={{
                        backgroundColor: theme === 'light' ? '#f5f5f7' : '#0f172a',
                        borderColor: theme === 'light' ? '#007d73' : '#14b8a6',
                        color: theme === 'light' ? '#007d73' : '#5eead4'
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Content */}
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: theme === 'light' ? '#6e6e73' : '#a1a1aa' }}
                    >
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
