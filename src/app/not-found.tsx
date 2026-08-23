'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { defaultLocale, isValidLocale, type Locale } from '@/i18n/config'

/**
 * Locale-aware 404.
 *
 * This page was Simplified Chinese only and linked to /zh-CN, so an English or
 * Japanese visitor hitting a bad URL landed on a Chinese error page. It now reads
 * the locale from the path.
 *
 * It lives at the root rather than inside [locale] because `dynamicParams = false`
 * makes Next reject an unknown slug before it enters the locale segment, so a
 * boundary inside [locale] would never be reached.
 *
 * A not-found boundary receives no params, so it cannot await getDictionary. The
 * few strings it needs are declared here rather than in the shared dictionaries;
 * that keeps the error page self-contained and free of a dictionary fetch on a
 * path that is already failing.
 */

const COPY: Record<Locale, { title: string; body: string; home: string; contact: string }> = {
  'zh-CN': {
    title: '页面未找到',
    body: '抱歉，您访问的页面不存在或已被移除。请检查网址是否正确，或返回首页继续浏览。',
    home: '返回首页',
    contact: '联系我们',
  },
  'zh-TW': {
    title: '頁面未找到',
    body: '抱歉，您造訪的頁面不存在或已被移除。請檢查網址是否正確，或返回首頁繼續瀏覽。',
    home: '返回首頁',
    contact: '聯絡我們',
  },
  en: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has been moved. Check the address, or return to the homepage.',
    home: 'Back to home',
    contact: 'Contact us',
  },
  ja: {
    title: 'ページが見つかりません',
    body: 'お探しのページは存在しないか、移動された可能性があります。URLをご確認いただくか、ホームへお戻りください。',
    home: 'ホームに戻る',
    contact: 'お問い合わせ',
  },
}

export default function NotFound() {
  const pathname = usePathname()
  const segment = pathname?.split('/')[1] ?? ''
  const locale: Locale = isValidLocale(segment) ? segment : defaultLocale
  const t = COPY[locale]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 [background-color:#f5f4ed] dark:bg-slate-950">
      <div className="text-center max-w-lg">
        <p className="font-mono text-sm tracking-[0.2em] text-accent-700 dark:text-accent-300 mb-6">404</p>
        <h1 className="font-display font-light text-3xl md:text-4xl [color:#141413] dark:text-white mb-5">
          {t.title}
        </h1>
        <p className="[color:#5e5d59] dark:text-neutral-400 leading-relaxed mb-9">{t.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-accent-700 text-white hover:bg-accent-800 transition-colors"
          >
            {t.home}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border [border-color:#d1cfc5] [color:#3d3d3a] hover:[background-color:#f0eee6] dark:border-slate-700 dark:text-neutral-200 dark:hover:bg-slate-800/60 transition-colors"
          >
            {t.contact}
          </Link>
        </div>
      </div>
    </div>
  )
}
