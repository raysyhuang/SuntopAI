import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import VascularAccessClient from './VascularAccessClient'

export default async function VascularAccessPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <VascularAccessClient locale={locale} dictionary={dictionary} />
}
