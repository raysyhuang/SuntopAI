import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import ContactClient from './ContactClient'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
  return <ContactClient locale={locale} dictionary={dictionary} />
}
