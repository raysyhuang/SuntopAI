import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import InvestorsClient from './InvestorsClient'

export default async function InvestorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <InvestorsClient locale={locale} dictionary={dictionary} />
}
