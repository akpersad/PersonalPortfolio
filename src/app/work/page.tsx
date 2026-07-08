import type { Metadata } from 'next';
import Link from 'next/link';
import { featuredWork, shelf } from '@/lib/work';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Work | Andrew Persad',
  description:
    'Five self-built products, all shipped and live: a group decision app rebuilt at one sixth its size, a calendar overlap finder, a real payroll engine, a pet medication tracker, and a cross-platform nutrition calculator.',
  openGraph: {
    title: 'Work | Andrew Persad',
    description:
      'Five self-built products, all shipped and live. Every entry links to the running product and its code.',
    type: 'website',
    url: 'https://andrewpersad.com/work',
    // Child openGraph replaces the root layout's, so restate the card.
    images: ['https://andrewpersad.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://andrewpersad.com/work',
  },
};

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-1 font-mono text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
    >
      {children}
      <span aria-hidden="true">&#8599;</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Work() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          Selected work
        </p>
        <h1 className="mt-6 max-w-[16ch] text-display font-semibold text-fg">
          Five products, all live.
        </h1>
        <p className="mt-8 max-w-[58ch] text-lg text-fg-muted">
          A curated index, not a wall of cards. Each of these is a real product
          I design, build, run, and answer for myself. Every entry carries a
          full written study, the decisions, the tradeoffs taken, and the
          numbers, and links to the running product and its code.
        </p>
      </section>

      <section aria-label="Product index">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 className="text-xl font-semibold text-fg">The index</h2>
          <span className="annotation">05 entries, newest thinking first</span>
        </div>
        <ol className="mt-4">
          {featuredWork.map((entry, index) => (
            <li
              key={entry.slug}
              className="ledger-row reveal grid gap-4 border-t border-line py-10 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-x-8"
            >
              <div>
                <p className="annotation">
                  {String(index + 1).padStart(2, '0')}
                  {entry.flagship && ' / flagship'}
                  {entry.crossPlatform && ' / web + iOS'}
                </p>
                <h3
                  className={`mt-2 font-semibold text-fg ${
                    entry.flagship ? 'text-title' : 'text-2xl'
                  }`}
                >
                  {entry.study ? (
                    <Link
                      href={`/work/${entry.slug}`}
                      className="hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
                    >
                      {entry.title}
                    </Link>
                  ) : (
                    entry.title
                  )}
                </h3>
                <p className="mt-3 max-w-[52ch] text-fg-muted">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6">
                  {entry.study && (
                    <Link
                      href={`/work/${entry.slug}`}
                      className="inline-flex min-h-11 items-center gap-1 font-mono text-sm text-accent-ink hover:text-fg motion-safe:transition-colors motion-safe:duration-150"
                    >
                      read the study <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                  {entry.links.live && (
                    <ExternalLink href={entry.links.live}>
                      live site
                    </ExternalLink>
                  )}
                  {entry.links.repo && (
                    <ExternalLink href={entry.links.repo}>
                      {entry.links.repoIOS ? 'code (web)' : 'code'}
                    </ExternalLink>
                  )}
                  {entry.links.repoIOS && (
                    <ExternalLink href={entry.links.repoIOS}>
                      code (iOS)
                    </ExternalLink>
                  )}
                </div>
                {entry.accessNote && (
                  <p className="mt-2 text-sm text-fg-muted">
                    {entry.accessNote}
                  </p>
                )}
              </div>
              <div className="md:pt-7">
                <span className="font-mono text-sm tabular-nums text-fg">
                  {entry.metric}
                </span>
                <span className="sr-only">, {entry.metricLabel}.</span>
                <p className="mt-3 max-w-[44ch] text-sm text-fg-muted">
                  {entry.detail}
                </p>
                <p className="annotation mt-4 normal-case">
                  {entry.stack.join(' · ')}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="The shelf" className="pb-24">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 className="text-xl font-semibold text-fg">The shelf</h2>
          <span className="annotation">
            small hacks, one line each, no studies
          </span>
        </div>
        <ul className="mt-4">
          {shelf.map(item => (
            <li
              key={item.title}
              className="ledger-row reveal grid gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-x-8"
            >
              <div>
                <h3 className="font-mono text-sm font-semibold text-fg">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[62ch] text-sm text-fg-muted">
                  {item.line}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-x-6 md:justify-end">
                {item.links?.live && (
                  <ExternalLink href={item.links.live}>live</ExternalLink>
                )}
                {item.links?.repo && (
                  <ExternalLink href={item.links.repo}>code</ExternalLink>
                )}
                {item.note && (
                  <p className="annotation mt-3 normal-case">{item.note}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-line-strong pt-4">
          <p className="annotation">
            End of the ledger. Small things stay small on purpose.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema('/work')),
        }}
      />
    </div>
  );
}
