# GitHub Repo Audit for Portfolio Selection

**Date:** June 10, 2026
**Scope:** All 92 repos under [github.com/akpersad](https://github.com/akpersad?tab=repositories), filtered to the 17 original (non-fork) repos with activity in the past 5 years.
**Method:** 17 independent audit agents each cloned one repo, read the source code (not just the README), verified claimed deployments with live HTTP checks, counted tests/CI, and scored against a fixed rubric. A calibration judge then compared evidence across all 17 scorecards and corrected cross-scorer inconsistencies (only 2 adjustments were needed).

---

## The Rubric

Each dimension scored 1–10 with strict anchors. Lens: a hiring manager or senior engineer screening a candidate.

| Dimension | Weight | What it measures | Anchors |
|---|---|---|---|
| **Technical depth** | 25% | Complexity of problems actually solved | 2 = static/tutorial · 4 = simple CRUD or single API · 6 = multiple integrated systems done competently · 8 = hard problems (real-time, payments, native+web, perf) · 10 = senior-impressive |
| **Code quality** | 25% | What a code reviewer would think | 2 = messy · 4 = works but loose types, no tests · 6 = clean, typed, linted · 8 = real tests + CI + error handling · 10 = exemplary |
| **Polish** | 20% | Completeness as a clickable product | 2 = broken · 4 = rough, no README · 6 = deployed, decent UX/README · 8 = loading/empty/error states, responsive, a11y, screenshots · 10 = commercial-grade |
| **Stack relevance** | 15% | Matches what employers hire for in 2026 | 2 = obsolete (jQuery, CRA, class components) · 5 = relevant but dated · 7 = modern mainstream (Next.js App Router, TS, Tailwind) · 9–10 = modern + breadth (native, AI, payments, infra) |
| **Story** | 15% | Interview talking points | 2 = tutorial clone · 5 = fun personal project · 7 = real problem, product thinking · 9–10 = real users, end-to-end ownership |

Scores were assigned from evidence in the code, with specific files cited — not from README claims.

---

## Final Ranking (calibrated, weighted /10)

| # | Repo | Depth | Quality | Polish | Stack | Story | **Total** | Live? |
|---|---|---|---|---|---|---|---|---|
| 1 | **overlapp** | 8 | 7 | 7 | 8 | 7 | **7.40** | ✅ |
| 2 | **YouHungry** | 7 | 8 | 7 | 8 | 7 | **7.40** | ✅ |
| 3 | **PersadPay** | 7 | 7 | 7 | 7 | 8 | **7.15** | ✅ |
| 4 | **pawscriptions** | 6 | 6 | 7 | 7 | 7 | **6.50** | ✅ |
| 5 | ProteinCheckerWeb | 3¹ | 6 | 6 | 7 | 6 | **5.40** | ✅ |
| 6 | TCG-Demo | 5 | 4 | 4 | 7 | 5 | **4.85** | ❌ 404 |
| 7 | ProteinChecker (RN) | 3 | 5 | 5 | 6 | 6 | **4.80** | ❌ |
| 8 | ProteinCheckerSwift | 3 | 5 | 4 | 6 | 5 | **4.45** | ❌ |
| 9 | PokeCollectorSwift | 4 | 4 | 3 | 7 | 4 | **4.25** | ❌ |
| 10 | calculator | 2 | 3 | 4 | 6 | 2 | **3.25** | ✅ |
| 11 | DungeonCrawler | 3 | 4 | 2 | 2 | 3 | **2.90** | ❌ |
| 12 | Pokedex | 3 | 3 | 3 | 2 | 3 | **2.85** | ❌ 404 |
| 13 | React-Starter | 2 | 4 | 3 | 2 | 3 | **2.85** | ❌ |
| 14 | johda | 4¹ | 2 | 2 | 2 | 3 | **2.65** | ❌ 404 |
| 15 | StayIn | 2 | 3 | 2 | 2 | 2 | **2.25** | ❌ |
| 16 | wedding-website | 2 | 3 | 2 | 2 | 2 | **2.25** | ❌ |
| 17 | wedding | 2 | 2 | 2 | 2 | 1 | **1.85** | ❌ |

¹ Calibration adjustments: ProteinCheckerWeb depth 4→3 (same algorithm/depth profile as its iOS and RN siblings, which both scored 3); johda depth 3→4 (API integration + DB CRUD + session auth is the rubric's literal anchor-4, and it was mis-ordered below pure client-side calculators — its poor execution is already punished in code quality).

---

## Recommendation

### Feature these four

**1. overlapp (7.40) — the strongest engineering signal**
Group-scheduling PWA: members connect Google/Microsoft calendars or add manual recurring blocks; the app renders a real-time group availability heatmap with proposals and quorum voting. Next.js 16, React 19, TS 5, Tailwind 4, Supabase, ~14.8k LOC, 27 test files.
- Dual OAuth calendar sync behind a provider-adapter seam, handling Google vs Microsoft token-rotation differences (`src/lib/calendar/sync.ts`)
- Hand-written RRULE recurrence expander in plpgsql with bounded iteration and timezone pinning — rare SQL depth for a frontend-stack project
- Privacy enforced at the DB layer: members see *that* you're busy, never *why* (SECURITY DEFINER RPCs strip labels)
- Real integration tests exercising actual Postgres RPCs through the RLS client path with multi-user scenarios (2,165 lines in `tests/integration/`)

**2. YouHungry / Fork In The Road (7.40) — the strongest process signal**
Restaurant decision PWA with weighted-random and tiered group-voting engines. Next.js 15, React 19, TS, MongoDB, Clerk, ~113k LOC, 133 test files.
- The **only repo with CI**: PR-fast + nightly-comprehensive lanes, Lighthouse CI, axe accessibility testing, husky pre-push gate
- 900-line decision engine with 30-day rolling weight decay and consensus logic, unit-tested at the edges (`src/lib/decisions.ts`)
- Production-grade extras: circuit breaker, API usage tracking, multi-channel notifications (in-app/email/SMS/push), admin panel

**3. PersadPay (7.15) — the strongest story**
Private household-payroll app running **real payroll with real compliance consequences** (W-2/W-3 generation, NYS-45 quarterly filings). Next.js 16, Supabase with RLS + mandatory TOTP MFA, ~16k LOC, live at persadpay.com.
- Statutory tax engine citing IRS Pub 926 / NY DOL rules inline, handling wage-base caps and IEEE-754 rounding (`src/lib/tax.ts`)
- 33 unit tests asserting exact dollar amounts against 2026 federal/NY rates, including YTD cap-crossing scenarios
- Role enforcement at three layers: RLS, middleware MFA AAL checks, per-route role checks; 23 ordered migrations

**4. pawscriptions (6.50) — small but cleanly built**
Pet-medication tracking PWA with timezone-aware push reminders and on-device OCR label scanning. Next.js 16, Supabase, ~3.7k LOC.
- Race-safe notification dedup: claim-first inserts against a DB unique constraint so concurrent cron runs can never double-notify — a concurrency pattern most side projects get wrong
- Deliberate security model: dedicated Postgres schema, RLS-deny-all, service-role-only server access, signed httpOnly JWT cookie
- Zero `any` across the entire codebase; privacy-first OCR (Tesseract.js runs client-side; photos never upload)

### Optional fifth: ProteinChecker (web + iOS)

Scores mid (5.40 web / 4.45 Swift) because it's a client-only calculator — but it's the only **cross-platform story**: a faithful Next.js port of your own native SwiftUI app with a documented feature-parity matrix. Worth keeping as a breadth signal if the portfolio has room.

### Remove or fix: TCG-Demo (currently featured)

- Live demo URL returns **404 DEPLOYMENT_NOT_FOUND** — a broken link is worse than no project
- Security holes a reviewer would catch: `/api(.*)` made public in `src/middleware.ts`, collection write endpoints never verify ownership, TCG API key exposed client-side via `NEXT_PUBLIC`
- Zero tests, per-query MongoDB connections without pooling, debug `console.log`s in production code

### Leave out: everything from 2020 and earlier

Pokedex, DungeonCrawler, StayIn, React-Starter, wedding, wedding-website, johda, calculator. Uniformly dated stacks (React 16 class components, webpack 4, jQuery), nothing deployed, several misnamed or abandoned at scaffold stage. They would actively dilute the signal of the top four.

---

## Pre-Publication Fix List (highest impact first)

1. **🔴 PokeCollectorSwift: live API key committed in a public repo** (`PokemonTCGService.swift:12`, README, DEVELOPMENT_LOG.md). Rotate the key immediately, regardless of portfolio decisions.
2. **YouHungry README demo GIF is still a placeholder** — the note "Create a demo GIF showing the core flow" is visible on your best repo. Also remove the unauthenticated debug endpoint (`src/app/api/debug/push-notifications/route.ts`).
3. **PersadPay and pawscriptions are login/passphrase-gated** — reviewers can't click through. Add screenshots/demo video to the READMEs, or a read-only demo account for PersadPay.
4. **Add CI to overlapp and PersadPay** — both have real test suites that nothing enforces. One workflow file each moves their code-quality story from 7 toward 8.
5. **overlapp README is stale** — says "Phase 1 in progress," omits the live URL, no screenshots.
6. **AI-tooling artifacts are committed across all four finalists** (`CLAUDE.md`, `AGENTS.md`, `.mcp.json`, `skills-lock.json`), and overlapp/pawscriptions shipped in 2–4 days. Screeners will notice and probe in interviews. Consider gitignoring the artifacts; more importantly, be ready to discuss the RLS model, the notification-dedup pattern, and the tax-engine edge cases in depth — the audits confirmed the substance exists to back it up.
7. **TCG-Demo**: redeploy + fix the middleware/ownership holes, or remove it from the portfolio.

---

## Audit Notes

- **Coverage:** 17/17 candidate repos cloned and audited; all claimed deployment URLs verified by HTTP check. 18 agents, ~183 tool calls, ~532k tokens.
- **Calibration:** Cross-scorer consistency was high; only 2 of 85 dimension scores needed adjustment (both on technical depth, both ±1).
- **Excluded:** 75 repos that are forks (bootcamp exercises, boilerplates, samples) or had no activity in the past 5 years. PersonalPortfolio (this repo) was excluded as the portfolio itself.
