'use client'

import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import type { Center } from '@/types/center'
import { directCenterIcon, partnerCenterIcon, createClusterIcon } from '@/lib/map-icons'
import { createPopupContent } from './MapPopup'

interface MarkerClusterProps {
  centers: Center[]
}

export function MarkerCluster({ centers }: MarkerClusterProps) {
  const map = useMap()

  useEffect(() => {
    const clusterGroup = (L as any).markerClusterGroup({
      chunkedLoading: true,
      iconCreateFunction: createClusterIcon,
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    })

    centers.forEach(center => {
      const icon = center.type === 'direct' ? directCenterIcon : partnerCenterIcon
      const marker = L.marker([center.coordinates.lat, center.coordinates.lng], { icon })
      marker.bindPopup(createPopupContent(center), {
        maxWidth: 300,
        minWidth: 250,
        className: 'center-popup',
      })
      clusterGroup.addLayer(marker)
    })

    map.addLayer(clusterGroup)

    return () => {
      map.removeLayer(clusterGroup)
    }
  }, [map, centers])

  return null
}
