'use client'

import { useTheme } from '@/components/ThemeProvider'
import type { ReactNode } from 'react'

type Tone = 'light' | 'subtle' | 'dark'

interface SectionProps {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
}

// Warm hybrid: parchment / ivory alternation in light; institutional slate in dark
const TONE_BG: Record<Tone, { light: string; dark: string }> = {
  light:  { light: '#faf9f5', dark: '#0b1624' }, // ivory
  subtle: { light: '#f5f4ed', dark: '#0f172a' }, // parchment
  dark:   { light: '#141413', dark: '#060d18' }, // anthropic near-black
}

export function Section({ children, tone = 'light', className = '', id }: SectionProps) {
  const { theme } = useTheme()
  const bg = TONE_BG[tone][theme === 'light' ? 'light' : 'dark']

  return (
    <section
      id={id}
      className={`relative py-28 md:py-36 ${className}`}
      style={{ backgroundColor: bg }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
