import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suntopai.com'
  
  // Define all static routes
  const routes = [
    '',
    '/platform',
    '/clinical',
    '/deployment',
    '/services',
    '/services/vascular-access',
    '/company',
    '/company/centers',
    '/news',
    '/contact',
    '/privacy',
    '/terms',
    '/compliance',
  ]

  // Generate entries for each locale
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route.includes('services') || route.includes('platform') ? 0.9 : 0.8,
      })
    }
  }

  return sitemapEntries
}
