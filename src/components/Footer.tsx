'use client'

import Link from 'next/link'
import { Linkedin, Twitter } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from './ThemeProvider'

interface FooterProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const t = dictionary.footer
  const { theme } = useTheme()

  const footerLinks = {
    platform: [
      { label: t.links.techOverview, href: `/${locale}/platform` },
      { label: t.links.dataInfra, href: `/${locale}/platform#data` },
      { label: t.links.aiEngine, href: `/${locale}/platform#intelligence` },
      { label: t.links.automation, href: `/${locale}/platform#automation` },
    ],
    clinical: [
      { label: t.links.inCenter, href: `/${locale}/clinical#in-center` },
      { label: t.links.networked, href: `/${locale}/clinical#networked` },
      { label: t.links.decisionSupport, href: `/${locale}/clinical#decision-support` },
    ],
    deployment: [
      { label: t.links.architecture, href: `/${locale}/deployment#architecture` },
      { label: t.links.implementation, href: `/${locale}/deployment#implementation` },
      { label: t.links.supplyChain, href: `/${locale}/deployment#supply-chain` },
    ],
    services: [
      { label: t.links.vascularAccess, href: `/${locale}/services#vascular-access` },
      { label: t.links.patientCare, href: `/${locale}/services#patient-care` },
      { label: t.links.nutrition, href: `/${locale}/services#nutrition` },
      { label: t.links.footCare, href: `/${locale}/services#foot-care` },
      { label: t.links.skinCare, href: `/${locale}/services#skin-care` },
      { label: t.links.training, href: `/${locale}/services#training` },
    ],
    company: [
      { label: t.links.aboutUs, href: `/${locale}/company` },
      { label: t.links.centers, href: `/${locale}/company#centers` },
      { label: t.links.news, href: `/${locale}/news` },
      { label: t.links.contact, href: `/${locale}/contact` },
    ],
  }

  return (
    <footer className={`border-t ${
      theme === 'dark' 
        ? 'bg-slate-925 border-slate-800/50' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-lg shadow-accent-500/20">
                <span className="text-white font-display font-bold text-lg">S</span>
              </div>
              <span className={`font-display font-semibold text-xl tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Suntop<span className="text-accent-500">AI</span>
              </span>
            </Link>
            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${
              theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              {t.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 hover:bg-slate-800 text-neutral-400 hover:text-accent-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-accent-600'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 hover:bg-slate-800 text-neutral-400 hover:text-accent-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-accent-600'
                }`}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.platform}</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-neutral-400 hover:text-accent-400'
                        : 'text-gray-600 hover:text-accent-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Links */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.clinical}</h4>
            <ul className="space-y-3">
              {footerLinks.clinical.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-neutral-400 hover:text-accent-400'
                        : 'text-gray-600 hover:text-accent-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Deployment Links */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.deployment}</h4>
            <ul className="space-y-3">
              {footerLinks.deployment.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-neutral-400 hover:text-accent-400'
                        : 'text-gray-600 hover:text-accent-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.services}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-neutral-400 hover:text-accent-400'
                        : 'text-gray-600 hover:text-accent-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-neutral-400 hover:text-accent-400'
                        : 'text-gray-600 hover:text-accent-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-16 pt-8 border-t ${
          theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`flex items-center gap-6 text-xs ${
              theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'
            }`}>
              <span>© {new Date().getFullYear()} Suntop AI. {t.legal.rights}</span>
            </div>
            <div className={`flex items-center gap-6 text-xs ${
              theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'
            }`}>
              <Link href={`/${locale}/privacy`} className={`transition-colors ${
                theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-gray-700'
              }`}>
                {t.legal.privacy}
              </Link>
              <Link href={`/${locale}/terms`} className={`transition-colors ${
                theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-gray-700'
              }`}>
                {t.legal.terms}
              </Link>
              <Link href={`/${locale}/compliance`} className={`transition-colors ${
                theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-gray-700'
              }`}>
                {t.legal.compliance}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
