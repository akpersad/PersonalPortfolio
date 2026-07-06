# Portfolio Revamp Plan — July 2026

Ground-up rebuild of andrewpersad.{dev,com}. One PR per phase, each independently shippable.
Grounded in three research passes run 2026-07-06: (1) verified study of 11 elite frontend
portfolios + hiring-signal literature, (2) full audit of the current site, (3) refreshed audit
of all GitHub/local repos. Design constitution: the Design Engineering Manual at
`you-hungry/DESIGN-UI-UX-SKILLS.md` (OKLCH tokens, motion numbers, anti-slop catalogue).

---

## 1. Why rebuild (audit verdict)

The current site is clean plumbing wrapped in template skin. Ranked findings:

1. **Palette is borrowed.** "Earthy Forest" is the well-known Coolors sage/fern palette
   (dad7cd → 344e41) that circulates as a default "nice green." Instantly recognizable.
2. **No motion identity.** Only `transition-colors` and a hover shadow. Nothing memorable.
3. **Body font is effectively Arial.** `globals.css` overrides the loaded Geist fonts with
   `font-family: Arial, Helvetica, sans-serif`.
4. **AI-boilerplate copy.** "My passion lies in creating pixel-perfect interfaces," em-dash
   cadence, duplicated "sophisticated/advanced architecture" project blurbs, canned
   "complexity: Expert / maintainability: Excellent" ratings.
5. **Hidden `sr-only` keyword-stuffing** on /work and project pages (dozens of spammy role
   terms, including dead "Voice UI / Framer Motion" lines). Inauthentic and penalizable.
6. **Fabricated metadata**: `alumniOf: 'University of Technology'`, fake
   `contact@andrewpersad.dev`, SearchAction pointing at a nonexistent `/search`, static
   `2024-01-01 / v1.0.0 / MIT` on every project.
7. **Identity drift**: "Lead Frontend Engineer" (layout/JSON-LD) vs "Lead Software Engineer"
   (hero/resume); `andrewpersad.dev` vs `.com` used inconsistently.
8. **Ghost content**: Cosmic Recipe Generator still referenced in seo.ts and hidden keywords.
9. **Placeholder shipped**: resume Education literally says "Education details will be added
   here based on your background."
10. **Avatar is a 1.7 MB PNG wrapped in an `<svg>` tag** (plus an unused 2.6 MB twin). It is
    the hero LCP image.

Worth keeping: axe/Playwright a11y CI, Lighthouse CI with real budgets, bundle monitoring,
Resend contact route (shape, not the buggy in-memory rate limiter), SEO/schema architecture
(data needs cleaning), and the Fork In The Road entry's voice, which is the model for all copy.

## 2. What the research says (decisions it drives)

**Hiring signal (sources: Comeau's Effective Portfolio, techinterview.org, opendoorscareers,
HN hiring threads, Resume Now survey):**
- 2 to 5 deep case studies beat a grid of shallow cards. Curate hard.
- Hiring managers skim: outcome in the title, problem graspable in 30 seconds, decisions over process.
- For frontend, **the site itself is the proof**. Taste, performance, and judgment must be
  visible in the artifact.
- Post-AI, the evaluated signal is judgment: what you decided, measured, and traded off.
  62% of employers say they are more likely to reject clearly-AI-generated materials.
- Staleness is worse than absence. Three strong essays beat thirty weak posts.

**Lead-level content structure (vs mid-level):**
- Experience-forward IA (Brittany Chiang model): roles and progression above the project grid.
- Case studies open with constraints, spine is named decisions and tradeoffs, close with
  before/after numbers ("cut LCP from 4.1s to 1.4s" is the line that gets read).
- Judgment artifacts: a short opinionated manifesto (Rauno), contrarian taste essays (Emil),
  a colophon with real CWV numbers (Chiang).

