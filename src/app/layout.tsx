import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrew Persad - Lead Frontend Engineer",
  description: "Lead Frontend Engineer focused on React/Next.js, design systems, performance, and accessible enterprise UIs. I build scalable, composable front-ends with measurable impact.",
  keywords: "React, Next.js, TypeScript, Frontend Engineer, Design Systems, Accessibility, Performance, Storybook, Lead Developer",
  authors: [{ name: "Andrew Persad" }],
  openGraph: {
    title: "Andrew Persad - Lead Frontend Engineer",
    description: "Lead Frontend Engineer focused on React/Next.js, design systems, performance, and accessible enterprise UIs.",
    type: "website",
    locale: "en_US",
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
      </body>
    </html>
  );
}