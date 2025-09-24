import type { Metadata } from 'next';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
  title: 'Projects - Andrew Persad Frontend Portfolio | React & TypeScript',
  description:
    'Frontend development projects showcasing React, TypeScript, and modern web technologies. Component libraries, accessibility, and performance focus.',
  keywords:
    'React projects, Next.js portfolio, TypeScript development, frontend projects, web development, component libraries, accessibility, performance optimization',
  openGraph: {
    title: 'Projects - Andrew Persad Frontend Portfolio',
    description:
      'Frontend development projects showcasing React, TypeScript, and modern web technologies.',
    type: 'website',
    url: 'https://andrewpersad.dev/work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Andrew Persad Frontend Portfolio',
    description:
      'Frontend development projects showcasing React, TypeScript, and modern web technologies.',
  },
  alternates: {
    canonical: 'https://andrewpersad.dev/work',
  },
};

export default function Work() {
  return <WorkClient />;
}
