import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Disc, Github, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Vasudev AI',
  description: 'Get in touch with the Vasudev AI team.',
};

const socialLinks = [
    { name: 'GitHub', icon: <Github />, href: 'https://github.com/Vasudev-ai', handle: '@vasudevai' },
    { name: 'Discord', icon: <Disc />, href: 'https://discord.gg/e5uPQDXSSk', handle: 'discord.gg/vasudevai' },
    { name: 'Twitter', icon: <Twitter />, href: '#', handle: '@vasudev_ai' },
    { name: 'YouTube', icon: <Youtube />, href: '#', handle: 'Vasudev AI' },
];

export default function ContactPage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="Contact Us"
                subtitle="Have a question, suggestion, or want to collaborate? Reach out."
            />
            <div className="container mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-lg text-primary">Name</Label>
                                        <Input id="name" placeholder="Your Name" className="bg-background/50 h-12 text-base" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-lg text-primary">Email</Label>
                                        <Input id="email" type="email" placeholder="your.email@example.com" className="bg-background/50 h-12 text-base" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-lg text-primary">Message</Label>
                                        <Textarea id="message" placeholder="Your message..." className="bg-background/50 text-base" rows={6} />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-full shadow-[0_0_20px] shadow-primary/40 transition-all duration-300 hover:shadow-primary/70">
                                        Send Message
                                    </Button>
                                </form>
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
