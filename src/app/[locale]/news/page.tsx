import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import NewsClient from './NewsClient'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <NewsClient locale={locale} dictionary={dictionary} />
}
