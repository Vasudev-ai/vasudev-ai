
'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Lightbulb, Users, Calendar, Code, Mic, Star, MessageSquare, Book, Compass, Wrench, Award, BrainCircuit, Rocket, Brush } from 'lucide-react';
import Link from 'next/link';
import { Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import MemberCard from './_components/member-card';
import type { Metadata } from 'next';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the Vasudev AI community, a divine network of AI creators, thinkers, and dreamers. Collaborate on projects, learn from experts, and create an impact.',
  keywords: ['AI community', 'Vasudev AI members', 'AI collaboration', 'AI events', 'open source AI', 'divine tech'],
  openGraph: {
    title: 'The Vasudev AI Community',
    description: 'A divine network of AI creators, thinkers, and dreamers. Join us to collaborate, learn, and innovate.',
    url: 'https://www.vasudev.ai/community',
  },
  twitter: {
    title: 'The Vasudev AI Community',
    description: 'A divine network of AI creators, thinkers, and dreamers. Join us to collaborate, learn, and innovate.',
  },
};


const whyJoin = [
    {
        icon: <Lightbulb className="h-8 w-8 text-accent"/>,
        title: "Collaborate & Innovate",
        desc: "Build groundbreaking AI projects with global talent."
    },
    {
        icon: <Heart className="h-8 w-8 text-accent"/>,
        title: "Learn & Share",
        desc: "Grow with mentorship, events, and workshops."
    },
    {
        icon: <Users className="h-8 w-8 text-accent"/>,
        title: "Create Impact",
        desc: "Contribute to open-source and divine-tech initiatives."
    }
];

const features = [
    "AI Ethics & Philosophy Discussions",
    "Open Source Project Collaboration",
    "Innovation Labs & Hackathons",
    "Mentorship & Learning Circles",
    "Futuristic Systems Development",
    "Community Showcases & Events"
];

const upcomingEvents = [
    {
        icon: <Calendar className="h-8 w-8 text-accent"/>,
        title: "Weekly Community Sync",
        date: "Every Friday, 9 PM IST",
        desc: "Catch up on project progress, share ideas, and plan for the future."
    },
    {
        icon: <Code className="h-8 w-8 text-accent"/>,
        title: "Vasudev Browser Hackathon",
        date: "Coming Soon",
        desc: "Contribute to our open-source browser and add innovative features."
    },
    {
        icon: <Mic className="h-8 w-8 text-accent"/>,
        title: "Tech Talk Tuesdays",
        date: "Monthly",
        desc: "Listen to experts discuss the latest trends in AI and divine-tech."
    }
];

const communitySpotlights = [
    {
        name: "Surya Pratap Singh",
        role: "Founder & Visionary",
        quote: "“We are not just writing code; we are scripting a new harmony between ancient wisdom and future technology. This is our legacy.”",
    },
    {
        name: "Aman Dangi",
        role: "Co-Builder & Innovator",
        quote: "“Being part of Vasudev AI is like building the future in a family. The collaboration and vision here are unparalleled.”",
    },
    {
        name: "Ashutosh K. Tripathi",
        role: "AI Engineer",
        quote: "“Here, we get to architect intelligence that is not only powerful, but purposeful. It's a challenge that inspires me every day.”",
    },
    {
        name: "Biswjeet",
        role: "UI/UX Designer",
        quote: "“Design is the bridge between divinity and technology. I love creating experiences that feel both futuristic and deeply human.”",
    },
];

const discussionHighlights = [
    {
        icon: <MessageSquare className="h-6 w-6 text-primary"/>,
        title: "The Future of Offline-First AI",
        category: "AI Philosophy"
    },
    {
        icon: <MessageSquare className="h-6 w-6 text-primary"/>,
        title: "Feature Brainstorm: Vasudev Browser",
        category: "Project Collaboration"
    },
    {
        icon: <MessageSquare className="h-6 w-6 text-primary"/>,
        title: "Best Practices for Fine-Tuning LLMs",
        category: "Learning & Resources"
    }
];

