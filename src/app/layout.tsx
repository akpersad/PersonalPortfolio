import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CoreWebVitals from '@/components/CoreWebVitals';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import {
  getPersonSchema,
  getWebsiteSchema,
  getOrganizationSchema,
  getProfessionalServiceSchema,
  getFAQSchema,
} from '@/lib/seo';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewpersad.dev'),
  title: 'Andrew Persad - Lead Frontend Engineer | React & Next.js Expert',
  description:
    'Lead Frontend Engineer specializing in React/Next.js, design systems, and accessible enterprise UIs. 8+ years building scalable frontend applications for Fortune 500 companies.',
  keywords:
    'React, Next.js, TypeScript, Frontend Engineer, Design Systems, Accessibility, Performance, Storybook, Lead Developer, Enterprise Software, WCAG, Component Libraries, Deloitte Digital',
  authors: [{ name: 'Andrew Persad' }],
  creator: 'Andrew Persad',
  publisher: 'Andrew Persad',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Andrew Persad - Lead Frontend Engineer',
    description:
      'Lead Frontend Engineer specializing in React/Next.js, design systems, and accessible enterprise UIs. 8+ years building scalable frontend applications.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Andrew Persad Portfolio',
    url: 'https://andrewpersad.dev',
    images: [
      {
        url: 'https://andrewpersad.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andrew Persad - Lead Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andrewpersad',
    creator: '@andrewpersad',
    title: 'Andrew Persad - Lead Frontend Engineer',
    description:
      'Lead Frontend Engineer specializing in React/Next.js, design systems, and accessible enterprise UIs.',
    images: ['https://andrewpersad.dev/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://andrewpersad.dev',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Skip to main content link for screen readers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-green text-text-on-dark px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <Navigation />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <CoreWebVitals />
        <PerformanceMonitor />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getProfessionalServiceSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFAQSchema()),
          }}
        />
      </body>
    </html>
  );
}
