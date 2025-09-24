import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light-neutral py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                Lead Software Engineer
              </h1>

              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                I develop responsive, accessible front-end interfaces with
                pixel-perfect precision. Building modern web applications with
                React, Next.js, and TypeScript—delivering measurable performance
                improvements and scalable solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/work"
                  className="bg-primary-green text-text-on-dark px-8 py-4 rounded-lg font-semibold hover:bg-dark-green transition-colors inline-flex items-center justify-center"
                >
                  See Selected Work
                </Link>
                <Link
                  href="/resume"
                  className="border border-medium-green text-text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-medium-green hover:text-text-primary transition-colors inline-flex items-center justify-center"
                >
                  Download Resume (PDF)
                </Link>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-medium-green shadow-2xl">
                  <Image
                    src="/icons/avatar_earthy_forest_embedded_v2.svg"
                    alt="Andrew Persad - Lead Frontend Engineer"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-green rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-medium-green rounded-full opacity-15"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini About Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-neutral/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-text-primary mb-6">
            About My Work
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            I architect modern web applications with a focus on performance,
            accessibility, and user experience. My personal projects showcase
            expertise in React, Next.js, TypeScript, and cross-platform
            development—from Pokemon collection apps to nutrition calculators
            and experimental AI-powered experiences.
          </p>
          <Link
            href="/about"
            className="text-text-link-primary font-semibold hover:text-text-secondary transition-colors"
          >
            Learn more about my background →
          </Link>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-text-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-text-secondary">
              Personal projects showcasing technical expertise and creative
              problem-solving across different domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map(project => {
              const slug =
                project.project === 'POKÉ COLLECTOR'
                  ? 'poke-collector'
                  : 'protein-checker';
              return (
                <div
                  key={project.project}
                  className="bg-light-neutral border border-medium-green rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {project.project}
                  </h3>
                  <p className="text-text-secondary mb-4 text-sm">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${slug}`}
                    className="text-text-link-primary font-medium hover:text-text-secondary transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/work"
              className="bg-darkest text-text-on-dark px-8 py-4 rounded-lg font-semibold hover:bg-dark-green transition-colors inline-flex items-center gap-2"
            >
              View All Projects
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-darkest py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-text-on-dark mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-text-muted-on-dark mb-8">
            I&apos;m open to new Lead Software Engineer opportunities where I
            can leverage my experience building modern web applications and
            creative problem-solving. Let&apos;s discuss how I can contribute to
            your team&apos;s success.
          </p>
          <Link
            href="/contact"
            className="bg-primary-green text-text-on-dark px-8 py-4 rounded-lg font-semibold hover:bg-medium-green transition-colors inline-flex items-center gap-2"
          >
            Get In Touch
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </Link>
        </div>
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
              'Lead Software Engineer specializing in React/Next.js, TypeScript, and modern web application development.',
            url: 'https://andrewpersad.com',
            sameAs: [
              'https://github.com/akpersad',
              'https://linkedin.com/in/andrew-persad-aa496432',
            ],
            knowsAbout: [
              'React',
              'Next.js',
              'TypeScript',
              'Design Systems',
              'Web Accessibility',
              'Performance Optimization',
              'Enterprise Software',
              'Component Libraries',
              'SSO Integration',
              'WCAG Compliance',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'Deloitte Digital',
            },
          }),
        }}
      />
    </div>
  );
}
