# Revamp Handoff — READ THIS FIRST after a context clear

Living state document for the July 2026 portfolio rebuild. Update this file at the end of
every working session (phase progress, new decisions, gotchas). Everything here is repo-local
so nothing depends on chat history.

## Document map

| Doc | Purpose |
|---|---|
| `promptFiles/revamp-plan-2026-07.md` | The strategy: audit findings, research conclusions, IA, design constraints, 7 phases |
| `promptFiles/revamp-research-2026-07.md` | Condensed research archive (exemplars, hiring signals, anti-slop tells, craft trends) |
| `promptFiles/repo-audit-2026-06-10.md` | June 2026 deep audit of all repos (rubric + scores) |
| `../you-hungry/DESIGN-UI-UX-SKILLS.md` | **Design constitution.** OKLCH tokens, type/motion numbers, anti-slop catalogue (§13), checklists (§14). Read before any design work |
| `../you-hungry/docs/portfolio-story.md` | Source of truth for the Fork In The Road case study |
| `temp/me/` | Avatar reference photos (GITIGNORED, public repo, never commit) |

## Phase status

- [x] **Phase 0 — Plan.** Branch `feature/revamp-plan`, merged (PR #10).
- [x] **Phase 1 — Credibility hotfix.** Merged (PR #11, 2026-07-06). All items done: sr-only ATS blocks removed (work index + project pages);
      Cosmic Recipe ghost refs gone; fabricated schema fixed (alumniOf, fake email,
      SearchAction, static/fake dates, softwareVersion, license, wordCount removed;
      ProfessionalService schema deleted entirely); domain consolidated to andrewpersad.com
      (sitemap/robots now derive from BASE_URL); title standardized to Lead Software Engineer
      everywhere (incl. contact status pill "Available for Lead Software Engineer Roles");
      education section dropped from resume (incl. "Education details will be added" ghost
      text); avatar replaced with 13 KB 768px WebP (`public/icons/avatar.webp`), both
      multi-MB SVGs deleted; contact rate limit fixed (seeds 1, prunes expired entries);
      em dashes removed from site copy; footer year now dynamic; tests updated (130 pass).
- [x] **Phase 2 — Design direction + foundation.** Complete on `feature/phase-2-foundation`
      (awaiting owner PR). DIRECTION PICKED (owner, 2026-07-06):
      **Direction 1 "Annotated"** (`design/comps/direction-1-annotated.html`): hue-245 slate
      tinted neutrals, signal-orange (hue 40) markup accent, annotation/dimension-line motif,
      Bricolage Grotesque / Geist / Geist Mono. All tokens live in that comp's `:root` /
      `.dark` blocks; use them as the source when implementing.
      AVATAR: **DONE** (owner approved 2026-07-06): treatment **A "Flat"**, likeness locked
      at **v5.4** (`#g-bust-v5` in `design/comps/avatar-final.html`; see decisions log #8-9).
      FOUNDATION: **DONE** (2026-07-06/07, branch `feature/phase-2-foundation`): Annotated
      tokens in `globals.css` (three-layer OKLCH, CSS vars as source of truth, Tailwind 4
      `@theme inline` mapping, legacy forest palette kept for un-rebuilt pages); fonts
      Bricolage Grotesque + Geist + Geist Mono via next/font (self-hosted); flicker-free
      class-based dark mode (pre-paint head script + ThemeToggle); motion primitives
      (ease-out-quint token, motion-safe utilities, global reduced-motion collapse);
      nav/footer shell rebuilt on tokens; `/colophon` skeleton; avatar exported as
      `src/components/Avatar.tsx` (Flat v5.4, `--av-*` component tokens), avatar.webp
      deleted; CoreWebVitals/PerformanceMonitor removed. Awaiting owner PR.
- [ ] **Phase 3 — Core pages.** Home, about (experience timeline first), work index, contact,
      resume. All copy rewritten (voice rules below).
- [ ] **Phase 4 — Case-study engine (MDX) + Fork In The Road flagship study.**
- [ ] **Phase 5 — Remaining studies.** overlapp, PersadPay, pawscriptions, ProteinChecker,
      small-hacks shelf.
- [ ] **Phase 6 — Craft layer + /notes.** Signature interaction, view transitions, scroll
      choreography, ONE live widget, one easter egg, 3 launch essays.
- [ ] **Phase 7 — Colophon + hardening + launch.**

## Decisions log (owner, 2026-07-06 — do not re-ask)

1. Canonical domain: **andrewpersad.com** (kill all `.dev` references).
2. Title: **Lead Software Engineer** (design-engineer positioning lives in the copy).
3. Education section: **dropped entirely.**
4. **The 90th stays off the site** (channel remains faceless/unlinked). Lineup slot goes to
   pawscriptions (featured #4) + ProteinChecker (cross-platform #5/shelf).
5. HP / Eli Lilly / Amazon naming and metrics: confirmed safe to keep.
6. Avatar: **full redraw approved** from photos in `temp/me/`; keep the illustrated
   "animated" feel; old likeness need not be preserved. Reference traits: short dark curly
   hair, full beard, warm smile, brown skin. (In IMG_4191.jpeg he is the man on the right;
   IMG_3290 is the best smile reference.) HEIC files already converted to JPEG in
   `temp/me/preview/` (`sips -s format jpeg` for any new ones).
7. Design direction: **Direction 1 "Annotated"** (2026-07-06).
8. Avatar treatment: ~~D "Sticker"~~ superseded — owner switched to **A "Flat"** after
   seeing the v5 likeness in both treatments (2026-07-06, late). FINAL.
9. Avatar likeness: **LOCKED at v5.4** (`#g-bust-v5` in `design/comps/avatar-final.html`,
   commit 9a7fd3d): original-art construction, black hair, hair/beard separate masses with
   temple fade gap, compact mouth cluster, NO ears, no teeth, flat colors. Owner approved
   2026-07-06. Do not redraw; only mechanical export work remains (standalone optimized
   SVG themed via semantic tokens, then delete interim `public/icons/avatar.webp`).

## Working agreements

- **Branch off `main` per phase, one PR per phase, owner opens/merges the PRs.**
- Remote: `github.com-personal:akpersad/PersonalPortfolio.git`. Plain `git push` works via
  SSH; **`gh` CLI is NOT authenticated** on this machine.
- **No em dashes in any site copy** (owner's global rule; internal docs exempt).
- Copy voice model: the Fork In The Road entry in `src/lib/projects.ts`. Specific,
  first-person, outcome-led, zero buzzwords. Liberties = amplify and frame real work, never
  invent facts, credentials, or metrics.
- Anti-slop is a lint gate: check every UI change against the manual's §13 catalogue and the
  tells list in the research doc.
- Keep and harden: axe/Playwright CI, Lighthouse CI budgets, bundle monitor, Resend contact
  route, sitemap/robots/schema architecture. Remove: hand-rolled CoreWebVitals/
  PerformanceMonitor (FID-era), GA4 fake-ecommerce events, sr-only keyword blocks.
- Target stack for the rebuild: Next.js 16 + React 19 + TS + Tailwind 4 (tokens as CSS
  variables are the source of truth), MDX content, CSS-first motion.
- **Never run `open` on repo files from a session** — macOS attaches `com.apple.macl` /
  provenance xattrs that EPERM-lock the file against the session's process. Give the owner
  the file path to open themselves. (A reboot clears the lock if it happens.)

## Session log

- **2026-07-06** — Research (3 parallel agents: exemplars/hiring, site audit, repo refresh),
  plan written + decisions resolved, handoff + research docs created. Branch
  `feature/revamp-plan` pushed. Next: owner PRs Phase 0, then start Phase 1 on a fresh branch.
- **2026-07-06 (later)** — Phase 1 executed on `feature/phase-1-credibility-hotfix` (see
  checklist above). Lint, type-check, build, and full Playwright/axe suite green (130 tests).
  Gotchas found: contact page had a second title-drift spot ("Available for Lead Frontend
  Roles"); `project.role` in projects.ts is real displayed data (kept). Known gaps deferred:
  `/og-image.jpg` + `/twitter-image.jpg` are referenced in metadata but don't exist in
  `public/` (Phase 7 OG work); contact email `from:` still `onboarding@resend.dev` (needs
  Resend domain verification); GA4 fake-ecommerce events + hand-rolled CoreWebVitals/
  PerformanceMonitor removal deferred to the rebuild phases; Vercel env
  `NEXT_PUBLIC_BASE_URL` should be confirmed as `https://andrewpersad.com`.
  Next: owner PRs Phase 1, then Phase 2 (design direction comps + avatar treatments).
- **2026-07-06 (later still)** — Phase 1 merged (PR #11). Branch
  `feature/phase-2-design-direction` created off main for Phase 2. Phase 2 kickoff checklist
  for the next session:
  1. Read `../you-hungry/DESIGN-UI-UX-SKILLS.md` (design constitution) BEFORE any design work.
  2. Deliverable A: 2-3 full design directions as rendered comps (tokens, type pair, hero
     composition, one interior page each), each backed by reasoning from the manual.
  3. Deliverable B: 3-4 avatar treatments, full redraw from photos in `temp/me/` (gitignored;
     HEIC may need `sips -s format jpeg` first; in IMG_4191.jpeg he is the man on the right).
     Keep the illustrated "animated" feel. The interim 13 KB `public/icons/avatar.webp` is a
     recolor of the old art, meant to be replaced.
  4. OWNER PICKS direction + avatar before implementation starts.
  5. Then implement: token system (CSS variables as source of truth, Tailwind 4), fonts,
     theming (light/dark), motion primitives, nav/footer shell, colophon skeleton.
  Done when: direction chosen, tokens power a themed shell at 360/768/1280, both modes pass axe.
- **2026-07-06 (Phase 2, session 1)** — Deliverables A + B built and screenshot-verified
  (360/768/1280, light+dark, via Playwright; scratch shots in gitignored `temp/comp-shots/`).
  `design/comps/index.html` is the pick sheet. The three directions, each a self-contained
  HTML comp with three-layer OKLCH tokens, hero, FITR case-study interior, and a spec-sheet
  footer with reasoning:
  1. **Annotated** — hue-245 slate paper, signal-orange (hue 40) markup accent, dimension-line/
     annotation motif, ledger rows. Bricolage Grotesque / Geist / Geist Mono.
  2. **Ink & Margin** — hue-25 warm-gray paper (whisper chroma, not beige), oxblood accent,
     Tufte margin notes, numbered TOC. Newsreader / Instrument Sans / JetBrains Mono.
  3. **Night Shift** — dark-first (hue-265 slate, elevation by lightness), ember accent
     (hue 60), theme toggle as the day/night narrative. Clash Display (Fontshare) / Geist.
  Avatars: one master SVG bust geometry redrawn from `temp/me/` photos (receded temples,
  forehead curl, thick brows, full beard, broad smile, crew-neck), rendered 4 ways in
  `design/comps/avatars.html` (flat / mono-line / duotone print / sticker), themeable via
  CSS vars, shown under all 3 palettes both themes. Gotchas: duotone must keep theme-invariant
  ink+paper (dark mode turned his hair white before the fix); the mono-line treatment needs
  low-opacity mass fills or he reads bald. NEXT: owner picks direction + avatar treatment,
  then implementation starts (tokens, fonts, theming, motion, shell, colophon skeleton) and
  the chosen avatar gets a likeness pass against the photos.
- **2026-07-06 (Phase 2, session 2, evening)** — Owner picked Direction 1 "Annotated" and
  avatar treatment D "Sticker"; refined Flat vs Sticker finalists built in
  `design/comps/avatar-final.html` (v2 bust geometry in `#g-bust-v2`), committed as 18d309a.
  Owner: v2 portrait "doesn't look like me at all" — likeness NOT locked. Planned v3 changes
  from re-studying `temp/me/` photos (IMG_4191 he is on the right; IMG_3290 best smile ref):
  face wider and rounder; hairline higher with clearly receded temples, hair shorter on top;
  eyes smaller and deeper-set with faint under-eye lines; brows straighter, thicker, closer
  to the eyes; nose broader at the base; mustache more prominent (thick, covers more of the
  upper lip); beard wider at the jaw with full chin and sideburns visibly connecting hair to
  beard. Keep: forehead curl, crown curl texture, warm broad smile with teeth, navy
  crew-neck. Session ended on a macOS xattr file-lock blocker (caused by running `open` on
  repo files — see working agreements); owner rebooted, lock confirmed cleared next session.
- **2026-07-06 (Phase 2, session 3, post-reboot)** — Reboot cleared the file lock (residual
  `com.apple.provenance` xattr is SIP-protected but harmless; writes work). Addendum merged
  into this file and deleted. Avatar v3 applied to `design/comps/avatar-final.html`
  (`#g-bust-v3`, both symbols + sticker die-cut updated): all planned likeness changes above,
  screenshot-verified against `temp/me/preview/` photos over three iterations (gotchas:
  hairline scallop notches read as dangling curls, then as sprouts at the recession corners —
  a clean M-recession path with curl texture arcs above works best). Owner verdict on v3:
  WORSE — "my head isn't oval." v4 rebuilt (`#g-bust-v4`) from **IMG_3290 Copy.JPG as the
  ONLY reference** (owner instruction): flat-ish crown with loose asymmetric curl-clump
  circles breaking the top silhouette, very short faded sides so head sides run nearly
  vertical, wide cheeks, boxy jaw-wide beard with full squared chin (lower face almost as
  wide as temples), broader shoulders with raglan seams, thicker neck, smaller ears, eyes
  narrowed by the smile; sticker die-cut reshaped to match. Owner verdict on v4: still
  oval, hair must be BLACK, and drop the photo-derived approach entirely — redraw with the
  ORIGINAL avatar art as the only guide. v5 done: originals recovered from git
  (`git show fa16697^:public/icons/avatar_*_embedded_v2.svg` — they are PNG rasters wrapped
  in SVG — kept in gitignored `temp/original-avatar/`). v5 (`#g-bust-v5`) recreates the
  original's construction as clean vectors: flat emoji style, hair+beard as one continuous
  near-circular black frame (even-odd cutout for the face), chunky scalloped curl crown,
  simple black oval eyes (no whites), bold low tapered brows, tiny crescent nose, closed
  warm smile on a skin patch inside the beard (NO teeth), no shading. Palette updated:
  hair/beard/brows/eyes black #17130E, skin warm tan #E9A868 / #C87E3F to match the
  original art. Owner iterations on v5: compact mouth cluster (v5.1, fixed a "muzzle"
  read), hair/beard separated with temple fade gap (v5.2), ears fixed (v5.3) then removed
  entirely (v5.4). Owner APPROVED v5.4 and switched treatment pick from Sticker to FLAT.
  Avatar likeness is DONE (decisions log #8-9). NEXT: foundation implementation (see
  Phase 2 status above), which includes the mechanical avatar export (standalone optimized
  SVG on the semantic tokens, delete interim `public/icons/avatar.webp`).
- **2026-07-07 (Phase 2, session 4: foundation)** — Foundation built on
  `feature/phase-2-foundation`:
  - `globals.css` rewritten: Annotated three-layer OKLCH tokens (primitive/semantic/
    component), Tailwind 4 `@theme inline` mapping (`bg-bg`, `text-fg`, `border-line`,
    `text-accent-ink`, `ease-out-quint`, `text-display`/`text-title` fluid sizes),
    class-based dark via `@custom-variant`, base styles (focus ring, `.annotation` mono
    label, reduced-motion collapse, media-gated smooth scroll). LEGACY forest-palette
    utilities kept in a marked block so un-rebuilt pages render; delete per page in
    Phases 3-5.
  - Fonts: Bricolage Grotesque (display, `--font-bricolage`, opsz axis) + Geist + Geist
    Mono via next/font, all self-hosted. h1-h3 default to Bricolage.
  - Theming: pre-paint inline script in `layout.tsx` head (localStorage `theme`, falls
    back to OS), `suppressHydrationWarning` on html, `ThemeToggle.tsx` (CSS-swapped
    moon/sun, hydration-safe, persists choice).
  - Shell: `Navigation.tsx` rebuilt (sticky, blur, mono `AP/andrew-persad` brand,
    lowercase links incl. colophon, accent scaleX underline + `aria-current`, accessible
    mobile menu with aria-expanded/controls, 44px targets). `Footer.tsx` rebuilt on
    tokens (keeps GitHub/LinkedIn + "Built with Next.js" for tests, adds colophon link).
  - `/colophon` skeleton page (stack/type/color/motion/budgets sections, fig. labels).
    Added to sitemap.
  - Avatar: `src/components/Avatar.tsx` = locked v5.4 Flat geometry verbatim, themed only
    via `--av-*` component tokens (light/dark shirt + bg variants in globals). Home hero
    swapped to it; `public/icons/avatar.webp` DELETED. Do not edit paths.
  - Removed: CoreWebVitals.tsx, PerformanceMonitor.tsx, lib/performance.ts,
    `trackCoreWebVitals` from analytics.ts.
  - GOTCHA (a11y): comp's `--accent-ink` (signal-600) is only 3.77:1 on light paper at
    14px; text needs a darker step. Added `--signal-650: oklch(0.54 0.17 40)` and pointed
    light `--accent-ink` at it (4.8:1 on surface, 5.2:1 on bg); `--accent` stays
    signal-600 for graphics (3:1 non-text passes). Comp updated to match. Dark accent-ink
    passes as-is (7.7:1+). Contrast math helper: `temp/contrast.mjs` (gitignored).
  - Tests: added colophon axe test, dark-mode shell + colophon axe tests, theme-toggle
    persistence test. Dark-mode homepage scan is scoped to header/footer until page
    bodies are rebuilt (legacy translucent light sections fail over the dark body);
    widen per page in Phases 3-5.
  - Verified: lint, type-check, build green; screenshots at 360/768/1280 light+dark in
    `temp/comp-shots/foundation/` (gitignored); chromium suite 30/30 green; full
    cross-browser suite run before push.
  NEXT: Phase 3 (core pages: home, about with experience timeline, work index, contact,
  resume; all copy rewritten per voice rules). Consider the Next.js 16 upgrade at Phase 3
  kickoff (target stack in working agreements; not done in Phase 2 to keep the PR scoped).
