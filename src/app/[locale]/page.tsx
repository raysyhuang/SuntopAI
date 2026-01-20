import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import HomeClient from './HomeClient'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <HomeClient locale={locale} dictionary={dictionary} />
}
