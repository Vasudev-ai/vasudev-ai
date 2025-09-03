
import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vasudev.ai';

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

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const projectEntries = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
 
  return [...staticEntries, ...projectEntries];
}
