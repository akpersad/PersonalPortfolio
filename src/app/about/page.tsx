import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Andrew Persad',
  description:
    'Learn more about Andrew Persad, Lead Frontend Engineer with expertise in React, Next.js, TypeScript, design systems, and performance optimization.',
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-text-primary mb-8">About Me</h1>

        {/* Quick Facts Panel */}
        <div className="bg-light-neutral border border-medium-green rounded-lg p-6 mb-8 not-prose">
          <h2 className="text-xl font-semibold text-text-secondary mb-4">
            Quick Facts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-text-primary mb-2">
                Core Strengths
              </h3>
              <ul className="text-sm text-text-primary space-y-1">
                <li>React & Next.js Enterprise Architecture</li>
                <li>TypeScript & Modern JavaScript (ES6+)</li>
                <li>Design Systems & Component Libraries</li>
                <li>Web Accessibility (WCAG AA Compliance)</li>
                <li>Performance Optimization & Memoization</li>
                <li>SSO Integration & Security</li>
                <li>Cross-browser Compatibility</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-text-primary mb-2">
                Enterprise Technologies
              </h3>
              <ul className="text-sm text-text-primary space-y-1">
                <li>React Testing Library, Jest, Storybook</li>
                <li>Contentful, Adobe Experience Manager</li>
                <li>Tailwind CSS, SCSS, CSS-in-JS</li>
                <li>axe DevTools, Lighthouse, Performance</li>
                <li>MUI X Charts, Data Visualization</li>
                <li>Veneer, Meridian, Lilly Design Systems</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-text-primary mb-2">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-medium-green text-text-primary px-3 py-1 rounded">
                Salesforce Certified Admin
              </span>
              <span className="bg-medium-green text-text-primary px-3 py-1 rounded">
                Salesforce Certified Platform Developer 1
              </span>
              <span className="bg-medium-green text-text-primary px-3 py-1 rounded">
                Certified Associate Configurator - Unqork
              </span>
            </div>
          </div>
        </div>

        {/* Extended Bio - Placeholder */}
        <div className="space-y-6 text-text-primary">
          <p className="text-lg">
            I&apos;m a Lead Software Engineer at Deloitte Digital with extensive
            experience building enterprise-scale web applications for Fortune
            500 companies. My passion lies in creating pixel-perfect interfaces
            that don&apos;t just look great—they perform exceptionally and
            provide inclusive experiences for millions of users.
          </p>

          <p>
            Currently, I lead frontend development for HP&apos;s Workforce
            Experience Platform through Deloitte Digital, serving 9+ million
            users with SSO-secured dashboards and real-time fleet telemetry
            visualization. Previously, I delivered Eli Lilly&apos;s consumer
            site redesign with 150K-200K monthly visitors and contributed to
            Amazon&apos;s Buy with Prime merchant portal serving 9+ million
            vendors.
          </p>

          <p>
            I specialize in building modular component libraries and internal
            design systems from scratch, standardizing UX patterns and meeting
            WCAG accessibility requirements. These systems are designed to be
            white-label and highly customizable, accommodating diverse brand
            guidelines and client color schemes across enterprise environments.
            I&apos;ve worked with design systems including HP&apos;s Veneer,
            Amazon&apos;s Meridian, and contributed to the Lilly Design System
            (LOS).
          </p>

          <p>
            Performance optimization is a core strength—I improve UI performance
            through targeted memoization, render profiling, and
            architecture-level optimizations that reduce latency across critical
            paths. I create starter kits and tooling that enable repeatable,
            high-quality delivery across diverse client teams and domains.
          </p>

          <p>
            I collaborate closely with platform teams, data engineers, and
            stakeholders to transform telemetry into actionable insights and
            ensure that technical solutions align with business objectives. My
            approach combines technical excellence with clear communication and
            strategic thinking to deliver measurable results across enterprise
            environments.
          </p>
        </div>
      </div>
    </div>
  );
}
