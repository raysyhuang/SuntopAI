import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { PatientTravelClient } from './PatientTravelClient'

export default async function PatientTravelPage({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <PatientTravelClient dictionary={dictionary} locale={locale} />
}
