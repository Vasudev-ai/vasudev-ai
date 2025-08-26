
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className }) => {
  return (
    <section className={`w-full py-16 md:py-28 text-center bg-card/30 ${className}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-xl text-primary max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;
