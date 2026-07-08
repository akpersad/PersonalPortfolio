/**
 * Notes: essays harvested from real work (Phase 6).
 * Same architecture as the case studies: typed metadata here, MDX bodies in
 * src/content/notes/<slug>.mdx, registered in /notes/[slug]/page.tsx.
 * Voice rules apply: specific, first-person, outcome-led, no em dashes.
 */

export interface Note {
  /** /notes/[slug] route; slug appears in the body map in the route file. */
  slug: string;
  title: string;
  /** One-sentence dek: index line and meta description. */
  dek: string;
  /** ISO date for the Article schema and the index. */
  published: string;
  updated?: string;
  readingMinutes: number;
}

export const notes: Note[] = [
  {
    slug: 'deleting-93000-lines',
    title: 'Deleting 93,000 lines',
    dek: 'The hardest part of my best rewrite was not the code I wrote, it was the working code I threw away, and the one-sentence test that decided what died.',
    published: '2026-07-07',
    readingMinutes: 5,
  },
  {
    slug: 'real-time-without-cron',
    title: 'Real-time without a cron job',
    dek: 'Deadlines need enforcing and cron jobs fail silently, so my group decision app has none: expiry is checked on every read, and the live stream doubles as the timer.',
    published: '2026-07-07',
    readingMinutes: 4,
  },
  {
    slug: 'oklch-tokens-in-ci',
    title: 'An OKLCH token pipeline that catches contrast bugs in CI',
    dek: 'Every color pair was verified numerically before it became a token, and the accessibility scan still caught a 1.3 to 1 contrast bug. Both checks stay, because they fail differently.',
    published: '2026-07-07',
    readingMinutes: 5,
  },
];
