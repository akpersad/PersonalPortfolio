import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { studyEntries } from '@/lib/work';
import { getBreadcrumbSchema, getStudySchema } from '@/lib/seo';

/**
 * MDX bodies, one per shipped study. Metadata for each lives typed on the
 * matching entry in src/lib/work.ts; a slug appears here and there together.
 */
const studyBodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  'fork-in-the-road': () => import('@/content/work/fork-in-the-road.mdx'),
  overlapp: () => import('@/content/work/overlapp.mdx'),
  persadpay: () => import('@/content/work/persadpay.mdx'),
  pawscriptions: () => import('@/content/work/pawscriptions.mdx'),
  'protein-checker': () => import('@/content/work/protein-checker.mdx'),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return studyEntries.map(entry => ({ slug: entry.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = studyEntries.find(e => e.slug === slug);
  if (!entry) return {};

  const title = `${entry.title}: a case study | Andrew Persad`;
  return {
    title,
    description: entry.study.description,
    openGraph: {
      title,
      description: entry.study.description,
      type: 'article',
      publishedTime: entry.study.published,
      modifiedTime: entry.study.updated ?? entry.study.published,
      url: `https://andrewpersad.com/work/${slug}`,
    },
    alternates: {
      canonical: `https://andrewpersad.com/work/${slug}`,
    },
  };
}

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

export default async function StudyPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = studyEntries.find(e => e.slug === slug);
  const loadBody = studyBodies[slug];
  if (!entry || !loadBody) notFound();

  const { default: StudyBody } = await loadBody();
  const { study } = entry;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <article className="py-16 sm:py-24">
        <header>
          <Link
            href="/work"
            className="annotation inline-flex min-h-11 items-center gap-2 hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            <span aria-hidden="true">&larr;</span> index / all work
          </Link>
          <p className="annotation mt-8 flex items-center gap-3 !text-accent-ink before:h-px before:w-10 before:bg-accent">
            Case study / {entry.title.toLowerCase()}
          </p>
          <h1 className="mt-4 max-w-[26ch] text-title font-semibold text-fg">
            {study.headline}
          </h1>
          <p className="mt-6 max-w-[62ch] text-fg-muted">{study.context}</p>
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-y border-line py-4">
            <div>
              <dt className="annotation">role</dt>
              <dd className="mt-1 text-sm font-semibold text-fg">
                {study.role}
              </dd>
            </div>
            <div>
              <dt className="annotation">timeline</dt>
              <dd className="mt-1 text-sm font-semibold text-fg">
                {study.timeline}
              </dd>
            </div>
            <div>
              <dt className="annotation">status</dt>
              <dd className="mt-1 text-sm font-semibold text-fg">
                {study.status}
              </dd>
            </div>
            <div>
              <dt className="annotation">artifacts</dt>
              <dd className="flex gap-x-6">
                {entry.links.live && (
                  <ExternalLink href={entry.links.live}>
                    live site
                  </ExternalLink>
                )}
                {entry.links.repo && (
                  <ExternalLink href={entry.links.repo}>code</ExternalLink>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <StudyBody />

        <footer className="mt-16 border-t border-line-strong pt-4">
          <p className="annotation">
            End of study.{' '}
            <Link
              href="/work"
              className="underline decoration-accent/40 underline-offset-4 hover:text-accent-ink"
            >
              Back to the index
            </Link>
            , or see it running at{' '}
            {entry.links.live && (
              <a
                href={entry.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent/40 underline-offset-4 hover:text-accent-ink"
              >
                {entry.links.live.replace('https://', '').replace('www.', '')}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            .
          </p>
        </footer>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStudySchema(entry)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(`/work/${slug}`)),
        }}
      />
    </div>
  );
}
