'use client'

import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import type { Center } from '@/types/center'
import { directCenterIcon, partnerCenterIcon, createClusterIcon } from '@/lib/map-icons'
import { createPopupContent } from './MapPopup'

interface MarkerClusterProps {
  centers: Center[]
  locale?: string
  selectedCenterId?: string | null
  onCenterSelect?: (centerId: string | null) => void
}

export function MarkerCluster({ centers, locale = 'zh-CN', selectedCenterId, onCenterSelect }: MarkerClusterProps) {
  const map = useMap()
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  useEffect(() => {
    const clusterGroup = (L as any).markerClusterGroup({
      chunkedLoading: true,
      iconCreateFunction: createClusterIcon,
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    })

    markersRef.current.clear()

    centers.forEach(center => {
      const icon = center.type === 'direct' ? directCenterIcon : partnerCenterIcon
      const marker = L.marker([center.coordinates.lat, center.coordinates.lng], { icon })
      marker.bindPopup(createPopupContent(center, locale), {
        maxWidth: 300,
        minWidth: 250,
        className: 'center-popup',
      })
      
      // Store marker reference
      markersRef.current.set(center.id, marker)
      
      clusterGroup.addLayer(marker)
    })

    map.addLayer(clusterGroup)

    return () => {
      map.removeLayer(clusterGroup)
      markersRef.current.clear()
    }
  }, [map, centers, locale])

  // Handle selected center - pan to it and open popup
  useEffect(() => {
    if (selectedCenterId && markersRef.current.has(selectedCenterId)) {
      const marker = markersRef.current.get(selectedCenterId)!
      const latlng = marker.getLatLng()
      
      // Pan to marker with animation
      map.setView(latlng, Math.max(map.getZoom(), 12), {
        animate: true,
        duration: 0.5
      })
      
      // Open popup after a short delay to let the pan finish
      setTimeout(() => {
        marker.openPopup()
      }, 600)
    }
  }, [selectedCenterId, map])

  return null
}
