import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects-data';

// These pages will be excluded from the sitemap
const EXCLUDED_PATHS = ['/api', '/template', '/layout'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vasudev.ai';
  const lastModified = new Date(); // Use a consistent date for the build

  // Core static pages with defined priorities
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/community`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${baseUrl}/optimize`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/team`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/career`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/career/utsavy-internship`, priority: 0.7, changeFrequency: 'monthly' },
  ].map(page => ({
    ...page,
    lastModified,
  }));


  // Dynamic project pages
  const projectEntries: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
 
  // Combine all entries
  const allEntries = [
    ...staticPages, 
    ...projectEntries
  ];

  // Remove duplicates and return
  const uniqueUrls = new Set(allEntries.map(entry => entry.url));
  return Array.from(uniqueUrls).map(url => allEntries.find(entry => entry.url === url)!);
}
