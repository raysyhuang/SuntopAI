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

/**
 * Server-side loader for the canonical center data.
 *
 * `public/data/centers-{locale}.json` is the single source of truth for centers.
 * Client components fetch it over HTTP via `getCentersData` above; server
 * components and `generateStaticParams` read it from disk with this.
 *
 * Centers used to be defined twice — here and again under `company.centers.list`
 * in each dictionary — which is how the English map lost nine centers and the
 * zh-TW and ja data was left in Simplified Chinese. One source removes that class
 * of bug rather than fixing its instances.
 */
export function getCentersDataSync(locale: Locale): CentersData {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { readFileSync } = require('fs') as typeof import('fs')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { join } = require('path') as typeof import('path')

  const read = (loc: string) =>
    JSON.parse(readFileSync(join(process.cwd(), 'public', 'data', `centers-${loc}.json`), 'utf-8')) as CentersData

  try {
    return read(locale)
  } catch {
    return read('zh-CN')
  }
}

/** Self-operated centers have detail pages; partner centers appear on the map only. */
export function getDirectCenters(locale: Locale) {
  return getCentersDataSync(locale).centers.filter((c) => c.type === 'direct' && c.slug)
}
