# Suntop AI - Corporate Website

An institutional, investor-ready website for Suntop AI, an AI-driven dialysis intelligence and automation platform company.

## Overview

This website is built following the design principles of serious, science-driven companies like Insilico Medicine. It signals:
- AI-first, platform-based approach
- Clinical and institutional focus
- Long-term vision suitable for investors, hospitals, and regulators

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Outfit (display), Geist (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home page
│   ├── platform/          # Platform/Technology page
│   ├── clinical/          # Clinical Applications page
│   ├── deployment/        # Deployment page
│   ├── company/           # Company/About page
│   ├── news/              # News/Updates page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── Navigation.tsx     # Header navigation
│   └── Footer.tsx         # Footer component
```

## Pages

1. **Home** - Hero section, three pillars, platform flow, impact stats
2. **Platform** - Three-layer architecture (Data, Intelligence, Automation)
3. **Clinical Applications** - In-center, networked centers, decision support
4. **Deployment** - Integration, security, deployment process
5. **Company** - Mission, vision, values, leadership
6. **News** - Company updates and announcements
7. **Contact** - Contact form and information

## Design Principles

- **Institutional tone**: No marketing buzzwords, declarative statements
- **Dark theme**: Professional, serious appearance
- **Minimal animations**: Subtle, purposeful motion
- **Scientific diagrams**: System architecture, not stock photos
- **Clinical credibility**: Language suitable for hospitals and regulators

## Customization

### Colors

Edit `tailwind.config.ts` to modify the color palette:
- `accent`: Teal color for highlights
- `slate`: Dark neutrals for backgrounds
- `neutral`: Text colors

### Content

All content is embedded in page components. For a CMS-driven approach, consider:
- Sanity
- Contentful
- Strapi

### Typography

Fonts are loaded via `next/font/google` in `layout.tsx`.

## Deployment

Recommended platforms:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**

```bash
# Build and deploy to Vercel
vercel --prod
```

## License

Proprietary - Suntop AI
