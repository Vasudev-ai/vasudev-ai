
import PageHeader from '@/components/page-header';
import type { Metadata } from 'next';
import WallpaperForm from './_components/wallpaper-form';

export const metadata: Metadata = {
  title: 'AI Wallpaper Studio | Vasudev AI',
  description: 'Generate your own divine & futuristic wallpapers for mobile and desktop with the power of Vasudev AI.',
  keywords: ['AI wallpaper generator', 'custom wallpapers', 'divine art', 'futuristic backgrounds', 'Vasudev AI', 'AI art generator'],
  openGraph: {
    title: 'AI Wallpaper Studio | Vasudev AI',
    description: 'Generate your own divine & futuristic wallpapers for mobile and desktop with the power of Vasudev AI.',
    url: 'https://www.vasudev.ai/wallpaper',
  },
  twitter: {
    title: 'AI Wallpaper Studio | Vasudev AI',
    description: 'Generate your own divine & futuristic wallpapers for mobile and desktop with the power of Vasudev AI.',
  },
};

export default function WallpaperPage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="AI Wallpaper Studio"
                subtitle="Generate your own divine & futuristic wallpapers for mobile and desktop with the power of Vasudev AI."
            />
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="max-w-4xl mx-auto">
                    <WallpaperForm />
                </div>
            </div>
        </div>
    );
}
