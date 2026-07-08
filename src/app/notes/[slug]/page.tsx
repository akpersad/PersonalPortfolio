import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { notes } from '@/lib/notes';
import { getBreadcrumbSchema, getNoteSchema } from '@/lib/seo';

/**
 * MDX bodies, one per published note. Metadata lives typed on the matching
 * entry in src/lib/notes.ts; a slug appears here and there together.
 */
const noteBodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  'deleting-93000-lines': () =>
    import('@/content/notes/deleting-93000-lines.mdx'),
  'real-time-without-cron': () =>
    import('@/content/notes/real-time-without-cron.mdx'),
  'oklch-tokens-in-ci': () => import('@/content/notes/oklch-tokens-in-ci.mdx'),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return notes
    .filter(note => noteBodies[note.slug])
    .map(note => ({ slug: note.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find(n => n.slug === slug);
  if (!note) return {};

  const title = `${note.title} | Andrew Persad`;
  return {
    title,
    description: note.dek,
    openGraph: {
      title,
      description: note.dek,
      type: 'article',
      publishedTime: note.published,
      modifiedTime: note.updated ?? note.published,
      url: `https://andrewpersad.com/notes/${slug}`,
      // Child openGraph replaces the root layout's, so restate the card.
      images: ['https://andrewpersad.com/og-image.png'],
    },
    alternates: {
      canonical: `https://andrewpersad.com/notes/${slug}`,
    },
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = notes.find(n => n.slug === slug);
  const loadBody = noteBodies[slug];
  if (!note || !loadBody) notFound();

  const { default: NoteBody } = await loadBody();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <article className="py-16 sm:py-24">
        <header>
          <Link
            href="/notes"
            className="annotation inline-flex min-h-11 items-center gap-2 hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            <span aria-hidden="true">&larr;</span> index / all notes
          </Link>
          <p className="annotation mt-8 flex items-center gap-3 !text-accent-ink before:h-px before:w-10 before:bg-accent">
            Note / {formatDate(note.published)} / {note.readingMinutes} min
          </p>
          <h1 className="mt-4 max-w-[24ch] text-title font-semibold text-fg">
            {note.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-fg-muted">{note.dek}</p>
        </header>

        <div className="mt-4 border-t border-line pt-4">
          <NoteBody />
        </div>

        <footer className="mt-16 border-t border-line-strong pt-4">
          <p className="annotation">
            End of note.{' '}
            <Link
              href="/notes"
              className="underline decoration-accent/40 underline-offset-4 hover:text-accent-ink"
            >
              Back to the index
            </Link>
            , or see the products this came from on{' '}
            <Link
              href="/work"
              className="underline decoration-accent/40 underline-offset-4 hover:text-accent-ink"
            >
              the work page
            </Link>
            .
          </p>
        </footer>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getNoteSchema(note)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(`/notes/${slug}`)),
        }}
      />
    </div>
  );
}
