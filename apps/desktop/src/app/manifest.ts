import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hetav Shah | Desktop',
    short_name: 'Desktop',
    description: 'NixOS-themed portfolio of Hetav Shah',
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
