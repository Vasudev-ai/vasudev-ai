
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Downloads | Vasudev AI Brand Assets',
  description: 'Download official Vasudev AI wallpapers and other brand assets. Get high-quality mobile and desktop backgrounds to showcase your support for the divine-tech movement.',
  keywords: ['Vasudev AI wallpapers', 'AI wallpapers', 'tech wallpapers', 'desktop backgrounds', 'mobile wallpapers', 'brand assets', 'download Vasudev AI logo'],
  openGraph: {
    title: 'Downloads | Vasudev AI Brand Assets',
    description: 'Get official high-quality wallpapers for your mobile and desktop devices from Vasudev AI.',
    url: 'https://www.vasudev.ai/downloads',
  },
};

const wallpapers = [
  {
    title: 'Awakening Intelligence (Mobile)',
    description: 'The official Vasudev AI brand wallpaper for your mobile device. Simple, elegant, and futuristic.',
    imageUrl: '/wallpapers/vasudev-wallpaper-mobile.jpg',
    downloadUrl: '/wallpapers/vasudev-wallpaper-mobile.jpg',
    aspect: 'portrait',
  },
  {
    title: 'Awakening Intelligence (Desktop)',
    description: 'The official Vasudev AI brand wallpaper for your desktop. Available in 4K resolution.',
    imageUrl: '/wallpapers/vasudev-wallpaper-desktop.jpg',
    downloadUrl: '/wallpapers/vasudev-wallpaper-desktop.jpg',
    aspect: 'landscape',
  },
];

export default function DownloadsPage() {
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
            <Card key={wallpaper.title} className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-all duration-300 overflow-hidden group">
              <CardContent className="p-0">
                <div className={`relative ${wallpaper.aspect === 'portrait' ? 'aspect-[9/18]' : 'aspect-video'} overflow-hidden`}>
                  <Image
                    src={wallpaper.imageUrl}
                    alt={wallpaper.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-headline text-white mb-2">{wallpaper.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{wallpaper.description}</p>
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">
                    <Link href={wallpaper.downloadUrl} download>
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
