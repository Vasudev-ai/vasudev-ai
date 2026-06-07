
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Disc, Github, Twitter, Youtube, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from './_components/contact-form';

export const metadata: Metadata = {
    title: 'Contact Vasudev AI | Let\'s Collaborate',
    description: 'Open a channel to the Vasudev AI collective. Contact us for collaborations, freelance projects, or inquiries. Let\'s build the future of AI together.',
    keywords: ['contact Vasudev AI', 'AI collaboration', 'AI freelance projects', 'AI community contact', 'divine tech contact', 'open source AI collaboration'],
    openGraph: {
        title: 'Contact Vasudev AI | Let\'s Collaborate',
        description: 'Open a channel to the Vasudev AI collective. Let\'s collaborate and build the future of open-source, divine AI.',
        url: 'https://www.vasudevai.in/contact',
    },
    twitter: {
        title: 'Contact Vasudev AI | Let\'s Collaborate',
        description: 'Open a channel to the Vasudev AI collective. Let\'s collaborate and build the future of open-source, divine AI.',
    },
};

const socialLinks = [
    { name: 'GitHub', icon: <Github size={28} />, href: 'https://github.com/Vasudev-ai', handle: '@vasudevai' },
    { name: 'Discord', icon: <Disc size={28} />, href: 'https://discord.gg/e5uPQDXSSk', handle: 'Join the Collective' },
    { name: 'Twitter', icon: <Twitter size={28} />, href: 'https://x.com/VashudevAi', handle: '@VashudevAi' },
    { name: 'LinkedIn', icon: <Linkedin size={28} />, href: 'https://www.linkedin.com/company/108165965/', handle: 'Vasudev AI' },
    { name: 'Instagram', icon: <Instagram size={28} />, href: 'https://www.instagram.com/vasudev_ai/', handle: '@vasudev_ai' },
];

export default function ContactPage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="Interstellar Comms"
                subtitle="Have a question, suggestion, or want to collaborate? Open a channel."
                className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
            />
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    <div className="lg:col-span-3">
                        <Card className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/10">
                            <CardContent className="p-6 md:p-10">
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <h3 className="text-3xl font-headline text-accent text-center lg:text-left">Join Our Constellation</h3>
                        <div className="space-y-6">
                            {socialLinks.map(social => (
                                <Link href={social.href} key={social.name} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-lg bg-card/70 border border-primary/20 hover:border-primary transition-all duration-300 group hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                                    <div className="text-primary group-hover:text-accent transition-colors duration-300 group-hover:animate-pulse">
                                        {social.icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white font-headline">{social.name}</p>
                                        <p className="text-gray-400 group-hover:text-accent transition-colors duration-300">{social.handle}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
