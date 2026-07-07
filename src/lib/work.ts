/**
 * Curated work index (Phase 3).
 * Source of facts: promptFiles/repo-audit-2026-06-10.md (verified by code audit)
 * and you-hungry/docs/portfolio-story.md (Fork In The Road numbers).
 * Voice rules: specific, first-person, outcome-led, zero buzzwords, no em dashes.
 * Entries with a `study` have a full written case study at /work/[slug]
 * (MDX body in src/content/work/<slug>.mdx, registered in the route).
 */

export interface CaseStudy {
  /** Outcome-stating headline for the study page (not the product name). */
  headline: string;
  /**
   * The 30-second version: what the product is, what forced the work,
   * the constraint. Three sentences, rendered as the study lede.
   */
  context: string;
  role: string;
  timeline: string;
  status: string;
  /** ISO dates for the Article schema. */
  published: string;
  updated?: string;
  /** Meta description for the study page. */
  description: string;
}

export interface WorkEntry {
  /** /work/[slug] case-study route (live once `study` is set). */
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
  /** Full written case study; absent until the study ships (Phases 4-5). */
  study?: CaseStudy;
}

export const featuredWork: WorkEntry[] = [
  {
    slug: 'fork-in-the-road',
    title: 'Fork In The Road',
    flagship: true,
    summary:
      'A group decision app that ends the "where should we eat" spiral. One link, everyone votes, no accounts required: guest identity is an HMAC-signed cookie holding zero personal data, and live results stream over Server-Sent Events.',
    detail:
      'The v2 rewrite deleted six of every seven lines, including whole subsystems that worked but were not the product, and runs with zero cron jobs: deadlines are enforced lazily on every read.',
    metric: '113k → 20k LOC',
    metricLabel: 'lines of code, version one to version two',
    stack: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Clerk', 'SSE'],
    links: {
      live: 'https://www.forkintheroad.app',
      repo: 'https://github.com/akpersad/YouHungry',
    },
    study: {
      headline: 'Rebuilding Fork In The Road: 113,000 lines became 20,000 that do more',
      context:
        'Fork In The Road ends the "where should we eat" spiral: one link, everyone votes, live results, no accounts required. Version one did all of that and had grown the way side projects grow, to roughly 113,000 lines, 77 API routes, and 27 runtime dependencies, with a notification stack across four channels and a homegrown observability platform nobody asked for. The brief for version two was a full product re-imagination: find the one sentence the product actually is, delete everything that does not serve it, and let strangers vote securely on an unauthenticated write surface.',
      role: 'Solo: product, design, build, ship',
      timeline: '9 phases, one PR each, July 2026',
      status: 'Live at forkintheroad.app',
      published: '2026-07-07',
      description:
        'How a 113k-line restaurant decision app became a 20k-line product that does more: HMAC-signed guest voting, zero cron jobs, and a migration that reused v1 ids. Five named decisions with the tradeoffs taken.',
    },
  },
  {
    slug: 'overlapp',
    title: 'overlapp',
    summary:
      'Group scheduling that finds when everyone is actually free. Members sync their real calendars or add recurring blocks by hand, and the group gets a live availability heatmap with proposals and quorum voting.',
    detail:
      'Recurrence expansion is hand-written plpgsql running inside Postgres, and privacy is enforced at the database layer: the group sees that you are busy, never why.',
    metric: '2 built · 1 live',
    metricLabel:
      'calendar providers behind one adapter seam: Google shipped, Microsoft complete but flag-gated',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Postgres RLS'],
    links: {
      live: 'https://overlapp-psi.vercel.app',
      repo: 'https://github.com/akpersad/overlapp',
    },
    study: {
      headline:
        'Building overlapp: the "when are you free?" question, answered by Postgres',
      context:
        'overlapp replaces the one-off scheduling poll with a persistent shared calendar: each member\'s availability lives continuously, assembled from synced calendars and hand-entered recurring blocks, so a group sees overlapping free time without anyone asking. It went from empty repo to live product in eleven days, spec first: the data model and the privacy rule were written down before the first migration. The hard constraint was that a group calendar is a privacy problem wearing a convenience costume, so the "members learn when you are busy, never why" rule is enforced in the database, not in the UI.',
      role: 'Solo: product, design, build, ship',
      timeline: '11 days, spec first, June 2026',
      status: 'Live at overlapp-psi.vercel.app',
      published: '2026-07-07',
      description:
        'How overlapp answers "when is everyone free?" with a hand-written plpgsql recurrence expander, database-enforced privacy, and one calendar-sync seam for two OAuth providers. Five named decisions with the tradeoffs taken.',
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
    accessNote: 'Household app behind a passphrase; the study carries screenshots.',
    study: {
      headline:
        'Building pawscriptions: a med tracker that can never double-remind',
      context:
        'pawscriptions tracks a dog\'s medications for a two-person household: define meds and schedules, log or skip each dose, forecast the supply, and get push reminders in the right timezone. The v1 core went from empty repo to running in two days, and the data model it shipped with survived two later feature waves without a single new table. The hard problem is small but sharp: an external scheduler hits the reminder endpoint every minute, runs can overlap or retry, and a double reminder risks a double-dosed dog, so deduplication has to be guaranteed by construction.',
      role: 'Solo: product, design, build, ship',
      timeline: '2 days to v1, two feature waves, June 2026',
      status: 'Live, behind the household passphrase',
      published: '2026-07-07',
      description:
        'How pawscriptions makes concurrent reminder runs safe by construction: claim-first inserts against a unique constraint, supply as a derived number, and on-device OCR. Five named decisions with the tradeoffs taken.',
    },
  },
  {
    slug: 'protein-checker',
    title: 'ProteinChecker',
    crossPlatform: true,
    summary:
      'One nutrition calculator, built twice: a native SwiftUI iOS app and a React web port with a written feature-parity matrix. Quality-adjusted protein math (DIAAS and PDCAAS), a 75-source database on the web, and calculation history on both platforms.',
    detail:
      'The same product logic expressed in two idioms: React Context and custom hooks on the web, SwiftUI views over a UserDefaults store on iOS, down to the same storage key and the same 100-item history cap.',
    metric: 'web + iOS',
    metricLabel: 'platforms built from one product spec',
    stack: ['Next.js', 'TypeScript', 'Swift', 'SwiftUI', 'Tailwind'],
    links: {
      live: 'https://protein-checker-web.vercel.app',
      repo: 'https://github.com/akpersad/ProteinCheckerWeb',
      repoIOS: 'https://github.com/akpersad/ProteinCheckerSwift',
    },
    study: {
      headline:
        'Porting ProteinChecker: one line of math, kept honest across platforms',
      context:
        'ProteinChecker multiplies the protein grams on a label by the source\'s digestibility score (DIAAS or PDCAAS), because 30 grams of collagen is not 30 grams of whey. The algorithm fits in a sentence; the project is really about what happens when one small product is built three times, as a React Native prototype in May, a native SwiftUI app in June, and a Next.js web port in September. The port shipped with a written parity matrix instead of a shared codebase, which worked, then quietly stopped being true the day the web version pulled ahead.',
      role: 'Solo: product, design, build, ship',
      timeline: 'May to September 2025, three builds',
      status: 'Web live; iOS runs from Xcode',
      published: '2026-07-07',
      description:
        'ProteinChecker is a protein-quality calculator built three times: React Native, SwiftUI, and a Next.js port with a written parity matrix. An honest study of hand-maintained cross-platform parity, where it held, and exactly how it drifted.',
    },
  },
];

/** Entries whose written case study is live (drives routes, sitemap, index links). */
export const studyEntries = featuredWork.filter(
  (entry): entry is WorkEntry & { study: CaseStudy } => Boolean(entry.study)
);

/** The rows the home page features (matches the approved comp: flagship + two). */
export const homeFeatured = featuredWork.filter(e =>
  ['fork-in-the-road', 'overlapp', 'persadpay'].includes(e.slug)
);
