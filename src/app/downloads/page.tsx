
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Expand } from 'lucide-react';
import GeneratedWallpaper from './_components/generated-wallpaper';
import DownloadOptionsModal from './_components/download-options-modal';
import { AnimatePresence } from 'framer-motion';

const wallpaper = {
  id: 'awakening-intelligence',
  title: 'Awakening Intelligence',
  description: 'The official Vasudev AI brand wallpaper. A dynamic, code-generated design capturing our divine-tech aesthetic. Customize the resolution for your device.',
};

export default function DownloadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="pb-20">
        <PageHeader
          title="Downloads & Brand Assets"
          subtitle="Get official Vasudev AI wallpapers, logos, and other assets to represent the divine-tech movement."
        />
        <div className="container mx-auto px-4 mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-400">
            Wallpapers
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-all duration-300 overflow-hidden group">
              <CardContent className="p-4 md:p-6 flex flex-col">
                <div className="rounded-lg overflow-hidden border-2 border-primary/20 mb-6 relative">
                  <GeneratedWallpaper aspect="landscape" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <Button
                        onClick={() => setIsModalOpen(true)}
                        size="lg"
                        className="bg-background/80 text-white font-bold rounded-full backdrop-blur-sm border border-primary/50 hover:bg-primary hover:text-primary-foreground"
                      >
                       <Expand className="mr-2 h-5 w-5" />
                       Customize & Download
                    </Button>
                  </div>
                </div>
                <div className="flex-grow text-center">
                  <h3 className="text-xl font-headline text-white mb-2">{wallpaper.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{wallpaper.description}</p>
                </div>
                 <Button
                    onClick={() => setIsModalOpen(true)}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full mt-auto md:hidden"
                  >
                   <Expand className="mr-2 h-5 w-5" />
                   Customize & Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <DownloadOptionsModal
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
