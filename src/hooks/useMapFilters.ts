'use client'

import { useState, useMemo } from 'react'
import type { Center, CenterType } from '@/types/center'

export function useMapFilters(centers: Center[]) {
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<'all' | CenterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCenters = useMemo(() => {
    return centers.filter(center => {
      // Filter by province
      if (selectedProvinces.length > 0 && !selectedProvinces.includes(center.province)) {
        return false
      }

      // Filter by type
      if (selectedType !== 'all' && center.type !== selectedType) {
        return false
      }

      // Filter by search query (name or city)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = center.name.toLowerCase().includes(query)
        const matchesCity = center.city.toLowerCase().includes(query)
        const matchesShortName = center.shortName?.toLowerCase().includes(query)

        if (!matchesName && !matchesCity && !matchesShortName) {
          return false
        }
      }

      return true
    })
  }, [centers, selectedProvinces, selectedType, searchQuery])

  const provinces = useMemo(() => {
    const uniqueProvinces = new Set(centers.map(c => c.province))
    return Array.from(uniqueProvinces).sort()
  }, [centers])

  const clearFilters = () => {
    setSelectedProvinces([])
    setSelectedType('all')
    setSearchQuery('')
  }

  return {
    // State
    selectedProvinces,
    selectedType,
    searchQuery,

    // Setters
    setSelectedProvinces,
    setSelectedType,
    setSearchQuery,
    clearFilters,

    // Computed
    filteredCenters,
    provinces,
    hasActiveFilters: selectedProvinces.length > 0 || selectedType !== 'all' || searchQuery.trim() !== ''
  }
}
