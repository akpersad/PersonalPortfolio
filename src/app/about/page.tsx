import type { Metadata } from 'next';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import { resumeData } from '@/lib/resume';

export const metadata: Metadata = {
  title: 'About | Andrew Persad',
  description:
    'Lead software engineer at Deloitte Digital. Enterprise platforms for HP, Eli Lilly, and Amazon by day; five self-built products shipped and live by night.',
  alternates: {
    canonical: 'https://andrewpersad.com/about',
  },
};

const timeline = [
  {
    date: '2025 to now',
    client: 'Hewlett Packard',
    project: 'Workforce Experience Platform',
    body: 'I lead delivery of the web portal IT administrators use to watch fleets serving 9 million users: device telemetry, remote script remediation, policies, and engagement pulses. I architected the modular React front end on HP’s Veneer design system, with enterprise SSO and WCAG-compliant accessibility, and worked directly with the data team to turn raw fleet telemetry from the data lake into APIs the portal could render in near real time.',
    stack: [
      'TypeScript',
      'React',
      'Veneer (HP design system)',
      'MUI X Charts',
      'React Testing Library',
    ],
  },
  {
    date: '2025',
    client: 'Eli Lilly',
    project: 'Consumer site redesign',
    body: 'I led frontend efforts on the full redesign of the consumer-facing site, 150K to 200K monthly active users, including a new medicine exploration and pricing experience. Along the way I contributed to the relaunch of the Lilly Design System and wired external APIs and CMS content into responsive UI flows: LillyDirect, conditions pages, the healthcare provider page, and authentication.',
    stack: [
      'TypeScript',
      'Next.js',
      'React',
      'Tailwind',
      'Contentful',
      'Adobe Experience Manager',
    ],
  },
  {
    date: '2023',
    client: 'Amazon',
    project: 'Buy with Prime',
    body: 'I helped launch the Buy with Prime merchant portal: the product listing and order management dashboards, built on Amazon’s Meridian design system, that gave 9 million+ vendors one place for centralized insights.',
    stack: [
      'TypeScript',
      'React',
      'Meridian (Amazon design system)',
      'React Testing Library',
    ],
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      {/* Intro */}
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          About
        </p>
        <h1 className="mt-6 max-w-[18ch] text-display font-semibold text-fg">
          Enterprise scale by day, full ownership by night.
        </h1>
        <p className="mt-8 max-w-[58ch] text-lg text-fg-muted">
          I am Andrew Persad, a lead software engineer at Deloitte Digital. For
          the last several years I have built front ends for Fortune 500
          platforms while shipping my own products end to end on the side. The
          two habits feed each other: client work teaches scale and restraint,
          my own products teach what it costs to own every decision from schema
          to pixel.
        </p>
      </section>

      {/* Experience timeline */}
      <section aria-labelledby="experience">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="experience" className="text-xl font-semibold text-fg">
            Experience
          </h2>
          <span className="annotation">fig. 01 / lead software engineer, Deloitte Digital</span>
        </div>
        <p className="mt-6 max-w-[62ch] text-fg-muted">
          At Deloitte Digital I build accessible, responsive interfaces from
          high and low fidelity designs, and I build the systems behind them: a
          white-label component library and internal design system created from
          scratch, starter kits that made quality repeatable across client
          teams, and performance work measured in render profiles rather than
          vibes.
        </p>
        <ol className="mt-10">
          {timeline.map(role => (
            <li
              key={role.client}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,7fr)] md:gap-x-8"
            >
              <p className="annotation pt-1">{role.date}</p>
              <div>
                <h3 className="text-2xl font-semibold text-fg">
                  {role.client}
                  <span className="text-fg-muted"> / {role.project}</span>
                </h3>
                <p className="mt-3 max-w-[62ch] text-fg-muted">{role.body}</p>
                <p className="annotation mt-4 normal-case">
                  {role.stack.join(' · ')}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t border-line py-6">
          <p className="max-w-[62ch] text-sm text-fg-muted">
            Certified along the way: {resumeData.certifications.join(', ')}.
            The full history is on the{' '}
            <Link
              href="/resume"
              className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              resume
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Off hours */}
      <section aria-labelledby="off-hours" className="py-16 sm:py-24">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="off-hours" className="text-xl font-semibold text-fg">
            Off hours
          </h2>
          <span className="annotation">fig. 02 / the other half</span>
        </div>
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start">
          <div className="space-y-6 text-fg-muted">
            <p className="max-w-[62ch]">
              Evenings and weekends go to products I design, build, run, and
              answer for myself. Five are shipped and live right now: a group
              decision app, a calendar overlap finder, a payroll engine that
              files real forms for my own household, a pet medication tracker,
              and a nutrition calculator that ships as both a React web app and
              a native SwiftUI app. None of them are demos. They have users,
              uptime, and consequences, which is exactly why I keep building
              them.
            </p>
            <p className="max-w-[62ch]">
              These projects are where I take the risks client work cannot:
              HMAC-signed guest sessions instead of forced accounts, recurrence
              math pushed down into Postgres, OCR that runs on-device so photos
              never leave the phone. The ones that survive contact with real
              use become the case studies on the{' '}
              <Link
                href="/work"
                className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                work page
              </Link>
              .
            </p>
            <p className="max-w-[62ch]">
              The portrait on this site is part of the same discipline. It is a
              hand-built vector redrawn from my old avatar art, flat color with
              no shading, and it reads its palette from the same design tokens
              as every other element on the page. Flip the theme and it changes
              shirts.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Avatar
              className="w-48 sm:w-56"
              title="Illustrated portrait of Andrew Persad"
            />
            <p className="annotation" aria-hidden="true">
              fig. 03 / drawn, not generated
            </p>
          </div>
        </div>
      </section>

      {/* Next step */}
      <section className="border-t border-line-strong pb-24 pt-12">
        <p className="max-w-[58ch] text-fg-muted">
          If this sounds like the kind of engineer your team is missing, the{' '}
          <Link
            href="/contact"
            className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            contact page
          </Link>{' '}
          is the fastest route. I reply within a day or two.
        </p>
      </section>
    </div>
  );
}
