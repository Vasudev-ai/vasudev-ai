import PageHeader from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Code, Cpu, Layers, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Vasudev AI',
  description: 'Explore the future we are building with intelligence and innovation.',
};

const categories = [
    {
      icon: <Cpu className="h-8 w-8 text-accent"/>,
      title: "Offline AI Assistants",
      desc: "JARVIS-like systems that work fully offline."
    },
    {
      icon: <Layers className="h-8 w-8 text-accent"/>,
      title: "Custom Android ROMs",
      desc: "Performance-optimized AI-integrated mobile systems."
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-accent"/>,
      title: "Automation Tools",
      desc: "Code, workflow, and system automation frameworks."
    },
    {
      icon: <Code className="h-8 w-8 text-accent"/>,
      title: "Futuristic UI/UX",
      desc: "Next-gen designs blending AI and human interaction."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-accent"/>,
      title: "Ethical AI",
      desc: "Systems that prioritize human values and responsibility."
    }
];

export default function ProjectsPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Our Projects"
        subtitle="Building the future with intelligence and innovation."
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
                <Card key={category.title} className="bg-card/70 border-primary/20 backdrop-blur-sm p-4 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30 flex flex-col">
                    <CardHeader className="flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                {category.icon}
                            </div>
                            <CardTitle className="text-2xl font-headline text-white">{category.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription className="text-gray-400 text-base">{category.desc}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
