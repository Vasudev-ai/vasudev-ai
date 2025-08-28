
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vasudev.ai';

  // Assuming these are your main static pages
  const staticPages = [
    '/',
    '/about',
    '/community',
    '/contact',
    '/optimize',
    '/projects',
    '/services',
    '/team',
  ];

  const sitemapEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));
 
  return sitemapEntries;
}
