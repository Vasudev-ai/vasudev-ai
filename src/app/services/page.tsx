
'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Bot, Code, Palette, Users, Shield, Heart, Search, Film, Briefcase, BarChart, Zap, Globe, Puzzle, Network, CloudCog, ShieldCheck, Server, Book, PenTool, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import './services.css';
import { motion } from 'framer-motion';


const serviceCategories = [
  {
    category: 'AI & Automation',
    services: [
      {
        icon: <Bot className="h-6 w-6" />,
        title: 'Custom AI Assistants',
        description: 'Bespoke AI assistants tailored to your needs, available offline or in the cloud.',
        offerings: ['Offline + Cloud-Based', 'RPA Integration', 'Task Automation', 'Personalized Workflows'],
      },
      {
        icon: <MessageSquare className="h-6 w-6" />,
        title: 'Chatbots & Voicebots',
        description: 'Engage users with intelligent bots on websites, WhatsApp, and Telegram.',
        offerings: ['Customer Support Bots', 'Lead Generation Bots', 'Multi-platform Integration', 'Voice-activated Assistants'],
      },
      {
        icon: <PenTool className="h-6 w-6" />,
        title: 'AI Content Tools',
        description: 'Automate your content creation pipeline from generation to editing.',
        offerings: ['Auto-blogging & Scripts', 'AI-assisted Video Editing', 'Thumbnail Generation', 'Content Summarization'],
      },
      {
        icon: <BarChart className="h-6 w-6" />,
        title: 'Data Analytics & Visualization',
        description: 'Turn complex data into actionable insights with AI-powered analytics.',
        offerings: ['Predictive Modeling', 'Insight Generation', 'Interactive Dashboards', 'Trend Analysis'],
      },
    ]
  },
  {
    category: 'Development & Tech',
    services: [
      {
        icon: <Briefcase className="h-6 w-6" />,
        title: 'SaaS Development',
        description: 'End-to-end development of scalable Software-as-a-Service platforms.',
        offerings: ['MVP for Startups', 'Multi-tenant Architecture', 'Subscription Billing', 'Full-Stack Development'],
      },
      {
        icon: <Puzzle className="h-6 w-6" />,
        title: 'API Development & Integration',
        description: 'Build robust APIs and integrate third-party services seamlessly.',
        offerings: ['REST & GraphQL APIs', 'Microservices', 'Payment Gateway Integration', 'Third-party API Sync'],
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: 'Blockchain & Web3 Solutions',
        description: 'Decentralized applications, smart contracts, and crypto integrations.',
        offerings: ['Smart Contract Dev', 'Crypto Wallets', 'dApp Development', 'NFT Marketplaces'],
      },
      {
        icon: <Network className="h-6 w-6" />,
        title: 'IoT Projects',
        description: 'Connecting hardware to the cloud with intelligent AI-driven solutions.',
        offerings: ['Hardware + AI Integration', 'Sensor Data Processing', 'IoT Dashboards', 'Remote Device Control'],
      },
    ]
  },
  {
    category: 'Creative & Business',
    services: [
      {
        icon: <Search className="h-6 w-6" />,
        title: 'Digital Marketing & SEO',
        description: 'Boost your online presence with data-driven marketing and SEO strategies.',
        offerings: ['SEO Audits & Strategy', 'PPC Campaigns', 'Content Marketing', 'Analytics & Reporting'],
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: 'Social Media Management',
        description: 'Grow your brand and engage your audience with expert social media handling.',
        offerings: ['Content Calendars', 'Growth Strategies', 'Community Management', 'Performance Analytics'],
      },
      {
        icon: <Film className="h-6 w-6" />,
        title: 'Video Production',
        description: 'High-quality video content, from promotional ads to engaging social media reels.',
        offerings: ['Promotional Ads', 'Explainer Videos', 'Social Media Reels', 'Post-Production'],
      },
      {
        icon: <Palette className="h-6 w-6" />,
        title: 'Brand Identity & Motion Graphics',
        description: 'Forge a memorable brand identity with stunning visuals and animations.',
        offerings: ['Logo & Style Guides', 'Animated Logos', 'UI/UX Motion', 'Marketing Graphics'],
      },
    ]
  },
  {
    category: 'Community & Education',
    services: [
      {
        icon: <Book className="h-6 w-6" />,
        title: 'Workshops & Training',
        description: 'Upskill your team or community with expert-led workshops and training.',
        offerings: ['AI & Coding Bootcamps', 'Freelancing Masterclass', 'Cybersecurity Training', 'Custom Curriculum'],
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: 'Career Guidance & Mentorship',
        description: 'Navigate your tech career with personalized guidance and mentorship.',
        offerings: ['1-on-1 Mentorship', 'Resume & Portfolio Review', 'Interview Preparation', 'Career Pathing'],
      },
      {
        icon: <Code className="h-6 w-6" />,
        title: 'Freelance Project Hub',
        description: 'Connecting clients with our talented community for seamless project execution.',
        offerings: ['Vetted Community Talent', 'Project Management', 'Client-Community Liaison', 'Quality Assurance'],
      },
    ]
  },
  {
    category: 'Coming Soon',
    services: [
      {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: 'Cybersecurity Services',
        description: 'Protect your digital assets with comprehensive security assessments.',
        offerings: ['Penetration Testing', 'Data Security Audits', 'Vulnerability Checks', 'Security Hardening'],
        isComingSoon: true
      },
      {
        icon: <Server className="h-6 w-6" />,
        title: 'Server Setup & Cloud Solutions',
        description: 'Reliable infrastructure on major cloud platforms or self-hosted offline setups.',
        offerings: ['AWS, GCP, Azure', 'Self-hosted Offline Infra', 'Scalable Architectures', 'Infrastructure as Code'],
        isComingSoon: true
      },
      {
        icon: <CloudCog className="h-6 w-6" />,
        title: 'DevOps Services',
        description: 'Automate your development lifecycle for faster, more reliable deployments.',
        offerings: ['CI/CD Pipelines', 'Docker & Kubernetes', 'Infrastructure Monitoring', 'Automated Testing'],
        isComingSoon: true
      },
    ]
  }
];

const cardVariants = {
  offscreen: {
    opacity: 0,
    x: -100
  },
  offscreenRight: {
    opacity: 0,
    x: 100
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};


export default function ServicesPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive solutions for your business needs."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />
      <div className="container mx-auto px-4 mt-16 space-y-20">
        {serviceCategories.map((category) => (
          <section key={category.category}>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400">{category.category}</h2>
            <div className="services-blueprint-container">
              {category.services.map((service, index) => (
                <div key={service.title} className="service-node">
                  <div className="service-node-icon-wrapper text-accent">
                    {service.icon}
                  </div>
                  <motion.div 
                    className="service-node-content"
                    initial={index % 2 === 0 ? "offscreen" : "offscreenRight"}
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    <motion.div className="service-card-blueprint" variants={cardVariants}>
                      {service.isComingSoon && (
                        <Badge variant="secondary" className="absolute top-4 right-4 bg-secondary/80 text-secondary-foreground z-10">Coming Soon</Badge>
                      )}
                      <h3 className="text-xl md:text-2xl font-headline text-white mb-2">{service.title}</h3>
                      <p className="text-gray-400 mb-4">{service.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-300 mb-6">
                        {service.offerings.map(item => (
                          <li key={item} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-accent hover:border-accent" disabled={service.isComingSoon}>
                          <Link href="/contact">
                              Discuss Project <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="w-full pt-12 text-center">
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
