import type { Locale } from '@/i18n/config'
import type { CentersData } from '@/types/center'

export async function getCentersData(locale: Locale): Promise<CentersData> {
  try {
    const response = await fetch(`/data/centers-${locale}.json`)
    if (!response.ok) {
      // Fallback to zh-CN if locale file not found
      const fallbackResponse = await fetch('/data/centers-zh-CN.json')
      if (!fallbackResponse.ok) {
        throw new Error('Failed to load centers data')
      }
      return fallbackResponse.json()
    }
    return response.json()
  } catch (error) {
    console.error('Error loading centers data:', error)
    // Return empty data structure
    return {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      centers: []
    }
  }
}
