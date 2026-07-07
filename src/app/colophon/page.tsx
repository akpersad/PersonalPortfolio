import type { Metadata } from 'next';

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
          Next.js App Router, React, and TypeScript, styled with Tailwind CSS 4
          on top of plain CSS custom properties. The design tokens live in one
          stylesheet and Tailwind reads them, so the CSS variables stay the
          single source of truth. Deployed on Vercel.
        </p>
        <p className="mt-3">
          Case studies will be written in MDX. That engine lands with the first
          full study.
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
          headings. Geist carries body and interface text. Geist Mono carries
          annotations, labels, and tabular numbers. All three are self-hosted
          and load with zero layout shift.
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
          neutrals, and one signal orange accent does the markup work: rules,
          underlines, deltas, the primary action. The accent stays under ten
          percent of any surface.
        </p>
        <p className="mt-3">
          Tokens are layered primitive, semantic, component. Dark mode overrides
          only the semantic layer, so components never know which theme they are
          in.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 04 / motion',
    title: 'Motion',
    body: (
      <p>
        Transitions run 150 to 300ms on an ease-out-quint curve and animate only
        transform and opacity. Everything collapses to near-instant when your
        system asks for reduced motion. If you notice an animation here, that is
        a bug.
      </p>
    ),
  },
  {
    label: 'fig. 05 / budgets',
    title: 'Accessibility and performance',
    body: (
      <>
        <p>
          The target is WCAG 2.2 AA in both themes. Automated axe checks and
          Lighthouse budgets run in CI on every change, and a bundle monitor
          keeps the JavaScript honest. Tooling output is evidence, not proof, so
          every screen also gets checked by eye at 360, 768, and 1280 pixels.
        </p>
        <p className="mt-3">
          Full numbers, the avatar story, and the rest of the build notes will
          be published here when the site relaunch ships.
        </p>
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
          The tools, type, and rules behind what you are reading. This page is a
          skeleton while the site is rebuilt in public; each section fills in as
          the work ships.
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
          </div>
          <div className="mt-4 max-w-[62ch] text-fg-muted sm:mt-0">
            {section.body}
          </div>
        </section>
      ))}
      <div className="border-t border-line-strong pb-24 pt-4">
        <p className="annotation">
          End of colophon. More as the rebuild ships.
        </p>
      </div>
    </div>
  );
}
