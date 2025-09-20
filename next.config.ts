import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Lighthouse CI in GitHub Actions
  output: process.env.NODE_ENV === 'production' && process.env.CI ? 'export' : undefined,
  // Disable image optimization for static export
  images: {
    unoptimized: process.env.NODE_ENV === 'production' && process.env.CI ? true : false,
  },
  turbopack: {
    root: process.cwd(), // Explicitly set the workspace root to current directory
  },
};

export default nextConfig;
