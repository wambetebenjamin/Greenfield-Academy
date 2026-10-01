import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, Nairobi`,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#1A6B3C',
    lang: 'en-KE',
    categories: ['education'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Apply Now', url: '/#apply', description: 'Start an online admission application' },
      { name: 'Contact', url: '/#contact', description: 'Call, email or message the school' },
      { name: 'News & Events', url: '/#news', description: 'Latest school news and term dates' },
    ],
  };
}
