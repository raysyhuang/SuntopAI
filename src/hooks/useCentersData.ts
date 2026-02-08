'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@/i18n/config'
import type { Center } from '@/types/center'

export function useCentersData(locale: Locale) {
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCenters() {
      try {
        setLoading(true)
        const response = await fetch(`/data/centers-${locale}.json`)

        if (!response.ok) {
          // Fallback to zh-CN
          const fallbackResponse = await fetch('/data/centers-zh-CN.json')
          if (!fallbackResponse.ok) {
            throw new Error('Failed to load centers data')
          }
          const fallbackData = await fallbackResponse.json()
          setCenters(fallbackData.centers || [])
        } else {
          const data = await response.json()
          setCenters(data.centers || [])
        }

        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
        setCenters([])
      } finally {
        setLoading(false)
      }
    }

    fetchCenters()
  }, [locale])

  return { centers, loading, error }
}
