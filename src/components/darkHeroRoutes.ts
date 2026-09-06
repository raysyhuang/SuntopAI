/**
 * Routes that open with a dark, full-bleed PageHero.
 *
 * The navigation bar is transparent until the page scrolls, so on these routes it
 * sits on a dark photograph and has to take its colours from that rather than from
 * the theme. It cannot ask the hero — the bar renders above it in the layout — so
 * the list lives here and both sides read it.
 *
 * Add a route here in the same change that gives it a PageHero, or the logo and
 * the links will render dark on a dark image and effectively disappear.
 */
export const DARK_HERO_ROUTES = [
  '',
  '/platform',
  '/services',
  '/company',
  '/partners',
  '/investors',
  '/deployment',
  '/clinical',
] as const

/** `pathname` is the full path including the locale segment, e.g. /zh-CN/partners. */
export function hasDarkHero(pathname: string, locale: string): boolean {
  return DARK_HERO_ROUTES.some((suffix) => pathname === `/${locale}${suffix}`)
}
