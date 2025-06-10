import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true, // Log full URLs for fetch requests
    },
  },
  images: {
    domains: ['uovomsxutgdnwwdxjodb.supabase.co'],
  },
};

export default nextConfig;
