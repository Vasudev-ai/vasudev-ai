
'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  features: string[];
  href: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-lg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div layoutId={`card-${project.title}`} className="relative z-10 w-full max-w-3xl">
        <Card className="bg-card/80 border border-primary/40 backdrop-blur-xl shadow-2xl shadow-primary/30 max-h-[80vh] overflow-y-auto">
           <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={24} />
          </Button>
          <div className="p-8">
            <CardHeader className="flex flex-row items-center gap-4 !p-0">
              <div className="p-4 bg-primary/10 rounded-full">{project.icon}</div>
              <CardTitle className="text-3xl font-headline text-white">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 !p-0 mt-6">
              <p className="text-gray-300 text-lg">{project.tagline}</p>
              
              <div className="space-y-3">
                 <h4 className="text-lg font-semibold text-primary">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                    {project.features.map(feature => (
                        <Badge key={feature} variant="secondary" className="text-base bg-primary/20 text-primary border-primary/50">
                            {feature}
                        </Badge>
                    ))}
                </div>
              </div>

              <div className="prose prose-invert text-gray-300 max-w-none">
                <h4 className="text-lg font-semibold text-primary">About this Project</h4>
                <p>
                  Detailed information about {project.title} is coming soon. This project represents a core part of the Vasudev AI ecosystem, pushing the boundaries of what's possible with divine-tech. 
                  Stay tuned for updates on its development, architecture, and release.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_15px] shadow-primary/50 transition-all duration-300">
                  <Link href={project.href} target="_blank" rel="noopener noreferrer">
                    Explore Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
