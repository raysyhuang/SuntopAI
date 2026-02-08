'use client'

import { useState, useCallback } from 'react'
import type { CenterType } from '@/types/center'
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
  dictionary
}: MapFiltersProps) {
  const { theme } = useTheme()
  const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleProvinceToggle = useCallback((province: string) => {
    if (selectedProvinces.includes(province)) {
      onProvincesChange(selectedProvinces.filter(p => p !== province))
    } else {
      onProvincesChange([...selectedProvinces, province])
    }
  }, [selectedProvinces, onProvincesChange])

  const FiltersContent = () => (
    <div className="space-y-6">
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
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={dictionary.map.filters.searchPlaceholder || '搜索城市或中心名称'}
            className="w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{
              backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b',
              border: `1px solid ${theme === 'light' ? '#d1d5db' : '#334155'}`,
              color: theme === 'light' ? '#1d1d1f' : '#e2e8f0'
            }}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
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
        <div className="space-y-2">
          <button
            onClick={() => onTypeChange('all')}
            className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
            {dictionary.map.filters.allTypes || '全部类型'}
          </button>
          <button
            onClick={() => onTypeChange('direct')}
            className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
            {dictionary.map.filters.directOnly || '仅直营'}
          </button>
          <button
            onClick={() => onTypeChange('partner')}
            className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
            {dictionary.map.filters.partnerOnly || '仅合作'}
          </button>
        </div>
      </div>

      {/* Province Filter */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: theme === 'light' ? '#6e6e73' : '#cbd5e1' }}
        >
          {dictionary.map.filters.allProvinces || '省份'}
        </label>
        <div className="relative">
          <button
            onClick={() => setIsProvinceDropdownOpen(!isProvinceDropdownOpen)}
            className="w-full px-4 py-2 rounded-lg text-left transition-colors flex items-center justify-between"
            style={{
              backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b',
              border: `1px solid ${theme === 'light' ? '#d1d5db' : '#334155'}`,
              color: theme === 'light' ? '#1d1d1f' : '#e2e8f0'
            }}
          >
            <span className="text-sm">
              {selectedProvinces.length === 0
                ? dictionary.map.filters.allProvinces || '全部省份'
                : `${selectedProvinces.length} ${dictionary.map.filters.provincesSelected || '个省份已选'}`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isProvinceDropdownOpen ? 'rotate-180' : ''}`}
              style={{ color: theme === 'light' ? '#9ca3af' : '#64748b' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProvinceDropdownOpen && (
            <div
              className="absolute z-10 w-full mt-2 rounded-lg shadow-xl max-h-64 overflow-y-auto"
              style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b',
                border: `1px solid ${theme === 'light' ? '#d1d5db' : '#334155'}`
              }}
            >
              {provinces.map(province => (
                <label
                  key={province}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors"
                  style={{
                    ':hover': {
                      backgroundColor: theme === 'light' ? '#f3f4f6' : '#334155'
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedProvinces.includes(province)}
                    onChange={() => handleProvinceToggle(province)}
                    className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500"
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
      </div>

      {/* Results count & Clear */}
      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#334155' }}
      >
        <div className="text-sm" style={{ color: theme === 'light' ? '#6e6e73' : '#94a3b8' }}>
          {resultCount} {dictionary.map.filters.centersCount || '个中心'}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium transition-colors"
            style={{ color: theme === 'light' ? '#007d73' : '#5eead4' }}
          >
            {dictionary.map.filters.clearFilters || '清除筛选'}
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden lg:block w-80 border-r p-6 overflow-y-auto"
        style={{
          backgroundColor: theme === 'light' ? '#f9fafb' : '#0f172a',
          borderColor: theme === 'light' ? '#e5e7eb' : '#1e293b'
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{ color: theme === 'light' ? '#111827' : '#f1f5f9' }}
        >
          {dictionary.map.filters.filterTitle || '筛选中心'}
        </h3>
        <FiltersContent />
      </div>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium">{dictionary.map.filters.filterButton || '筛选'} ({resultCount})</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobileFiltersOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-lg font-semibold"
                style={{ color: theme === 'light' ? '#111827' : '#f1f5f9' }}
              >
                {dictionary.map.filters.filterTitle || '筛选中心'}
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                style={{ color: theme === 'light' ? '#6b7280' : '#94a3b8' }}
                className="hover:opacity-80"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FiltersContent />
          </div>
        </div>
      )}
    </>
  )
}
