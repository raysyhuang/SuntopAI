import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, localeNames, isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suntopai.com'

// Locale-specific metadata
const localeMetadata: Record<Locale, { title: string; description: string; locale: string }> = {
  'zh-CN': {
    title: 'Suntop AI | 智慧透析解决方案',
    description: '领先的AI驱动透析智能平台，为血液透析中心提供全方位的智慧医疗解决方案。',
    locale: 'zh_CN',
  },
  'en': {
    title: 'Suntop AI | Smart Dialysis Solutions',
    description: 'Leading AI-driven dialysis intelligence platform providing comprehensive smart healthcare solutions for hemodialysis centers.',
    locale: 'en_US',
  },
  'ja': {
    title: 'Suntop AI | スマート透析ソリューション',
    description: 'AIを活用した透析インテリジェンスプラットフォーム。血液透析センター向けの包括的なスマートヘルスケアソリューションを提供。',
    locale: 'ja_JP',
  },
  'zh-TW': {
    title: 'Suntop AI | 智慧透析解決方案',
    description: '領先的AI驅動透析智能平台，為血液透析中心提供全方位的智慧醫療解決方案。',
    locale: 'zh_TW',
  },
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // Anything that is not one of our four locales is not a page. Without this the
  // lookup below returns undefined and reading `.title` throws, which Next reports
  // as a 500 — so every probe for /foo.html or /wp-login.php became a server error
  // instead of a 404.
  if (!isValidLocale(locale)) notFound()

  const meta = localeMetadata[locale]

  return {
    title: {
      default: meta.title,
      template: `%s | Suntop AI`,
    },
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: meta.locale,
      alternateLocale: Object.values(localeMetadata)
        .filter((m) => m.locale !== meta.locale)
        .map((m) => m.locale),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-CN': `${baseUrl}/zh-CN`,
        'en': `${baseUrl}/en`,
        'ja': `${baseUrl}/ja`,
        'zh-TW': `${baseUrl}/zh-TW`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) notFound()

  const dictionary = await getDictionary(locale)

  return (
    /*
      Every page used to declare lang="zh-CN", because <html> lives in the root
      layout and a root layout cannot see the [locale] param. English, Japanese and
      Traditional Chinese pages were all announcing themselves as Simplified
      Chinese — wrong for screen readers, and wrong for the line-breaking and font
      selection the browser applies to CJK text.

      display:contents keeps this wrapper out of the flex layout while still
      carrying lang to everything inside it, which is what the :lang() rules in
      globals.css key off. The inline script then corrects the attribute on <html>
      itself; it runs during parse, so nothing is painted with the wrong language.
    */
    <div lang={locale} style={{ display: 'contents' }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
        }}
      />
      <Navigation locale={locale} dictionary={dictionary} />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </div>
  )
}
