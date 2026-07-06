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

- [x] **Phase 0 — Plan.** Branch `feature/revamp-plan`, pushed. PR by owner.
- [ ] **Phase 1 — Credibility hotfix.** Remove sr-only keyword stuffing + ghost Cosmic Recipe
      content; fix fabricated schema (fake university/email/SearchAction/static dates);
      consolidate domain to andrewpersad.com; standardize title to Lead Software Engineer;
      remove education section; replace 1.7 MB avatar asset (≤30 KB export), delete 2.6 MB twin;
      fix contact route rate-limit bug (seeds count 5 vs cap 3, in-memory store).
- [ ] **Phase 2 — Design direction + foundation.** 2-3 rendered direction comps + 3-4 avatar
      treatments, OWNER PICKS. Then tokens/fonts/theming/motion primitives/shell.
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
