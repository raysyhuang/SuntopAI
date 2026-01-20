import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import DeploymentClient from './DeploymentClient'

export default async function DeploymentPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <DeploymentClient locale={locale} dictionary={dictionary} />
}
