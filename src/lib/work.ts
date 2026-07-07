/**
 * Curated work index (Phase 3).
 * Source of facts: promptFiles/repo-audit-2026-06-10.md (verified by code audit)
 * and you-hungry/docs/portfolio-story.md (Fork In The Road numbers).
 * Voice rules: specific, first-person, outcome-led, zero buzzwords, no em dashes.
 * Full case-study pages arrive with the MDX engine (Phases 4-5); until then,
 * entries link to the live product and the repo only.
 */

export interface WorkEntry {
  /** Future /work/[slug] case-study route (Phase 4-5). */
  slug: string;
  title: string;
  flagship?: boolean;
  crossPlatform?: boolean;
  /** What it is and the hardest problem in it. One or two sentences. */
  summary: string;
  /** The sharpest single fact, for the second ledger column. */
  detail: string;
  /** Mono ledger metric, e.g. "113k -> 20k LOC". Rendered with tabular-nums. */
  metric: string;
  /** Plain-language label for the metric, used for screen-reader context. */
  metricLabel: string;
  stack: string[];
  links: {
    live?: string;
    repo?: string;
    repoIOS?: string;
  };
  /** Honest note when the live product is access-gated. */
  accessNote?: string;
}

export const featuredWork: WorkEntry[] = [
  {
    slug: 'fork-in-the-road',
    title: 'Fork In The Road',
    flagship: true,
    summary:
      'A group decision app that ends the "where should we eat" spiral. One link, everyone votes, no accounts required: guest identity is an HMAC-signed cookie holding zero personal data, and live results stream over Server-Sent Events.',
    detail:
      'The v2 rewrite kept every shipped feature, deleted six of every seven lines, and runs with zero cron jobs: deadlines are enforced lazily on every read.',
    metric: '113k → 20k LOC',
    metricLabel: 'lines of code, version one to version two',
    stack: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Clerk', 'SSE'],
    links: {
      live: 'https://www.forkintheroad.app',
      repo: 'https://github.com/akpersad/YouHungry',
    },
  },
  {
    slug: 'overlapp',
    title: 'overlapp',
    summary:
      'Group scheduling that finds when everyone is actually free. Members connect Google or Microsoft calendars, or add recurring blocks by hand, and the group gets a live availability heatmap with proposals and quorum voting.',
    detail:
      'Recurrence expansion is hand-written plpgsql running inside Postgres, and privacy is enforced at the database layer: the group sees that you are busy, never why.',
    metric: '2 OAuth providers',
    metricLabel: 'calendar providers synced through one adapter seam',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Postgres RLS'],
    links: {
      live: 'https://overlapp-psi.vercel.app',
      repo: 'https://github.com/akpersad/overlapp',
    },
  },
  {
    slug: 'persadpay',
    title: 'PersadPay',
    summary:
      'Household payroll with real compliance consequences: statutory tax math, W-2 and W-3 generation, and NYS-45 quarterly filings for an actual household employee.',
    detail:
      'The tax engine cites IRS Publication 926 and NY DOL rules inline, and unit tests assert exact dollar amounts, including the scenarios where year-to-date wages cross a cap mid-payment.',
    metric: '$0.00 variance',
    metricLabel: 'allowed difference between computed and statutory tax',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Postgres RLS', 'TOTP MFA'],
    links: {
      live: 'https://persadpay.com',
      repo: 'https://github.com/akpersad/PersadPay',
    },
    accessNote: 'Runs my family’s actual payroll, so accounts are private.',
  },
  {
    slug: 'pawscriptions',
    title: 'pawscriptions',
    summary:
      'Pet medication tracking with timezone-aware push reminders and label scanning that never uploads a photo: OCR runs entirely on the device.',
    detail:
      'Concurrent reminder runs can never double-notify. Claim-first inserts against a database unique constraint make the dedup race-safe by construction, not by luck.',
    metric: '0 duplicate sends',
    metricLabel: 'duplicate reminders possible under concurrent runs',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Web Push', 'Tesseract.js'],
    links: {
      live: 'https://pawscriptions.vercel.app',
      repo: 'https://github.com/akpersad/pawscriptions',
    },
    accessNote: 'Household app behind a passphrase; the study will carry screenshots.',
  },
  {
    slug: 'protein-checker',
    title: 'ProteinChecker',
    crossPlatform: true,
    summary:
      'One nutrition calculator, shipped twice: a React web app and a native SwiftUI iOS app with documented feature parity. Quality-adjusted protein math (DIAAS and PDCAAS) across 50+ sources, with history on both platforms.',
    detail:
      'The same product logic expressed in two idioms: React Context and custom hooks on the web, MVVM with Core Data on iOS.',
    metric: 'web + iOS',
    metricLabel: 'platforms shipped from one product spec',
    stack: ['Next.js', 'TypeScript', 'Swift', 'SwiftUI', 'Core Data'],
    links: {
      live: 'https://protein-checker-web.vercel.app',
      repo: 'https://github.com/akpersad/ProteinCheckerWeb',
      repoIOS: 'https://github.com/akpersad/ProteinCheckerSwift',
    },
  },
];

/** The rows the home page features (matches the approved comp: flagship + two). */
export const homeFeatured = featuredWork.filter(e =>
  ['fork-in-the-road', 'overlapp', 'persadpay'].includes(e.slug)
);
