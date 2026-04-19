'use client'

import { useTheme } from '@/components/ThemeProvider'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  elevated?: boolean
  tone?: 'default' | 'subtle' | 'inverse'
  className?: string
  as?: 'div' | 'article'
}

export function Card({ children, elevated = false, tone = 'default', className = '', as = 'div' }: CardProps) {
  const { theme } = useTheme()
  const Tag = as

  const base = 'rounded-md border p-6 transition-shadow duration-200'

  let surface = ''
  if (tone === 'inverse') {
    surface = theme === 'light'
      ? 'bg-ink-900 border-ink-800 text-white'
      : 'bg-ink-950 border-ink-900 text-white'
  } else if (tone === 'subtle') {
    surface = theme === 'light'
      ? 'bg-ink-50 border-ink-100'
      : 'bg-slate-900/40 border-slate-800/70'
  } else {
    surface = theme === 'light'
      ? 'bg-white border-ink-100'
      : 'bg-slate-900/55 border-slate-800/70'
  }

  const shadow = elevated
    ? (theme === 'light' ? 'shadow-stripe-lg' : 'shadow-stripe-md')
    : (theme === 'light' ? 'shadow-stripe-sm' : '')

  return (
    <Tag className={`${base} ${surface} ${shadow} ${className}`}>
      {children}
    </Tag>
  )
}
