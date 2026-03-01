'use client'

import type { CenterType } from '@/types/center'
import type { MapColors } from './map-theme'

interface MapTypeFilterProps {
  selectedType: 'all' | CenterType
  onTypeChange: (type: 'all' | CenterType) => void
  labels: { all: string; direct: string; partner: string }
  colors: MapColors
}

export function MapTypeFilter({ selectedType, onTypeChange, labels, colors }: MapTypeFilterProps) {
  const types: Array<{ key: 'all' | CenterType; label: string; activeColor: string }> = [
    { key: 'all', label: labels.all, activeColor: '#007d73' },
    { key: 'direct', label: labels.direct, activeColor: '#007d73' },
    { key: 'partner', label: labels.partner, activeColor: '#8b5cf6' },
  ]

  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: colors.textSecondary }}
      >
        {labels.all}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {types.map(({ key, label, activeColor }) => {
          const isActive = selectedType === key
          return (
            <button
              key={key}
              onClick={() => onTypeChange(key)}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                backgroundColor: isActive ? activeColor : colors.inputBg,
                color: isActive ? '#ffffff' : colors.textSecondary,
                border: `1px solid ${isActive ? activeColor : colors.inputBorder}`,
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
