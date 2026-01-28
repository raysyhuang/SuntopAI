import { redirect } from 'next/navigation'
import type { Locale } from '@/i18n/config'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  
  // Redirect to Company page contact section
  redirect(`/${locale}/company#contact`)
}
