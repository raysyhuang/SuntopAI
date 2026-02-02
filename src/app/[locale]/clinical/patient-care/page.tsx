import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import PatientCareClient from './PatientCareClient'

export default async function PatientCarePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <PatientCareClient locale={locale} dictionary={dictionary} />
}
