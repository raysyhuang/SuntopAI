import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import CenterClient from './CenterClient'
import { notFound } from 'next/navigation'

export default async function CenterPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)

  // Find the center by slug
  const centers = dictionary.company.centers?.list || []
  const center = centers.find((c: { slug: string }) => c.slug === slug)

  if (!center) {
    notFound()
  }

  return <CenterClient locale={locale} dictionary={dictionary} center={center} />
}

// Generate static params for all centers
export async function generateStaticParams() {
  const { getDictionary } = await import('@/i18n/get-dictionary')
  const dictionary = await getDictionary('zh-CN')
  const centers = dictionary.company.centers?.list || []
  
  const locales = ['zh-CN', 'en', 'ja', 'zh-TW']
  const params: { locale: string; slug: string }[] = []
  
  for (const locale of locales) {
    for (const center of centers) {
      params.push({ locale, slug: center.slug })
    }
  }
  
  return params
}
