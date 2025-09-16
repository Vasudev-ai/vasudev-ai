
import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects-data';

export function GET(): Response {
  const baseUrl = 'https://www.vasudev.online';
  const lastModified = new Date();

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

  const projectEntries: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
 
  const allEntries = [
    ...staticPages, 
    ...projectEntries
  ];

  const uniqueUrls = new Set(allEntries.map(entry => entry.url));
  const sitemapEntries = Array.from(uniqueUrls).map(url => allEntries.find(entry => entry.url === url)!);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries
    .map((entry) => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified?.toISOString()}</lastmod>
      <changefreq>${entry.changeFrequency}</changefreq>
      <priority>${entry.priority}</priority>
    </url>
  `)
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
