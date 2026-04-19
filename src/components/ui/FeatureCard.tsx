'use client'

import { useTheme } from '@/components/ThemeProvider'
import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  eyebrow?: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, eyebrow, className = '' }: FeatureCardProps) {
  const { theme } = useTheme()

  return (
    <Card className={`h-full ${className}`}>
      <div
        className={`w-10 h-10 rounded flex items-center justify-center mb-5 ${
          theme === 'light'
            ? 'bg-accent-50 border border-accent-100'
            : 'bg-accent-900/30 border border-accent-800/40'
        }`}
      >
        <Icon className={`w-5 h-5 ${theme === 'light' ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
      </div>
      {eyebrow && (
        <div
          className={`text-[10px] uppercase tracking-[0.14em] font-medium mb-2 ${
            theme === 'light' ? 'text-accent-700' : 'text-accent-300'
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h3
        className={`font-display font-light text-xl mb-3 leading-snug ${
          theme === 'light' ? 'text-ink-900' : 'text-white'
        }`}
        style={{ letterSpacing: 0 }}
      >
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-ink-400' : 'text-neutral-400'}`}>
        {description}
      </p>
    </Card>
  )
}
