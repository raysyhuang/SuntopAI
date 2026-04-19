'use client'

import { useTheme } from '@/components/ThemeProvider'
import type { ReactNode } from 'react'

type Variant = 'eyebrow' | 'neutral' | 'accent' | 'warning'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const { theme } = useTheme()

  const base = 'inline-flex items-center rounded px-[6px] py-[2px] text-[11px] font-medium leading-[1.4]'
  const uppercase = variant === 'eyebrow' ? 'uppercase tracking-[0.14em] text-[10px] py-[3px] px-[8px]' : ''

  let tone = ''
  if (variant === 'eyebrow' || variant === 'accent') {
    tone = theme === 'light'
      ? 'bg-accent-50 text-accent-700 border border-accent-100'
      : 'bg-accent-900/30 text-accent-300 border border-accent-800/40'
  } else if (variant === 'warning') {
    tone = theme === 'light'
      ? 'bg-amber-50 text-amber-800 border border-amber-100'
      : 'bg-amber-950/30 text-amber-200 border border-amber-900/40'
  } else {
    tone = theme === 'light'
      ? 'bg-ink-50 text-ink-700 border border-ink-100'
      : 'bg-slate-800/60 text-neutral-300 border border-slate-700/70'
  }

  return (
    <span className={`${base} ${uppercase} ${tone} ${className}`}>
      {children}
    </span>
  )
}
