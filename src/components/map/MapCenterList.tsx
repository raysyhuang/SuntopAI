'use client'

import type { Center, CenterType } from '@/types/center'
import type { MapColors } from './map-theme'
import type { Theme } from './map-theme'

interface MapCenterListProps {
  centers: Center[]
  dictionary: any
  theme: Theme
  colors: MapColors
  onCenterClick?: (centerId: string) => void
  onCloseFilters?: () => void
}

function TypeBadge({ type, dictionary }: { type: CenterType; dictionary: any }) {
  const isDirect = type === 'direct'
  return (
    <span
      className="px-2 py-0.5 text-xs rounded-full flex-shrink-0"
      style={{
        backgroundColor: isDirect ? 'rgba(0,125,115,0.1)' : 'rgba(139,92,246,0.1)',
        color: isDirect ? '#007d73' : '#7c3aed',
        border: `1px solid ${isDirect ? 'rgba(0,125,115,0.25)' : 'rgba(139,92,246,0.25)'}`,
      }}
    >
      {isDirect
        ? (dictionary.map?.filters?.directOnly || '直营')
        : (dictionary.map?.filters?.partnerOnly || '合作')}
    </span>
  )
}

export function MapCenterList({ centers, dictionary, theme, colors, onCenterClick, onCloseFilters }: MapCenterListProps) {
  if (centers.length === 0) return null

  return (
    <div className="space-y-2">
      {centers.map(center => (
        <div
          key={center.id}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 touch-manipulation ${
            theme === 'light' ? 'hover:bg-gray-50 hover:shadow-sm active:bg-gray-100' : 'hover:bg-slate-800/80 active:bg-slate-700'
          }`}
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
            WebkitTapHighlightColor: 'transparent',
          }}
          onClick={() => {
            onCenterClick?.(center.id)
            onCloseFilters?.()
            setTimeout(() => {
              const mapEl = document.querySelector('.leaflet-container')
              if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 100)
          }}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <span
              className="text-sm font-medium leading-tight flex-1"
              style={{ color: colors.text }}
            >
              {center.name}
            </span>
            <TypeBadge type={center.type} dictionary={dictionary} />
          </div>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" fill={colors.textMuted} viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-xs" style={{ color: colors.textSecondary }}>
              {center.city}, {center.province}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
