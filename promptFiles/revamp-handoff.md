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
- [~] **Phase 2 — Design direction + foundation.** Comps DONE, awaiting owner pick (see
      `design/comps/index.html`): 3 directions (Annotated / Ink & Margin / Night Shift) +
      4 avatar treatments (flat / mono-line / duotone / sticker). After the pick: implement
      tokens/fonts/theming/motion primitives/shell + avatar likeness-refinement pass.
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
   hair, full beard, warm smile, brown skin. (In IMG_4191.jpeg he is the man on the right.)
   HEIC files may need `sips -s format jpeg` conversion before tools can read them.

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
