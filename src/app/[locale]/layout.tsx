import { locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return (
    <>
      <Navigation locale={locale} dictionary={dictionary} />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  )
}
