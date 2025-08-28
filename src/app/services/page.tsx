
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Code, Bot, ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services - AI Development & Consulting | Vasudev AI',
  description: 'Explore professional AI services by Vasudev AI. We offer freelance AI development, custom LLM fine-tuning, AI consulting, and full-stack development to bring your divine-tech vision to life.',
  keywords: ['AI services', 'freelance AI developer', 'LLM fine-tuning', 'AI consulting', 'Next.js development', 'Genkit expert', 'AI solutions'],
};

const services = [
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: 'Freelance AI Development',
    description: 'Hire our expert developers to build custom AI solutions, integrate Genkit flows, or develop intelligent applications from scratch.',
    offerings: ['Full-Stack AI Applications', 'Genkit & Next.js Integration', 'Custom API Development', 'Python & TypeScript'],
    schema: {
      '@type': 'Service',
      serviceType: 'Freelance AI Development',
      description: 'Hire our expert developers to build custom AI solutions, integrate Genkit flows, or develop intelligent applications from scratch.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: 'Custom LLM & Agent Solutions',
    description: 'We specialize in fine-tuning Large Language Models and building autonomous AI agents tailored to your specific business needs.',
    offerings: ['LLM Fine-Tuning & RAG', 'Autonomous Agent Creation', 'Offline-First AI Models', 'Data Privacy & Security'],
     schema: {
      '@type': 'Service',
      serviceType: 'Custom LLM & Agent Solutions',
      description: 'We specialize in fine-tuning Large Language Models and building autonomous AI agents tailored to your specific business needs.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-accent" />,
    title: 'AI Strategy & Consulting',
    description: 'Leverage our expertise to craft a winning AI strategy, from identifying opportunities to designing system architecture.',
    offerings: ['AI Roadmap & Strategy', 'Technical Feasibility Analysis', 'Ethical AI Frameworks', 'Proof-of-Concept Prototyping'],
     schema: {
      '@type': 'Service',
      serviceType: 'AI Strategy & Consulting',
      description: 'Leverage our expertise to craft a winning AI strategy, from identifying opportunities to designing system architecture.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
];

export default function ServicesPage() {
  const allServicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: service.schema,
    })),
  };

  return (
    <div className="pb-20">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allServicesSchema) }}
      />
      <PageHeader
        title="Our Services"
        subtitle="Bring your divine-tech vision to life with our expert AI & development services."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30 flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-full">{service.icon}</div>
                <CardTitle className="text-xl md:text-2xl font-headline text-white mt-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-gray-300">{service.description}</p>
                 <ul className="space-y-2 text-sm text-gray-400">
                  {service.offerings.map(item => (
                    <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-accent">
                    <Link href="/contact">
                        Discuss Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <section className="w-full pt-20 md:pt-24 pb-12 text-center">
            <div className="bg-card/30 border border-accent/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-lg">
                <h2 className="text-2xl md:text-4xl font-headline font-bold mb-4 text-accent">
                    Ready to build the future?
                </h2>
                <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                    Let's connect and explore how we can collaborate. We're passionate about bringing innovative, ethical, and powerful AI solutions to the world.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 md:px-10 py-5 md:py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105">
                    <Link href="/contact">Get in Touch</Link>
                </Button>
            </div>
      </section>
      </div>
    </div>
  );
}
