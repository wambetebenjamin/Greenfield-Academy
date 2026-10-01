import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = [
    '',
    '#about',
    '#academics',
    '#departments',
    '#admissions',
    '#news',
    '#gallery',
    '#staff',
    '#testimonials',
    '#contact',
  ];

  return [
    ...sections.map((hash) => ({
      url: `${site.url}/${hash}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: hash === '' ? 1 : 0.7,
    })),
    {
      url: `${site.url}/staff/login`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];
}
