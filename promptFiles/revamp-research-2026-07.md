# Revamp Research Archive — 2026-07-06

Condensed output of three research passes (web trends/hiring, current-site audit, repo
refresh). All exemplar URLs verified live on 2026-07-06. The full strategy built on this is
`revamp-plan-2026-07.md`; the living state doc is `revamp-handoff.md`.

## 1. Exemplar portfolios (verified) and the transferable lesson

| Who | URL | Lesson to steal |
|---|---|---|
| Josh Comeau | joshwcomeau.com | Interactivity in explanations, not decoration; 1-2 signature playful details; ranked "popular" surface |
| Lee Robinson | leerob.com | Radical minimalism works if writing carries authority; one small live element (Spotify) signals the site is alive; curate 4-6 pieces, never dump an archive |
| Brittany Chiang | brittanychiang.com | Experience-forward IA for senior candidates (roles above projects); a11y in the positioning; colophon. Most-cloned portfolio: copy the structure logic, never the look |
| Rauno Freiberg | rauno.me | Short opinionated manifesto; obsessive interaction-craft essays are the design-engineer gold standard |
| Paco Coursey | paco.me | One known OSS artifact outweighs ten demos; "Now" page humanizes |
| Emil Kowalski | emilkowal.ski | Contrarian taste essays ("You Don't Need Animations") signal judgment; products reframe you as authority |
| Jhey Tompkins | jhey.dev | Career narrative in the intro (named teams/eras) reads senior; sparing live widgets prove chops in-site |
| Maxime Heckel | maximeheckel.com | The tasteful ceiling for WebGL: identity accents only, content stays fast and readable |
| Amelia Wattenberger | wattenberger.com | One canonical interactive essay can carry a reputation for years |
| Nanda Syahrasyad | nan.fyi | Fewer posts, each an event; depth-first interactive explainers |
| Anthony Fu | antfu.me | Hand-sketch/generative accents as anti-slop signature |

## 2. Hiring signal (2025-2026 sources)

- 2-5 deep case studies beat 8-10 shallow cards (Comeau, Effective Portfolio).
- Hiring managers skim: outcome in the title, problem graspable in 30 seconds, decisions over
  process (opendoorscareers 2025).
- For frontend, the site itself is the proof: taste, perf discipline, design judgment
  (techinterview.org). Staleness is worse than absence: 3 strong posts beat 30 weak.
- Post-AI signals: verifiable OSS history, judgment about AI output, authentic imperfection
  (HN 44730506). 62% of employers likelier to reject clearly-AI materials; 78% say
  personalized detail signals genuine interest (Resume Now survey).
- The read-line is a measured outcome: "cut LCP from 4.1s to 1.4s."
- "Good enough" UI is a commodity now; the differentiator is the portfolio treated as a
  product with a point of view.

## 3. Lead-level content structure

- Constraints-first openings; the spine is named decisions with the tradeoff taken; close
  with before/after numbers; "what I'd do differently" as the senior tell.
- Case-study skeleton (enforced): (1) outcome-stating title, (2) 3 sentences context +
  constraints, (3) role/timeline/ownership scope, (4) 3-5 decisions with tradeoffs,
  (5) numbers table, (6) learnings. Diagrams over prose; captioned images.
- 10+ years: emphasize leadership, decision-making, impact; maximum-ownership projects;
  experience timeline above the project grid.
- Anti-patterns at lead level: skill bars, passion statements, template heroes, exhaustive
  uncurated grids, stale blog.

## 4. AI-slop tells (treat as lint failures)

Visual: Inter-by-default (also Space Grotesk + Instrument Serif combo, single italic-serif
hero word); purple/blue gradients + "VibeCode Purple"; gradient text; centered hero with pill
badge above H1; 3 equal icon-top feature cards; numbered 1-2-3 step rows; stat banner rows;
colored 3-4px left borders on cards; uniform rounded-2xl/shadow-lg/p-6; cardocalypse
(cards in cards); emoji feature bullets; ALL-CAPS tracked eyebrow on every section;
low-contrast gray-on-dark; big colored glow shadows; plastic AI illustrations; missing
hover/focus states.

Copy: vague aspirational headlines ("exceptional digital experiences"), buzzwords
(seamless, cutting-edge, best-in-class, empower), em-dash cadence, "it's not X, it's Y",
grammatically perfect but forgettable voice. Test: would you say it out loud?

Root cause (prg.sh): slop is the absence of a decision; remedies are explicit constraints,
named references, explicit prohibitions. The biggest built-vs-generated tell: designed
empty/loading/error states and real form validation.

Sources: developersdigest.tech 16-patterns, prg.sh purple-gradient, 925studios.co guide,
vibecodekit.dev, plus manual §13.

## 5. Craft trends, adoption calls

- SAFE: same-document View Transitions (Baseline Oct 2025); CSS scroll-driven animations
  (with fallback; animation-trigger still Chromium-only); variable fonts; flicker-free
  dark/light theming; performance-as-feature colophon with real CWV numbers; a11y as
  positioning; reduced-motion respect everywhere.
