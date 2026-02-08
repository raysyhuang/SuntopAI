'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Center, CenterType } from '@/types/center'
import { useTheme } from '@/components/ThemeProvider'

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
  const [isProvinceSectionOpen, setIsProvinceSectionOpen] = useState(false)
  const [isCenterListOpen, setIsCenterListOpen] = useState(true)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Detect desktop/mobile
  useEffect(() => {
    if (!isClient) return
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [isClient])

  // Simplified search state - no IME blocking
  const [searchValue, setSearchValue] = useState(searchQuery)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  // Sync search value when parent clears filters
  useEffect(() => {
    setSearchValue(searchQuery)
  }, [searchQuery])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  // Debounced search to improve performance and allow IME composition
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    // Debounce search by 300ms to allow IME composition to complete
    searchTimeoutRef.current = setTimeout(() => {
      onSearchChange(value)
    }, 300)
  }, [onSearchChange])

  const handleProvinceToggle = useCallback((province: string) => {
    if (selectedProvinces.includes(province)) {
      onProvincesChange(selectedProvinces.filter(p => p !== province))
    } else {
      onProvincesChange([...selectedProvinces, province])
    }
  }, [selectedProvinces, onProvincesChange])

  const typeBadge = (type: CenterType) => {
    if (type === 'direct') {
      return (
        <span
          className="px-2 py-0.5 text-xs rounded-full flex-shrink-0"
          style={{
            backgroundColor: 'rgba(0,125,115,0.1)',
            color: '#007d73',
            border: '1px solid rgba(0,125,115,0.25)'
          }}
        >
          {dictionary.map?.filters?.directOnly || '直营'}
        </span>
      )
    }
    return (
      <span
        className="px-2 py-0.5 text-xs rounded-full flex-shrink-0"
        style={{
          backgroundColor: 'rgba(139,92,246,0.1)',
          color: '#7c3aed',
          border: '1px solid rgba(139,92,246,0.25)'
        }}
      >
        {dictionary.map?.filters?.partnerOnly || '合作'}
      </span>
    )
  }

  const CenterList = () => {
    if (!filteredCenters || filteredCenters.length === 0) return null

    return (
      <div className="space-y-2">
        {filteredCenters.map(center => (
          <div
            key={center.id}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 touch-manipulation ${
              theme === 'light' ? 'hover:bg-gray-50 hover:shadow-sm active:bg-gray-100' : 'hover:bg-slate-800/80 active:bg-slate-700'
            }`}
            style={{
              backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b',
              border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#334155'}`,
              WebkitTapHighlightColor: 'transparent' // Remove iOS tap highlight
            }}
            onClick={() => {
              // Notify parent to focus on this center on the map
              if (onCenterClick) {
                onCenterClick(center.id)
              }
              // Close mobile filters if open
              setIsMobileFiltersOpen(false)
              // Scroll map into view on mobile
              setTimeout(() => {
                const mapEl = document.querySelector('.leaflet-container')
                if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 100)
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span
                className="text-sm font-medium leading-tight flex-1"
                style={{ color: theme === 'light' ? '#1d1d1f' : '#f1f5f9' }}
              >
                {center.name}
              </span>
              {typeBadge(center.type)}
            </div>
            <div className="flex items-center gap-1">
              <svg width="12" height="12" fill={theme === 'light' ? '#9ca3af' : '#64748b'} viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span
                className="text-xs"
                style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }}
              >
                {center.city}, {center.province}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const FiltersContent = () => (
    <div className="flex flex-col h-full">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 space-y-4 pb-4">
        {/* Search */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: theme === 'light' ? '#6e6e73' : '#cbd5e1' }}
          >
            {dictionary.map.filters.searchPlaceholder || '搜索'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={dictionary.map.filters.searchPlaceholder || '搜索城市或中心名称'}
              className="w-full px-4 py-2.5 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
              style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b',
                border: `1px solid ${theme === 'light' ? '#d1d5db' : '#334155'}`,
                color: theme === 'light' ? '#1d1d1f' : '#e2e8f0'
              }}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: theme === 'light' ? '#9ca3af' : '#64748b' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: theme === 'light' ? '#6e6e73' : '#cbd5e1' }}
          >
            {dictionary.map.filters.allTypes || '类型'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onTypeChange('all')}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                backgroundColor: selectedType === 'all'
                  ? '#007d73'
                  : theme === 'light' ? '#ffffff' : '#1e293b',
                color: selectedType === 'all'
                  ? '#ffffff'
                  : theme === 'light' ? '#1d1d1f' : '#cbd5e1',
                border: `1px solid ${selectedType === 'all' ? '#007d73' : theme === 'light' ? '#d1d5db' : '#334155'}`
              }}
            >
              {dictionary.map.filters.allTypes || '全部'}
            </button>
            <button
              onClick={() => onTypeChange('direct')}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                backgroundColor: selectedType === 'direct'
                  ? '#007d73'
                  : theme === 'light' ? '#ffffff' : '#1e293b',
                color: selectedType === 'direct'
                  ? '#ffffff'
                  : theme === 'light' ? '#1d1d1f' : '#cbd5e1',
                border: `1px solid ${selectedType === 'direct' ? '#007d73' : theme === 'light' ? '#d1d5db' : '#334155'}`
              }}
            >
              {dictionary.map.filters.directOnly || '直营'}
            </button>
            <button
              onClick={() => onTypeChange('partner')}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                backgroundColor: selectedType === 'partner'
                  ? '#8b5cf6'
                  : theme === 'light' ? '#ffffff' : '#1e293b',
                color: selectedType === 'partner'
                  ? '#ffffff'
                  : theme === 'light' ? '#1d1d1f' : '#cbd5e1',
                border: `1px solid ${selectedType === 'partner' ? '#8b5cf6' : theme === 'light' ? '#d1d5db' : '#334155'}`
              }}
            >
              {dictionary.map.filters.partnerOnly || '合作'}
            </button>
          </div>
        </div>

        {/* Results count & Clear */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#334155' }}
        >
          <div className="text-sm font-medium" style={{ color: theme === 'light' ? '#1d1d1f' : '#f1f5f9' }}>
            {resultCount} {dictionary.map.filters.centersCount || '个中心'}
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => {
                onClearFilters()
                setSearchValue('')
              }}
              className="text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: theme === 'light' ? '#007d73' : '#5eead4' }}
            >
              {dictionary.map.filters.clearFilters || '清除筛选'}
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Content Section - Single scroll for everything below */}
      <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-1 -mr-1">
        {/* Province Filter - Accordion Style */}
        <div>
          <button
            onClick={() => setIsProvinceSectionOpen(!isProvinceSectionOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors"
            style={{
              backgroundColor: theme === 'light' ? '#f9fafb' : '#1e293b',
              border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#334155'}`
            }}
          >
            <span className="text-sm font-medium" style={{ color: theme === 'light' ? '#1d1d1f' : '#f1f5f9' }}>
              {dictionary.map.filters.allProvinces || '省份'} 
              {selectedProvinces.length > 0 && ` (${selectedProvinces.length})`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isProvinceSectionOpen ? 'rotate-180' : ''}`}
              style={{ color: theme === 'light' ? '#9ca3af' : '#64748b' }}
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
                  <span
                    className="text-sm"
                    style={{ color: theme === 'light' ? '#1d1d1f' : '#e2e8f0' }}
                  >
                    {province}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Center List - Accordion Style */}
        {filteredCenters && filteredCenters.length > 0 && (
          <div>
            <button
              onClick={() => setIsCenterListOpen(!isCenterListOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors"
              style={{
                backgroundColor: theme === 'light' ? '#f9fafb' : '#1e293b',
                border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#334155'}`
              }}
            >
              <span className="text-sm font-medium" style={{ color: theme === 'light' ? '#1d1d1f' : '#f1f5f9' }}>
                {dictionary.map?.filters?.centerList || '中心列表'}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isCenterListOpen ? 'rotate-180' : ''}`}
                style={{ color: theme === 'light' ? '#9ca3af' : '#64748b' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCenterListOpen && (
              <div className="mt-2">
                <CenterList />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar - Only render on desktop after client hydration */}
      {isClient && isDesktop && (
        <div
          className="flex flex-col w-80 border-r"
          style={{
            backgroundColor: theme === 'light' ? '#f9fafb' : '#0f172a',
            borderColor: theme === 'light' ? '#e5e7eb' : '#1e293b',
            height: '100%'
          }}
        >
        <div className="flex-shrink-0 p-6 pb-4 border-b" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#1e293b' }}>
          <h3
            className="text-lg font-semibold"
            style={{ color: theme === 'light' ? '#111827' : '#f1f5f9' }}
          >
            {dictionary.map.filters.filterTitle || '筛选中心'}
          </h3>
        </div>
        <div className="flex-1 min-h-0 p-6 pt-4">
          <FiltersContent />
        </div>
      </div>
      )}

      {/* Mobile Floating Button - Only visible on mobile after client hydration */}
      {isClient && !isDesktop && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-xl flex items-center gap-2 transition-all active:scale-95 backdrop-blur-sm"
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 125, 115, 0.3), 0 8px 10px -6px rgba(0, 125, 115, 0.2)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium">{dictionary.map.filters.filterButton || '筛选'} ({resultCount})</span>
        </button>
      </div>
      )}

      {/* Mobile Bottom Sheet - Improved scrolling */}
      {isClient && !isDesktop && isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl flex flex-col"
            style={{ 
              backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
              maxHeight: '90vh',
              height: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="flex-shrink-0 pt-3 pb-2 flex justify-center">
              <div 
                className="w-12 h-1.5 rounded-full"
                style={{ backgroundColor: theme === 'light' ? '#d1d5db' : '#334155' }}
              />
            </div>

            <div className="flex-shrink-0 flex items-center justify-between px-6 pb-4 border-b" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#1e293b' }}>
              <h3
                className="text-lg font-semibold"
                style={{ color: theme === 'light' ? '#111827' : '#f1f5f9' }}
              >
                {dictionary.map.filters.filterTitle || '筛选中心'}
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                style={{ color: theme === 'light' ? '#6b7280' : '#94a3b8' }}
                className="hover:opacity-80 transition-opacity -mr-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Scrollable content with touch optimization */}
            <div 
              className="flex-1 min-h-0 p-6 pt-4 overflow-y-auto overscroll-contain"
              style={{
                WebkitOverflowScrolling: 'touch', // Smooth iOS scrolling
                touchAction: 'pan-y' // Only allow vertical scrolling
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
