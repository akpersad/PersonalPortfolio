import type { Metadata } from 'next';
import { featuredWork } from '@/lib/work';
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
          I design, build, run, and answer for myself. Full written case
          studies are on the way; until then, every entry links to the running
          product and its code.
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
              className="grid gap-4 border-t border-line py-10 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-x-8"
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
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-fg-muted">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6">
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
        <div className="border-t border-line-strong pb-24 pt-4">
          <p className="annotation">
            End of index. Written studies and a shelf of small hacks join this
            page as they ship.
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
