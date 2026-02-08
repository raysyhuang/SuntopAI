import L from 'leaflet'

// Direct center icon (hospital cross, dark teal with white border)
export const directCenterIcon = new L.DivIcon({
  html: `
    <div class="relative flex items-center justify-center w-10 h-10">
      <div class="absolute inset-0 rounded-full border-3 border-white shadow-xl" style="background-color: #0f766e !important;"></div>
      <svg class="relative w-5 h-5 text-white z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
      </svg>
    </div>
  `,
  className: 'marker-icon marker-direct',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
})

// Partner center icon (handshake, bright purple with white border)
export const partnerCenterIcon = new L.DivIcon({
  html: `
    <div class="relative flex items-center justify-center w-9 h-9">
      <div class="absolute inset-0 rounded-full border-3 border-white shadow-xl" style="background-color: #9333ea !important;"></div>
      <svg class="relative w-4 h-4 text-white z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.22 19.85c-.18.18-.5.21-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.19.2-.51.19-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71l3.39-3.39-1.42-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71L9.52 8.4l1.87 1.86c.95.95 2.59.94 3.54 0 .98-.98.98-2.56 0-3.54l-1.86-1.86.28-.28c.78-.78 2.05-.78 2.83 0l4.24 4.24c.78.78.78 2.05 0 2.83l-8.2 8.2zm9.61-6.78a4.008 4.008 0 0 0 0-5.66l-4.24-4.24a4.008 4.008 0 0 0-5.66 0l-.28.28-.28-.28a4.008 4.008 0 0 0-5.66 0L2.17 6.71a3.992 3.992 0 0 0-.4 5.19l1.45-1.45a2 2 0 0 1 .37-2.33l3.54-3.54c.78-.78 2.05-.78 2.83 0l3.56 3.56c.18.18.21.5 0 .71-.21.21-.53.18-.71 0L9.52 5.57l-5.8 5.79c-.98.97-.98 2.56 0 3.54.39.39.89.63 1.42.7a2.458 2.458 0 0 0 .01.12c0 .53.21 1.03.59 1.41.95.94 2.59.94 3.54 0l.28.28c.78.78 2.05.78 2.83 0l8.2-8.2z"/>
      </svg>
    </div>
  `,
  className: 'marker-icon marker-partner',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
})

// Cluster icon generator
export const createClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount()
  let size: 'small' | 'medium' | 'large' = 'small'
  if (count >= 50) size = 'large'
  else if (count >= 20) size = 'medium'

  const sizeMap: Record<'small' | 'medium' | 'large', string> = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-14 h-14 text-lg'
  }

  return new L.DivIcon({
    html: `
      <div class="marker-cluster marker-cluster-${size} ${sizeMap[size]} flex items-center justify-center rounded-full bg-teal-700 border-3 border-white text-white font-bold shadow-xl" style="background-color: #0f766e !important;">
        ${count}
      </div>
    `,
    className: 'marker-cluster-custom',
    iconSize: size === 'small' ? [40, 40] : size === 'medium' ? [48, 48] : [56, 56]
  })
}
