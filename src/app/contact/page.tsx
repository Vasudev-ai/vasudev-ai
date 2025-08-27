
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Disc, Github, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from './_components/contact-form';

export const metadata: Metadata = {
  title: 'Contact | Vasudev AI',
  description: 'Get in touch with the Vasudev AI team.',
};

const socialLinks = [
    { name: 'GitHub', icon: <Github />, href: 'https://github.com/Vasudev-ai', handle: '@vasudevai' },
    { name: 'Discord', icon: <Disc />, href: 'https://discord.gg/e5uPQDXSSk', handle: 'discord.gg/vasudevai' },
    { name: 'Twitter', icon: <Twitter />, href: 'https://x.com/VashudevAi', handle: '@VashudevAi' },
    { name: 'YouTube', icon: <Youtube />, href: 'https://www.youtube.com/@CodeCraftwithSurya', handle: 'CodeCraftwithSurya' },
];

export default function ContactPage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="Contact Us"
                subtitle="Have a question, suggestion, or want to collaborate? Reach out."
            />
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
                            <CardContent className="p-6 md:p-8">
                               <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-3xl font-headline text-accent">Connect on Social</h3>
                        <div className="space-y-4">
                            {socialLinks.map(social => (
                                <Link href={social.href} key={social.name} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center gap-4 p-4 rounded-lg bg-card/70 border border-primary/20 hover:border-primary transition-colors duration-300 group">
                                    <div className="text-primary group-hover:text-accent transition-colors duration-300">
                                        {social.icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white">{social.name}</p>
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
