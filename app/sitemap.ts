import type { MetadataRoute } from 'next';

// Bump this when site content meaningfully changes. A stable date (instead of
// `new Date()`) stops the sitemap from claiming every page changed on each request,
// which wastes crawl budget and confuses lastmod signals.
const lastModified = new Date('2026-10-15');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://shamimahmedrobin.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Shamim-Ahmed-Robin-Resume.pdf`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
