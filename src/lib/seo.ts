/**
 * SEO Utilities and Structured Data
 * Comprehensive SEO implementation with structured data schemas
 */

import { projects } from './projects';

// Base URL for the site
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://andrewpersad.dev';

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
    'JavaScript',
    'HTML5',
    'CSS3',
    'Design Systems',
    'Web Accessibility',
    'Performance Optimization',
    'Component Libraries',
    'SSO Integration',
    'WCAG Compliance',
    'React Testing Library',
    'Storybook',
    'Tailwind CSS',
    'SCSS',
    'CSS-in-JS',
    'Contentful',
    'Adobe Experience Manager',
    'MUI X Charts',
    'Data Visualization',
    'Cross-browser Compatibility',
    'Responsive Design',
    'API Integration',
    'Memoization',
    'Render Profiling',
    'Build Tools',
    'Git',
    'Jest',
    'axe DevTools',
    'Lighthouse',
    'Enterprise Software',
    'Fortune 500',
    'Veneer Design System',
    'Meridian Design System',
    'MongoDB',
    'Authentication',
    'Security',
    'Progressive Web Apps',
    'Code Splitting',
    'Lazy Loading',
    'Image Optimization',
    'SEO',
    'Core Web Vitals',
    'User Experience',
    'User Interface',
    'Technical Leadership',
    'Code Review',
    'Documentation',
    'Problem Solving',
    'Debugging',
    'Performance Analysis',
    'Cross Browser Compatibility',
    'CI/CD',
    'Version Control',
    'Agile Development',
    'Clean Code',
    'SOLID Principles',
    'Architecture Patterns',
    'Design Patterns',
    'Best Practices',
  ],
  alumniOf: 'University of Technology',
  workLocation: {
    '@type': 'Place',
    name: 'Remote / United States',
  },
  hasCredential: [
    'Salesforce Platform Developer I (PD1)',
    'Salesforce Administrator',
    'Unqork Configurator Certification',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Deloitte Digital',
    description:
      'Global digital consultancy specializing in digital transformation and technology solutions',
  },
});

// SoftwareSourceCode Schema for projects (excluding Cosmic Recipes)
export const getProjectSchema = (projectName: string) => {
  const project = projects.find(p => p.project === projectName);
  if (!project || projectName === 'Cosmic Recipe Generator') return null;

  const slug = projectName.toLowerCase().replace(/\s+/g, '-');

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
    softwareVersion: '1.0.0',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    codeRepository: project.repo[0]?.web || project.repo[0]?.iOS,
    url: `${BASE_URL}/work/${slug}`,
    keywords: project.keywords,
    featureList: project.performance,
    screenshot: project.images?.[0]?.web,
    license: 'MIT',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
  name: 'Andrew Persad - Lead Frontend Engineer',
  description:
    'Professional portfolio of Andrew Persad, Lead Software Engineer specializing in React, Next.js, TypeScript, and modern frontend development.',
  url: BASE_URL,
  author: {
    '@type': 'Person',
    name: 'Andrew Persad',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Person',
    name: 'Andrew Persad',
  },
});

// Organization Schema for Deloitte Digital
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Deloitte Digital',
  description:
    'Global digital consultancy specializing in digital transformation and technology solutions for Fortune 500 companies.',
  url: 'https://www2.deloitte.com/us/en/pages/consulting/solutions/digital-transformation.html',
  logo: 'https://www2.deloitte.com/content/dam/Deloitte/us/Images/promo_images/us-deloitte-digital-logo.png',
  sameAs: [
    'https://www.linkedin.com/company/deloitte-digital/',
    'https://twitter.com/deloittedigital',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
});

// Professional Service Schema
export const getProfessionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Andrew Persad - Frontend Development Services',
  description:
    'Professional frontend development services specializing in React, Next.js, TypeScript, design systems, and performance optimization.',
  provider: {
    '@type': 'Person',
    name: 'Andrew Persad',
    email: 'contact@andrewpersad.dev',
    url: BASE_URL,
  },
  serviceType: 'Frontend Development',
  areaServed: 'Worldwide',
  availableLanguage: 'English',
  offers: {
    '@type': 'Offer',
    description: 'Lead Frontend Engineer services for enterprise applications',
    category: 'Software Development',
    areaServed: 'Worldwide',
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
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    url: `${BASE_URL}/work/${slug}`,
    image: project.images?.[0]?.web,
    keywords: project.keywords.join(', '),
    articleSection: 'Technology',
    wordCount: 500,
    inLanguage: 'en-US',
  };
};

// FAQ Schema for common questions
export const getFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What technologies does Andrew specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Andrew specializes in React, Next.js, TypeScript, design systems, performance optimization, accessibility (WCAG), and modern frontend development practices. He has extensive experience with enterprise technologies including Contentful, Adobe Experience Manager, and various design systems.',
      },
    },
    {
      '@type': 'Question',
      name: "What is Andrew's current role?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Andrew is currently a Lead Software Engineer at Deloitte Digital, where he works on enterprise-scale applications for Fortune 500 clients including HP, Eli Lilly, and Amazon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Andrew available for new opportunities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Andrew is currently seeking Lead Frontend Engineer opportunities. He is open to remote, hybrid, or on-site positions and can be contacted through the contact form on this website.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of projects has Andrew worked on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Andrew has worked on a variety of projects including Pokemon TCG collection apps, protein quality calculators with iOS versions, and experimental AI-powered applications. He specializes in building scalable, accessible web applications with modern technologies.',
      },
    },
  ],
});

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
  siteName: 'Andrew Persad - Lead Frontend Engineer',
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
  ];

  const projectPages = projects
    .filter(project => project.project !== 'Cosmic Recipe Generator')
    .map(project => ({
      url: `/work/${project.project.toLowerCase().replace(/\s+/g, '-')}`,
      priority: 0.8,
      changefreq: 'monthly',
    }));

  return [...staticPages, ...projectPages];
};
