import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import LegacyHomeClient from './LegacyHomeClient'

/**
 * The previous homepage, parked here for comparison. Not linked from navigation
 * and excluded from indexing. Delete this route once the new homepage is signed off.
 */
export const metadata = {
  title: 'Previous homepage',
  robots: { index: false, follow: false },
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <LegacyHomeClient locale={locale} dictionary={dictionary} />
}
