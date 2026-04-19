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

const TONE_BG: Record<Tone, { light: string; dark: string }> = {
  light:  { light: '#ffffff', dark: '#0b1624' },
  subtle: { light: '#f5f5f7', dark: '#0f172a' },
  dark:   { light: '#0b1624', dark: '#060d18' },
}

export function Section({ children, tone = 'light', className = '', id }: SectionProps) {
  const { theme } = useTheme()
  const bg = TONE_BG[tone][theme === 'light' ? 'light' : 'dark']

  return (
    <section
      id={id}
      className={`relative py-24 md:py-28 ${className}`}
      style={{ backgroundColor: bg }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
