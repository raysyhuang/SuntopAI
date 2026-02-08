'use client'

import { Marker, Tooltip } from 'react-leaflet'
import type { Center } from '@/types/center'
import { directCenterIcon, partnerCenterIcon } from '@/lib/map-icons'
import { MapPopup } from './MapPopup'

interface CenterMarkerProps {
  center: Center
}

export function CenterMarker({ center }: CenterMarkerProps) {
  const icon = center.type === 'direct' ? directCenterIcon : partnerCenterIcon

  return (
    <Marker
      position={[center.coordinates.lat, center.coordinates.lng]}
      icon={icon}
    >
      <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
        <div className="text-sm">
          <div className="font-semibold">{center.name}</div>
          <div className="text-slate-400">{center.city}</div>
        </div>
      </Tooltip>

      <MapPopup center={center} />
    </Marker>
  )
}
