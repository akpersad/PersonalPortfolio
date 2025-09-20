module.exports = {
    ci: {
        collect: {
            // Use static export to avoid Next.js server issues in CI
            staticDistDir: './out',
            numberOfRuns: 1, // Reduce runs for faster CI
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 0.7 }], // Relaxed for CI environment
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.7 }], // Relaxed for CI environment
                'categories:seo': ['error', { minScore: 0.8 }],
            }
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
