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
- `map/CentersMap.tsx` - Leaflet map with theme-aware tiles (CartoDB for en/ja, OSM for zh-CN/zh-TW)
- `map/MarkerCluster.tsx` - Marker clustering using leaflet.markercluster (imperative, not React wrapper)
- `map/MapPopup.tsx` - HTML string popup generator (always dark text on white Leaflet popup)
- `map/MapFilters.tsx` - Province/type/search filters with dictionary-driven labels
- `map/MapLegend.tsx` - Map legend overlay

### Styling & Design System

**Tailwind configuration** (`tailwind.config.ts`):
- Custom color palette: `slate-950/925/900` (dark backgrounds), `accent` (teal medical theme), `neutral` (warm grays)
- Custom fonts via CSS variables: `--font-outfit` (display), `--font-inter` (body), `--font-mono`
- Institutional, serious aesthetic - minimal animations, scientific diagrams over stock photos

**Global styles:** `src/app/globals.css`

## Medical/Clinical Language Guidelines

**This is the most critical constraint in the codebase.**

**Audience**: nephrologists, hospital directors, regulators, medical investors. Tone must be professional, calm, precise. No internal jargon, shorthand, or engineering slang. Priority: **safety > clarity > elegance**.

When editing any medical/clinical content (web copy, i18n dictionaries, marketing text):

### Non-negotiable rules

#### 1) Clinical augmentation only (never autonomous)

The system **supports** clinicians; it does not act as a clinician.

**Preferred (safe) phrasing:**
- "clinical decision support"
- "assist clinical judgment"
- "provide risk explanation / risk factors"
- "early warning / early risk warning"
- "treatment suggestion (for reference; clinician confirmation required)"
- "workflow guidance / care pathway reference"

**Hard-banned words/phrases** (rewrite immediately if present):
- "diagnose/diagnosis (autonomously)", "treat/treatment (autonomously)", "prescribe", "order", "execute medical orders"
- "AI decides", "AI determines the regimen", "AI controls dialysis", "automatic treatment"
- "fully replaces physicians/nurses", "autonomous"
- "guarantees outcomes", "zero risk", "eliminates errors"
- "black-box", "unknown logic but accurate"

**Safe rewrite templates:**
- "The system provides **clinical decision support** for …"
- "The system **assists clinicians** in reviewing … and **explains risk factors** …"
- "The system provides **early risk warning** signals based on …; **final decisions remain with clinicians**."
- "Suggested actions are **for reference** and require clinician confirmation."

#### 2) zh-CN.json is the semantic source of truth

- Edit meaning in `zh-CN.json` first
- Propagate same meaning to `en.json`, `ja.json`, `zh-TW.json`
- Never introduce new concepts in non-Chinese files
- Never rename, remove, add, re-order, or restructure JSON keys — only modify string values

#### 3) Terminology glossary (canonical mappings)

| zh-CN | English | zh-TW | Japanese | Notes |
|-------|---------|-------|----------|-------|
| 临床决策支持 | Clinical Decision Support | 臨床決策支持 | 臨床意思決定支援 | Avoid "clinical decision making by AI" |
| 辅助判断 | Assist clinical judgment | 輔助判斷 | 臨床判断を補助 | Keep clinician-in-the-loop |
| 质控模块 | Quality Control Module | 質控模組 | 品質管理モジュール | Prefer "quality management" in medical context |
| 风险预警 | Early risk warning | 風險預警（早期） | リスクの早期警告 | Avoid "predicts with certainty" |

Do not invent new terminology mappings — use the table above or extend it explicitly.

### QA checklist (run on every medical/i18n edit)

**Safety / regulatory (must pass):**
- [ ] No claims of autonomous diagnosis, treatment, prescribing, or executing medical orders
- [ ] No wording implying AI replaces physicians or "decides" treatment independently
- [ ] No exaggerated claims (guaranteed outcomes, zero risk, eliminates errors)
- [ ] AI capabilities described as clinical decision support only
- [ ] Any "suggestion/recommendation" framed as **for reference** with clinician confirmation

**Multilingual consistency (must pass):**
- [ ] `zh-CN.json` updated first as semantic source of truth
- [ ] `en.json`, `ja.json`, `zh-TW.json` match exact meaning and intent
- [ ] No concept exists in other languages that is absent from `zh-CN.json`
- [ ] Terminology aligns with glossary table above

**JSON integrity (must pass):**
- [ ] No key renames, removals, additions, or restructuring
- [ ] Only string values changed
- [ ] JSON remains valid

### Editing i18n dictionaries workflow

1. Edit `zh-CN.json` value(s) to correct regulatory-safe meaning
2. Keep same keys and structure (no add/remove/reorder)
3. Update `en.json`, `ja.json`, `zh-TW.json` with exact same meaning
4. Ensure valid JSON output
5. Run QA checklist above

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
- `/services` - Service offerings (3x3 grid)
- `/services/patient-travel` - Interactive Leaflet map with 150+ dialysis centers
- `/company` - About, mission, values
- `/company/[slug]` - Individual center detail pages with tourism galleries
- `/company/centers` - All centers listing
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

## Deployment

- Hosted on **Heroku** (heroku/nodejs buildpack, Heroku-24 stack)
- Node engine: `20.x` (specified in `package.json`)
- Heroku runs `npm install` (strict peer deps) then `npm run build`
- **No `--legacy-peer-deps`** — all dependencies must have compatible peer deps
- Use `leaflet.markercluster` (not `react-leaflet-cluster`) to avoid peer conflicts with react-leaflet v4

## Common Pitfalls

1. **Do NOT** add autonomy language to medical content (read GLOSSARY.md first)
2. **Do NOT** modify i18n JSON structure/keys (only values)
3. **Do NOT** forget to update all 4 language files when changing content
4. **Do NOT** mix dependencies between root/video/pdf-slides projects
5. **Do NOT** use Server Component features in `*Client.tsx` files
6. **Do NOT** skip locale parameter in page components - always await params
7. **Do NOT** import dictionaries directly - use `getDictionary(locale)`
