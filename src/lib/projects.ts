export interface Project {
  project: string;
  shortDescription: string;
  description: string;
  repo: Array<{ web: string; iOS?: string }>;
  link: string;
  images: Array<{ web: string; mobile: string; iOS?: string }>;
  stack: string[];
  keywords: string[];
  role: string;
  complexity: string;
  architecture: string;
  performance: string[];
  testing: string[];
  deployment: string[];
  collaboration: string;
  impact: string;
  seniority: string;
  scalability: string;
  maintainability: string;
  experimental?: boolean;
  aiPowered?: boolean;
  crossPlatform?: boolean;
  mobileExpertise?: boolean;
}

export const projects: Project[] = [
  {
    project: 'POKÉ COLLECTOR',
    shortDescription:
      'Modern Pokemon TCG collection app built with Next.js 15. Search the complete card database with advanced filtering, create personal collections, and manage favorites. Features user authentication, responsive design, and real-time search across energy types, subtypes, and sets.',
    description:
      'A comprehensive Pokemon Trading Card Game collection management platform showcasing advanced frontend architecture and user experience design. Built with Next.js 15 App Router, the application demonstrates sophisticated state management, real-time search capabilities, and seamless integration with external APIs. Features include multi-criteria filtering with complex query building, pagination handling for large datasets, responsive design with mobile-first approach, and secure user authentication with collection persistence. The app integrates with the Pokemon TCG API for real-time card data, implements MongoDB for user collection storage, and utilizes Clerk for authentication. Advanced features include advanced search with energy type filtering, subtype categorization, set browsing, and comprehensive card detail views with image optimization.',
    repo: [{ web: 'https://github.com/akpersad/TCG-Demo' }],
    link: 'https://poke-collector-tan.vercel.app/',
    images: [
      {
        web: '/projects/poke-collector-web.png',
        mobile: '/projects/poke-collector-mobile.png',
      },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'SCSS Modules',
      'MongoDB',
      'Clerk Authentication',
      'Pokemon TCG API',
      'Axios',
      'React Hot Toast',
      'Turbopack',
      'ESLint',
      'PostCSS',
    ],
    keywords: [
      'Next.js',
      'React',
      'TypeScript',
      'Frontend Development',
      'Full-Stack Development',
      'API Integration',
      'Database Design',
      'User Authentication',
      'Responsive Design',
      'Mobile-First Design',
      'State Management',
      'Component Architecture',
      'Performance Optimization',
      'Image Optimization',
      'Search Functionality',
      'Data Filtering',
      'Pagination',
      'MongoDB',
      'REST API',
      'Modern JavaScript',
      'ES6+',
      'CSS-in-JS',
      'Tailwind CSS',
      'SCSS',
      'Web Development',
      'Frontend Architecture',
      'User Experience',
      'UI/UX Design',
      'Progressive Web App',
      'Client-Side Rendering',
      'Server-Side Rendering',
    ],
    // Hidden ATS fields (not displayed in UI)
    role: 'Senior Frontend Developer',
    complexity: 'Advanced',
    architecture: 'Component-Based',
    performance: [
      'Image Optimization',
      'Lazy Loading',
      'Code Splitting',
      'API Caching',
    ],
    testing: ['Unit Testing', 'Integration Testing'],
    deployment: ['Vercel', 'CI/CD'],
    collaboration: 'Solo Project',
    impact: 'Production Ready',
    seniority: 'Senior Level',
    scalability: 'High',
    maintainability: 'Excellent',
  },
  {
    project: 'Protein Quality Calculator',
    shortDescription:
      'Cross-platform protein quality calculator with web and iOS versions. Calculate quality-adjusted protein using scientific DIAAS/PDCAAS scores. Features 50+ protein sources, multi-source calculations, history tracking, and educational content across platforms.',
    description:
      'A sophisticated cross-platform nutrition calculation platform demonstrating advanced frontend engineering and mobile development expertise. The web version, built with Next.js 15 and TypeScript, showcases expert-level state management using React Context API, custom hooks for data persistence, and advanced form handling with validation. The native iOS version, built with Swift 5.0 and SwiftUI, demonstrates modern iOS architecture patterns including MVVM, Core Data integration, and native iOS design patterns. Both platforms feature multi-source protein calculations with percentage weighting, scientific DIAAS/PDCAAS score integration, comprehensive protein database with 50+ sources, calculation history with persistent storage, and educational content delivery. The project demonstrates advanced TypeScript usage with strict typing, custom utility functions for mathematical calculations, responsive design with Tailwind CSS 4, modern React patterns including custom hooks and context providers, and cross-platform development with shared business logic. Advanced features include data export/import functionality, calculation statistics, haptic feedback integration (iOS), and comprehensive error handling with platform-specific user feedback.',
    repo: [
      {
        web: 'https://github.com/akpersad/ProteinCheckerWeb',
        iOS: 'https://github.com/akpersad/ProteinCheckerSwift',
      },
    ],
    link: 'https://protein-checker-web.vercel.app/',
    images: [
      {
        web: '/projects/protein-checker-web.png',
        mobile: '/projects/protein-checker-mobile.png',
        iOS: '/projects/protein-checker-ios.png',
      },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Headless UI',
      'Heroicons',
      'React Context API',
      'Custom Hooks',
      'Local Storage',
      'UUID',
      'Swift 5.0',
      'SwiftUI',
      'iOS 17+',
      'Core Data',
      'UserDefaults',
      'JSON Encoding/Decoding',
      'Combine Framework',
      'Async/Await',
      'MVVM Architecture',
      'Protocol-Oriented Programming',
      'Generics',
      'Turbopack',
      'ESLint',
      'Husky',
      'PostCSS',
      'Xcode',
    ],
    keywords: [
      'Next.js',
      'React',
      'TypeScript',
      'Frontend Development',
      'Advanced TypeScript',
      'State Management',
      'React Context',
      'Custom Hooks',
      'Form Handling',
      'Data Validation',
      'Mathematical Calculations',
      'Scientific Computing',
      'Data Persistence',
      'Local Storage',
      'Responsive Design',
      'Tailwind CSS',
      'Headless UI',
      'Component Design',
      'User Interface',
      'User Experience',
      'Data Visualization',
      'Performance Optimization',
      'Modern React Patterns',
      'Frontend Architecture',
      'Web Development',
      'JavaScript',
      'ES6+',
      'CSS-in-JS',
      'Progressive Web App',
      'Client-Side Application',
      'Data Management',
      'Error Handling',
      'User Feedback',
      'Accessibility',
      'Cross-Browser Compatibility',
      'iOS Development',
      'Swift',
      'SwiftUI',
      'Mobile Development',
      'Native iOS',
      'iOS Architecture',
      'MVVM Pattern',
      'Core Data',
      'JSON Handling',
      'Protocol-Oriented Programming',
      'Generics',
      'Async/Await',
      'Combine Framework',
      'Swift Concurrency',
      'iOS Design Patterns',
      'Mobile UX',
      'Adaptive Layouts',
      'Navigation Patterns',
      'Haptic Feedback',
      'Cross-Platform Development',
      'Mobile Architecture',
      'iOS Performance',
      'Memory Management',
      'ARC',
      'iOS Testing',
      'Xcode',
      'iOS Simulator',
      'App Store Guidelines',
      'iOS Human Interface Guidelines',
    ],
    // Hidden ATS fields (not displayed in UI)
    role: 'Lead Frontend Developer',
    complexity: 'Expert',
    architecture: 'Cross-Platform',
    performance: [
      'Data Persistence',
      'Local Storage',
      'Memory Management',
      'iOS Performance',
    ],
    testing: ['Unit Testing', 'Integration Testing', 'iOS Testing'],
    deployment: ['Vercel', 'App Store', 'CI/CD'],
    collaboration: 'Solo Project',
    impact: 'Production Ready',
    seniority: 'Lead Level',
    scalability: 'High',
    maintainability: 'Excellent',
    crossPlatform: true,
    mobileExpertise: true,
  },
];
