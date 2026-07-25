import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['react-pdf'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
        ],
      },
    ];
  },
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
