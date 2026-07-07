/**
 * SEO Utilities and Structured Data
 * Comprehensive SEO implementation with structured data schemas
 */

import { studyEntries, type CaseStudy, type WorkEntry } from './work';

// Base URL for the site
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://andrewpersad.com';

// Person Schema for homepage
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Andrew Persad',
  jobTitle: 'Lead Software Engineer',
  description:
    'Lead Software Engineer at Deloitte Digital with extensive experience in React, Next.js, TypeScript, design systems, and performance optimization for Fortune 500 companies.',
  url: BASE_URL,
  sameAs: [
    'https://github.com/akpersad',
    'https://www.linkedin.com/in/andrew-persad-aa496432/',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Design Systems',
    'Web Accessibility',
    'Performance Optimization',
    'Component Libraries',
    'Enterprise Software',
  ],
  hasCredential: [
    'Salesforce Certified Admin',
    'Salesforce Certified Platform Developer 1',
    'Certified Associate Configurator - Unqork',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Deloitte Digital',
  },
});

// Article schema for a written case study, built from the typed work entry
export const getStudySchema = (entry: WorkEntry & { study: CaseStudy }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: entry.study.headline,
  description: entry.study.description,
  datePublished: entry.study.published,
  dateModified: entry.study.updated ?? entry.study.published,
  author: {
    '@type': 'Person',
    name: 'Andrew Persad',
    url: BASE_URL,
  },
  publisher: {
    '@type': 'Person',
    name: 'Andrew Persad',
    url: BASE_URL,
  },
  url: `${BASE_URL}/work/${entry.slug}`,
  mainEntityOfPage: `${BASE_URL}/work/${entry.slug}`,
  inLanguage: 'en-US',
  about: {
    '@type': 'SoftwareSourceCode',
    name: entry.title,
    codeRepository: entry.links.repo,
    url: entry.links.live,
    programmingLanguage: entry.stack,
  },
});

// BreadcrumbList Schema for navigation
export const getBreadcrumbSchema = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    breadcrumbs.push({
      '@type': 'ListItem',
      position: index + 2,
      name: name,
      item: `${BASE_URL}${currentPath}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };
};

// Website Schema for the entire site
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Andrew Persad - Lead Software Engineer',
  description:
    'Professional portfolio of Andrew Persad, Lead Software Engineer specializing in React, Next.js, TypeScript, and modern frontend development.',
  url: BASE_URL,
  author: {
    '@type': 'Person',
    name: 'Andrew Persad',
  },
  publisher: {
    '@type': 'Person',
    name: 'Andrew Persad',
  },
});

// Generate canonical URL
export const getCanonicalUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

// Generate sitemap data
export const getSitemapData = () => {
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/work', priority: 0.9, changefreq: 'weekly' },
    { url: '/resume', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/colophon', priority: 0.4, changefreq: 'monthly' },
  ];

  const studyPages = studyEntries.map(entry => ({
    url: `/work/${entry.slug}`,
    priority: 0.8,
    changefreq: 'monthly',
  }));

  return [...staticPages, ...studyPages];
};
