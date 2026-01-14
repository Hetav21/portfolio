import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['react-pdf'],
  webpack: (config) => {
    // @ts-ignore - The webpack config type definition might be slightly different
    if (config.resolve && config.resolve.alias) {
      // @ts-ignore
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

export default config;
