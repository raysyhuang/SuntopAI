export type CenterType = 'direct' | 'partner'

export interface Coordinates {
  lat: number
  lng: number
}

export interface TourismSpot {
  name: string
  type: string
  distance?: string
  description?: string
}

export interface Center {
  id: string
  slug?: string
  type: CenterType
  name: string
  shortName?: string
  city: string
  province: string
  coordinates: Coordinates
  address: string
  contact?: string
  area?: string
  established?: string
  description: string
  features?: string[]
  gallery?: string[]
  tourism?: TourismSpot[]
  tourismIntro?: string
  note?: string
}

export interface CentersData {
  version: string
  lastUpdated: string
  centers: Center[]
}
