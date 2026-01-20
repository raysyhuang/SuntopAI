import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import PlatformClient from './PlatformClient'

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <PlatformClient locale={locale} dictionary={dictionary} />
}
