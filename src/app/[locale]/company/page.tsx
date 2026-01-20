import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import CompanyClient from './CompanyClient'

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <CompanyClient locale={locale} dictionary={dictionary} />
}
