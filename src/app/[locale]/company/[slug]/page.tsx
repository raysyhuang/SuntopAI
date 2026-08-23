import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'
import { getDirectCenters } from '@/lib/centers-data'
import CenterClient from './CenterClient'
import { notFound } from 'next/navigation'

export default async function CenterPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)

  const center = getDirectCenters(locale).find((c) => c.slug === slug)
  if (!center) {
    notFound()
  }

  return <CenterClient locale={locale} dictionary={dictionary} center={center} />
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDirectCenters(locale).map((center) => ({ locale, slug: center.slug as string })),
  )
}
