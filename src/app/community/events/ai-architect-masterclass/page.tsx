
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Calendar, Clock, BookOpen, BrainCircuit, GraduationCap, Code, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const curriculum = [
  {
    day: 'Day 1: Foundations of AI & Prompt Engineering',
    topics: [
      'Introduction to LLMs: GPT, LLaMA, Phi, Gemini',
      'How AI thinks: Tokens, Parameters, and Model Logic',
      'Fundamentals of Prompt Engineering',
      'Hands-on: Create your first AI flow',
    ],
    task: 'Build a simple chatbot responding to basic queries'
  },
  {
    day: 'Day 2: Architecting Advanced AI Systems',
    topics: [
      'Structured Outputs & Reliable Responses using Zod',
      'Function calling & Tool integration',
      'Designing AI agents that reason, act, and execute tasks',
      'Connecting AI with APIs and external services',
    ],
    task: 'Enhance your chatbot with multi-step reasoning & API calls'
  },
  {
    day: 'Day 3: Deployment & Showcasing AI Mastery',
    topics: [
      'Deploy AI flows on Firebase / Localhost',
      'Build a frontend using Next.js & React Server Components',
      'Ethical AI Practices: The Vasudev AI philosophy',
      'Showcase: Build a full AI-powered application from scratch',
    ],
    task: 'Deploy your AI app and present a working demo'
  },
];

const whoShouldAttend = [
    'Aspiring AI developers and enthusiasts',
    'Full-stack engineers wanting AI integration',
    'Students, hobbyists, and tech innovators',
    'Entrepreneurs looking to prototype AI products',
];

const deliverables = [
    'Hands-on AI flows and deployed apps',
    'Digital Certificate of Completion',
    'Exclusive Vasudev AI Resource E-book',
    'Access to Vasudev AI community'
];

export default function WorkshopPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="The AI Architect: 3-Day LLM Masterclass"
        subtitle="Build, Architect, and Deploy Your Own AI Applications – Guided by Vasudev AI Founder"
      />
      <div className="container mx-auto px-4 -mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <main className="lg:col-span-2 space-y-12">
                 <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6 md:p-8">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Step into an immersive 3-day journey where you will learn to design, build, and deploy real-world AI applications using Large Language Models (LLMs).
                        </p>
                         <ul className="mt-4 space-y-2 text-gray-400">
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" /><span>Hands-on experience: Build AI flows, agents, and complete apps</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" /><span>Learn ethical, production-ready practices</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" /><span>Take home working code, resources, and a certificate</span></li>
                        </ul>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-3xl font-headline text-primary mb-8 flex items-center gap-3">
                        <BookOpen /> Day-wise Learning Path
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
                                <div className="mt-4 pt-4 border-t border-primary/20">
                                    <div className="text-sm text-primary font-semibold flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary">{index === 2 ? 'Final Task' : 'Mini Task'}</Badge>
                                        <span className="text-gray-300">{day.task}</span>
                                    </div>
                                </div>
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
                            <p className="text-primary mt-6 text-sm flex items-center gap-2"><Code className="h-4 w-4"/> Basic knowledge of JavaScript / TypeScript recommended.</p>
                        </CardContent>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-3xl font-headline text-primary mb-8 flex items-center gap-3">
                        <Award /> Workshop Deliverables
                    </h2>
                     <Card className="bg-card/50 border-primary/10 backdrop-blur-sm">
                        <CardContent className="p-6 md:p-8">
                             <ul className="space-y-4">
                                {deliverables.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-lg">
                                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
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
                            <p className="text-center text-4xl font-headline text-white mb-2">₹99</p>
                            <p className="text-center text-gray-400 text-sm mb-4">A small fee to ensure genuine participation.</p>
                            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all">
                                <Link href="/community/events/ai-architect-masterclass/register">Register Now for ₹99</Link>
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
