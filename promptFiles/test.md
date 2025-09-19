# Andrew Persad Portfolio Plan

This document outlines the site plan, content structure, SEO/ATS optimizations, and implementation details for Andrew Persad’s online portfolio. It is tailored to balance hiring manager expectations, ATS parsing, and SEO performance.

---

## Site Map (Next.js, Multi-Page)

- `/` — **Landing/Home**
  - Hero splash with avatar, headline, sub-blurb, CTAs
  - Mini About preview (2–3 sentences, keywords)
  - Featured projects (3 cards)
  - Contact CTA
- `/about` — **In-depth Bio**
  - Extended resume-style narrative
  - Quick facts panel (skills, certifications, location)
  - Expanded personal background
- `/work` — **Project Index**
  - 3–5 featured project cards with tags and summaries
- `/work/[slug]` — **Case Studies**
  - Problem → Actions → Impact → Tech stack
- `/resume` — **Resume Page**
  - Semantic HTML resume
  - Download PDF
  - JSON Resume export
- `/contact` — **Contact Form**
  - Form with spam protection
  - Direct links: GitHub, LinkedIn, email
- (Optional) `/writing` — **Articles/Notes**
  - Engineering blog posts, boosts SEO

---

## Landing Page (Combined with Mini About)

**Hero Section**
- Avatar styled with Earthy Forest palette
- Headline:  
  *“Lead Software Engineer focused on React/Next.js—design systems, performance, and accessible enterprise UIs.”*
- Subhead:  
  *“I build composable front-ends and ship measurable wins: faster pages, cleaner DX, and repeatable delivery across large teams.”*
- CTAs: “See selected work” and “Download resume (PDF)”

**Mini About Preview**
- 2–3 sentences max:
  *“I design and deliver responsive, accessible interfaces with a focus on pixel-perfect execution and cross-browser reliability. My work spans SSO-secured platforms, design systems, and data-driven dashboards. I collaborate closely with platform teams to turn telemetry into actionable insights.”*

**Featured Work**
- 3 project cards (HP, Eli Lilly, Amazon) with 1-line impact blurbs and tech tags.

**Contact CTA**
- Button leading to `/contact`.

---

## About Page (Full Version)

- Extended narrative about career journey
- Quick facts panel:
  - Location: Franklin Square, NY
  - Strengths: React, Next.js, TypeScript, a11y, performance, design systems
  - Tools: Storybook, Contentful, AEM, Testing Library, axe, Tailwind/SCSS
  - Certifications: Salesforce Admin, Salesforce PD1, Unqork Configurator
- Expanded bio paragraphs
- Keywords surfaced for ATS/SEO.

---

## Projects & Case Studies

**HP Workforce Experience Platform**
- Role: Lead FE engineer
- Actions: Designed modular React architecture, integrated SSO, enforced WCAG, telemetry visualizations
- Impact: Enabled proactive detection & remediation; standardized UX
- Stack: TypeScript, React, RTL, MUI X, Veneer DS

**Eli Lilly Consumer Site**
- Role: FE engineer
- Actions: Redesigned consumer UX, CMS/API integrations, design system contributions
- Impact: 150–200K MAUs with consistent design and improved workflows
- Stack: Next.js, React Router, Contentful, AEM, Tailwind/SCSS

**Amazon Buy with Prime Portal**
- Role: FE engineer
- Actions: Built dashboards using Meridian DS, integrated analytics
- Impact: Supported 9M+ vendors with product/order insights
- Stack: React, TypeScript, DS, Testing

---

## Resume Page

- Resume text rendered as semantic HTML
- Download PDF (from uploaded resume)
- JSON Resume export for ATS/API parsing
- Keyword list included in plain text and JSON-LD.

---

## Contact Page

- Contact form with:
  - Name, email, message, role type
  - Honeypot + captcha for spam
- Direct links to GitHub, LinkedIn, email
- Optional: Calendly link

---

## Footer

- Short bio line:
  *“Andrew Persad — Lead Software Engineer (React/Next.js). I build scalable, accessible front-ends and design systems.”*
- Links: Email, GitHub, LinkedIn, Location
- © Year + “Built with Next.js”

---

## SEO & ATS Checklist

- Minimum 200–300 words on landing (use mini About)
- JSON-LD structured data:
  - `Person` schema on landing
  - `SoftwareSourceCode` on case studies
  - `BreadcrumbList` for navigation
- Alt text for all images
- Canonical URLs, OG tags, Twitter cards
- Sitemap + robots.txt via `next-sitemap`
- Keywords: React, Next.js, TypeScript, design systems, accessibility, performance, Storybook, Contentful, AEM, Tailwind, SCSS, RTL, axe DevTools

---

## File Structure

```
app/
  layout.tsx
  page.tsx                 // Landing
  about/page.tsx
  work/page.tsx
  work/[slug]/page.tsx
  resume/page.tsx
  contact/page.tsx
  writing/page.tsx (opt)
  api/contact/route.ts
components/
  Hero.tsx
  Avatar.tsx
  ProjectCard.tsx
  CaseStudy.tsx
  ContactForm.tsx
  Footer.tsx
lib/
  projects.ts
  seo.ts
  og.ts
public/
  favicon.ico
  og/*
```

**`lib/projects.ts` schema**
```ts
export type Project = {
  slug: string;
  company: string;
  title: string;
  summary: string;
  timeframe: string;
  role: string;
  impact: string[];
  stack: string[];
  repo?: string;
  live?: string;
  tags: string[];
  featured: boolean;
};
```

---

## Performance & Accessibility

- Use `next/image` for images
- Route-level code splitting
- Color contrast check with Earthy Forest palette
- Keyboard navigation, skip links, aria labels
- RTL tests on each page template
- Lighthouse CI checks
- Analytics with Plausible/Umami or GA4
