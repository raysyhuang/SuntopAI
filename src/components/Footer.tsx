import Link from 'next/link'
import { Linkedin, Twitter } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

interface FooterProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const t = dictionary.footer

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
    company: [
      { label: t.links.aboutUs, href: `/${locale}/company` },
      { label: t.links.leadership, href: `/${locale}/company#leadership` },
      { label: t.links.news, href: `/${locale}/news` },
      { label: t.links.contact, href: `/${locale}/contact` },
    ],
  }

  return (
    <footer className="bg-slate-925 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">S</span>
              </div>
              <span className="font-display font-semibold text-xl tracking-tight text-white">
                Suntop<span className="text-accent-500">AI</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-800 flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-800 flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">{t.platform}</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">{t.clinical}</h4>
            <ul className="space-y-3">
              {footerLinks.clinical.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">{t.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-neutral-500 text-xs">
              <span>© {new Date().getFullYear()} Suntop AI. {t.legal.rights}</span>
            </div>
            <div className="flex items-center gap-6 text-neutral-500 text-xs">
              <Link href={`/${locale}/privacy`} className="hover:text-neutral-300 transition-colors">
                {t.legal.privacy}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-neutral-300 transition-colors">
                {t.legal.terms}
              </Link>
              <Link href={`/${locale}/compliance`} className="hover:text-neutral-300 transition-colors">
                {t.legal.compliance}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
