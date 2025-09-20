# Site Architecture & Technical Structure

This document outlines the technical architecture, site structure, and development patterns for the Andrew Persad portfolio.

## 🗺️ Site Map (Next.js App Router)

### **Core Pages**
- **`/`** — **Landing/Home**
  - Hero splash with avatar, headline, sub-blurb, CTAs
  - Mini About preview (2–3 sentences, keywords)
  - Featured projects (3 cards)
  - Contact CTA

- **`/about`** — **In-depth Bio**
  - Extended resume-style narrative
  - Quick facts panel (skills, certifications, location)
  - Expanded personal background

- **`/work`** — **Project Index**
  - 3 featured project cards with tags and summaries
  - Links to individual case studies

- **`/work/[slug]`** — **Case Studies**
  - Problem → Actions → Impact → Tech stack format
  - Individual project deep dives

- **`/resume`** — **Resume Page**
  - Semantic HTML resume
  - Download PDF functionality
  - JSON Resume export for ATS

- **`/contact`** — **Contact Form**
  - Form with spam protection
  - Direct links: GitHub, LinkedIn, email

## 📁 File Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with navigation/footer
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles & design system
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── work/
│   │   ├── page.tsx         # Projects index
│   │   └── [slug]/
│   │       └── page.tsx     # Individual project pages
│   ├── resume/
│   │   └── page.tsx         # Resume display
│   ├── contact/
│   │   └── page.tsx         # Contact form
│   └── api/
│       └── contact/
│           └── route.ts     # Contact form API endpoint
├── components/
│   ├── Navigation.tsx       # Responsive navigation bar
│   ├── Footer.tsx          # Persistent footer
│   ├── Hero.tsx            # Landing page hero section
│   ├── ProjectCard.tsx     # Project preview cards
│   └── ContactForm.tsx     # Contact form component
├── lib/
│   ├── projects.ts         # Project data and schemas
│   ├── seo.ts             # SEO utilities and metadata
│   └── analytics.ts       # Performance tracking
public/
├── icons/                  # Avatar and icon assets
├── projects/              # Project screenshots/assets
└── resume/                # PDF resume files
tests/
├── accessibility.spec.ts   # Comprehensive a11y tests
└── playwright.config.ts   # Test configuration
promptFiles/               # Project documentation
└── [various-docs].md
```

## 🏗️ Data Architecture

### **Project Schema**
```typescript
export type Project = {
  slug: string;              // URL identifier
  company: string;           // "Personal Project"
  title: string;            // Project name
  summary: string;          // Brief description
  timeframe: string;        // Development period
  role: string;             // "Full-stack Developer"
  impact: string[];         // Key achievements/outcomes
  stack: string[];          // Technologies used
  repo?: string;            // GitHub repository URL
  live?: string;            // Live demo URL
  tags: string[];           // Technology/category tags
  featured: boolean;        // Show on homepage
  description: string;      // Detailed case study content
  challenges: string[];     // Technical challenges solved
  solutions: string[];      // How challenges were addressed
  screenshots: string[];    // Project image assets
};
```

### **SEO Metadata Schema**
```typescript
export type PageMetadata = {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    images: string[];
    type: 'website' | 'article';
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
  jsonLd: object;           // Structured data
};
```

## ⚡ Performance Architecture

### **Code Splitting Strategy**
- **Route-level splitting**: Next.js App Router (automatic)
- **Component lazy loading**: React.lazy() for heavy components
- **Dynamic imports**: For non-critical functionality

### **Asset Optimization**
- **Images**: next/image with WebP conversion
- **Fonts**: next/font with Geist Sans/Mono optimization
- **Bundle analysis**: @next/bundle-analyzer integration

### **Caching Strategy**
- **Static pages**: Generated at build time
- **Dynamic content**: ISR (Incremental Static Regeneration) for project updates
- **Assets**: CDN caching with appropriate headers

## 🔧 Development Workflow

### **Build Pipeline**
1. **Development**: `npm run dev` with Turbopack
2. **Type checking**: TypeScript validation
3. **Accessibility testing**: Playwright + axe-core
4. **Performance auditing**: Lighthouse integration
5. **Production build**: `npm run build`

### **Quality Gates**
- All accessibility tests must pass (8/9 currently passing)
- Lighthouse performance score 90+
- TypeScript compilation without errors
- No console errors in production build

### **CI/CD Integration**
- **GitHub Actions**: Automated accessibility testing
- **Vercel**: Automatic deployments on push
- **Performance monitoring**: Core Web Vitals tracking
