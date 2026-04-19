'use client'

import { useTheme } from '@/components/ThemeProvider'

interface StatProps {
  value: string
  label: string
  detail?: string
  align?: 'left' | 'center'
}

export function Stat({ value, label, detail, align = 'left' }: StatProps) {
  const { theme } = useTheme()
  const textAlign = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={textAlign}>
      <div
        className={`font-display font-light tabular-nums text-3xl md:text-[2.25rem] leading-[1.05] ${
          theme === 'light' ? 'text-ink-900' : 'text-white'
        }`}
        style={{ letterSpacing: 0 }}
      >
        {value}
      </div>
      <div
        className={`mt-2 text-sm font-medium ${
          theme === 'light' ? 'text-ink-600' : 'text-neutral-200'
        }`}
      >
        {label}
      </div>
      {detail && (
        <div
          className={`mt-1 text-xs ${
            theme === 'light' ? 'text-ink-400' : 'text-neutral-500'
          }`}
        >
          {detail}
        </div>
      )}
    </div>
  )
}
