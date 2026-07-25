import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hetav Shah | Resume',
    short_name: 'Resume',
    description: 'Resume of Hetav Shah',
    start_url: '/',
    display: 'standalone',
    background_color: '#191724',
    theme_color: '#191724',
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
    ],
  };
}
