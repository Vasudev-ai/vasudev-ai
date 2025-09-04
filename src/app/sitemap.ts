
import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vasudev.ai';

<<<<<<< HEAD
=======
  // Static pages
>>>>>>> 8d3dee3313016037f1625499ea88057068c96100
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

<<<<<<< HEAD
  const staticEntries = staticPages.map((path) => ({
=======
  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
>>>>>>> 8d3dee3313016037f1625499ea88057068c96100
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));

<<<<<<< HEAD
=======
  // Dynamic project pages
>>>>>>> 8d3dee3313016037f1625499ea88057068c96100
  const projectEntries = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
 
<<<<<<< HEAD
  return [...staticEntries, ...projectEntries];
=======
  return [...sitemapEntries, ...projectEntries];
>>>>>>> 8d3dee3313016037f1625499ea88057068c96100
}

    