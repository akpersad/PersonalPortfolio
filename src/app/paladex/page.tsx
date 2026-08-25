import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paladex | Andrew Persad',
  description:
    'Paladex is a Palworld breeding planner for iPhone: full breeding routes from the box you already own, trait and IV funnels, hatch timing, and crafting math.',
  alternates: {
    canonical: 'https://andrewpersad.com/paladex',
  },
};

const APP_STORE_URL =
  'https://apps.apple.com/us/app/paladex-breeding-calculator/id6798819075';
const PRIVACY_URL = 'https://akpersad.github.io/paladex/privacy-policy.html';
const SUPPORT_EMAIL = 'paladex.app@yahoo.com';

const sections = [
  {
    label: 'fig. 01 / planning',
    title: 'What it does',
    body: (
      <>
        <p>
          Most breeding calculators answer one question: what do these two
          parents make? Paladex answers the harder one. Pick a target and it
          charts every step from the pals you already own, in fewest steps,
          fewest generations, or a rarity-aware route. Pin a plan and check off
          each hatch as you breed. Set a pal aside mid-chain and the route
          reweaves around it.
        </p>
        <p className="mt-3">
          Beyond routes: trait and IV funnels that tell you which carriers to
          breed together, a full dex with work suitability and breeding
          partners, hatch times and egg sizes computed for your own incubator
          settings, and crafting totals with batch-exact material breakdowns.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 02 / correctness',
    title: 'Why the numbers can be trusted',
    body: (
      <>
        <p>
          Every user-visible number is audited against community-verified data
          before it ships. Where something is not modeled, or where a value is
          an estimate rather than a certainty, the app says so on the screen
          instead of guessing. Zero wrong breeding information is the whole
          point of building it.
        </p>
        <p className="mt-3">
          Your box stays on your device by default. Sign in only if you want it
          synced across devices, and the app works fully offline either way.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 03 / support',
    title: 'Support and privacy',
    body: (
      <>
        <p>
          Questions, bugs, or a breeding result that looks wrong? Email{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-medium text-accent-ink hover:text-fg motion-safe:transition-colors motion-safe:duration-150"
          >
            {SUPPORT_EMAIL}
          </a>
          . A wrong number is treated as a real bug, so include the pals
          involved and what you expected.
        </p>
        <p className="mt-3">
          The{' '}
          <a
            href={PRIVACY_URL}
            className="font-medium text-accent-ink hover:text-fg motion-safe:transition-colors motion-safe:duration-150"
          >
            privacy policy
          </a>{' '}
          covers what is collected and why. Paladex is free, with a single
          one-time purchase that removes ads permanently. There is no
          subscription.
        </p>
      </>
    ),
  },
  {
    label: 'fig. 04 / affiliation',
    title: 'Not affiliated with Pocketpair',
    body: (
      <p>
        Paladex is a fan-made companion app. It is not affiliated with, endorsed
        by, or sponsored by Pocketpair, Inc. Palworld and all game content
        belong to Pocketpair, Inc.
      </p>
    ),
  },
];

export default function PaladexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          Paladex
        </p>
        <h1 className="mt-6 max-w-[20ch] text-title font-semibold text-fg">
          Plan the whole breeding chain
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg text-fg-muted">
          A Palworld breeding planner for iPhone. Tell it the pal you want, and
          it works out every pairing between there and the box you already have.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={APP_STORE_URL}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out-quint active:scale-[0.97]"
          >
            View on the App Store
          </a>
          <a
            href={PRIVACY_URL}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-medium text-fg hover:border-accent hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            Privacy policy
          </a>
        </div>
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
          Paladex is built and maintained by one person.
        </p>
      </div>
    </div>
  );
}
