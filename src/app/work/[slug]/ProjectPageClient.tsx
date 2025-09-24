'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { projects, type Project } from '@/lib/projects';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import {
  getProjectSchema,
  getBreadcrumbSchema,
  getArticleSchema,
} from '@/lib/seo';

// Create slug mapping for projects
const projectSlugs: Record<string, string> = {
  'POKÉ COLLECTOR': 'poke-collector',
  'Protein Quality Calculator': 'protein-checker',
  'Cosmic Recipe Generator': 'cosmic-recipes',
};

// Create reverse mapping for lookup
const slugToProject: Record<string, string> = Object.fromEntries(
  Object.entries(projectSlugs).map(([project, slug]) => [slug, project])
);

type ProjectSlug = keyof typeof slugToProject;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPageClient({ params }: PageProps) {
  const { trackProjectView, trackExternalLinkClick } = useAnalytics();
  const [project, setProject] = useState<Project | null>(null);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      const resolvedParams = await params;
      const projectSlug = resolvedParams.slug;
      setSlug(projectSlug);

      const projectName = slugToProject[projectSlug as ProjectSlug];
      const foundProject = projects.find(p => p.project === projectName);

      if (!foundProject) {
        notFound();
      }

      setProject(foundProject);

      // Track project view
      if (foundProject) {
        trackProjectView(foundProject.project, projectSlug);
      }
    };

    loadProject();
  }, [params, trackProjectView]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleExternalLinkClick = (platform: string, url: string) => {
    trackExternalLinkClick(platform, url, 'project_page');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb navigation">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/work"
            className="hover:text-primary-green transition-colors"
          >
            Work
          </Link>
          <span>/</span>
          <span className="text-text-primary">{project.project}</span>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {project.link && (
            <>
              <a
                href={`${project.link}?utm_source=portfolio&utm_medium=referral&utm_campaign=${encodeURIComponent(project.project.toLowerCase().replace(/\s+/g, '-'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-green text-text-on-dark px-6 py-3 rounded-lg font-medium hover:bg-dark-green transition-colors inline-flex items-center gap-2"
                onClick={() =>
                  handleExternalLinkClick('Live Demo', project.link!)
                }
              >
                View Live Demo
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Web Repository */}
              {project.repo[0]?.web && (
                <a
                  href={project.repo[0].web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-medium-green text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-medium-green hover:text-text-primary transition-colors inline-flex items-center gap-2"
                  onClick={() =>
                    handleExternalLinkClick('GitHub Web', project.repo[0].web!)
                  }
                >
                  View Web Code
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
              {/* iOS Repository */}
              {'iOS' in project.repo[0] && project.repo[0].iOS && (
                <a
                  href={project.repo[0].iOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-medium-green text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-medium-green hover:text-text-primary transition-colors inline-flex items-center gap-2"
                  onClick={() =>
                    handleExternalLinkClick('GitHub iOS', project.repo[0].iOS!)
                  }
                >
                  View iOS Code
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </>
          )}
        </div>

        {!project.link && (
          <div className="bg-medium-green/20 rounded-lg p-6 mt-6">
            <p className="text-text-secondary">
              🚧 This project is currently in development. Check back soon for
              the full case study and live demo!
            </p>
          </div>
        )}
      </div>

      {/* Hero Section with Project Image */}
      {project.images &&
        project.images.length > 0 &&
        project.images[0]?.web && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="bg-light-neutral border border-medium-green rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={project.images[0].web}
                    alt={`${project.project} - Main screenshot`}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                    quality={95}
                    placeholder="blur"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                  {project.project}
                </h1>
                <p className="text-lg text-text-primary leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          </div>
        )}

      {/* Project Details */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Technologies */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="text-sm bg-darkest text-text-on-dark px-3 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* ATS Hidden Keywords Section - For automated systems */}
          <section className="sr-only" aria-hidden="true">
            <h2>Technical Skills and Keywords</h2>
            <div>
              {project.keywords.map(keyword => (
                <span key={keyword}>{keyword}, </span>
              ))}
            </div>
            <div>
              <span>
                React Developer, Next.js Developer, TypeScript Developer,
                Frontend Engineer,{' '}
              </span>
              <span>JavaScript Expert, Web Developer, Software Engineer, </span>
              <span>UI Developer, UX Developer, Component Developer, </span>
              <span>
                Full Stack Developer, Mobile Developer, iOS Developer,{' '}
              </span>
              <span>
                Performance Optimization, Accessibility, WCAG Compliance,{' '}
              </span>
              <span>
                Design Systems, Component Libraries, API Integration,{' '}
              </span>
              <span>
                State Management, Responsive Design, Cross Platform
                Development,{' '}
              </span>
              <span>
                Modern JavaScript, ES6+, CSS-in-JS, Tailwind CSS, SCSS,{' '}
              </span>
              <span>Git, Version Control, Agile Development, Testing, </span>
              <span>Build Tools, Webpack, Vite, Turbopack, ESLint, </span>
              <span>MongoDB, Database Design, Authentication, Security, </span>
              <span>Progressive Web Apps, PWA, Service Workers, </span>
              <span>Code Splitting, Lazy Loading, Image Optimization, </span>
              <span>SEO, Search Engine Optimization, Core Web Vitals, </span>
              <span>User Experience, User Interface, Interaction Design, </span>
              <span>
                Project Management, Technical Leadership, Code Review,{' '}
              </span>
              <span>Documentation, Technical Writing, Mentoring, </span>
              <span>Problem Solving, Debugging, Performance Analysis, </span>
              <span>Cross Browser Compatibility, Browser Testing, </span>
              <span>
                CI/CD, Continuous Integration, Continuous Deployment,{' '}
              </span>
              <span>Version Control, Git Flow, Feature Branches, </span>
              <span>Code Quality, Clean Code, SOLID Principles, </span>
              <span>
                Architecture Patterns, Design Patterns, Best Practices
              </span>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Features */}
          <div className="bg-light-neutral border border-medium-green rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-4">
              Key Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.performance.map(feature => (
                <span
                  key={feature}
                  className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-medium-green/20 rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-4">
              More Projects
            </h3>
            <Link
              href="/work"
              className="text-text-primary font-medium hover:text-text-secondary transition-colors"
            >
              ← Back to all projects
            </Link>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProjectSchema(project.project)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(`/work/${slug}`)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getArticleSchema(project.project, slug)),
        }}
      />
    </div>
  );
}
