import type { Metadata } from 'next';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

export const metadata: Metadata = {
  title: 'Colophon | Andrew Persad',
  description:
    'How this site is designed and built: the stack, the type, the color system, and the accessibility and performance budgets behind it.',
  alternates: {
    canonical: 'https://andrewpersad.com/colophon',
  },
};

const sections = [
  {
    label: 'fig. 01 / stack',
    title: 'Stack',
    body: (
      <>
        <p>
          Next.js 16 App Router, React 19, and TypeScript, styled with Tailwind
          CSS 4 on top of plain CSS custom properties. The design tokens live
          in one stylesheet and Tailwind reads them, so the CSS variables stay
          the single source of truth. Deployed on Vercel.
        </p>
        <p className="mt-3">
          The five case studies and the notes are MDX, compiled with the Rust
          MDX compiler. Their metadata is typed TypeScript, not YAML
          frontmatter, so a bad date or a missing description fails the build
          instead of shipping.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 02 / type',
    title: 'Type',
    body: (
      <>
        <p>
          Three faces, each with one job. Bricolage Grotesque carries display
          headings and uses its optical size axis. Geist carries body and
          interface text. Geist Mono carries annotations, labels, and tabular
          numbers. All three are variable fonts, self-hosted through
          next/font, subset, and preloaded, so text renders once and never
          shifts.
        </p>
        <p className="mt-3">
          The scale uses a 1.25 ratio, hand-rounded, fluid only at the display
          sizes. Body text never drops below 16px.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 03 / color',
    title: 'Color',
    body: (
      <>
        <p>
          Every color is OKLCH. A single slate hue (245) tints all of the
          neutrals, and one signal orange accent (hue 40) does the markup
          work: rules, underlines, deltas, the primary action. The accent
          stays under ten percent of any surface.
        </p>
        <p className="mt-3">
          Tokens are layered primitive, semantic, component. Dark mode
          overrides only the semantic layer, so components never know which
          theme they are in. Building it this way surfaced two real contrast
          bugs before launch; that story is written up in{' '}
          <Link
            href="/notes/oklch-tokens-in-ci"
            className="font-medium text-accent-ink hover:text-fg motion-safe:transition-colors motion-safe:duration-150"
          >
            the notes
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    label: 'fig. 04 / motion',
    title: 'Motion',
    body: (
      <>
        <p>
          Transitions run 150 to 300ms on an ease-out-quint curve and animate
          only transform and opacity. Page entrances are a single 320ms rise.
          Scroll reveals are CSS scroll-driven animations, no JavaScript
          observer, so none of it touches the main thread.
        </p>
        <p className="mt-3">
          Everything collapses to near-instant when your system asks for
          reduced motion. If you notice an animation here, that is a bug.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 05 / budgets',
    title: 'Accessibility and performance',
    body: (
      <>
        <p>
          The target is WCAG 2.2 AA in both themes. Every page gets an
          automated axe scan in light and dark mode, in Chromium, Firefox, and
          WebKit profiles, desktop and mobile: about 160 checks per full run
          of the suite.
          Tooling output is evidence, not proof, so every screen also gets
          checked by eye at 360, 768, and 1280 pixels.
        </p>
        <p className="mt-3">
          Lighthouse runs against a static export on every change and fails
          the build below 90 in any category. The budgets pin first
          contentful paint under 2.0s, largest contentful paint under 2.5s,
          layout shift under 0.1, and total blocking time under 300ms. A
          bundle monitor holds the whole first-load payload, JavaScript, CSS,
          and assets together, under 1000 KB; it measures 994 KB today.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 06 / avatar',
    title: 'The avatar',
    body: (
      <>
        <p>
          The portrait is hand-written SVG, about 4 KB of path data, drawn
          flat with no shading. It took five versions to get a likeness worth
          signing off on, and the one that worked came from studying
          the original illustration, not the reference photos. The geometry is
          locked; themes restyle it purely through CSS variables.
        </p>
        <p className="mt-3">Click him on the home page. He winks.</p>
      </>
    ),
  },
];

export default function ColophonPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          Colophon
        </p>
        <h1 className="mt-6 max-w-[16ch] text-title font-semibold text-fg">
          How this site is made
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg text-fg-muted">
          The tools, type, and rules behind what you are reading. Everything
          below is measured from this build, not aspirational.
        </p>
      </section>

      {sections.map(section => (
        <section
          key={section.title}
          className="border-t border-line py-10 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8"
        >
          <div>
            <p className="annotation">{section.label}</p>
            <h2 className="mt-2 text-xl font-semibold text-fg">
              {section.title}
            </h2>
            {section.label.startsWith('fig. 06') && (
              <Avatar decorative className="mt-6 w-24" />
            )}
          </div>
          <div className="mt-4 max-w-[62ch] text-fg-muted sm:mt-0">
            {section.body}
          </div>
        </section>
      ))}
      <div className="border-t border-line-strong pb-24 pt-4">
        <p className="annotation">End of colophon.</p>
      </div>
    </div>
  );
}
