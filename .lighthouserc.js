// Single Lighthouse CI config (the dotted filename is the one lhci loads;
// a second lighthouserc.js silently loses). CI builds the static export
// first (LIGHTHOUSE_CI=true npm run build), then `npx lhci autorun` serves
// ./out and asserts the budgets below on every listed page.
module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      // Explicit list: autodiscovery caps at 5 files alphabetically, which
      // picks 404.html and friends and skips the homepage entirely.
      url: [
        'http://localhost/index.html',
        'http://localhost/work.html',
        'http://localhost/work/fork-in-the-road.html',
        'http://localhost/notes.html',
        'http://localhost/notes/deleting-93000-lines.html',
        'http://localhost/about.html',
        'http://localhost/resume.html',
        'http://localhost/contact.html',
        'http://localhost/colophon.html',
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        // Measured 2.7-2.9s under Lighthouse's simulated slow-4G: the text
        // LCP waits on the self-hosted display font (77 KB variable file,
        // an intentional design tradeoff; next/font cannot slice a single
        // weight while keeping the opsz axis). Field LCP is far lower.
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
