
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Calendar, Clock, BookOpen, BrainCircuit, GraduationCap, Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const curriculum = [
  {
    day: 'Day 1: The Foundations of Intelligence',
    topics: [
      'Understanding the LLM Landscape (Gemini, GPT, etc.)',
      'Introduction to Genkit: The Future of AI Apps',
      'Crafting the Perfect Prompt: Engineering & Optimization',
      'Building your First AI Flow with Genkit',
    ],
  },
  {
    day: 'Day 2: Architecting Advanced AI Systems',
    topics: [
      'Structured Outputs: Using Zod for Reliable AI',
      'Function Calling & Tool Use: Giving your AI Superpowers',
      'Building AI Agents that Reason and Act',
      'Integrating with External APIs and Services',
    ],
  },
  {
    day: 'Day 3: Deployment & The Divine Touch',
    topics: [
      'Deploying Genkit Flows with Firebase',
      'Building a Frontend with Next.js & React Server Components',
      'Ethical AI: The Vasudev AI Philosophy',
      'Showcase: Building a complete AI-powered app from scratch',
    ],
  },
];

const whoShouldAttend = [
    'Aspiring AI Developers eager to build real-world applications.',
    'Full-stack engineers looking to integrate intelligence into their projects.',
    'Students and hobbyists passionate about the future of technology.',
    'Entrepreneurs wanting to prototype AI-powered products.',
];

export default function WorkshopPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="The AI Architect"
        subtitle="A 3-Day LLM Masterclass"
      />
      <div className="container mx-auto px-4 -mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <main className="lg:col-span-2 space-y-12">
                 <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6 md:p-8">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Join us for an immersive, 3-day journey into building production-ready applications with Large Language Models. Hosted by the founder of Vasudev AI, this masterclass will take you from the fundamentals of prompt engineering to deploying complex, multi-step AI agents. You won't just learn theory—you'll build, architect, and deploy.
                        </p>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-3xl font-headline text-primary mb-8 flex items-center gap-3">
                        <BookOpen /> What You'll Master
                    </h2>
                     <div className="space-y-6">
                        {curriculum.map((day, index) => (
                        <Card key={index} className="bg-card/50 border-primary/10 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-headline text-accent">{day.day}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                {day.topics.map((topic, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                                        <span className="text-gray-300">{topic}</span>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                </section>

                 <section>
                    <h2 className="text-3xl font-headline text-primary mb-8 flex items-center gap-3">
                        <GraduationCap /> Who Should Attend
                    </h2>
                     <Card className="bg-card/50 border-primary/10 backdrop-blur-sm">
                        <CardContent className="p-6 md:p-8">
                             <ul className="space-y-4">
                                {whoShouldAttend.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-lg">
                                        <BrainCircuit className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-primary mt-6 text-sm flex items-center gap-2"><Code className="h-4 w-4"/> Basic understanding of JavaScript/TypeScript is recommended.</p>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-3xl font-headline text-primary mb-8 flex items-center gap-3">
                        <User /> Your Instructor
                    </h2>
                     <Card className="bg-card/50 border-primary/10 backdrop-blur-sm">
                        <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
                            <Image src="/team/surya.png" alt="Surya Pratap Singh" width={120} height={180} className="rounded-lg border-2 border-primary/30 w-32 h-auto" data-ai-hint="glowing sun star" />
                            <div>
                                <h3 className="text-2xl font-headline text-accent">Surya Pratap Singh</h3>
                                <p className="font-semibold text-primary">Founder & Visionary, Vasudev AI</p>
                                <p className="text-gray-400 mt-2">The creator of Vasudev AI, Surya is focused on building offline-first, decentralized, and divine AI systems. He brings a wealth of experience in both high-level AI architecture and low-level systems programming.</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <aside className="lg:sticky top-24 h-fit">
                 <Card className="bg-card/70 border-accent/20 backdrop-blur-sm shadow-2xl shadow-accent/20">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline text-accent">Masterclass Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div>
                                <p className="text-gray-400 text-sm">Date</p>
                                <p className="text-white font-medium">To Be Announced</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary" />
                                <div>
                                <p className="text-gray-400 text-sm">Schedule</p>
                                <p className="text-white font-medium">3 Days, 2-3 hours/day</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/50">Online</Badge>
                                <div>
                                <p className="text-gray-400 text-sm">Mode</p>
                                <p className="text-white font-medium">Live on Google Meet/Zoom</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-primary/20">
                            <p className="text-center text-4xl font-headline text-white mb-2">Free</p>
                            <p className="text-center text-gray-400 text-sm mb-4">This masterclass is free for all Vasudev AI community members.</p>
                            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all">
                                <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Register via Discord</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
      </div>
    </div>
  );
}

    