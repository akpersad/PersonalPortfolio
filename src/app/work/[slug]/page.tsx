import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

// This would typically come from a database or CMS
const projects = {
    'poke-collector': {
        title: 'Poke Collector',
        description: 'Interactive Pokemon collection app with advanced search and filtering capabilities',
        timeframe: '2024',
        role: 'Full-stack Developer',
        summary: 'A comprehensive Pokemon collection application that demonstrates modern React patterns, API integration, and state management.',
        problem: 'Pokemon fans need an easy way to track their collection, discover new Pokemon, and manage their favorites across different generations.',
        solution: 'Built an interactive web app that fetches data from the Pokemon API, implements advanced filtering and search, and uses local storage for persistent favorites.',
        impact: [
            'Demonstrates complex state management with React hooks',
            'Shows proficiency in API integration and error handling',
            'Highlights responsive design and accessibility considerations',
            'Showcases modern development practices and clean code architecture'
        ],
        stack: ['React', 'TypeScript', 'Pokemon API', 'Local Storage/IndexedDB', 'CSS Modules', 'React Query'],
        features: [
            'Search Pokemon by name, type, or generation',
            'Advanced filtering with multiple criteria',
            'Favorites system with persistent storage',
            'Responsive design for all screen sizes',
            'Loading states and error handling',
            'Accessibility features and keyboard navigation'
        ],
        repo: 'https://github.com/yourusername/poke-collector',
        live: 'https://poke-collector.yourportfolio.com',
        status: 'placeholder'
    },
    'protein-checker': {
        title: 'Protein Checker',
        description: 'Nutrition tracking app with barcode scanning and macro calculation features',
        timeframe: '2024',
        role: 'Full-stack Developer',
        summary: 'A progressive web app for tracking protein intake and analyzing nutritional data with visual charts and goal setting.',
        problem: 'Fitness enthusiasts and health-conscious individuals need an easy way to track their protein intake and monitor their nutritional goals.',
        solution: 'Created a PWA that allows users to scan barcodes, search food databases, log meals, and visualize their nutritional data with interactive charts.',
        impact: [
            'Showcases progressive web app development',
            'Demonstrates data visualization with Chart.js',
            'Shows integration with third-party nutrition APIs',
            'Highlights offline-first approach and service workers'
        ],
        stack: ['React', 'TypeScript', 'Nutrition API', 'Chart.js', 'PWA', 'Service Workers', 'IndexedDB'],
        features: [
            'Barcode scanning for quick food entry',
            'Comprehensive food database search',
            'Daily, weekly, and monthly tracking',
            'Interactive charts and progress visualization',
            'Goal setting and achievement tracking',
            'Offline functionality with data sync'
        ],
        repo: 'https://github.com/yourusername/protein-checker',
        live: 'https://protein-checker.yourportfolio.com',
        status: 'placeholder'
    },
    'component-playground': {
        title: 'Component Playground',
        description: 'Design system documentation site with live component previews and interactive examples',
        timeframe: '2024',
        role: 'Frontend Architect',
        summary: 'A comprehensive design system documentation site that showcases component library architecture, design tokens, and developer tooling.',
        problem: 'Development teams need a centralized place to discover, test, and understand design system components with proper documentation and live examples.',
        solution: 'Built a documentation site using Storybook and MDX that provides interactive component previews, design token visualization, and comprehensive usage guidelines.',
        impact: [
            'Demonstrates expertise in design system architecture',
            'Shows advanced component library development skills',
            'Highlights documentation and developer experience focus',
            'Showcases modern tooling and build processes'
        ],
        stack: ['React', 'TypeScript', 'Storybook', 'MDX', 'Design Tokens', 'Rollup', 'Jest', 'Testing Library'],
        features: [
            'Interactive component playground',
            'Comprehensive design token system',
            'Automated visual regression testing',
            'Accessible component examples',
            'Code generation and copy functionality',
            'Dark mode and theme switching'
        ],
        repo: 'https://github.com/yourusername/component-playground',
        live: 'https://components.yourportfolio.com',
        status: 'placeholder'
    }
};

type ProjectSlug = keyof typeof projects;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for static export
export async function generateStaticParams() {
    return Object.keys(projects).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects[slug as ProjectSlug];

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: `${project.title} - Andrew Persad`,
        description: project.description,
        openGraph: {
            title: `${project.title} - Andrew Persad`,
            description: project.description,
            type: 'article',
        },
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects[slug as ProjectSlug];

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Link href="/" className="hover:text-primary-green transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/work" className="hover:text-primary-green transition-colors">Work</Link>
                    <span>/</span>
                    <span className="text-text-primary">{project.title}</span>
                </div>
            </nav>

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">{project.title}</h1>
                <p className="text-lg text-text-secondary mb-6">{project.description}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {project.status !== 'placeholder' && (
                        <>
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary-green text-text-on-dark px-6 py-3 rounded-lg font-medium hover:bg-dark-green transition-colors inline-flex items-center gap-2"
                            >
                                View Live Demo
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-medium-green text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-medium-green hover:text-text-primary transition-colors inline-flex items-center gap-2"
                            >
                                View Code
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </>
                    )}
                </div>

                {project.status === 'placeholder' && (
                    <div className="bg-medium-green/20 rounded-lg p-6 mt-6">
                        <p className="text-text-secondary">
                            🚧 This project is currently in development. Check back soon for the full case study and live demo!
                        </p>
                    </div>
                )}
            </div>

            {/* Project Details */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-semibold text-text-primary mb-4">Overview</h2>
                        <p className="text-text-primary leading-relaxed">{project.summary}</p>
                    </section>

                    {/* Problem & Solution */}
                    <section>
                        <h2 className="text-2xl font-semibold text-text-primary mb-4">Problem & Solution</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-text-secondary mb-2">The Challenge</h3>
                                <p className="text-text-primary leading-relaxed">{project.problem}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-text-secondary mb-2">My Approach</h3>
                                <p className="text-text-primary leading-relaxed">{project.solution}</p>
                            </div>
                        </div>
                    </section>

                    {/* Key Features */}
                    <section>
                        <h2 className="text-2xl font-semibold text-text-primary mb-4">Key Features</h2>
                        <ul className="space-y-2">
                            {project.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-text-primary">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Impact */}
                    <section>
                        <h2 className="text-2xl font-semibold text-text-primary mb-4">Technical Impact</h2>
                        <ul className="space-y-2">
                            {project.impact.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-medium-green rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-text-primary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Project Info */}
                    <div className="bg-light-neutral border border-medium-green rounded-lg p-6">
                        <h3 className="font-semibold text-text-primary mb-4">Project Info</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm text-text-secondary block">Role</span>
                                <span className="text-text-primary font-medium">{project.role}</span>
                            </div>
                            <div>
                                <span className="text-sm text-text-secondary block">Timeline</span>
                                <span className="text-text-primary font-medium">{project.timeframe}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-light-neutral border border-medium-green rounded-lg p-6">
                        <h3 className="font-semibold text-text-primary mb-4">Tech Stack</h3>
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

                    {/* Navigation */}
                    <div className="bg-medium-green/20 rounded-lg p-6">
                        <h3 className="font-semibold text-text-primary mb-4">More Projects</h3>
                        <Link
                            href="/work"
                            className="text-primary-green font-medium hover:text-text-secondary transition-colors"
                        >
                            ← Back to all projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
