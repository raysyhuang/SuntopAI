'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { locales, localeNames, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

interface NavigationProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  const navLinks = [
    { href: `/${locale}`, label: dictionary.nav.home },
    { href: `/${locale}/platform`, label: dictionary.nav.platform },
    { href: `/${locale}/clinical`, label: dictionary.nav.clinical },
    { href: `/${locale}/deployment`, label: dictionary.nav.deployment },
    { href: `/${locale}/company`, label: dictionary.nav.company },
    { href: `/${locale}/news`, label: dictionary.nav.news },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get the path without locale prefix for language switching
  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">S</span>
              </div>
              <span className="font-display font-semibold text-xl tracking-tight text-white group-hover:text-accent-400 transition-colors">
                Suntop<span className="text-accent-500">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-neutral-300 hover:text-white transition-all text-sm"
                >
                  <Globe size={16} />
                  <span>{localeNames[locale]}</span>
                  <ChevronDown size={14} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                    >
                      {locales.map((loc) => (
                        <Link
                          key={loc}
                          href={getLocalizedPath(loc)}
                          onClick={() => setIsLangMenuOpen(false)}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            loc === locale
                              ? 'bg-accent-900/30 text-accent-400'
                              : 'text-neutral-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {localeNames[loc]}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile Language Switcher */}
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <Globe size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Language Menu */}
      <AnimatePresence>
        {isLangMenuOpen && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-4 z-50 lg:hidden bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
          >
            {locales.map((loc) => (
              <Link
                key={loc}
                href={getLocalizedPath(loc)}
                onClick={() => setIsLangMenuOpen(false)}
                className={`block px-6 py-3 text-sm transition-colors ${
                  loc === locale
                    ? 'bg-accent-900/30 text-accent-400'
                    : 'text-neutral-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative pt-24 px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 text-xl font-display ${
                        isActive(link.href)
                          ? 'text-accent-400'
                          : 'text-neutral-300 hover:text-white'
                      } transition-colors`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Language Links */}
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <p className="text-neutral-500 text-sm mb-4">Language</p>
                  <div className="flex flex-wrap gap-3">
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={getLocalizedPath(loc)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          loc === locale
                            ? 'bg-accent-600 text-white'
                            : 'bg-slate-800 text-neutral-300 hover:bg-slate-700'
                        }`}
                      >
                        {localeNames[loc]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
