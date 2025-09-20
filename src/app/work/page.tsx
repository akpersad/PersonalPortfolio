import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Work - Andrew Persad',
    description: 'Featured projects by Andrew Persad showcasing expertise in React, Next.js, design systems, and frontend architecture.',
};

// Placeholder project data - this will be moved to lib/projects.ts later
const projects = [
    {
        slug: 'poke-collector',
        title: 'Poke Collector',
        summary: 'Interactive Pokemon collection app with search, filters, and favorites functionality.',
        timeframe: '2024',
        stack: ['React', 'TypeScript', 'Pokemon API', 'IndexedDB'],
        featured: true,
        status: 'placeholder', // Will be removed when real content is added
    },
    {
        slug: 'protein-checker',
        title: 'Protein Checker',
        summary: 'Nutrition tracking app with barcode scanning and macro calculations.',
        timeframe: '2024',
        stack: ['React', 'TypeScript', 'Nutrition API', 'Chart.js', 'PWA'],
        featured: true,
        status: 'placeholder',
    },
    {
        slug: 'component-playground',
        title: 'Component Playground',
        summary: 'Design system documentation site with live component previews and interactive examples.',
        timeframe: '2024',
        stack: ['React', 'TypeScript', 'Storybook', 'MDX', 'Design Tokens'],
        featured: true,
        status: 'placeholder',
    },
];

export default function Work() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Featured Work</h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    A selection of personal projects that showcase my expertise in frontend development,
                    design systems, and modern web technologies.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="bg-light-neutral border border-medium-green rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-xl font-semibold text-text-primary">{project.title}</h2>
                            <span className="text-xs text-text-secondary bg-medium-green px-2 py-1 rounded">
                                {project.timeframe}
                            </span>
                        </div>

                        <p className="text-text-primary mb-4 text-sm leading-relaxed">
                            {project.summary}
                        </p>

                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-text-secondary mb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
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
                            <button
                                className="px-4 py-2 border border-medium-green text-text-secondary text-sm rounded hover:bg-medium-green hover:text-text-primary transition-colors"
                                disabled={project.status === 'placeholder'}
                            >
                                {project.status === 'placeholder' ? 'Coming Soon' : 'Live Demo'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-16">
                <div className="bg-medium-green/20 rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">More Projects Coming</h2>
                    <p className="text-text-secondary mb-6">
                        I&apos;m continuously working on new projects and improving existing ones.
                        Follow my GitHub for the latest updates.
                    </p>
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-darkest text-text-on-dark px-6 py-3 rounded font-medium hover:bg-dark-green transition-colors"
                    >
                        View GitHub Profile
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
