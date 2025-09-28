
export interface Resolution {
  id: string;
  name: string;
  width: number;
  height: number;
  type: 'Mobile' | 'Desktop';
}

export const resolutions: Resolution[] = [
  // Mobile
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', width: 1290, height: 2796, type: 'Mobile' },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', width: 1179, height: 2556, type: 'Mobile' },
  { id: 'samsung-s24-ultra', name: 'Samsung S24 Ultra', width: 1440, height: 3120, type: 'Mobile' },
  { id: 'pixel-8-pro', name: 'Google Pixel 8 Pro', width: 1344, height: 2992, type: 'Mobile' },
  { id: 'generic-mobile', name: 'Generic Mobile', width: 1080, height: 2340, type: 'Mobile' },
  
  // Desktop
  { id: 'hd', name: '1080p HD', width: 1920, height: 1080, type: 'Desktop' },
  { id: 'qhd', name: '1440p QHD', width: 2560, height: 1440, type: 'Desktop' },
  { id: '4k', name: '4K UHD', width: 3840, height: 2160, type: 'Desktop' },
  { id: 'ultrawide', name: 'Ultrawide QHD', width: 3440, height: 1440, type: 'Desktop' },
  { id: 'macbook-pro-16', name: 'MacBook Pro 16"', width: 3456, height: 2234, type: 'Desktop' },
];
