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
npm run dict:check       # Verify all 4 dictionaries match zh-CN key-for-key
npm run facts:check      # Report figures awaiting reconciliation, and outcome
                         # measures published without a documented study design
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
3. **Only edit string values in place.** A key may be *added* only when it is added to
   all four files in the same change, with real translations in each — never to one file
   alone, and never with zh-CN text standing in for a translation. Renaming, removing,
   re-ordering or restructuring keys is still not allowed.
4. Keys must stay synchronized across all 4 language files. `npm run dict:check` must pass
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
- Never rename, remove, re-order, or restructure JSON keys
- A new key must land in all four files at once, each with a genuine translation

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
- [ ] No key renames, removals, or restructuring
- [ ] Any new key exists in all four files, each with a real translation
- [ ] `npm run dict:check` passes
- [ ] JSON remains valid

### Editing i18n dictionaries workflow

1. Edit `zh-CN.json` value(s) to correct regulatory-safe meaning
2. Keep the existing keys and structure. If the change needs a new key, add it to all
   four files in the same commit — zh-CN first, then real translations in en, ja and zh-TW
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

Navigation carries **six** top-level items: Platform, Services, Company, Partners,
Investors, News. The logo links home, so Home is not repeated in the nav. Clinical
sits under Services and Deployment under Platform — both keep their own URLs and are
reached from their parent page's cross-links and from the footer.

All pages under `src/app/[locale]/`:
- `/` - Home, an audience router - `HomeClient.tsx`
- `/platform` - Platform architecture - `PlatformClient.tsx`
- `/deployment` - Integration and deployment (under Platform)
- `/services` - Service offerings
- `/services/patient-travel` - Interactive Leaflet map of the center network
- `/services/vascular-access` - Vascular access service
- `/clinical/*` - Clinical applications (under Services)
- `/company` - About, mission, values
- `/company/certifications` - Medical device registration and capability tiers
- `/company/[slug]` - Individual center detail pages with tourism galleries
- `/company/centers` - All centers listing
- `/partners` - Partnership models and named collaborations
- `/investors` - Public investment overview; projections stay behind a request flow
- `/news` - News listing and individual articles (`/news/[slug]`)
- `/contact` - Contact form - `ContactClient.tsx`
- `/privacy`, `/terms`, `/compliance` - Legal pages (use `LegalPageClient.tsx`)
- `/preview` - The previous homepage, parked for comparison. **Delete once signed off.**

### Facts, figures and naming — `src/content/facts.ts`

**Every number that appears on the site lives here, once.** Figures are
locale-independent, so all four locales read the same value and cannot drift.

- Render figures through `publicFact(id)`. It **throws at build time** for anything
  marked `unreconciled` or `internal` — an unsettled number must fail the build
  rather than reach a hospital director or an investor.
- Each fact carries a `basis` (what is actually counted) and an `asOf` date. Show the
  basis beside headline figures; it is what stops the site and the company deck from
  appearing to contradict each other.
- `BRAND` holds approved naming: **Suntop Healthcare** (group) → **岱特 / Daite**
  (technology subsidiary, and the registrant) → **胜透 / Suntop AI** (the product;
  胜透 in zh-CN and zh-TW, Suntop AI in en and ja).
- `REGISTRATION` holds the Class II certificate. `CAPABILITY_TIERS` maps each product
  capability to `registered`, `decision-support`, or `in-validation` — see the medical
  language rules below.
- `OUTCOMES` are cleared for publication but their study design is undocumented, so
  each must render `OUTCOMES_ATTRIBUTION` alongside the figure until `method` is filled in.

### Center data — one source

`public/data/centers-{locale}.json` is the **single source of truth** for centers.

- Server components and `generateStaticParams` read it via `getDirectCenters(locale)`
  in `src/lib/centers-data.ts`; client components fetch it over HTTP.
- **Do NOT** reintroduce a copy in the dictionaries. Centers were previously defined
  twice, which is how the English map silently lost nine centers and how the zh-TW and
  ja map data stayed in Simplified Chinese.
- Text in these files is **locale-specific** and must be genuinely translated. Never
  copy zh-CN into another locale as a placeholder.

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
2. **Do NOT** modify i18n JSON structure, or add a key to one locale only —
   new keys go into all four files together, each genuinely translated
3. **Do NOT** forget to update all 4 language files when changing content
4. **Do NOT** mix dependencies between root/video/pdf-slides projects
5. **Do NOT** use Server Component features in `*Client.tsx` files
6. **Do NOT** skip locale parameter in page components - always await params
7. **Do NOT** import dictionaries directly - use `getDictionary(locale)`
8. **Do NOT** hard-code any figure in a component - add it to `facts.ts` and render it through `publicFact()`
9. **Do NOT** define centers anywhere but `public/data/centers-{locale}.json`
10. **Do NOT** describe a predictive or warning capability as a registered clinical function - the Class II registration covers transmission, display and processing only, so label capabilities with their tier from `CAPABILITY_TIERS`
11. **Do NOT** hard-code user-facing strings in components, including inside HTML-string builders such as `MapPopup` - pass localized labels in
