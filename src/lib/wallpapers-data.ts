
import React from 'react';
import GeneratedWallpaper from '@/app/downloads/_components/generated-wallpaper';

export interface Wallpaper {
  id: string;
  slug: string;
  title: string;
  description: string;
  component: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement> & { aspect: 'portrait' | 'landscape'; }, "ref"> & React.RefAttributes<HTMLDivElement>>;
}

export const wallpapers: Wallpaper[] = [
  {
    id: 'awakening-intelligence',
    slug: 'awakening-intelligence',
    title: 'Awakening Intelligence',
    description: 'The official Vasudev AI brand wallpaper. A dynamic, code-generated design capturing our divine-tech aesthetic.',
    component: GeneratedWallpaper,
  },
];
