import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale } from '@/i18n/config'

function getLocale(request: NextRequest): string {
  // Check if there's a locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameLocale) return pathnameLocale

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim())
      .find((lang) => {
        // Direct match
        if (isValidLocale(lang)) return true
        // Match language code (e.g., 'ja' from 'ja-JP')
        const langCode = lang.split('-')[0]
        if (langCode === 'zh') {
          // Handle Chinese variants
          if (lang.includes('TW') || lang.includes('HK') || lang.includes('Hant')) {
            return true
          }
          return true // Default to simplified
        }
        return locales.some((locale) => locale.startsWith(langCode))
      })

    if (preferredLocale) {
      if (isValidLocale(preferredLocale)) return preferredLocale
      const langCode = preferredLocale.split('-')[0]
      if (langCode === 'zh') {
        if (preferredLocale.includes('TW') || preferredLocale.includes('HK') || preferredLocale.includes('Hant')) {
          return 'zh-TW'
        }
        return 'zh-CN'
      }
      if (langCode === 'ja') return 'ja'
      if (langCode === 'en') return 'en'
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Skip for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next()
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!_next|api|.*\\..*).*)',
  ],
}
