import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import LegalPageClient from '@/components/LegalPageClient'

export default async function CompliancePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <LegalPageClient locale={locale} dictionary={dictionary} pageType="compliance" />
}