const resourceHub = [
    {
        icon: <Compass className="h-8 w-8 text-accent"/>,
        title: "New Member Guide",
        desc: "Your starting point for navigating the Vasudev AI cosmos.",
        href: "https://discord.gg/e5uPQDXSSk"
    },
    {
        icon: <Book className="h-8 w-8 text-accent"/>,
        title: "Community Tutorials",
        desc: "Learn from guides and articles created by our talented members.",
        href: "https://discord.gg/e5uPQDXSSk"
    },
    {
        icon: <Wrench className="h-8 w-8 text-accent"/>,
        title: "Open-Source Tools",
        desc: "Explore the tools and frameworks we build and use together.",
        href: "https://discord.gg/e5uPQDXSSk"
    }
];

const councilMembers = [
  {
    name: 'Surya Pratap Singh',
    badgeIcon: <Rocket className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Visionary',
    avatarUrl: '/team/surya.png',
    avatarHint: 'glowing sun star',
    glowColor: 'hsl(var(--accent))',
  },
  {
    name: 'Aman Dangi',
    badgeIcon: <BrainCircuit className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Innovator',
    avatarUrl: '/team/aman.png',
    avatarHint: 'cyan planet rings',
    glowColor: 'hsl(var(--secondary))',
  },
  {
    name: 'Ashutosh K. Tripathi',
    badgeIcon: <Award className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Oracle',
    avatarUrl: '/team/ashutosh.png',
    avatarHint: 'golden nebula',
    glowColor: '#39FF14',
  },
  {
    name: 'Biswjeet',
    badgeIcon: <Brush className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Artist',
    avatarUrl: '/team/biswjeet.png',
    avatarHint: 'holographic sphere',
    glowColor: '#FF00FF',
  },
];


export default function CommunityPage() {
  return (
    <div className={cn("pb-20", cinzel.variable)}>
      <PageHeader
        title="The Vasudev AI Community"
        subtitle="A divine network of AI creators, thinkers, and dreamers."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />
      
      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-6">The Celestial Council</h2>
          <p className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">Meet the guardians of our community—members recognized for their outstanding contributions, vision, and guidance.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {councilMembers.map((member) => (
              <MemberCard
                key={member.name}
                name={member.name}
                badgeIcon={member.badgeIcon}
                badgeLabel={member.badgeLabel}
                avatarUrl={member.avatarUrl}
                avatarHint={member.avatarHint}
                glowColor={member.glowColor}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoin.map((item) => (
              <Card key={item.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-headline text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">What We Do Together</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-base md:text-lg text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col sm:flex-row items-start gap-4">
                   <div className="p-3 bg-primary/10 rounded-full">{event.icon}</div>
                   <div>
                    <CardTitle className="text-xl md:text-2xl font-headline text-white">{event.title}</CardTitle>
                    <p className="text-accent text-sm font-semibold">{event.date}</p>
                   </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{event.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 md:w-10 md:h-10 text-secondary fill-secondary mr-3" />
                    <h2 className="text-3xl md:text-4xl font-headline text-white">Community Spotlights</h2>
                </div>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">Hear from the visionaries at the heart of our movement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {communitySpotlights.map((spotlight) => (
                    <div key={spotlight.name} className="bg-card/70 border border-primary/20 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg">
                        <blockquote className="text-base md:text-lg italic text-gray-300 border-l-4 border-accent pl-4 mb-4">
                            {spotlight.quote}
                        </blockquote>
                        <div className="text-right">
                            <h3 className="text-xl font-headline text-white">{spotlight.name}</h3>
                            <p className="text-accent font-semibold">{spotlight.role}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>

       <section className="w-full py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Discussion Highlights</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {discussionHighlights.map((item, index) => (
               <Card key={index} className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/30">
                  <div className="flex items-start gap-4">
                      {item.icon}
                      <div>
                          <p className="text-sm text-primary font-semibold">{item.category}</p>
                          <h3 className="font-bold text-lg text-white">{item.title}</h3>
                      </div>
                  </div>
               </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Resource Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resourceHub.map((item) => (
              <Card key={item.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-headline text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{item.desc}</p>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-accent">
                    <Link href={item.href} target="_blank" rel="noopener noreferrer">Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-headline font-bold text-accent">Awaken with Vasudev AI — Join the Divine-Tech Movement</h2>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 md:px-10 py-5 md:py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Become a Member</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
