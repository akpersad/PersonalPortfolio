'use client';

import { resumeData } from '@/lib/resume';
import { useAnalytics } from '@/hooks/useAnalytics';

const competencies = [
  {
    label: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'SCSS',
      'CSS-in-JS',
      'React Router',
    ],
  },
  {
    label: 'Quality and tooling',
    items: [
      'React Testing Library',
      'Jest',
      'Playwright',
      'Storybook',
      'axe DevTools',
      'Lighthouse',
    ],
  },
  {
    label: 'Platforms and systems',
    items: [
      'Contentful',
      'Adobe Experience Manager',
      'MUI X Charts',
      'Veneer, Meridian, and Lilly design systems',
      'SSO integration',
      'SQL',
    ],
  },
];

export default function Resume() {
  const { trackResumeDownload } = useAnalytics();

  const handleJSONExport = () => {
    trackResumeDownload('JSON', 'resume_page');
    const resumeJson = JSON.stringify(
      {
        name: 'Andrew Persad',
        title: 'Lead Software Engineer',
        company: 'Deloitte Digital',
        techStack: resumeData.techStack,
        certifications: resumeData.certifications,
        experience: resumeData.experience,
        links: resumeData.links,
      },
      null,
      2
    );
    const blob = new Blob([resumeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Andrew_Persad_Resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const deloitte = resumeData.experience[0];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          Resume
        </p>
        <h1 className="mt-6 text-display font-semibold text-fg">
          Andrew Persad
        </h1>
        <p className="mt-4 text-lg text-fg-muted">Lead Software Engineer</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/documents/Andrew_Persad_Resume.pdf"
            download="Andrew_Persad_Resume.pdf"
            onClick={() => trackResumeDownload('PDF', 'resume_page')}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out-quint active:scale-[0.97]"
          >
            Download PDF
          </a>
          <button
            onClick={handleJSONExport}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-medium text-fg hover:border-accent hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
          >
            Export JSON Resume
          </button>
        </div>
      </section>

      {/* Summary */}
      <section aria-labelledby="summary">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="summary" className="text-xl font-semibold text-fg">
            Professional Summary
          </h2>
          <span className="annotation">fig. 01</span>
        </div>
        <p className="mt-6 max-w-[62ch] text-fg-muted">
          Lead software engineer with 8+ years building accessible,
          high-traffic web applications for Fortune 500 clients at Deloitte
          Digital, and five self-built products shipped and live on the side. I
          lead frontend delivery end to end: design systems built from scratch,
          performance measured in render profiles, and accessibility enforced
          in CI rather than promised in review.
        </p>
      </section>

      {/* Competencies */}
      <section aria-labelledby="competencies" className="mt-16">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="competencies" className="text-xl font-semibold text-fg">
            Core Competencies
          </h2>
          <span className="annotation">fig. 02</span>
        </div>
        <dl className="mt-6">
          {competencies.map(group => (
            <div
              key={group.label}
              className="grid gap-2 border-t border-line py-5 first:border-t-0 md:grid-cols-[minmax(0,2fr)_minmax(0,7fr)] md:gap-x-8"
            >
              <dt className="annotation pt-0.5">{group.label}</dt>
              <dd className="text-sm text-fg-muted">
                {group.items.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="mt-16">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="experience" className="text-xl font-semibold text-fg">
            Professional Experience
          </h2>
          <span className="annotation">fig. 03</span>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-2xl font-semibold text-fg">
                {deloitte.title}
              </h3>
              <p className="mt-1 text-fg-muted">{deloitte.company}</p>
            </div>
            <span className="annotation">current</span>
          </div>
          <ul className="mt-6 max-w-[68ch] space-y-3 text-fg-muted">
            {deloitte.topLevelDescription.map(line => (
              <li key={line} className="border-l-2 border-line-strong pl-4">
                {line}
              </li>
            ))}
          </ul>

          <ol className="mt-10">
            {deloitte.clients.map(client => (
              <li
                key={client.name}
                className="grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,7fr)] md:gap-x-8"
              >
                <p className="annotation pt-1">{client.date}</p>
                <div>
                  <h4 className="text-lg font-semibold text-fg">
                    {client.name}
                    <span className="text-fg-muted"> / {client.project}</span>
                  </h4>
                  <ul className="mt-3 max-w-[62ch] space-y-2 text-sm text-fg-muted">
                    {client.descriptions.map(description => (
                      <li key={description}>{description}</li>
                    ))}
                  </ul>
                  {client.keyContributions.length > 0 && (
                    <p className="mt-3 max-w-[62ch] text-sm text-fg">
                      Key areas: {client.keyContributions.join('; ')}
                    </p>
                  )}
                  <p className="annotation mt-4 normal-case">
                    {client.stack.join(' · ')}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Certifications */}
      <section aria-labelledby="certifications" className="mt-16 pb-24">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <h2 id="certifications" className="text-xl font-semibold text-fg">
            Certifications
          </h2>
          <span className="annotation">fig. 04</span>
        </div>
        <ul className="mt-6 space-y-2 text-fg-muted">
          {resumeData.certifications.map(cert => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Andrew Persad',
            jobTitle: 'Lead Software Engineer',
            description:
              'Lead Software Engineer at Deloitte Digital building accessible, high-traffic web applications with React, Next.js, and TypeScript.',
            knowsAbout: [
              'React',
              'Next.js',
              'TypeScript',
              'Design Systems',
              'Web Accessibility',
              'Performance Optimization',
              'Component Libraries',
              'Enterprise Software',
            ],
            hasCredential: resumeData.certifications,
          }),
        }}
      />
    </div>
  );
}
