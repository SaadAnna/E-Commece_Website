import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.stripe.com"],
  },
  // Add these to improve compatibility with Stripe
  experimental: {
    serverComponentsExternalPackages: ["stripe"],
  },
  // Helpful for debugging environment issues
  env: {
    STRIPE_CONFIGURED: process.env.STRIPE_SECRET_KEY ? 'true' : 'false',
  },
};

export default nextConfig;