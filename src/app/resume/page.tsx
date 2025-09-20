import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume - Andrew Persad',
    description: 'Andrew Persad\'s resume - Lead Frontend Engineer with 8+ years of experience in React, Next.js, TypeScript, design systems, and performance optimization.',
};

export default function Resume() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Resume</h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="bg-primary-green text-text-on-dark px-6 py-3 rounded-lg font-medium hover:bg-dark-green transition-colors"
                        disabled
                        title="PDF download coming soon"
                    >
                        Download PDF
                    </button>
                    <button
                        className="border border-medium-green text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-medium-green hover:text-text-primary transition-colors"
                        disabled
                        title="JSON export coming soon"
                    >
                        Export JSON Resume
                    </button>
                </div>
            </div>

            <div className="bg-light-neutral border border-medium-green rounded-lg p-8 mb-8">
                <div className="prose prose-lg max-w-none">
                    {/* Header */}
                    <div className="text-center border-b border-medium-green pb-6 mb-8 not-prose">
                        <h1 className="text-3xl font-bold text-text-primary">Andrew Persad</h1>
                        <h2 className="text-xl text-text-secondary mb-4">Lead Frontend Engineer</h2>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-text-primary">
                            <span>📧 andrew@example.com</span>
                            <span>🔗 linkedin.com/in/yourprofile</span>
                            <span>💻 github.com/yourusername</span>
                            <span>📍 Your Location</span>
                        </div>
                    </div>

                    {/* Professional Summary */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
                            Professional Summary
                        </h2>
                        <p className="text-text-primary leading-relaxed">
                            Lead Frontend Engineer with 8+ years of experience building scalable, accessible web applications.
                            Specialized in React/Next.js architecture, design systems, and performance optimization.
                            Proven track record of leading development teams, creating reusable component libraries,
                            and delivering high-quality user experiences across enterprise-level applications.
                        </p>
                    </section>

                    {/* Core Competencies */}
                    <section className="mb-8 not-prose">
                        <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
                            Core Competencies
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-text-primary mb-3">Frontend Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS/SASS'].map((tech) => (
                                        <span key={tech} className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary mb-3">Tools & Frameworks</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Storybook', 'Testing Library', 'Jest', 'Webpack', 'Vite', 'Git', 'Figma', 'Adobe Creative Suite'].map((tool) => (
                                        <span key={tool} className="text-xs bg-darkest text-text-on-dark px-2 py-1 rounded">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold text-text-primary mb-3">Specializations</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Design Systems', 'Web Accessibility (WCAG)', 'Performance Optimization', 'Component Libraries', 'Responsive Design', 'Cross-browser Compatibility'].map((spec) => (
                                    <span key={spec} className="text-xs bg-medium-green text-text-primary px-2 py-1 rounded">
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
                            <li>• Developed responsive, accessible front-end interfaces from high- and low-fidelity designs with a focus on pixel-perfect precision and cross-browser compatibility</li>
                            <li>• Built a modular component library and internal design system from scratch, standardizing UX patterns and meeting accessibility requirements, with components designed to be white-label and highly customizable</li>
                            <li>• Improved UI performance through targeted memoization, render profiling, and architecture-level optimizations, reducing latency across critical paths</li>
                            <li>• Created starter kits and tooling that enabled repeatable, high quality delivery across diverse client teams and domains</li>
                        </ul>
                    </section>

                    {/* Professional Experience Placeholder */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
                            Professional Experience
                        </h2>
                        <div className="bg-medium-green/20 rounded-lg p-6">
                            <p className="text-text-secondary text-center">
                                Professional experience details will be added here.
                                This section will include specific roles, companies, dates, and detailed accomplishments.
                            </p>
                        </div>
                    </section>

                    {/* Education & Certifications */}
                    <section className="mb-8 not-prose">
                        <h2 className="text-2xl font-semibold text-text-primary border-b-2 border-primary-green pb-2 mb-4">
                            Education & Certifications
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-light-neutral border border-medium-green rounded-lg p-4">
                                <h3 className="font-semibold text-text-primary">Certifications</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="bg-primary-green text-text-on-dark px-3 py-1 rounded text-sm">Salesforce Admin</span>
                                    <span className="bg-primary-green text-text-on-dark px-3 py-1 rounded text-sm">Salesforce PD1</span>
                                    <span className="bg-primary-green text-text-on-dark px-3 py-1 rounded text-sm">Unqork Configurator</span>
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
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Andrew Persad",
                        "jobTitle": "Lead Frontend Engineer",
                        "description": "Lead Frontend Engineer with 8+ years of experience in React, Next.js, TypeScript, design systems, and performance optimization.",
                        "knowsAbout": ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Design Systems", "Web Accessibility", "Performance Optimization"],
                        "hasCredential": ["Salesforce Admin", "Salesforce PD1", "Unqork Configurator"]
                    })
                }}
            />
        </div>
    );
}
