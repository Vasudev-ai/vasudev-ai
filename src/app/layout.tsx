import type { Metadata } from 'next';
import { Cinzel, Lato } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';

const lato = Lato({ 
  subsets: ['latin'], 
  variable: '--font-lato',
  weight: ['400', '700']
});
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Vasudev AI',
  description: 'Where Intelligence Meets Innovation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${lato.variable} ${cinzel.variable} font-body antialiased`}
      >
        <div className="relative min-h-screen">
          <AnimatedBackground />
          <div className="relative z-10">
            <Header />
            <main className="fade-in">{children}</main>
            <Footer />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
