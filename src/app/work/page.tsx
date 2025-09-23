import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Work - Andrew Persad',
  description:
    'Featured projects by Andrew Persad showcasing expertise in React, Next.js, design systems, and frontend architecture.',
};

// Real client projects from Deloitte Digital experience
const projects = [
  {
    slug: 'hp-workforce-platform',
    title: 'HP Workforce Experience Platform',
    summary:
      'Enterprise platform for IT administrators and procurement specialists managing fleet operations, employee engagement, and security systems for 9M+ users.',
    timeframe: '2025',
    stack: [
      'TypeScript',
      'React',
      'Veneer Design System',
      'React Testing Library',
      'MUI X Charts',
      'SSO',
    ],
    featured: true,
    status: 'live',
    client: 'Hewlett Packard',
    link: null, // Internal enterprise platform
  },
  {
    slug: 'lilly-consumer-site',
    title: 'Eli Lilly Consumer Site Redesign',
    summary:
      'Full redesign of consumer-facing site with medicine exploration, pricing experience, and healthcare provider integration for 200K monthly users.',
    timeframe: '2025',
    stack: [
      'TypeScript',
      'Next.js',
      'React Router',
      'SCSS',
      'Tailwind',
      'Contentful',
      'Adobe Experience Manager',
    ],
    featured: true,
    status: 'live',
    client: 'Eli Lilly',
    link: 'https://www.lilly.com/',
  },
  {
    slug: 'amazon-buy-with-prime',
    title: 'Amazon Buy with Prime Portal',
    summary:
      'Merchant portal with product listings and order management dashboards using internal Meridian design system for 9M+ vendors.',
    timeframe: '2023',
    stack: [
      'TypeScript',
      'React',
      'React Testing Library',
      'Meridian Design System',
    ],
    featured: true,
    status: 'live',
    client: 'Amazon',
    link: null, // Internal enterprise platform
  },
];

export default function Work() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Featured Work
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Enterprise projects delivered at Deloitte Digital showcasing expertise
          in React/Next.js, design systems, and scalable frontend architecture
          for Fortune 500 companies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div
            key={project.slug}
            className="bg-light-neutral border border-medium-green rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">
                  {project.title}
                </h2>
                <p className="text-sm text-text-secondary font-medium">
                  {project.client}
                </p>
              </div>
              <span className="text-xs text-text-secondary bg-medium-green px-2 py-1 rounded">
                {project.timeframe}
              </span>
            </div>

            <p className="text-text-primary mb-4 text-sm leading-relaxed">
              {project.summary}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-secondary mb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/work/${project.slug}`}
                className="flex-1 bg-primary-green text-text-on-dark text-center py-2 px-4 rounded text-sm font-medium hover:bg-dark-green transition-colors"
              >
                View Details
              </Link>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-medium-green text-text-secondary text-sm rounded hover:bg-medium-green hover:text-text-primary transition-colors"
                >
                  Live Site
                </a>
              ) : (
                <span className="px-4 py-2 border border-medium-green text-text-secondary text-sm rounded opacity-50">
                  Internal Platform
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <div className="bg-medium-green/20 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Enterprise Experience
          </h2>
          <p className="text-text-secondary mb-6">
            These projects represent a sample of enterprise-scale applications
            I&apos;ve delivered at Deloitte Digital. Each project showcases
            different aspects of modern frontend development and design system
            architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/akpersad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-darkest text-text-on-dark px-6 py-3 rounded font-medium hover:bg-dark-green transition-colors"
            >
              View GitHub Profile
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/andrew-persad-aa496432/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-medium-green text-text-secondary px-6 py-3 rounded font-medium hover:bg-medium-green hover:text-text-primary transition-colors"
            >
              Connect on LinkedIn
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
