import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About - Andrew Persad',
    description: 'Learn more about Andrew Persad, Lead Frontend Engineer with expertise in React, Next.js, TypeScript, design systems, and performance optimization.',
};

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold text-text-primary mb-8">About Me</h1>

                {/* Quick Facts Panel */}
                <div className="bg-light-neutral border border-medium-green rounded-lg p-6 mb-8 not-prose">
                    <h2 className="text-xl font-semibold text-text-secondary mb-4">Quick Facts</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-text-primary mb-2">Core Strengths</h3>
                            <ul className="text-sm text-text-primary space-y-1">
                                <li>React & Next.js Architecture</li>
                                <li>TypeScript & Modern JavaScript</li>
                                <li>Design Systems & Component Libraries</li>
                                <li>Web Accessibility (a11y)</li>
                                <li>Performance Optimization</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-text-primary mb-2">Tools & Technologies</h3>
                            <ul className="text-sm text-text-primary space-y-1">
                                <li>Storybook, Testing Library, RTL</li>
                                <li>Contentful, AEM, Headless CMS</li>
                                <li>Tailwind CSS, SCSS, CSS-in-JS</li>
                                <li>axe DevTools, Lighthouse</li>
                                <li>Webpack, Vite, Build Tools</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-medium text-text-primary mb-2">Certifications</h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="bg-medium-green text-text-primary px-3 py-1 rounded">Salesforce Admin</span>
                            <span className="bg-medium-green text-text-primary px-3 py-1 rounded">Salesforce PD1</span>
                            <span className="bg-medium-green text-text-primary px-3 py-1 rounded">Unqork Configurator</span>
                        </div>
                    </div>
                </div>

                {/* Extended Bio - Placeholder */}
                <div className="space-y-6 text-text-primary">
                    <p className="text-lg">
                        I&apos;m a Lead Frontend Engineer with 8+ years of experience building scalable, accessible web applications.
                        My passion lies in creating pixel-perfect interfaces that don&apos;t just look great—they perform exceptionally
                        and provide inclusive experiences for all users.
                    </p>

                    <p>
                        Throughout my career, I&apos;ve specialized in developing responsive, accessible interfaces with a focus on
                        pixel-perfect execution and cross-browser reliability. My work spans SSO-secured platforms, comprehensive
                        design systems, and data-driven dashboards that turn complex information into actionable insights.
                    </p>

                    <p>
                        I&apos;ve built modular component libraries and internal design systems from scratch, standardizing UX patterns
                        and meeting accessibility requirements. These components are designed to be white-label and highly customizable,
                        accommodating diverse brand guidelines and client color schemes.
                    </p>

                    <p>
                        Performance optimization is another area where I excel—I improve UI performance through targeted memoization,
                        render profiling, and architecture-level optimizations that reduce latency across critical paths. I also create
                        starter kits and tooling that enable repeatable, high-quality delivery across diverse client teams and domains.
                    </p>

                    <p>
                        I collaborate closely with platform teams, designers, and stakeholders to turn telemetry into actionable insights
                        and ensure that technical solutions align with business objectives. My approach combines technical excellence with
                        clear communication and strategic thinking.
                    </p>
                </div>
            </div>
        </div>
    );
}
