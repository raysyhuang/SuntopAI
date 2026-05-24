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

  const base = 'rounded-2xl border p-6 md:p-7 transition-shadow duration-200'

  let surface = ''
  if (tone === 'inverse') {
    surface = theme === 'light'
      ? 'border-transparent text-white'
      : 'bg-ink-950 border-ink-900 text-white'
    // dark inverse card on light theme — use Anthropic Near Black
    if (theme === 'light') {
      surface = 'border-transparent text-white [background-color:#141413]'
    }
  } else if (tone === 'subtle') {
    surface = theme === 'light'
      ? '[background-color:#f5f4ed] [border-color:#e8e6dc]'
      : 'bg-slate-900/40 border-slate-800/70'
  } else {
    surface = theme === 'light'
      ? '[background-color:#faf9f5] [border-color:#f0eee6]'
      : 'bg-slate-900/55 border-slate-800/70'
  }

  const shadow = elevated
    ? (theme === 'light' ? 'shadow-whisper-lg' : 'shadow-stripe-md')
    : (theme === 'light' ? 'shadow-whisper' : '')

  return (
    <Tag className={`${base} ${surface} ${shadow} ${className}`}>
      {children}
    </Tag>
  )
}
