
'use client';

import React, { useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
import { X, Download, Loader2, Frame, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { resolutions, type Resolution } from '@/lib/resolutions';
import { wallpapers } from '@/lib/wallpapers-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export default function WallpaperCustomizePage({ params }: Props) {
  const wallpaper = wallpapers.find((w) => w.slug === params.slug);
  
  const [selectedRes, setSelectedRes] = useState<Resolution>(resolutions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const wallpaperRef = useRef<HTMLDivElement>(null);

  if (!wallpaper) {
    notFound();
  }

  const WallpaperComponent = wallpaper.component;

  const handleDownload = async () => {
    if (!wallpaperRef.current) return;

    setIsLoading(true);
    try {
      const dataUrl = await toPng(wallpaperRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 1,
        width: selectedRes.width,
        height: selectedRes.height,
      });
      const link = document.createElement('a');
      link.download = `vasudev-ai-${wallpaper.slug}-${selectedRes.name.toLowerCase().replace(/ /g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolutionChange = (value: string) => {
    const res = resolutions.find(r => r.id === value);
    if (res) {
      setSelectedRes(res);
    }
  };

  const isPortrait = selectedRes.height > selectedRes.width;
  const previewAspectRatio = selectedRes.width / selectedRes.height;

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col">
        <div className="hidden">
            <WallpaperComponent
                ref={wallpaperRef}
                aspect={isPortrait ? 'portrait' : 'landscape'}
                style={{ width: selectedRes.width, height: selectedRes.height }}
            />
        </div>

        <header className="p-4 border-b border-primary/20 container mx-auto flex items-center justify-between">
            <div>
                <h1 className="text-xl md:text-2xl font-headline text-accent">{wallpaper.title}</h1>
                <p className="text-sm text-gray-400">Customize your wallpaper</p>
            </div>
            <Button asChild variant="ghost">
                <Link href="/downloads"><ArrowLeft className="mr-2" /> Back to Downloads</Link>
            </Button>
        </header>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-4">
            {/* Preview Panel */}
            <div className="lg:col-span-3 flex items-center justify-center p-4 md:p-8 bg-background/30 overflow-auto">
                 <div
                    className={cn(
                        "shadow-2xl shadow-black/50 border-2 border-primary/20 rounded-lg overflow-hidden transition-all duration-300 w-full h-full max-w-full max-h-full",
                    )}
                    style={{ aspectRatio: previewAspectRatio }}
                    >
                    <WallpaperComponent
                        aspect={isPortrait ? 'portrait' : 'landscape'}
                        className="w-full h-full"
                    />
                </div>
            </div>
            
            {/* Controls Panel */}
            <div className="lg:col-span-1 p-6 space-y-6 bg-card/50 border-t lg:border-t-0 lg:border-l border-primary/20">
                <h2 className="text-xl sm:text-2xl font-headline text-accent">Customize & Download</h2>
                
                <div className="space-y-2">
                <Label htmlFor="resolution-select" className="flex items-center gap-2 text-primary"><Frame size={16}/> Resolution</Label>
                <Select onValueChange={handleResolutionChange} defaultValue={selectedRes.id}>
                    <SelectTrigger id="resolution-select" className="w-full bg-background/50">
                    <SelectValue placeholder="Select a resolution" />
                    </SelectTrigger>
                    <SelectContent>
                        {resolutions.map(res => (
                            <SelectItem key={res.id} value={res.id}>{res.name} ({res.width}x{res.height})</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </div>

                <p className="text-xs text-gray-400">
                    The wallpaper is generated in your browser. Select a resolution and hit download.
                </p>

                <Button onClick={handleDownload} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Download className="mr-2 h-5 w-5" />
                            Download Wallpaper
                        </>
                    )}
                </Button>
            </div>
        </div>
    </div>
  );
};
