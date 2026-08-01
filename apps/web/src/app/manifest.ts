import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hetav Shah Portfolio',
    short_name: 'Portfolio',
    description: 'Hetav Shah - Associate AI Engineer & Agentic AI Specialist Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#191724',
    theme_color: '#c4a7e7',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
