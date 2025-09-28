
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { X, Download, Loader2, Frame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import GeneratedWallpaper from './generated-wallpaper';
import { resolutions, type Resolution } from '@/lib/resolutions';
import { cn } from '@/lib/utils';

interface DownloadOptionsModalProps {
  onClose: () => void;
}

const DownloadOptionsModal: React.FC<DownloadOptionsModalProps> = ({ onClose }) => {
  const [selectedRes, setSelectedRes] = useState<Resolution>(resolutions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const wallpaperRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!wallpaperRef.current) return;

    setIsLoading(true);
    try {
      const dataUrl = await toPng(wallpaperRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 1, // We control resolution via width/height, so pixelRatio should be 1
        width: selectedRes.width,
        height: selectedRes.height,
      });
      const link = document.createElement('a');
      link.download = `vasudev-ai-wallpaper-${selectedRes.name.toLowerCase().replace(/ /g, '-')}.png`;
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        className="fixed inset-0 bg-background/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <div className="bg-card/70 border border-primary/20 backdrop-blur-sm rounded-xl shadow-2xl shadow-primary/20 flex flex-col lg:flex-row overflow-hidden">
          {/* Preview Panel */}
          <div className="flex-grow p-6 flex items-center justify-center bg-background/30">
            <div
              className={cn("shadow-2xl shadow-black/50 border-2 border-primary/20 rounded-lg overflow-hidden transition-all duration-300", isPortrait ? "w-48" : "w-full max-w-lg")}
              style={{ aspectRatio: previewAspectRatio }}
            >
              <GeneratedWallpaper
                ref={wallpaperRef}
                aspect={isPortrait ? 'portrait' : 'landscape'}
                style={{ width: selectedRes.width, height: selectedRes.height, transform: `scale(${isPortrait ? 320 / selectedRes.width : 1})`, transformOrigin: 'top left' }}
                className="hidden" // Hidden from view, used only for generation
              />
              <GeneratedWallpaper
                aspect={isPortrait ? 'portrait' : 'landscape'}
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Controls Panel */}
          <div className="w-full lg:w-80 flex-shrink-0 p-6 space-y-6 bg-card/80 border-t lg:border-t-0 lg:border-l border-primary/20">
            <h2 className="text-2xl font-headline text-accent">Customize & Download</h2>
            
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
                        Download
                    </>
                )}
            </Button>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute -top-3 -right-3 text-gray-400 hover:text-white bg-card rounded-full border border-primary/20">
          <X />
        </Button>
      </motion.div>
    </div>
  );
};

export default DownloadOptionsModal;
