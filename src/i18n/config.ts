export const locales = ['en', 'ja', 'zh-CN', 'zh-TW'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'ja': '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
}

export const defaultLocale: Locale = 'zh-CN'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
