/**
 * Centralized color tokens for map components.
 * Replaces scattered `theme === 'light' ? x : y` ternaries.
 */

export type Theme = 'light' | 'dark'

export interface MapColors {
  // Backgrounds
  panelBg: string
  cardBg: string
  inputBg: string
  sectionBg: string

  // Borders
  border: string
  inputBorder: string

  // Text
  text: string
  textSecondary: string
  textMuted: string
  textHeading: string

  // Accents
  accent: string
  accentHover: string

  // Overlay
  overlayBg: string
  dragHandle: string
}

const lightColors: MapColors = {
  panelBg: '#f9fafb',
  cardBg: '#ffffff',
  inputBg: '#ffffff',
  sectionBg: '#f9fafb',

  border: '#e5e7eb',
  inputBorder: '#d1d5db',

  text: '#1d1d1f',
  textSecondary: '#6e6e73',
  textMuted: '#9ca3af',
  textHeading: '#111827',

  accent: '#007d73',
  accentHover: '#5eead4',

  overlayBg: 'rgba(255, 255, 255, 0.95)',
  dragHandle: '#d1d5db',
}

const darkColors: MapColors = {
  panelBg: '#0f172a',
  cardBg: '#1e293b',
  inputBg: '#1e293b',
  sectionBg: '#1e293b',

  border: '#334155',
  inputBorder: '#334155',

  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  textHeading: '#f1f5f9',

  accent: '#007d73',
  accentHover: '#5eead4',

  overlayBg: 'rgba(15, 23, 42, 0.95)',
  dragHandle: '#334155',
}

export function getMapColors(theme: Theme): MapColors {
  return theme === 'light' ? lightColors : darkColors
}
