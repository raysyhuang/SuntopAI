import { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import ArticleClient from './ArticleClient'
import { notFound } from 'next/navigation'

// Article data
const articles = [
  { 
    slug: 'kidney-care-event',
    date: '2026-01-15',
    category: 'event',
    image: '/images/news/news-kidney-care-event.jpg'
  },
  { 
    slug: 'summer-foods-dialysis',
    date: '2025-12-20',
    category: 'health',
    image: '/images/news/news-summer-foods.jpg'
  },
  { 
    slug: 'dragon-boat-festival',
    date: '2025-11-25',
    category: 'event',
    image: '/images/news/news-dragon-boat.jpg'
  },
  { 
    slug: 'binzhou-center-opening',
    date: '2025-10-18',
    category: 'deployment',
    image: '/images/news/news-binzhou-opening.jpg'
  },
]

export async function generateStaticParams() {
  const locales = ['en', 'ja', 'zh-CN', 'zh-TW']
  const params = []
  
  for (const locale of locales) {
    for (const article of articles) {
      params.push({ locale, slug: article.slug })
    }
  }
  
  return params
}

interface ArticlePageProps {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)
  
  const article = articles.find(a => a.slug === slug)
  
  if (!article) {
    notFound()
  }
  
  return <ArticleClient locale={locale} dictionary={dictionary} article={article} />
}
