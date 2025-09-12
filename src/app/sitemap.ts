import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vasudev.ai';

  // Static pages
  const staticPages = [
    '/',
    '/about',
    '/community',
    '/contact',
    '/optimize',
    '/projects',
    '/services',
    '/team',
    '/career',
    '/career/utsavy-internship',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));

  // Dynamic project pages
  const projectEntries = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
 
  return [...sitemapEntries, ...projectEntries];
}
