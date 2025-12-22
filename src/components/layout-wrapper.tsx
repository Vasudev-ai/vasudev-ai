'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';
import IntroAnimation from '@/components/intro-animation';
import BottomNav from '@/components/bottom-nav';
import { Toaster } from '@/components/ui/toaster';

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const isEventPage = pathname === '/event';

    useEffect(() => {
        const hasAnimationPlayed = sessionStorage.getItem('vasudevAnimationPlayed');

        if (hasAnimationPlayed) {
            setLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('vasudevAnimationPlayed', 'true');
        }, 4000); // Animation duration

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <IntroAnimation />
            ) : (
                <>
                    <div className={`relative ${isEventPage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
                        {!isEventPage && <AnimatedBackground />}
                        <div className={`relative z-10 flex flex-col ${isEventPage ? 'h-full' : 'min-h-screen'}`}>
                            <Header />
                            <main
                                className={`flex-grow flex flex-col ${isEventPage ? 'overflow-hidden' : 'pb-20 md:pb-0'
                                    }`}
                            >
                                {children}
                            </main>
                            {!isEventPage && <Footer />}
                        </div>
                    </div>
                    <Toaster />
                    {!isEventPage && <BottomNav />}
                </>
            )}
        </>
    );
}
