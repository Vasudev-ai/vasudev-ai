'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Bot, Briefcase, Palette, Book, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import './services-showcase.css';

const showcasedServices = [
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI assistants and automation tailored to your unique business needs, available offline or in the cloud.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    title: 'SaaS Development',
    description: 'End-to-end development of scalable and robust Software-as-a-Service platforms for innovative startups.',
  },
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: 'Brand Identity & Motion Graphics',
    description: 'Forge a memorable brand with stunning visuals, animated logos, and a cohesive design language.',
  },
  {
    icon: <Book className="h-8 w-8 text-accent" />,
    title: 'Community & Education',
    description: 'Upskill your team or community with expert-led workshops and training on cutting-edge technologies.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const ServicesShowcaseComponent = function ServicesShowcase() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
          Our Divine Services
        </h2>
        <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-16">
          We forge futuristic solutions by blending innovation with intelligence. Explore our core offerings.
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {showcasedServices.map((service) => (
            <motion.div key={service.title} variants={itemVariants} className="h-full">
              <div className="service-card rounded-lg p-6 text-center h-full flex flex-col">
                <div className="service-card-glow" />
                <div className="flex-grow">
                  <div className="inline-block mx-auto mb-6 service-icon-wrapper">
                    <div className="pulse-ring" />
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-headline font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6">
                   <Button asChild variant="link" className="text-primary hover:text-accent">
                        <Link href="/services">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
         <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold text-lg px-8 py-6 rounded-full transition-all duration-300">
                <Link href="/services">View All Services</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesShowcaseComponent);
