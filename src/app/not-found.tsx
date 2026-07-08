import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section className="py-24 sm:py-32">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          fig. 404 / not found
        </p>
        <h1 className="mt-6 max-w-[20ch] text-title font-semibold text-fg">
          This page does not exist
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg text-fg-muted">
          The address may be old, mistyped, or pointing at something I have
          since deleted. I delete a lot.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-medium text-fg hover:border-accent hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            Back to the start
          </Link>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-1 font-mono text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            see the work &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
