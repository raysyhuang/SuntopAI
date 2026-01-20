import type { Locale } from './config'

const dictionaries = {
  'en': () => import('./dictionaries/en.json').then((module) => module.default),
  'ja': () => import('./dictionaries/ja.json').then((module) => module.default),
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
  'zh-TW': () => import('./dictionaries/zh-TW.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
