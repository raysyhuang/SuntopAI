import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import CentersListClient from './CentersListClient'

export default async function CentersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <CentersListClient locale={locale} dictionary={dictionary} />
}
