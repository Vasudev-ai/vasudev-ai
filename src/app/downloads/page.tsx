
'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import type { Metadata } from 'next';
import GeneratedWallpaper from './_components/generated-wallpaper';


const wallpapers = [
  {
    id: 'mobile',
    title: 'Awakening Intelligence (Mobile)',
    description: 'The official Vasudev AI brand wallpaper for your mobile device. Simple, elegant, and futuristic.',
    aspect: 'portrait' as const,
  },
  {
    id: 'desktop',
    title: 'Awakening Intelligence (Desktop)',
    description: 'The official Vasudev AI brand wallpaper for your desktop. Available in high resolution.',
    aspect: 'landscape' as const,
  },
];

export default function DownloadsPage() {
  const wallpaperRefs = {
    mobile: useRef<HTMLDivElement>(null),
    desktop: useRef<HTMLDivElement>(null),
  };

  const [loading, setLoading] = useState<string | null>(null);

  const handleDownload = async (id: 'mobile' | 'desktop') => {
    const element = wallpaperRefs[id].current;
    if (!element) {
      return;
    }

    setLoading(id);
    try {
      const dataUrl = await toPng(element, { 
        cacheBust: true,
        quality: 1,
        pixelRatio: 2 // For higher resolution
      });
      const link = document.createElement('a');
      link.download = `vasudev-ai-wallpaper-${id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setLoading(null);
    }
  };


  return (
    <div className="pb-20">
      <PageHeader
        title="Downloads & Brand Assets"
        subtitle="Get official Vasudev AI wallpapers, logos, and other assets to represent the divine-tech movement."
      />
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400">
          Wallpapers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {wallpapers.map((wallpaper) => (
            <Card key={wallpaper.id} className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-all duration-300 overflow-hidden group">
              <CardContent className="p-4 md:p-6 flex flex-col">
                <div className="rounded-lg overflow-hidden border-2 border-primary/20 mb-6">
                    <GeneratedWallpaper ref={wallpaperRefs[wallpaper.id as keyof typeof wallpaperRefs]} aspect={wallpaper.aspect} />
                </div>
                <div className="flex-grow">
                    <h3 className="text-xl font-headline text-white mb-2">{wallpaper.title}</h3>
                    <p className="text-gray-400 text-sm mb-6">{wallpaper.description}</p>
                </div>
                <Button onClick={() => handleDownload(wallpaper.id as 'mobile' | 'desktop')} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full mt-auto" disabled={loading === wallpaper.id}>
                    {loading === wallpaper.id ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                         <>
                            <Download className="mr-2 h-5 w-5" />
                            Download
                        </>
                    )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

