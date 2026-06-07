
import { projects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, ExternalLink, FileText, Github, Zap } from 'lucide-react';
import './project-case-study.css';
import { cn } from '@/lib/utils';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const url = `https://www.vasudevai.in/projects/${project.slug}`;

  return {
    title: `${project.title} | Project Case Study`,
    description: project.tagline,
    keywords: [project.title, 'Vasudev AI', 'case study', ...project.techStack],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | Vasudev AI`,
      description: project.tagline,
      url: url,
      type: 'article',
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 600,
          alt: `${project.title} Cover Image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Vasudev AI`,
      description: project.tagline,
      images: [project.coverImage],
    },
  };
}

export async function generateStaticParams() {
    return projects.map((project) => ({
      slug: project.slug,
    }));
}


export default function ProjectCaseStudyPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const url = `https://www.vasudevai.in/projects/${project.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: project.title,
    description: project.tagline,
    image: project.coverImage,
    author: {
      '@type': 'Organization',
      name: 'Vasudev AI',
      url: 'https://www.vasudevai.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vasudev AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vasudevai.in/vasudev-ai-hero.webp',
      },
    },
    datePublished: new Date().toISOString(),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vasudevai.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: 'https://www.vasudevai.in/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="case-study-page pb-20">
        <header className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center text-center p-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
              <Image 
                  src={project.coverImage}
                  alt={`${project.title} cover image`}
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint="futuristic abstract technology"
              />
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/50 mb-4">{project.status}</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  {project.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary max-w-3xl mx-auto">{project.tagline}</p>
          </div>
        </header>

        <div className="container mx-auto px-4 mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <main className="lg:col-span-8">
                  <div className="space-y-12">
                      <section id="problem" className="blueprint-section">
                          <h2 className="section-title">Problem Statement</h2>
                          <div className="section-content">
                              <p>{project.problemStatement}</p>
                          </div>
                      </section>

                      <section id="solution" className="blueprint-section">
                          <h2 className="section-title">Solution</h2>
                          <div className="section-content">
                              <p>{project.solution}</p>
                          </div>
                      </section>
                      
                      <section id="tech-stack" className="blueprint-section">
                          <h2 className="section-title">Tech Stack</h2>
                          <div className="section-content">
                              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                  {project.techStack.map(tech => (
                                      <li key={tech} className="flex items-center gap-2 text-gray-300">
                                          <Zap className="h-4 w-4 text-secondary"/>
                                          <span>{tech}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </section>

                      <section id="architecture" className="blueprint-section">
                          <h2 className="section-title">Architecture Overview</h2>
                          <div className="section-content">
                              <p>{project.architecture}</p>
                          </div>
                      </section>
                  </div>
              </main>

              <aside className="lg:col-span-4">
                  <div className="sticky top-24">
                      <div className="bg-card/50 border border-primary/20 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-headline text-accent mb-4">Project Details</h3>
                          
                          <nav className="space-y-2 mb-6">
                              <a href="#problem" className="toc-link">Problem</a>
                              <a href="#solution" className="toc-link">Solution</a>
                              <a href="#tech-stack" className="toc-link">Tech Stack</a>
                              <a href="#architecture" className="toc-link">Architecture</a>
                          </nav>
                          
                          <div className="space-y-3">
                              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                                  </Link>
                              </Button>
                              {project.liveUrl && (
                                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-accent">
                                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="mr-2 h-4 w-4" /> View Live
                                      </Link>
                                  </Button>
                              )}
                          </div>
                      </div>
                      <div className="mt-6">
                          <Button asChild variant="ghost" className="text-primary hover:text-accent">
                              <Link href="/projects">
                                  <ArrowLeft className="mr-2 h-4 w-4"/> Back to Projects
                              </Link>
                          </Button>
                      </div>
                  </div>
              </aside>
          </div>
        </div>
      </div>
    </>
  );
}

    