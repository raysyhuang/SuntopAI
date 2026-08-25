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


const INTERNAL_PRICING_REALM = 'Suntop AI internal'

function isInternalPricing(pathname: string): boolean {
  return (
    pathname === '/internal_pricing' ||
    pathname.startsWith('/internal_pricing/')
  )
}

/** Length-safe comparison so a wrong password cannot be probed a character at a time. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function unauthorized(message: string): NextResponse {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${INTERNAL_PRICING_REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}

function guardInternalPricing(request: NextRequest): NextResponse {
  const user = process.env.INTERNAL_PRICING_USER
  const password = process.env.INTERNAL_PRICING_PASSWORD

  // Fail closed: no credentials configured means no access.
  if (!user || !password) {
    return unauthorized(
      'Internal pricing is not configured. Set INTERNAL_PRICING_USER and INTERNAL_PRICING_PASSWORD.'
    )
  }

  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Basic ')) return unauthorized('Authentication required.')

  let decoded = ''
  try {
    decoded = atob(header.slice(6))
  } catch {
    return unauthorized('Authentication required.')
  }

  const separator = decoded.indexOf(':')
  if (separator < 0) return unauthorized('Authentication required.')

  const okUser = safeEqual(decoded.slice(0, separator), user)
  const okPassword = safeEqual(decoded.slice(separator + 1), password)
  if (!okUser || !okPassword) return unauthorized('Authentication required.')

  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Force HTTPS in production
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('host') || ''
  
  if (
    forwardedProto === 'http' && 
    !host.includes('localhost') && 
    !host.includes('127.0.0.1')
  ) {
    // Use host header to construct URL (request.url may return internal dyno address on Heroku)
    const httpsUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${host}`)
    return NextResponse.redirect(httpsUrl, 301)
  }
  
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

  // Internal pricing sheet: no locale prefix, and never part of the public site.
  // Gated by HTTP Basic auth. Fails CLOSED — if the credentials are not configured
  // the sheet is unreachable, so internal commercial terms can never be exposed by
  // a forgotten config var. The document is served by a route handler rather than
  // from public/, so this is the only path to it.
  if (isInternalPricing(pathname)) {
    return guardInternalPricing(request)
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
