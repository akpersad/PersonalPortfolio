import Link from 'next/link';
import Avatar from '@/components/Avatar';
import { homeFeatured } from '@/lib/work';

const principles = [
  {
    title: 'Deletion is a feature',
    body: 'My favorite number in my favorite project is negative: a 113,000 line app rebuilt as 20,000 lines that do more. Scope discipline is a design tool, not an afterthought.',
  },
  {
    title: 'The unhappy path is the product',
    body: 'Empty, loading, and error states are where software actually lives. They get designed on purpose and tested in CI, in both color modes, instead of being discovered by users.',
  },
  {
    title: 'Measured beats claimed',
    body: 'Accessibility and performance run as build gates, not intentions: axe scans in light and dark, Lighthouse floors, and a bundle monitor. If a change slips, the build fails before anyone sees it.',
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      {/* Hero */}
      <section className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div>
          <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
            Andrew Persad, lead software engineer
          </p>
          <h1 className="mt-6 max-w-[14ch] text-display font-semibold text-fg">
            Built to spec.{' '}
            <span className="relative whitespace-nowrap after:absolute after:inset-x-0 after:bottom-[0.04em] after:h-[0.08em] after:bg-accent">
              Measured
            </span>{' '}
            before it ships.
          </h1>
          <p className="mt-8 max-w-[58ch] text-lg text-fg-muted">
            By day I lead frontend work on platforms serving{' '}
            <strong className="font-semibold text-fg">
              9 million users at HP
            </strong>
            , with prior builds for Eli Lilly and Amazon. At night I design,
            build, and run my own products end to end:{' '}
            <strong className="font-semibold text-fg">
              five shipped and live
            </strong>
            , from a payroll engine tested to exact dollars to a group decision
            app rebuilt at one sixth its original size.
          </p>
          <p className="mt-8 flex items-center gap-3 font-mono text-sm text-fg-muted">
            <span
              className="h-2 w-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            now: lead software engineer, open to lead roles
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/work/fork-in-the-road"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out-quint active:scale-[0.97]"
            >
              Read the flagship rebuild
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-medium text-fg hover:border-accent hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
            >
              About me
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Avatar
            className="w-56 sm:w-64 lg:w-72 xl:w-80"
            title="Illustrated portrait of Andrew Persad, lead software engineer"
          />
          <p className="annotation" aria-hidden="true">
            fig. 01 / portrait, flat treatment
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section aria-labelledby="selected-work">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="selected-work" className="text-xl font-semibold text-fg">
            Selected work
          </h2>
          <span className="annotation">03 of 05 studies</span>
        </div>
        <ul className="mt-4">
          {homeFeatured.map(entry => {
            const rowClass =
              'group grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)_auto] md:items-baseline md:gap-x-8';
            const rowBody = (
              <>
                <div>
                  <h3
                    className={`font-semibold text-fg motion-safe:transition-colors motion-safe:duration-150 group-hover:text-accent-ink ${
                      entry.flagship ? 'text-title' : 'text-2xl'
                    }`}
                  >
                    {entry.title}
                    <span className="sr-only">
                      {entry.study
                        ? ' (written case study)'
                        : ' (live site, opens in a new tab)'}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-sm text-fg-muted">
                    {entry.summary}
                  </p>
                </div>
                <p className="max-w-[44ch] text-sm text-fg-muted">
                  {entry.detail}
                </p>
                <span className="font-mono text-sm tabular-nums text-fg">
                  {entry.metric}
                </span>
              </>
            );
            return (
              <li key={entry.slug}>
                {entry.study ? (
                  <Link href={`/work/${entry.slug}`} className={rowClass}>
                    {rowBody}
                  </Link>
                ) : (
                  <a
                    href={entry.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    {rowBody}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        <div className="border-t border-line py-6">
          <Link
            href="/work"
            className="font-mono text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            The full index: five products, all live &rarr;
          </Link>
        </div>
      </section>

      {/* How I work */}
      <section aria-labelledby="how-i-work" className="py-16 sm:py-24">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="how-i-work" className="text-xl font-semibold text-fg">
            How I work
          </h2>
          <span className="annotation">fig. 02 / three rules</span>
        </div>
        <div className="mt-10 space-y-10">
          {principles.map(principle => (
            <div
              key={principle.title}
              className="max-w-[62ch] border-l-2 border-accent pl-6"
            >
              <h3 className="text-xl font-semibold text-fg">
                {principle.title}
              </h3>
              <p className="mt-3 text-fg-muted">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Availability */}
      <section
        aria-labelledby="availability"
        className="border-t border-line-strong pb-24 pt-12"
      >
        <h2 id="availability" className="max-w-[24ch] text-title font-semibold text-fg">
          Open to lead roles
        </h2>
        <p className="mt-6 max-w-[58ch] text-fg-muted">
          I am looking for a lead software engineer seat where product judgment
          matters as much as delivery. The fastest way to reach me is the
          contact form. I reply within a day or two.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out-quint active:scale-[0.97]"
          >
            Get in touch
          </Link>
          <Link
            href="/resume"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-medium text-fg hover:border-accent hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            Resume
          </Link>
        </div>
      </section>
    </div>
  );
}
