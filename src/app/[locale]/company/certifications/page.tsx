import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import RegulatoryClient from './RegulatoryClient'

export default async function RegulatoryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <RegulatoryClient locale={locale} dictionary={dictionary} />
}