**Anti-slop tells we will treat as lint failures** (developersdigest 16-patterns, prg.sh,
925studios, plus the manual's §13): Inter-by-default, purple/blue gradients, centered hero
with pill badge, three equal icon-cards, colored left card borders, stat banner rows, emoji
feature bullets, uniform rounded-2xl/p-6 cards, low-contrast gray-on-dark, gradient text,
buzzword copy ("exceptional digital experiences"), em dashes in site copy, skill bars.

**Craft trends, adoption calls:**
- SAFE: same-document View Transitions (Baseline since Oct 2025), CSS scroll-driven animations
  (with fallback), variable fonts, flicker-free dark/light theming, performance-as-a-feature
  colophon, a11y-as-a-feature, reduced-motion respect.
- MODERATE (use once, deliberately): kinetic hero typography, one live widget (Lee Robinson /
  Jhey model), one easter egg.
- RISKY (skip unless it becomes the identity): WebGL hero scenes.

## 3. Positioning and information architecture

**Positioning: "Design Engineer" energy with lead-level ownership.** The story the evidence
supports: an engineer who owns products end to end (113k-line rewrite discipline, security
models for hostile input, real payroll compliance) AND sweats interface craft (OKLCH token
pipelines, axe-verified dark mode, split-flap reveals with reduced-motion fallbacks). That
combination is the differentiator; neither alone is.

**Narrative spine:** enterprise scale by day (HP 9M+ users, Eli Lilly 150-200K MAU, Amazon
Buy with Prime), full-product ownership by night (five shipped, live products). The site
tells that as one story instead of a bio paragraph plus a card grid.

**IA (routes):**
- `/` hero with a real hook (not a job title), current-role line, 2 featured case studies,
  one live element, short manifesto
- `/work` curated index: 4 case studies + a "small hacks" shelf (hue-scenes, etc.)
- `/work/[slug]` full case-study format (below)
- `/about` experience timeline first, then the human bits, avatar story
- `/notes` 3 to 5 essays at launch (see Phase 6), quality over cadence
- `/resume` kept (clean HTML + PDF), `/contact` kept
- `/colophon` how the site is built + live Lighthouse/CWV numbers + design-decision notes

**Case-study format** (every study, enforced):
1. Title states the outcome. 2. Three sentences of context + constraints. 3. Role/timeline/
ownership scope. 4. Three to five named decisions, each with the tradeoff taken. 5. Numbers
table (before/after). 6. What I would do differently. Captioned screenshots, diagrams over prose.

**Featured lineup** (from the repo audit, ranked):
1. **Fork In The Road** — flagship. The 113k→20k rewrite, HMAC guest voting on an
   unauthenticated write surface, SSE rooms, cron-free lazy expiry. Best story in the account.
2. **overlapp** — hardest engineering. Dual OAuth calendar sync, plpgsql RRULE expansion,
   DB-layer privacy, Postgres integration tests.
3. **PersadPay** — stakes. Real payroll, statutory tax engine tested to exact dollars,
   W-2/W-3/NYS-45.
4. **The 90th** — breadth. Autonomous YouTube channel: self-hosted n8n pipelines, Remotion
   render pipeline, zero-dependency HMAC-auth monitoring PWA. Framed as the system.
5. **pawscriptions** — craft in miniature (shelf or fifth study; freshly redesigned).
- Drop: TCG-Demo (dead deploy, known security holes), ProteinChecker to the shelf unless a
  native-platform checkbox matters for a specific application, POKÉ COLLECTOR from featured.

**Gaps the revamp itself fixes:** publishing portfolio-story.md content = public technical
writing; the colophon = the performance case study; the site's token system, documented =
the design-system artifact. (True remaining gap: OSS contributions; out of scope here but
worth a few merged PRs to Remotion/n8n-adjacent libs you already use.)

## 4. Design direction (Phase 2 decides, these are the constraints)

- Tokens: three-layer OKLCH system per the manual (§7). Tinted neutrals, ONE accent, 60-30-10.
  No purple gradients, no pure black, no borrowed Coolors palette.
- Type: distinctive display + refined body, chosen on a contrast axis, variable fonts,
  fluid clamp() scale. Explicitly not Inter-by-default and not the Space Grotesk +
  Instrument Serif slop combo.
- Motion: CSS-first (scroll-driven animations, View Transitions), 150-300ms ease-out
  (quint/expo), transform/opacity only, full prefers-reduced-motion collapse. One signature
  interaction that appears in multiple places (the "felt, not seen" identity).
- Dark/light both first-class, flicker-free, axe-verified per mode (the FITR --gold-ink lesson).
- Every state designed: empty, loading, error, focus-visible. This is the anti-slop tell that
  matters most.

**Avatar:** current asset is the same flat head-and-shoulders illustration twice: a
green-monochrome recolor (in use, unnatural skin) and the natural-palette original (unused).
Phase 2 delivers 3 to 4 treatments side by side for you to pick: (a) original natural palette,
properly exported (≤30 KB AVIF/WebP, correct sizes), (b) recolor into the NEW palette done
right (natural skin, tinted background), (c) true-vector redraw (crisp at any size, themeable
via CSS variables, dark-mode variant for free), (d) one creative treatment (duotone/halftone/
generative frame) as the wildcard.

## 5. Architecture

- **Next.js 16** (App Router) + React 19 + TypeScript, upgraded from 15. Matches FITR;
  consistency across your repos is itself a portfolio signal.
- **Tailwind 4** kept, driven by the CSS-variable token layer (tokens are the source of truth,
  Tailwind consumes them).
- **MDX for case studies and notes** (typed frontmatter, custom components for decision
  blocks, numbers tables, captioned figures). Content lives in the repo, no CMS.
- **Motion**: native CSS for scroll/transition work; the `motion` library only where JS
  orchestration is genuinely needed. Bundle budget enforced by existing monitor.
- **Keep and harden**: axe/Playwright CI (extend to per-theme scans), Lighthouse CI budgets,
  bundle monitor (dedupe the .js/.mjs pair), Resend contact route (verified domain, durable
  rate limit via Upstash, fix the count-seeding bug), sitemap/robots/schema (cleaned data).
- **Remove**: sr-only keyword blocks, hand-rolled FID-era CoreWebVitals/PerformanceMonitor
  (replace with `web-vitals` lib or @vercel/speed-insights), GA4 fake-ecommerce events,
  ghost Cosmic Recipe references, unused 2.6 MB avatar twin.

## 6. Phases (one PR each)

**Phase 0 — This plan.** (this PR)

**Phase 1 — Credibility hotfix on the live site.** Small, ships immediately, no redesign:
remove keyword-stuffing blocks and ghost content; fix fabricated schema data; resolve
title/domain drift (needs your call, §7); fix or remove the education placeholder (needs your
input); replace the 1.7 MB avatar asset with a properly exported ≤30 KB image; delete the
unused twin; fix the contact rate-limit bug.
*Done when: no fabricated data anywhere, LCP asset under 50 KB, axe and Lighthouse CI green.*

**Phase 2 — Design direction + foundation.** Two to three full design directions presented as
rendered comps (tokens, type pair, hero composition, one interior page each) plus the 4 avatar
treatments. You pick; I back each option with reasoning from the manual. Then implement: token
system, fonts, theming, motion primitives, nav/footer shell, colophon skeleton.
*Done when: direction chosen, tokens power a themed shell at 360/768/1280, both modes pass axe.*

**Phase 3 — Core pages on the new system.** Home (new hero + hook copy), about (experience
timeline), work index, contact, resume. All copy rewritten in the FITR-entry voice: specific,
first-person, zero buzzwords, no em dashes, outcome-led. Liberties = amplification and
framing of real work, never invention.
*Done when: every page real content, every interactive state designed, CI green.*

**Phase 4 — Case-study engine + flagship.** MDX pipeline, decision-block/numbers-table/figure
components, then the Fork In The Road study written from `docs/portfolio-story.md`. This PR
sets the bar for the other three.
*Done when: FITR study live, skimmable in 30 seconds, deep-readable in 10 minutes.*

**Phase 5 — Remaining case studies.** overlapp, PersadPay, The 90th (needs screenshots/write-up
since the dashboard is password-gated), pawscriptions shelf entry. Small-hacks shelf.
*Done when: four studies + shelf live with real screenshots and numbers.*

**Phase 6 — Craft layer + notes.** Signature interaction rollout, view transitions, scroll
choreography, ONE live widget, one easter egg. `/notes` with 3 launch essays harvested from
real work: "Deleting 93,000 lines" (the rewrite), "Real-time without cron" (lazy expiry +
SSE), "An OKLCH token pipeline that catches contrast bugs in CI" (the --gold-ink story).
*Done when: motion respects reduced-motion everywhere, essays published, INP ≤ 200ms held.*

**Phase 7 — Colophon, hardening, launch.** Colophon with measured numbers, per-theme axe in
CI, OG images, structured-data verification, redirects, final Lighthouse 100s, DNS/domain
consolidation, launch.
*Done when: colophon numbers are real and current, all budgets enforced in CI, site live on
the canonical domain.*

Sequencing note: 1 is independent; 2 blocks 3 blocks 4 blocks 5; 6 and 7 close. Each PR keeps
the deployed site releasable.

## 7. Decisions needed from you (the no-guess list)

1. **Canonical domain**: andrewpersad.dev or .com? (Both appear in the code today.)
2. **Title**: "Lead Frontend Engineer," "Lead Software Engineer," or "Design Engineer"-flavored?
   My recommendation: primary "Lead Software Engineer" for ATS truth, with design-engineer
   positioning in the copy, but this is your name on the door.
3. **Education**: real details for the resume, or drop the section entirely?
4. **The 90th**: comfortable publicly tying the channel/automation system to your name?
5. **Employer work**: HP, Eli Lilly, Amazon are already named on the live site. Confirm
   that framing (and the metrics used) stays within what you can publicly claim.
6. **Avatar attachment**: any hard constraint on keeping the current illustration's likeness,
   or is a redraw acceptable if it keeps the vibe?
