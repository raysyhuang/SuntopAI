import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import PartnersClient from './PartnersClient'

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <PartnersClient locale={locale} dictionary={dictionary} />
}
