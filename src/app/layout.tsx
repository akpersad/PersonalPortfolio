import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getPersonSchema, getWebsiteSchema } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  axes: ['opsz'],
});

/* Runs before paint so the correct theme class is on <html> before anything
   renders. Stored preference wins; otherwise follow the OS. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewpersad.com'),
  title: 'Andrew Persad | Lead Software Engineer',
  description:
    'Lead Software Engineer building accessible, high-traffic web applications. Enterprise platforms for HP, Eli Lilly, and Amazon by day; five self-built products shipped and live by night.',
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
    title: 'Andrew Persad | Lead Software Engineer',
    description:
      'Lead Software Engineer building accessible, high-traffic web applications. Enterprise platforms by day, five self-built products by night.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Andrew Persad',
    url: 'https://andrewpersad.com',
    images: [
      {
        url: 'https://andrewpersad.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andrew Persad, Lead Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Persad | Lead Software Engineer',
    description:
      'Lead Software Engineer building accessible, high-traffic web applications. Enterprise platforms by day, five self-built products by night.',
    images: ['https://andrewpersad.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://andrewpersad.com',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Skip link in its own landmark: axe's region rule only exempts
           bare skip links via a heuristic that streamed (async) pages defeat. */}
        <nav aria-label="Skip link">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-solid text-accent-contrast px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
        </nav>

        <Navigation />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />

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
      </body>
    </html>
  );
}
