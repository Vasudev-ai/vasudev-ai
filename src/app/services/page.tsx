
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Code, Bot, ArrowRight, CheckCircle, Smartphone, Palette, PenTool, LayoutTemplate, CircuitBoard, Calculator } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services - AI & Web Development | Vasudev AI',
  description: 'Explore professional services by Vasudev AI, including Web & App Development, AI Solutions, UI/UX Design, and more to bring your vision to life.',
  keywords: ['AI services', 'web development', 'app development', 'UI/UX design', 'AI solutions', 'graphic design', 'CMS development', 'PCB design', 'accounting'],
};

const services = [
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: 'Web Development',
    description: 'Professional web development services to build modern, responsive, and high-performance websites.',
    offerings: ['Full-Stack Web Apps', 'E-commerce Solutions', 'API Development', 'Next.js & React'],
    schema: {
      '@type': 'Service',
      serviceType: 'Web Development',
      description: 'Professional web development services to build modern, responsive, and high-performance websites.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
  {
    icon: <Smartphone className="h-8 w-8 text-accent" />,
    title: 'App Development',
    description: 'Professional app development for iOS and Android, delivering seamless user experiences.',
    offerings: ['Native & Cross-Platform', 'Flutter & React Native', 'UI/UX Integration', 'Backend Services'],
     schema: {
      '@type': 'Service',
      serviceType: 'App Development',
      description: 'Professional app development for iOS and Android, delivering seamless user experiences.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
   {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: 'Graphic Design',
    description: 'Creative graphic design services to build a strong brand identity and visually stunning materials.',
    offerings: ['Logo & Brand Identity', 'Marketing Materials', 'Digital Illustrations', 'Social Media Graphics'],
     schema: {
      '@type': 'Service',
      serviceType: 'Graphic Design',
      description: 'Creative graphic design services to build a strong brand identity and visually stunning materials.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
  {
    icon: <PenTool className="h-8 w-8 text-accent" />,
    title: 'UI/UX Design',
    description: 'Professional UI/UX design services to create intuitive, engaging, and user-friendly digital products.',
    offerings: ['Wireframing & Prototyping', 'User Research & Testing', 'Interaction Design', 'Figma & Adobe XD'],
     schema: {
      '@type': 'Service',
      serviceType: 'UI/UX Design',
      description: 'Professional UI/UX design services to create intuitive, engaging, and user-friendly digital products.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: 'AI Solutions',
    description: 'Professional AI solutions services to integrate intelligent features and automation into your business.',
    offerings: ['Custom AI Models', 'Genkit & Gemini Integration', 'Chatbots & Virtual Assistants', 'Data Analysis'],
     schema: {
      '@type': 'Service',
      serviceType: 'AI Solutions',
      description: 'Professional AI solutions services to integrate intelligent features and automation into your business.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-accent" />,
    title: 'CMS Development',
    description: 'Professional CMS development to give you full control over your website content with an easy-to-use backend.',
    offerings: ['Headless CMS', 'WordPress & Strapi', 'Custom Plugin Dev', 'Content Migration'],
     schema: {
      '@type': 'Service',
      serviceType: 'CMS Development',
      description: 'Professional CMS development to give you full control over your website content with an easy-to-use backend.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
   {
    icon: <CircuitBoard className="h-8 w-8 text-accent" />,
    title: 'PCB Design',
    description: 'Professional PCB design services for your electronic hardware projects, from concept to production-ready files.',
    offerings: ['Schematic Design', 'Multi-layer Layout', 'Component Sourcing', 'Gerber File Generation'],
     schema: {
      '@type': 'Service',
      serviceType: 'PCB Design',
      description: 'Professional PCB design services for your electronic hardware projects.',
      provider: { '@type': 'Organization', name: 'Vasudev AI' },
    },
  },
   {
    icon: <Calculator className="h-8 w-8 text-accent" />,
    title: 'Accounting Professional',
    description: 'Professional accounting services to ensure financial accuracy and compliance for your business.',
    offerings: ['Bookkeeping', 'Financial Reporting', 'Tax Preparation', 'Payroll Services'],
     schema: {
      '@type': 'Service',
      serviceType: 'Accounting Professional',
      description: 'Professional accounting services to ensure financial accuracy and compliance for your business.',
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
        subtitle="Comprehensive solutions for your business needs."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30 flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-full">{service.icon}</div>
                <CardTitle className="text-xl md:text-2xl font-headline text-white mt-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-gray-300 min-h-[40px]">{service.description}</p>
                 <ul className="space-y-2 text-sm text-gray-400">
                  {service.offerings.map(item => (
                    <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
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
