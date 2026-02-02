import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import ServicesClient from './ServicesClient'

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <ServicesClient locale={locale} dictionary={dictionary} />
}