- MODERATE (once, deliberately): kinetic hero typography; ONE live widget; one easter egg.
- RISKY: WebGL hero scenes (skip unless it becomes the identity; Heckel is the ceiling).

## 6. Current-site audit (top findings)

1. "Earthy Forest" = the well-known Coolors sage/fern palette (dad7cd→344e41). Borrowed skin.
2. No motion identity (only transition-colors + hover shadow).
3. Body font silently Arial (globals.css overrides loaded Geist).
4. AI-boilerplate copy + canned "complexity: Expert" project blurbs; FITR entry is the one
   well-written exception and the voice model.
5. Hidden sr-only keyword stuffing on /work and project pages (includes dead Voice UI refs).
6. Fabricated schema: alumniOf 'University of Technology', fake contact@andrewpersad.dev,
   SearchAction to nonexistent /search, static 2024-01-01/v1.0.0/MIT on every project.
7. Identity drift: Frontend vs Software Engineer; .dev vs .com (RESOLVED: .com, Lead
   Software Engineer).
8. Ghost content: Cosmic Recipe Generator in seo.ts special-case + keyword blocks +
   content-strategy.md.
9. Education placeholder shipped on resume (RESOLVED: drop section).
10. Avatar: 1.7 MB PNG-in-SVG as hero LCP + unused 2.6 MB twin (both are the same flat
    head-and-shoulders illustration; green recolor in use, natural-palette original unused).

Keep: axe/Playwright CI (extend per-theme), Lighthouse CI budgets (perf/a11y/BP/SEO ≥0.9,
LCP ≤2.5s, CLS ≤0.1, TBT ≤300ms), bundle monitor (dedupe .js/.mjs pair), Resend contact
route (fix: in-memory limiter seeds count 5 vs cap 3; move to durable store; verified sender
domain; recipient hardcoded akpersad@gmail.com), seo.ts/robots/sitemap architecture
(clean the data), OptimizedImage. Replace: hand-rolled FID-era CoreWebVitals +
PerformanceMonitor (use web-vitals lib or @vercel/speed-insights); slim the GA4 layer
(fake-ecommerce events). WorkClient renders an Experimental/Production badge no project sets.

## 7. Repo audit refresh (delta since 2026-06-10)

- **Fork In The Road** (flagship): v1→v2 rewrite 2026-07-01→05, ~113k→~17.9k LOC src,
  runtime deps 27→10, 77→~20 API routes, 38 test files, CI with axe + Lighthouse gates.
  Live: forkintheroad.app. Story source: you-hungry/docs/portfolio-story.md. Hooks: HMAC
  guest voting on an unauthenticated write surface (signed httpOnly cookie, zero PII,
  guest→account claim via one-way pointer, revote replaces ballot in place); layered rate
  limits; no cron (lazy expiry on read, SSE stream doubles as timer, crash-safe seal);
  decision math ported pure with bit-identical parity tests; default-closed billing gate;
  split-flap reveal with reduced-motion + SR fallbacks; dark-mode axe scan caught 1.3:1
  white-on-gold → mode-invariant --gold-ink token; 9 phases, one PR each, owner gates.
- **overlapp** (7.40): dual OAuth calendar sync, plpgsql RRULE expansion, DB-layer privacy,
  Postgres integration tests; June PR added Sentry/PostHog; #16 proposal-unlock fixes.
  README staleness + missing CI from June fix list presumed open.
- **PersadPay** (7.15): unchanged since 2026-05-18. Real payroll: statutory tax engine
  tested to exact dollars, W-2/W-3, NYS-45, three-layer role enforcement. Reviewer caveat:
  login-gated, can't click through.
- **pawscriptions** (6.50→up): PRs #4 (variable schedule phases) + #5 (full redesign,
  2026-06-29), ~5.1k LOC, still zero tests. Race-safe notification dedup, deny-all RLS,
  client-side OCR, "Tri-color Aussie" design system (worked example in the design manual §16).
- **ProteinChecker web+iOS**: cross-platform breadth option (React web + native SwiftUI).
- **The 90th** (dashboard + n8n + Remotion): real and interesting but EXCLUDED by owner
  decision (channel stays faceless).
- Ruled out: TCG-Demo (dead deploy, security holes; drop permanently), hue-scenes (256-line
  CLI, "small hacks" shelf at most), pokopia-connector (stale, no deploy), passive/johda/
  letsWatchParent/jane-street-blank (scratch/legacy). PokeCollectorSwift has a live Pokemon
  TCG API key committed publicly (rotate; separate from this project).
- **Gaps** the revamp addresses: public technical writing (/notes from portfolio-story
  material), perf case study (colophon), design-system artifact (documented token system).
  True remaining gap: OSS contributions (out of scope; suggest merged PRs to libs he uses).
