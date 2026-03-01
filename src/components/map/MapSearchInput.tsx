'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { MapColors } from './map-theme'

interface MapSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  colors: MapColors
}

export function MapSearchInput({ value, onChange, placeholder, label, colors }: MapSearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Sync when parent clears filters
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleChange = useCallback((newValue: string) => {
    setLocalValue(newValue)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    // Debounce 300ms to allow IME composition to complete
    timeoutRef.current = setTimeout(() => onChange(newValue), 300)
  }, [onChange])

  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
          style={{
            backgroundColor: colors.inputBg,
            border: `1px solid ${colors.inputBorder}`,
            color: colors.text,
          }}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: colors.textMuted }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}
