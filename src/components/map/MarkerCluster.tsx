'use client'

import MarkerClusterGroup from 'react-leaflet-cluster'
import type { Center } from '@/types/center'
import { CenterMarker } from './CenterMarker'
import { createClusterIcon } from '@/lib/map-icons'

interface MarkerClusterProps {
  centers: Center[]
}

export function MarkerCluster({ centers }: MarkerClusterProps) {
  return (
    <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createClusterIcon}
      maxClusterRadius={80}
      spiderfyOnMaxZoom={true}
      showCoverageOnHover={false}
      zoomToBoundsOnClick={true}
    >
      {centers.map(center => (
        <CenterMarker key={center.id} center={center} />
      ))}
    </MarkerClusterGroup>
  )
}
