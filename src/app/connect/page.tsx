
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Youtube, Mail, ExternalLink, X } from 'lucide-react';
import { FaDiscord, FaXTwitter, FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

const BANNER = '/wallpapers/vasudev-ai-awakening-intelligence-4k-uhd.png';

const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/Vasudev-ai',
        icon: Github,
        description: 'Explore our open-source projects and contributions.',
        detailedInfo: 'Dive into our repositories to see the code driving our AI models. Contribute to issues, submit pull requests, and help us build the future of open-source AI. We maintain active documentation and welcome developers of all skill levels.',
        color: 'text-white',
        borderColor: 'hover:border-white/50',

    },
    {
        name: 'X (Twitter)',
        url: 'https://x.com/VashudevAi',
        icon: FaXTwitter,
        description: 'Follow us for the latest updates and announcements.',
        detailedInfo: 'Stay in the loop with real-time updates, community highlights, and tech insights. Engage with our team and other followers in threads about the latest trends in AI and software development.',
        color: 'text-white',
        borderColor: 'hover:border-white/50',

    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/vasudev-ai',
        icon: Linkedin,
        description: 'Connect with us professionally and see our growth.',
        detailedInfo: 'Follow our professional journey. We share company milestones, job openings, and thought leadership articles on the state of AI. Connect with our founders and team members to expand your professional network.',
        color: 'text-blue-400',
        borderColor: 'hover:border-blue-500/50',

    },
    {
        name: 'Discord',
        url: 'https://discord.gg/rBBSS6bn',
        icon: FaDiscord,
        description: 'Join our community server to chat and collaborate.',
        detailedInfo: 'This is where the magic happens. Join our vibrant community of developers, researchers, and enthusiasts. Participate in live coding sessions, get support for our tools, and share your own projects.',
        color: 'text-indigo-400',
        borderColor: 'hover:border-indigo-500/50',

    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/@CodeCraftwithSurya',
        icon: Youtube,
        description: 'Watch tutorials, demos, and tech talks.',
        detailedInfo: 'Visual learner? Subscribe to our channel for in-depth tutorials, product demos, and recordings of our community events. We cover topics ranging from basic AI concepts to advanced implementation guides.',
        color: 'text-red-500',
        borderColor: 'hover:border-red-600/50',

    },
    {
        name: 'Email',
        url: 'mailto:info@vasudev.online',
        icon: Mail,
        description: 'Contact us directly for inquiries and support.',
        detailedInfo: 'Have a specific question or partnership proposal? Reach out to us directly. Our team is ready to assist with enterprise inquiries, support requests, and press opportunities.',
        color: 'text-teal-400',
        borderColor: 'hover:border-teal-400/50',

    },
    {
        name: 'WhatsApp',
        url: 'https://chat.whatsapp.com/C6kKT0bqdGf9BWplqpvY53',
        icon: FaWhatsapp,
        description: 'Chat with us directly on WhatsApp for quick support.',
        detailedInfo: 'Prefer messaging? Reach out to us on WhatsApp for quick responses, community updates, and direct support. We share exclusive content, announcements, and help you get started with Vasudev AI tools.',
        color: 'text-green-400',
        borderColor: 'hover:border-green-500/50',

    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/vasudev_ai/',
        icon: FaInstagram,
        description: 'Follow us for visual updates and behind-the-scenes content.',
        detailedInfo: 'Get a glimpse into our creative process, team highlights, and project sneak peeks. We share engaging stories, reels, and posts that showcase the intersection of AI and divinity.',
        color: 'text-pink-500',
        borderColor: 'hover:border-pink-500/50',

    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 },
    },
};

export default function ConnectPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        // Prevent scroll when modal is open
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedId]);

    return (
        <div className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Connect with Vasudev AI
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    Join our community, follow our progress, and get in touch across all our platforms.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {socialLinks.map((link) => (
                    <motion.div
                        key={link.name}
                        variants={itemVariants}
                        layoutId={`card-container-${link.name}`}
                        onClick={() => setSelectedId(link.name)}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card className={`h-full bg-black/40 border-gray-800 backdrop-blur-sm transition-all duration-300 hover:bg-gray-900/50 hover:border-gray-600 ${link.borderColor} group overflow-hidden relative min-h-[160px]`}>
                            {/* Subtle banner background on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Image
                                    src={BANNER}
                                    alt="Vasudev AI"
                                    fill
                                    className="object-cover opacity-10"
                                />
                            </div>

                            <CardHeader className="flex flex-row items-center gap-4 pb-2 relative z-10">
                                <div className={`p-3 rounded-full bg-gray-900/80 border border-gray-700 group-hover:border-gray-500 transition-colors shadow-lg`}>
                                    <link.icon className={`w-6 h-6 ${link.color}`} />
                                </div>
                                <CardTitle className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                                    {link.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="relative z-10 pb-10">
                                <CardDescription className="text-gray-400 text-base group-hover:text-gray-300 transition-colors leading-relaxed">
                                    {link.description}
                                </CardDescription>
                            </CardContent>

                            {/* Bottom-right arrow button */}
                            <div className="absolute bottom-4 right-4 z-10">
                                <div className={`
                                    w-9 h-9 rounded-full flex items-center justify-center
                                    bg-gray-900/80 border border-gray-700
                                    group-hover:bg-blue-600 group-hover:border-blue-500
                                    transition-all duration-300 shadow-md
                                `}>
                                    <svg
                                        className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </div>
                            </div>
                        </Card>

                    </motion.div>
                ))}
            </motion.div>

            {/* Expandable Modal */}
            <AnimatePresence>
                {selectedId && (() => {
                    const link = socialLinks.find((l) => l.name === selectedId);
                    if (!link) return null;
                    return (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                            />

                            {/* Modal */}
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 40 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                className="fixed inset-0 z-[51] flex items-center justify-center p-4"
                                onClick={() => setSelectedId(null)}
                            >
                                <div
                                    className="w-full max-w-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Card className="bg-gray-950 border-gray-800 shadow-2xl overflow-hidden">
                                        {/* Banner */}
                                        <div className="relative h-52 sm:h-72 w-full overflow-hidden">
                                            <Image
                                                src={BANNER}
                                                alt="Vasudev AI Banner"
                                                fill
                                                priority
                                                className="object-cover object-center"
                                            />
                                            {/* Gradient overlay */}


                                            {/* Platform badge over banner */}
                                            <div className="absolute bottom-4 left-6 flex items-center gap-3">
                                                <div className="p-3 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm shadow-xl">
                                                    <link.icon className={`w-7 h-7 ${link.color}`} />
                                                </div>
                                                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                                                    {link.name}
                                                </h2>
                                            </div>

                                            {/* Close button */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute top-3 right-3 text-white hover:bg-black/40 bg-black/20 backdrop-blur-sm rounded-full border border-white/10"
                                                onClick={() => setSelectedId(null)}
                                            >
                                                <X className="w-5 h-5" />
                                            </Button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-5">
                                            <p className="text-lg text-gray-200 font-light leading-relaxed">
                                                {link.description}
                                            </p>

                                            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                                            <p className="text-gray-400 leading-relaxed">
                                                {link.detailedInfo}
                                            </p>

                                            <div className="flex gap-3 pt-2">
                                                <Button
                                                    asChild
                                                    className="bg-white text-black hover:bg-gray-100 font-semibold px-6 rounded-full"
                                                >
                                                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                                        Visit {link.name}
                                                        <ExternalLink className="ml-2 w-4 h-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="border-gray-700 hover:bg-gray-900 hover:text-white rounded-full"
                                                    onClick={() => setSelectedId(null)}
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        </>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
