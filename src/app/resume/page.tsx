import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume - Andrew Persad',
  description:
    "Andrew Persad's resume - Lead Frontend Engineer with 8+ years of experience in React, Next.js, TypeScript, design systems, and performance optimization.",
};

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Resume</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/documents/Andrew_Persad_Resume.pdf"
            download="Andrew_Persad_Resume.pdf"
            className="bg-primary-green text-text-on-dark px-6 py-3 rounded-lg font-medium hover:bg-dark-green transition-colors inline-flex items-center justify-center gap-2"
          >
            Download PDF
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <button
            className="border border-medium-green text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-medium-green hover:text-text-primary transition-colors"
            onClick={() => {
              const resumeJson = JSON.stringify(
                {
                  name: 'Andrew Persad',
                  title: 'Lead Software Engineer',
                  experience: 'Deloitte Digital',
                  skills: [
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Design Systems',
                    'Web Accessibility',
                    'Performance Optimization',
                  ],
                  certifications: [
                    'Salesforce Admin',
                    'Salesforce PD1',
                    'Unqork Configurator',
                  ],
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
            }}
          >
            Export JSON Resume
          </button>
        </div>
      </div>

      <div className="bg-light-neutral border border-medium-green rounded-lg p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          {/* Header */}
          <div className="text-center border-b border-medium-green pb-6 mb-8 not-prose">
            <h1 className="text-3xl font-bold text-text-primary">
              Andrew Persad
            </h1>
            <h2 className="text-xl text-text-secondary mb-4">
              Lead Software Engineer
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-primary">
              <a
                href="https://www.linkedin.com/in/andrew-persad-aa496432/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-link-primary transition-colors"
              >
                🔗 LinkedIn
              </a>
              <a
                href="https://github.com/akpersad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-link-primary transition-colors"
              >
                💻 GitHub
              </a>
              <span>🌐 andrewpersad.com</span>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
              Professional Summary
            </h2>
            <p className="text-text-primary leading-relaxed">
              Lead Frontend Engineer with 8+ years of experience building
              scalable, accessible web applications. Specialized in
              React/Next.js architecture, design systems, and performance
              optimization. Proven track record of leading development teams,
              creating reusable component libraries, and delivering high-quality
              user experiences across enterprise-level applications.
            </p>
          </section>

          {/* Core Competencies */}
          <section className="mb-8 not-prose">
            <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
              Core Competencies
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-3">
                  Frontend Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React',
                    'Next.js',
                    'TypeScript',
                    'JavaScript (ES6+)',
                    'HTML5',
                    'CSS3',
                    'Tailwind CSS',
                    'SCSS/SASS',
                    'CSS-in-JS',
                    'React Router',
                  ].map(tech => (
                    <span
                      key={tech}
                      className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-3">
                  Testing & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React Testing Library',
                    'Jest',
                    'Storybook',
                    'axe DevTools',
                    'Lighthouse',
                    'Git',
                    'Webpack',
                    'Vite',
                    'Bootstrap',
                  ].map(tool => (
                    <span
                      key={tool}
                      className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-3">
                  CMS & Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Contentful',
                    'Adobe Experience Manager',
                    'MUI X Charts',
                    'Veneer Design System',
                    'Meridian Design System',
                    'SQL',
                    'SSO Integration',
                  ].map(platform => (
                    <span
                      key={platform}
                      className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-text-primary mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Design Systems',
                  'Web Accessibility (WCAG)',
                  'Performance Optimization',
                  'Component Libraries',
                  'Responsive Design',
                  'Cross-browser Compatibility',
                  'Enterprise Software',
                  'SSO Security',
                  'Data Visualization',
                  'API Integration',
                ].map(spec => (
                  <span
                    key={spec}
                    className="text-xs bg-medium-green text-text-primary px-2 py-1 rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Key Achievements */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
              Key Achievements
            </h2>
            <ul className="text-text-primary space-y-3">
              <li>
                • Developed responsive, accessible front-end interfaces from
                high- and low-fidelity designs with a focus on pixel-perfect
                precision and cross-browser compatibility
              </li>
              <li>
                • Built a modular component library and internal design system
                from scratch, standardizing UX patterns and meeting
                accessibility requirements, with components designed to be
                white-label and highly customizable
              </li>
              <li>
                • Improved UI performance through targeted memoization, render
                profiling, and architecture-level optimizations, reducing
                latency across critical paths
              </li>
              <li>
                • Created starter kits and tooling that enabled repeatable, high
                quality delivery across diverse client teams and domains
              </li>
            </ul>
          </section>

          {/* Professional Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
              Professional Experience
            </h2>

            {/* Deloitte Digital */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Lead Software Engineer
                  </h3>
                  <p className="text-lg text-text-secondary font-medium">
                    Deloitte Digital
                  </p>
                </div>
                <span className="text-text-secondary text-sm">Current</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-light-neutral border border-medium-green rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Key Responsibilities
                  </h4>
                  <ul className="text-sm text-text-primary space-y-2">
                    <li>
                      • Developed responsive, accessible front-end interfaces
                      from high- and low-fidelity designs with a focus on
                      pixel-perfect precision and cross-browser compatibility
                    </li>
                    <li>
                      • Built a modular component library and internal design
                      system from scratch, standardizing UX patterns and meeting
                      accessibility requirements, with components designed to be
                      white-label and highly customizable to accommodate diverse
                      brand guidelines and client color schemes
                    </li>
                    <li>
                      • Improved UI performance through targeted memoization,
                      render profiling, and architecture-level optimizations,
                      reducing latency across critical paths
                    </li>
                    <li>
                      • Created starter kits and tooling that enabled
                      repeatable, high quality delivery across diverse client
                      teams and domains
                    </li>
                  </ul>
                </div>
              </div>

              {/* Client Projects */}
              <div className="space-y-6">
                {/* HP Project */}
                <div className="border-l-4 border-primary-green pl-4">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Hewlett Packard - Workforce Experience Platform (2025)
                  </h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Led delivery of the web portal for the Workforce Experience
                    Platform, a distributed platform allowing IT Administrators
                    and procurement specialists an overview of their systems,
                    handling fleet management, employee engagement, digital
                    workspaces, and security systems.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      TypeScript
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      React
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      Veneer Design System
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      MUI X Charts
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      SSO Integration
                    </span>
                  </div>
                </div>

                {/* Eli Lilly Project */}
                <div className="border-l-4 border-medium-green pl-4">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Eli Lilly - Consumer Facing Site (2025)
                  </h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Led frontend efforts on a full redesign of the
                    consumer-facing site with 150K - 200K monthly active users,
                    including a new medicine exploration and pricing experience.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      TypeScript
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      Next.js
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      Tailwind
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      Contentful
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      Adobe Experience Manager
                    </span>
                  </div>
                </div>

                {/* Amazon Project */}
                <div className="border-l-4 border-primary-green pl-4">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Amazon - Buy with Prime (2023)
                  </h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Helped launch the Buy with Prime Merchant Portal, a
                    collection of dashboards for product listings and order
                    management using internal design system (Meridian), enabling
                    a place for centralized insights available to Amazon's 9
                    million+ vendors.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      TypeScript
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      React
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      Meridian Design System
                    </span>
                    <span className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                      React Testing Library
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education & Certifications */}
          <section className="mb-8 not-prose">
            <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
              Education & Certifications
            </h2>
            <div className="space-y-4">
              <div className="bg-light-neutral border border-medium-green rounded-lg p-4">
                <h3 className="font-semibold text-text-primary">
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-primary-green text-text-on-dark px-3 py-1 rounded text-sm">
                    Salesforce Admin
                  </span>
                  <span className="bg-primary-green text-text-on-dark px-3 py-1 rounded text-sm">
                    Salesforce PD1
                  </span>
                  <span className="bg-primary-green text-text-on-dark px-3 py-1 rounded text-sm">
                    Unqork Configurator
                  </span>
                </div>
              </div>

              <div className="bg-medium-green/20 rounded-lg p-4">
                <p className="text-text-secondary text-sm">
                  Education details will be added here based on your background.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* JSON-LD Structured Data for ATS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Andrew Persad',
            jobTitle: 'Lead Software Engineer',
            description:
              'Lead Software Engineer at Deloitte Digital with extensive experience in React, Next.js, TypeScript, design systems, and performance optimization for Fortune 500 companies.',
            knowsAbout: [
              'React',
              'Next.js',
              'TypeScript',
              'JavaScript',
              'HTML5',
              'CSS3',
              'Design Systems',
              'Web Accessibility',
              'Performance Optimization',
              'Enterprise Software',
              'Component Libraries',
              'SSO Integration',
              'WCAG Compliance',
              'React Testing Library',
              'Storybook',
              'Tailwind CSS',
              'SCSS',
              'CSS-in-JS',
              'Contentful',
              'Adobe Experience Manager',
              'MUI X Charts',
              'Data Visualization',
              'Cross-browser Compatibility',
              'Responsive Design',
              'API Integration',
              'Memoization',
              'Render Profiling',
              'Build Tools',
              'Git',
              'Jest',
              'axe DevTools',
              'Lighthouse',
            ],
            hasCredential: [
              'Salesforce Admin',
              'Salesforce PD1',
              'Unqork Configurator',
            ],
          }),
        }}
      />
    </div>
  );
}
