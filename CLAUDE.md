# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **multilingual corporate website** for Suntop AI, a hemodialysis AI & IoT medical platform. The site is built with Next.js 14 (App Router) and supports 4 locales: `zh-CN` (default), `en`, `ja`, and `zh-TW`.

**Critical constraint**: This is a **deployed medical system** subject to regulatory compliance. All medical/clinical language must follow strict "clinical augmentation-only" guidelines (never autonomous diagnosis/treatment claims).

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Production
npm run build            # Build for production
npm start                # Start production server

# Code quality
npm run lint             # Run ESLint
```

## Monorepo Structure

This repository contains **three independent projects**:

1. **Main website** (root) - Next.js 14 corporate site
2. **video/** - Remotion-based video generation
3. **pdf-slides/** - React PDF presentation generator

Each has its own `package.json` and dependencies. **Do not mix dependencies** between projects.

### Video project commands
```bash
cd video
npm start                # Remotion studio
npm run build            # Render full video
npm run build:intro      # Render intro only
npm run build:short      # Render short version
```

### PDF slides project commands
```bash
cd pdf-slides
npm run generate         # Generate PDF presentation
npm run generate:all     # Generate with confirmation message
```

## Architecture

### Internationalization (i18n)

This is a **locale-first architecture** using Next.js App Router with dynamic `[locale]` segments.

**Key files:**
- `src/i18n/config.ts` - Locale definitions and validation
- `src/i18n/get-dictionary.ts` - Dictionary loader
- `src/i18n/dictionaries/*.json` - Translation files (en, ja, zh-CN, zh-TW)
- `middleware.ts` - Locale detection and redirection

**Routing structure:**
- Root path `/` → redirects to `/{locale}` (based on Accept-Language header)
- All pages live under `src/app/[locale]/*`
- Examples: `/zh-CN/platform`, `/en/clinical`, `/ja/contact`

**CRITICAL i18n rules:**
1. `zh-CN.json` is the **semantic source of truth** - defines canonical meaning
2. All other language files must match `zh-CN.json` meaning exactly
3. **Never modify JSON keys** - only edit string values
4. Keys must stay synchronized across all 4 language files
5. When editing any medical/clinical copy, apply clinical-regulatory-i18n guidelines (see below)

### Locale Detection Flow

1. Check URL pathname for locale prefix
2. Fall back to `Accept-Language` header
3. Default to `zh-CN` if no match
4. Middleware redirects root `/` → `/{detected-locale}`

### Component Architecture

**Layout hierarchy:**
```
app/layout.tsx (root layout - fonts, metadata, ThemeProvider)
└── app/[locale]/layout.tsx (locale-specific layout - Navigation, Footer)
    └── app/[locale]/*/page.tsx (individual pages)
