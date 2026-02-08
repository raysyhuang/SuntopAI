'use client'

import { useTheme } from '@/components/ThemeProvider'

interface MapLegendProps {
  dictionary: any
}

export function MapLegend({ dictionary }: MapLegendProps) {
  const { theme } = useTheme()

  return (
    <div
      className="absolute bottom-6 right-6 z-10 backdrop-blur-sm rounded-lg p-4 shadow-xl"
      style={{
        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
        border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#334155'}`
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
            </svg>
          </div>
          <span className="text-sm" style={{ color: theme === 'light' ? '#1d1d1f' : '#e2e8f0' }}>
            {dictionary.map.legend.direct || '直营中心'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-dashed border-purple-500 flex items-center justify-center"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
          >
            <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.22 19.85c-.18.18-.5.21-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.19.2-.51.19-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71l3.39-3.39-1.42-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71L9.52 8.4l1.87 1.86c.95.95 2.59.94 3.54 0 .98-.98.98-2.56 0-3.54l-1.86-1.86.28-.28c.78-.78 2.05-.78 2.83 0l4.24 4.24c.78.78.78 2.05 0 2.83l-8.2 8.2zm9.61-6.78a4.008 4.008 0 0 0 0-5.66l-4.24-4.24a4.008 4.008 0 0 0-5.66 0l-.28.28-.28-.28a4.008 4.008 0 0 0-5.66 0L2.17 6.71a3.992 3.992 0 0 0-.4 5.19l1.45-1.45a2 2 0 0 1 .37-2.33l3.54-3.54c.78-.78 2.05-.78 2.83 0l3.56 3.56c.18.18.21.5 0 .71-.21.21-.53.18-.71 0L9.52 5.57l-5.8 5.79c-.98.97-.98 2.56 0 3.54.39.39.89.63 1.42.7a2.458 2.458 0 0 0 .01.12c0 .53.21 1.03.59 1.41.95.94 2.59.94 3.54 0l.28.28c.78.78 2.05.78 2.83 0l8.2-8.2z"/>
            </svg>
          </div>
          <span className="text-sm" style={{ color: theme === 'light' ? '#1d1d1f' : '#e2e8f0' }}>
            {dictionary.map.legend.partner || '合作医院'}
          </span>
        </div>
      </div>
    </div>
  )
}
