'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Center, CenterType } from '@/types/center'
import { useTheme } from '@/components/ThemeProvider'
import { getMapColors } from './map-theme'
import { MapSearchInput } from './MapSearchInput'
import { MapTypeFilter } from './MapTypeFilter'
import { MapCenterList } from './MapCenterList'

interface MapFiltersProps {
  // Filter state
  provinces: string[]
  selectedProvinces: string[]
  selectedType: 'all' | CenterType
  searchQuery: string

  // Setters
  onProvincesChange: (provinces: string[]) => void
  onTypeChange: (type: 'all' | CenterType) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void

  // UI
  hasActiveFilters: boolean
  resultCount: number
  dictionary: any

  // Center list
  filteredCenters?: Center[]
  locale?: string
  onCenterClick?: (centerId: string) => void
}

export function MapFilters({
  provinces,
  selectedProvinces,
  selectedType,
  searchQuery,
  onProvincesChange,
  onTypeChange,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
  resultCount,
  dictionary,
  filteredCenters,
  locale,
  onCenterClick
}: MapFiltersProps) {
  const { theme } = useTheme()
  const colors = getMapColors(theme)
  const [isProvinceSectionOpen, setIsProvinceSectionOpen] = useState(false)
  const [isCenterListOpen, setIsCenterListOpen] = useState(true)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => { setIsClient(true) }, [])

  useEffect(() => {
    if (!isClient) return
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [isClient])

  const handleProvinceToggle = useCallback((province: string) => {
    if (selectedProvinces.includes(province)) {
      onProvincesChange(selectedProvinces.filter(p => p !== province))
    } else {
      onProvincesChange([...selectedProvinces, province])
    }
  }, [selectedProvinces, onProvincesChange])

  const closeMobileFilters = useCallback(() => setIsMobileFiltersOpen(false), [])

  const typeLabels = {
    all: dictionary.map.filters.allTypes || '全部',
    direct: dictionary.map.filters.directOnly || '直营',
    partner: dictionary.map.filters.partnerOnly || '合作',
  }

  const FiltersContent = () => (
    <div className="flex flex-col h-full">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 space-y-4 pb-4">
        <MapSearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={dictionary.map.filters.searchPlaceholder || '搜索城市或中心名称'}
          label={dictionary.map.filters.searchPlaceholder || '搜索'}
          colors={colors}
        />

        <MapTypeFilter
          selectedType={selectedType}
          onTypeChange={onTypeChange}
          labels={typeLabels}
          colors={colors}
        />

        {/* Results count & Clear */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: colors.border }}
        >
          <div className="text-sm font-medium" style={{ color: colors.text }}>
            {resultCount} {dictionary.map.filters.centersCount || '个中心'}
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: colors.accentHover }}
            >
              {dictionary.map.filters.clearFilters || '清除筛选'}
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-1 -mr-1">
        {/* Province Filter - Accordion */}
        <div>
          <button
            onClick={() => setIsProvinceSectionOpen(!isProvinceSectionOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors"
            style={{
              backgroundColor: colors.sectionBg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <span className="text-sm font-medium" style={{ color: colors.text }}>
              {dictionary.map.filters.allProvinces || '省份'}
              {selectedProvinces.length > 0 && ` (${selectedProvinces.length})`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isProvinceSectionOpen ? 'rotate-180' : ''}`}
              style={{ color: colors.textMuted }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProvinceSectionOpen && (
            <div className="mt-2 space-y-1">
              {provinces.map(province => (
                <label
                  key={province}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                    theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedProvinces.includes(province)}
                    onChange={() => handleProvinceToggle(province)}
                    className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 border-gray-300"
                  />
                  <span className="text-sm" style={{ color: colors.text }}>
                    {province}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Center List - Accordion */}
        {filteredCenters && filteredCenters.length > 0 && (
          <div>
            <button
              onClick={() => setIsCenterListOpen(!isCenterListOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors"
              style={{
                backgroundColor: colors.sectionBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <span className="text-sm font-medium" style={{ color: colors.text }}>
                {dictionary.map?.filters?.centerList || '中心列表'}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isCenterListOpen ? 'rotate-180' : ''}`}
                style={{ color: colors.textMuted }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCenterListOpen && (
              <div className="mt-2">
                <MapCenterList
                  centers={filteredCenters}
                  dictionary={dictionary}
                  theme={theme}
                  colors={colors}
                  onCenterClick={onCenterClick}
                  onCloseFilters={closeMobileFilters}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      {isClient && isDesktop && (
        <div
          className="flex flex-col w-80 border-r"
          style={{
            backgroundColor: colors.panelBg,
            borderColor: colors.border,
            height: '100%',
          }}
        >
          <div className="flex-shrink-0 p-6 pb-4 border-b" style={{ borderColor: colors.border }}>
            <h3 className="text-lg font-semibold" style={{ color: colors.textHeading }}>
              {dictionary.map.filters.filterTitle || '筛选中心'}
            </h3>
          </div>
          <div className="flex-1 min-h-0 p-6 pt-4">
            <FiltersContent />
          </div>
        </div>
      )}

      {/* Mobile Floating Button */}
      {isClient && !isDesktop && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-xl flex items-center gap-2 transition-all active:scale-95 backdrop-blur-sm"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 125, 115, 0.3), 0 8px 10px -6px rgba(0, 125, 115, 0.2)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium">{dictionary.map.filters.filterButton || '筛选'} ({resultCount})</span>
          </button>
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      {isClient && !isDesktop && isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={closeMobileFilters}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl flex flex-col"
            style={{
              backgroundColor: theme === 'light' ? colors.cardBg : colors.panelBg,
              maxHeight: '90vh',
              height: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="flex-shrink-0 pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: colors.dragHandle }} />
            </div>

            <div className="flex-shrink-0 flex items-center justify-between px-6 pb-4 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-lg font-semibold" style={{ color: colors.textHeading }}>
                {dictionary.map.filters.filterTitle || '筛选中心'}
              </h3>
              <button
                onClick={closeMobileFilters}
                style={{ color: colors.textMuted }}
                className="hover:opacity-80 transition-opacity -mr-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="flex-1 min-h-0 p-6 pt-4 overflow-y-auto overscroll-contain"
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
            >
              <FiltersContent />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
