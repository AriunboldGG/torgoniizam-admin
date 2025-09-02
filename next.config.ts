import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // Handle potential client reference issues
  serverExternalPackages: [],
  // Ensure proper file handling
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize for Vercel deployment
  images: {
    domains: [],
  },
  // Fix client reference manifest issues
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
