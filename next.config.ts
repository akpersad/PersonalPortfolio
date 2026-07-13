import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import { withBotId } from 'botid/next/config';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Case studies are .mdx files imported into the /work/[slug] route.
// mdxRs (the Rust compiler) keeps MDX on Turbopack's fast path; study
// metadata lives typed in src/lib/work.ts, so no remark plugins needed.
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.LIGHTHOUSE_CI ? 'export' : undefined,
  // Static export (Lighthouse CI) cannot serve redirects; skip them there.
  redirects: process.env.LIGHTHOUSE_CI
    ? undefined
    : async () => [
        // Only pre-rebuild study URL whose slug no longer exists.
        {
          source: '/work/poke-collector',
          destination: '/work',
          permanent: true,
        },
      ],
  experimental: {
    optimizePackageImports: ['@/components', '@/lib', '@/hooks'],
    mdxRs: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  // Bundle analyzer (uncomment to analyze bundle)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
};

const config = withBundleAnalyzer(withMDX(nextConfig));

// withBotId adds proxy rewrites, which static export (Lighthouse CI) can't serve.
export default process.env.LIGHTHOUSE_CI ? config : withBotId(config);
