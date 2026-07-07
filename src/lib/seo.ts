/**
 * SEO Utilities and Structured Data
 * Comprehensive SEO implementation with structured data schemas
 */

import { projects, projectSlugs } from './projects';

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

// SoftwareSourceCode Schema for projects
export const getProjectSchema = (projectName: string) => {
  const project = projects.find(p => p.project === projectName);
  if (!project) return null;

  const slug =
    projectSlugs[projectName] ?? projectName.toLowerCase().replace(/\s+/g, '-');

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.project,
    description: project.shortDescription,
    author: {
      '@type': 'Person',
      name: 'Andrew Persad',
      url: BASE_URL,
    },
    programmingLanguage: project.stack,
    runtimePlatform: 'Web Browser',
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    codeRepository: project.repo[0]?.web || project.repo[0]?.iOS,
    url: `${BASE_URL}/work/${slug}`,
    keywords: project.keywords,
    featureList: project.performance,
    screenshot: project.images?.[0]?.web,
    isAccessibleForFree: true,
  };
};

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

// Article Schema for project case studies
export const getArticleSchema = (projectName: string, slug: string) => {
  const project = projects.find(p => p.project === projectName);
  if (!project) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.project} - Project Case Study`,
    description: project.shortDescription,
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
    url: `${BASE_URL}/work/${slug}`,
    image: project.images?.[0]?.web,
    keywords: project.keywords.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
  };
};

// Generate canonical URL
export const getCanonicalUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

// Generate Open Graph data
export const getOpenGraphData = (
  title: string,
  description: string,
  path: string,
  image?: string
) => ({
  title,
  description,
  url: `${BASE_URL}${path}`,
  siteName: 'Andrew Persad - Lead Software Engineer',
  locale: 'en_US',
  type: 'website',
  images: image
    ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
});

// Generate Twitter Card data
export const getTwitterCardData = (
  title: string,
  description: string,
  image?: string
) => ({
  card: 'summary_large_image',
  site: '@andrewpersad',
  creator: '@andrewpersad',
  title,
  description,
  images: image ? [image] : [`${BASE_URL}/twitter-image.jpg`],
});

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

  const projectPages = projects
    .filter(project => projectSlugs[project.project])
    .map(project => ({
      url: `/work/${projectSlugs[project.project]}`,
      priority: 0.8,
      changefreq: 'monthly',
    }));

  return [...staticPages, ...projectPages];
};
