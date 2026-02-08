'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import type { Center } from '@/types/center'
import { MarkerCluster } from './MarkerCluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

interface CentersMapProps {
  centers: Center[]
  isDarkTheme?: boolean
  locale?: string
  selectedCenterId?: string | null
  onCenterSelect?: (centerId: string | null) => void
}

export function CentersMap({ centers, isDarkTheme, locale, selectedCenterId, onCenterSelect }: CentersMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    setIsClient(true)

    // Detect theme from document or use prop
    const detectTheme = () => {
      if (isDarkTheme !== undefined) {
        return isDarkTheme ? 'dark' : 'light'
      }
      const htmlElement = document.documentElement
      return htmlElement.classList.contains('light') ? 'light' : 'dark'
    }

    setTheme(detectTheme())

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setTheme(detectTheme())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [isDarkTheme])

  if (!isClient) {
    return (
      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
        <div className="text-slate-400">Loading map...</div>
      </div>
    )
  }

  // Calculate bounds to fit all markers
  const bounds: LatLngBoundsExpression | undefined = centers.length > 0
    ? [
        [
          Math.min(...centers.map(c => c.coordinates.lat)),
          Math.min(...centers.map(c => c.coordinates.lng))
        ],
        [
          Math.max(...centers.map(c => c.coordinates.lat)),
          Math.max(...centers.map(c => c.coordinates.lng))
        ]
      ]
    : undefined

  // Chinese locales: use OSM tiles (native Chinese labels for China locations)
  // Other locales: use CartoDB Voyager (clean English labels)
  const isChinese = locale === 'zh-CN' || locale === 'zh-TW'

  const tileUrl = isChinese
    ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    : theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

  const tileAttribution = isChinese
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

  return (
    <MapContainer
      center={[35.0, 110.0]}
      zoom={5}
      bounds={bounds}
      boundsOptions={{ padding: [50, 50] }}
      className={`w-full h-full rounded-xl overflow-hidden${isChinese && theme === 'dark' ? ' osm-dark' : ''}`}
      style={{ 
        minHeight: '500px',
        touchAction: 'none' // Prevent page scroll when touching map
      }}
      scrollWheelZoom={true}
      zoomControl={true}
      tap={true} // Enable tap for mobile
      tapTolerance={15} // Increase tap tolerance for better mobile UX
      dragging={true}
      touchZoom={true} // Enable pinch zoom
    >
      <TileLayer
        attribution={tileAttribution}
        url={tileUrl}
      />

      <MarkerCluster 
        centers={centers}
        locale={locale}
        selectedCenterId={selectedCenterId}
        onCenterSelect={onCenterSelect}
      />
    </MapContainer>
  )
}
