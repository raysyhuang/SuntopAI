import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from './config'

const dictionaries = {
  'en': () => import('./dictionaries/en.json').then((module) => module.default),
  'ja': () => import('./dictionaries/ja.json').then((module) => module.default),
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
  'zh-TW': () => import('./dictionaries/zh-TW.json').then((module) => module.default),
}

/**
 * Loads the dictionary for a locale segment taken from the URL.
 *
 * Every page under `[locale]` calls this, which makes it the one place the
 * locale is guaranteed to be checked. A segment that is not one of our four
 * locales is not a page, so we 404 here rather than let the caller destructure
 * an undefined dictionary — that is what turned every probe for `/wp-login.php`
 * or `/foo.html` into a 500 instead of a 404.
 *
 * Guarding the layout alone is not enough: Next renders the layout and the page
 * of a segment concurrently, so the page reaches this function even when the
 * layout has already called notFound().
 */
export const getDictionary = async (locale: Locale | string) => {
  if (!isValidLocale(locale)) notFound()
  return dictionaries[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
