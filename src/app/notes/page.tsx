import type { Metadata } from 'next';
import Link from 'next/link';
import { notes } from '@/lib/notes';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Notes | Andrew Persad',
  description:
    'Essays harvested from real work: deleting 93,000 lines, real-time without cron jobs, and an OKLCH token pipeline that catches contrast bugs in CI.',
  openGraph: {
    title: 'Notes | Andrew Persad',
    description:
      'Essays harvested from real work. Quality over cadence: each one exists because the work taught me something specific.',
    type: 'website',
    url: 'https://andrewpersad.com/notes',
  },
  alternates: {
    canonical: 'https://andrewpersad.com/notes',
  },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function Notes() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          Notes
        </p>
        <h1 className="mt-6 max-w-[16ch] text-display font-semibold text-fg">
          Field notes from real work.
        </h1>
        <p className="mt-8 max-w-[58ch] text-lg text-fg-muted">
          Essays, not a content calendar. Each of these exists because a
          project taught me something specific enough to be worth writing
          down. Quality over cadence; the count goes up when the work says
          so.
        </p>
      </section>

      <section aria-label="All notes" className="pb-24">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 className="text-xl font-semibold text-fg">The notes</h2>
          <span className="annotation">
            {String(notes.length).padStart(2, '0')} essays, newest first
          </span>
        </div>
        <ol className="mt-4">
          {notes.map((note, index) => (
            <li
              key={note.slug}
              className="ledger-row reveal border-t border-line py-10"
            >
              <p className="annotation">
                {String(index + 1).padStart(2, '0')} /{' '}
                {formatDate(note.published)} / {note.readingMinutes} min
              </p>
              <h3 className="mt-2 max-w-[30ch] text-2xl font-semibold text-fg">
                <Link
                  href={`/notes/${note.slug}`}
                  className="hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
                >
                  {note.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-[58ch] text-fg-muted">{note.dek}</p>
              <Link
                href={`/notes/${note.slug}`}
                className="mt-4 inline-flex min-h-11 items-center gap-1 font-mono text-sm text-accent-ink hover:text-fg motion-safe:transition-colors motion-safe:duration-150"
              >
                read the note <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="border-t border-line-strong pt-4">
          <p className="annotation">
            End of notes. More when the work earns them.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema('/notes')),
        }}
      />
    </div>
  );
}
