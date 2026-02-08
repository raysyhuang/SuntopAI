'use client'

import { Popup } from 'react-leaflet'
import Link from 'next/link'
import type { Center } from '@/types/center'
import { useTheme } from '@/components/ThemeProvider'

interface MapPopupProps {
  center: Center
}

export function MapPopup({ center }: MapPopupProps) {
  const { theme } = useTheme()

  const typeBadge = center.type === 'direct'
    ? <span className="px-2 py-0.5 text-xs rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">直营中心</span>
    : <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">合作医院</span>

  const hasTourism = center.tourism && center.tourism.length > 0

  return (
    <Popup className="map-popup" maxWidth={300}>
      <div className="p-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-base font-semibold leading-tight"
            style={{ color: theme === 'light' ? '#1d1d1f' : '#ffffff' }}
          >
            {center.name}
          </h3>
          {typeBadge}
        </div>

        {/* Location */}
        <div className="space-y-1 mb-3" style={{ fontSize: '0.875rem' }}>
          <div className="flex items-center gap-1" style={{ color: theme === 'light' ? '#6e6e73' : '#cbd5e1' }}>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: theme === 'light' ? '#9ca3af' : '#94a3b8' }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{center.city}, {center.province}</span>
          </div>
          <div
            className="pl-5"
            style={{
              fontSize: '0.75rem',
              color: theme === 'light' ? '#86868b' : '#94a3b8'
            }}
          >
            {center.address}
          </div>
        </div>

        {/* Description */}
        {center.description && (
          <p
            className="mb-3 line-clamp-2"
            style={{
              fontSize: '0.875rem',
              color: theme === 'light' ? '#6e6e73' : '#cbd5e1'
            }}
          >
            {center.description}
          </p>
        )}

        {/* Tourism indicator */}
        {hasTourism && (
          <div
            className="flex items-center gap-1 mb-3"
            style={{
              fontSize: '0.75rem',
              color: theme === 'light' ? '#007d73' : '#5eead4'
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
            </svg>
            <span>周边旅游景点</span>
          </div>
        )}

        {/* Link to detail page (direct centers only) */}
        {center.type === 'direct' && center.slug && (
          <Link
            href={`/company/${center.slug}`}
            className="inline-flex items-center gap-1 font-medium transition-colors"
            style={{
              fontSize: '0.875rem',
              color: theme === 'light' ? '#007d73' : '#5eead4'
            }}
          >
            查看详情
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {/* Contact (if available) */}
        {center.contact && (
          <div
            className="mt-2 pt-2"
            style={{
              borderTop: `1px solid ${theme === 'light' ? '#e5e7eb' : '#475569'}`,
              fontSize: '0.75rem',
              color: theme === 'light' ? '#86868b' : '#94a3b8'
            }}
          >
            联系方式: {center.contact}
          </div>
        )}
      </div>
    </Popup>
  )
}
