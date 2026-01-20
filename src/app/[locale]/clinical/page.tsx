import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import ClinicalClient from './ClinicalClient'

export default async function ClinicalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <ClinicalClient locale={locale} dictionary={dictionary} />
}
