
import PageHeader from '@/components/page-header';
import { projects } from '@/lib/projects-data';
import { cn } from '@/lib/utils';
import { ArrowRight, Book, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true, // Let crawlers follow the links on this page
  },
};

const mainPages = [
  { href: '/', title: 'Home', description: 'The main landing page of Vasudev AI.' },
  { href: '/about', title: 'About', description: 'Our vision, mission, and what drives us.' },
  { href: '/services', title: 'Services', description: 'Explore our AI, development, and creative services.' },
  { href: '/community', title: 'Community', description: 'Join our divine-tech collective.' },
  { href: '/team', title: 'Team', description: 'Meet the visionaries behind the movement.' },
  { href: '/career', title: 'Career', description: 'Opportunities to join our journey.' },
  { href: '/contact', title: 'Contact', description: 'Open a channel to the collective.' },
];

const utilityPages = [
  { href: '/optimize', title: 'AI Content Optimizer', description: 'A free tool to enhance your content for SEO.' },
  { href: '/career/utsavy-internship', title: 'Utsavy Internship', description: 'Details about our internship program with Utsavy.' },
];


export default function SitemapPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Sitemap"
        subtitle="A complete map of the Vasudev AI cosmos for users and search engine crawlers."
      />
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto space-y-12">
            
            <SitemapSection title="Core Pages" icon={<Globe className="h-6 w-6 text-accent" />}>
                {mainPages.map(page => (
                    <SitemapLink key={page.href} {...page} />
                ))}
            </SitemapSection>

            <SitemapSection title="Projects" icon={<Book className="h-6 w-6 text-accent" />}>
                <SitemapLink href="/projects" title="All Projects" description="An overview of all our innovative projects." />
                <div className="pl-6 border-l border-primary/20 ml-3 mt-4 space-y-4">
                    {projects.map(project => (
                         <SitemapLink 
                            key={project.slug} 
                            href={`/projects/${project.slug}`} 
                            title={project.title} 
                            description={project.tagline} 
                        />
                    ))}
                </div>
            </SitemapSection>

            <SitemapSection title="Utility & Info Pages" icon={<ArrowRight className="h-6 w-6 text-accent" />}>
                {utilityPages.map(page => (
                    <SitemapLink key={page.href} {...page} />
                ))}
            </SitemapSection>

        </div>
      </div>
    </div>
  );
}


interface SitemapSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const SitemapSection: React.FC<SitemapSectionProps> = ({ title, icon, children }) => (
    <section>
        <div className="flex items-center gap-3 mb-6">
            {icon}
            <h2 className="text-2xl md:text-3xl font-headline text-primary">{title}</h2>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </section>
)

interface SitemapLinkProps {
    href: string;
    title: string;
    description: string;
}

const SitemapLink: React.FC<SitemapLinkProps> = ({ href, title, description }) => (
    <Link href={href} className="block p-4 rounded-lg bg-card/50 border border-primary/20 hover:border-primary hover:bg-card/80 transition-all duration-300 group">
        <h3 className="font-bold text-lg text-white group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <p className="text-xs text-primary/50 mt-2 group-hover:text-accent/80 transition-colors">{href}</p>
    </Link>
)
