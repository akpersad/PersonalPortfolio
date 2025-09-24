'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { projects } from '@/lib/projects';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getBreadcrumbSchema } from '@/lib/seo';

// Create slug mapping for projects
const projectSlugs: Record<string, string> = {
  'POKÉ COLLECTOR': 'poke-collector',
  'Protein Quality Calculator': 'protein-checker',
  'Cosmic Recipe Generator': 'cosmic-recipes',
};

export default function WorkClient() {
  const { trackProjectView, trackExternalLinkClick } = useAnalytics();

  const handleProjectClick = (projectName: string, projectSlug: string) => {
    trackProjectView(projectName, projectSlug);
  };

  const handleExternalLinkClick = (platform: string, url: string) => {
    trackExternalLinkClick(platform, url, 'work_page');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Featured Work
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Personal projects showcasing expertise in React/Next.js, TypeScript,
          and modern frontend development. Each project demonstrates different
          aspects of full-stack development and creative problem-solving.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => {
          const slug = projectSlugs[project.project];
          const mainImage = project.images?.[0];
          return (
            <div
              key={project.project}
              className="bg-light-neutral border border-medium-green rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Project Image */}
              {mainImage?.web && (
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={mainImage.web}
                    alt={`${project.project} screenshot`}
                    width={400}
                    height={192}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    quality={90}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                      {project.experimental ? 'Experimental' : 'Production'}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    {project.project}
                  </h2>
                  <p className="text-sm text-text-secondary font-medium">
                    {project.role}
                  </p>
                </div>

                <p className="text-text-primary mb-4 text-sm leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-text-secondary mb-2">
                    Key Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map(tech => (
                      <span
                        key={tech}
                        className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="text-xs text-text-secondary">
                        +{project.stack.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/work/${slug}`}
                    className="flex-1 bg-primary-green text-text-on-dark text-center py-2 px-4 rounded text-sm font-medium hover:bg-dark-green transition-colors"
                    onClick={() => handleProjectClick(project.project, slug)}
                  >
                    View Details
                  </Link>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-medium-green text-text-secondary text-sm rounded hover:bg-medium-green hover:text-text-primary transition-colors"
                      onClick={() =>
                        handleExternalLinkClick('Live Site', project.link!)
                      }
                    >
                      Live Site
                    </a>
                  ) : (
                    <span className="px-4 py-2 border border-medium-green text-text-secondary text-sm rounded opacity-50">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-16">
        <div className="bg-medium-green/20 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Personal Projects
          </h2>
          <p className="text-text-secondary mb-6">
            These projects represent my personal exploration of modern web
            technologies and creative problem-solving. Each project showcases
            different aspects of frontend development, from enterprise-scale
            applications to experimental AI-powered experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/akpersad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-darkest text-text-on-dark px-6 py-3 rounded font-medium hover:bg-dark-green transition-colors"
              onClick={() =>
                handleExternalLinkClick('GitHub', 'https://github.com/akpersad')
              }
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
              onClick={() =>
                handleExternalLinkClick(
                  'LinkedIn',
                  'https://www.linkedin.com/in/andrew-persad-aa496432/'
                )
              }
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

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema('/work')),
        }}
      />

      {/* ATS Hidden Keywords Section - For automated systems */}
      <section className="sr-only" aria-hidden="true">
        <h2>Technical Skills and Project Portfolio</h2>
        <div>
          <span>
            React Developer, Next.js Developer, TypeScript Developer, Frontend
            Engineer,{' '}
          </span>
          <span>
            JavaScript Expert, Web Developer, Software Engineer, Lead
            Developer,{' '}
          </span>
          <span>
            UI Developer, UX Developer, Component Developer, Full Stack
            Developer,{' '}
          </span>
          <span>
            Mobile Developer, iOS Developer, Cross Platform Developer,{' '}
          </span>
          <span>
            Performance Optimization, Accessibility, WCAG Compliance,{' '}
          </span>
          <span>Design Systems, Component Libraries, API Integration, </span>
          <span>
            State Management, Responsive Design, Modern JavaScript, ES6+,{' '}
          </span>
          <span>CSS-in-JS, Tailwind CSS, SCSS, MongoDB, Database Design, </span>
          <span>Authentication, Security, Progressive Web Apps, PWA, </span>
          <span>Code Splitting, Lazy Loading, Image Optimization, SEO, </span>
          <span>
            Search Engine Optimization, Core Web Vitals, User Experience,{' '}
          </span>
          <span>User Interface, Interaction Design, Project Management, </span>
          <span>
            Technical Leadership, Code Review, Documentation, Testing,{' '}
          </span>
          <span>Problem Solving, Debugging, Performance Analysis, </span>
          <span>
            Cross Browser Compatibility, CI/CD, Continuous Integration,{' '}
          </span>
          <span>Version Control, Git, Agile Development, Build Tools, </span>
          <span>
            Webpack, Vite, Turbopack, ESLint, Code Quality, Clean Code,{' '}
          </span>
          <span>
            SOLID Principles, Architecture Patterns, Design Patterns,{' '}
          </span>
          <span>Pokemon TCG, Collection Management, Protein Calculator, </span>
          <span>
            Nutrition Tracking, Data Visualization, Real-time Search,{' '}
          </span>
          <span>
            Advanced Filtering, User Authentication, Collection
            Persistence,{' '}
          </span>
          <span>Multi-platform Development, Native iOS, Swift, SwiftUI, </span>
          <span>Core Data, JSON Handling, Protocol-Oriented Programming, </span>
          <span>
            Generics, Async/Await, Combine Framework, Swift Concurrency,{' '}
          </span>
          <span>iOS Design Patterns, Mobile UX, Adaptive Layouts, </span>
          <span>
            Navigation Patterns, Haptic Feedback, Memory Management, ARC,{' '}
          </span>
          <span>iOS Testing, Xcode, iOS Simulator, App Store Guidelines, </span>
          <span>
            iOS Human Interface Guidelines, AI Integration, Machine
            Learning,{' '}
          </span>
          <span>
            Voice Recognition, Creative Coding, Experimental UI, Animation,{' '}
          </span>
          <span>
            Framer Motion, Web APIs, Speech Recognition, Real-time Data,{' '}
          </span>
          <span>
            Interactive Design, Creative Development, Experimental
            Features,{' '}
          </span>
          <span>
            Voice UI, API Caching, Animation Optimization, Voice Processing
          </span>
        </div>
      </section>
    </div>
  );
}