```

**Client/Server pattern:**
- Page components (`page.tsx`) are Server Components - handle data fetching, pass dictionary
- Client components (`*Client.tsx`) handle interactivity, animations (Framer Motion)
- Pattern: `page.tsx` imports `{Page}Client.tsx` and passes locale/dictionary props

**Example:**
```typescript
// page.tsx (Server Component)
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return <PageClient dictionary={dictionary} locale={locale} />
}
```

### Shared Components

Located in `src/components/`:
- `Navigation.tsx` - Header with locale switcher
- `Footer.tsx` - Footer with links
- `GoogleAnalytics.tsx` - GA4 integration
- `StructuredData.tsx` - JSON-LD for SEO
- `ThemeProvider.tsx` - Theme context
- `LegalPageClient.tsx` - Reusable legal page layout (privacy, terms, compliance)

### Styling & Design System

**Tailwind configuration** (`tailwind.config.ts`):
- Custom color palette: `slate-950/925/900` (dark backgrounds), `accent` (teal medical theme), `neutral` (warm grays)
- Custom fonts via CSS variables: `--font-outfit` (display), `--font-inter` (body), `--font-mono`
- Institutional, serious aesthetic - minimal animations, scientific diagrams over stock photos

**Global styles:** `src/app/globals.css`

## Medical/Clinical Language Guidelines

**This is the most critical constraint in the codebase.**

When editing any medical/clinical content (web copy, i18n dictionaries, marketing text):

### Apply clinical-regulatory-i18n skill requirements

See `.cursor/skills/clinical-regulatory-i18n/` for full documentation.

**Non-negotiable rules:**

1. **Clinical augmentation only** - system supports/assists clinicians, never acts autonomously
   - ✅ "clinical decision support", "assist clinical judgment", "early warning", "treatment suggestion (for reference)"
   - ❌ "diagnose", "AI decides", "autonomous treatment", "AI controls dialysis", "guarantees outcomes"

2. **Regulatory-safe language**
   - Conservative, clinically accepted phrasing
   - No black-box framing ("unknown logic but accurate")
   - No exaggerated claims or marketing buzzwords

3. **zh-CN.json is semantic master**
   - Edit meaning in `zh-CN.json` first
   - Propagate same meaning to `en.json`, `ja.json`, `zh-TW.json`
   - Never introduce new concepts in non-Chinese files

4. **Terminology consistency**
   - Use canonical mappings from `.cursor/skills/clinical-regulatory-i18n/GLOSSARY.md`
   - Examples: 临床决策支持 → Clinical Decision Support, 辅助判断 → Assist clinical judgment

5. **QA checklist**
   - Run checks from `.cursor/skills/clinical-regulatory-i18n/QA_CHECKLIST.md`
   - Verify no autonomy language, no regulatory exaggeration, semantic alignment across languages

### Editing i18n dictionaries workflow

1. Edit `zh-CN.json` value(s) to correct regulatory-safe meaning
2. Keep same keys and structure (no add/remove/reorder)
3. Update `en.json`, `ja.json`, `zh-TW.json` with exact same meaning
4. Ensure valid JSON output
5. Run QA checklist

## Security & Performance

### Security headers

Configured in `next.config.js`:
- HSTS, XSS protection, frame options, CSP
- CSP allows Google Analytics and Google Fonts
- `poweredByHeader: false` for security

### Image optimization

- Formats: AVIF, WebP
- Device sizes: 640-3840px
- Cache TTL: 30 days
- Use Next.js `Image` component for automatic optimization
- For critical images on services page, use native `<img>` with `priority` for faster LCP

### Middleware security

- Forces HTTPS in production (checks `x-forwarded-proto`)
- Locale detection and redirection

## SEO & Analytics

### Metadata

- Locale-specific metadata in `app/[locale]/layout.tsx`
- OpenGraph and Twitter cards configured
- `robots.ts` and `sitemap.ts` for search engines
- Structured data (JSON-LD) via `StructuredData.tsx` component

### Analytics

- Google Analytics 4 via `GoogleAnalytics.tsx`
- GA Measurement ID from `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
- Set in `NEXT_PUBLIC_BASE_URL` for canonical URLs

### Environment variables

Required in `.env.local`:
```
NEXT_PUBLIC_BASE_URL=https://suntopai.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## TypeScript Configuration

- Path alias: `@/*` → `./src/*`
- Strict mode enabled
- Excludes: `node_modules`, `video`, `pdf-slides`

## Key Pages & Routes

All pages under `src/app/[locale]/`:
- `/` - Home (hero, pillars, stats) - `HomeClient.tsx`
- `/platform` - Platform architecture - `PlatformClient.tsx`
- `/clinical/*` - Clinical applications (patient-care, vascular-access)
- `/deployment` - Integration and deployment - `DeploymentClient.tsx`
- `/services` - Service offerings
- `/company` - About, mission, values
- `/news` - News listing and individual articles (`/news/[slug]`)
- `/contact` - Contact form - `ContactClient.tsx`
- `/privacy`, `/terms`, `/compliance` - Legal pages (use `LegalPageClient.tsx`)

## Design Principles

From README.md - **institutional tone suitable for hospitals, investors, regulators**:
- Dark theme, professional appearance
- Minimal, purposeful animations
- Scientific diagrams and system architecture visuals
- Clinical credibility - no marketing buzzwords, declarative statements
- Typography: Outfit (display), Inter (body), JetBrains Mono (code)

## Git Workflow

- Main branch: `main`
- Recent commits show focus on performance (image optimization), SEO, legal pages, i18n
- Follow existing commit style: descriptive, action-oriented messages

## Common Pitfalls

1. **Do NOT** add autonomy language to medical content (read GLOSSARY.md first)
2. **Do NOT** modify i18n JSON structure/keys (only values)
3. **Do NOT** forget to update all 4 language files when changing content
4. **Do NOT** mix dependencies between root/video/pdf-slides projects
5. **Do NOT** use Server Component features in `*Client.tsx` files
6. **Do NOT** skip locale parameter in page components - always await params
7. **Do NOT** import dictionaries directly - use `getDictionary(locale)`
