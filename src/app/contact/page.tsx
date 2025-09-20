import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact - Andrew Persad',
    description: 'Get in touch with Andrew Persad, Lead Frontend Engineer. Available for Lead Frontend Engineer roles and consulting opportunities.',
};

export default function Contact() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Get In Touch</h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    I&apos;m currently seeking Lead Frontend Engineer opportunities.
                    Let&apos;s discuss how I can contribute to your team&apos;s success.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">Send a Message</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 border border-medium-green rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent bg-light-neutral text-text-primary"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 border border-medium-green rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent bg-light-neutral text-text-primary"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-2">
                                Inquiry Type
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="w-full px-4 py-3 border border-medium-green rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent bg-light-neutral text-text-primary"
                            >
                                <option value="">Select an option</option>
                                <option value="job-opportunity">Job Opportunity</option>
                                <option value="consulting">Consulting Project</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-medium-green rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent bg-light-neutral text-text-primary resize-vertical"
                                placeholder="Tell me about the opportunity or project you'd like to discuss..."
                            />
                        </div>

                        {/* Honeypot for spam protection */}
                        <input
                            type="text"
                            name="website"
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="w-full bg-primary-green text-text-on-dark py-3 px-6 rounded-lg font-medium hover:bg-dark-green transition-colors focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-6">Let&apos;s Connect</h2>

                    <div className="space-y-6">
                        <div className="bg-light-neutral border border-medium-green rounded-lg p-6">
                            <h3 className="font-semibold text-text-primary mb-4">Direct Contact</h3>
                            <div className="space-y-3">
                                <a
                                    href="mailto:andrew@example.com"
                                    className="flex items-center gap-3 text-text-secondary hover:text-primary-green transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    andrew@example.com
                                </a>

                                <a
                                    href="https://linkedin.com/in/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-text-secondary hover:text-primary-green transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                    </svg>
                                    LinkedIn Profile
                                </a>

                                <a
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-text-secondary hover:text-primary-green transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                    GitHub Profile
                                </a>
                            </div>
                        </div>

                        <div className="bg-medium-green/20 rounded-lg p-6">
                            <h3 className="font-semibold text-text-primary mb-3">Current Status</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-primary-green rounded-full"></div>
                                <span className="text-text-primary font-medium">Available for Lead Frontend Roles</span>
                            </div>
                            <p className="text-sm text-text-secondary">
                                Looking for opportunities starting early 2024. Open to remote, hybrid, or on-site positions.
                            </p>
                        </div>

                        <div className="bg-light-neutral border border-medium-green rounded-lg p-6">
                            <h3 className="font-semibold text-text-primary mb-3">Response Time</h3>
                            <p className="text-sm text-text-secondary">
                                I typically respond to messages within 24-48 hours. For urgent inquiries,
                                please mention it in your subject line.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
