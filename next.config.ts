import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
