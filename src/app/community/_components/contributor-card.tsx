
import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface ContributorCardProps {
  name: string;
  role: string;
  contribution: string;
  avatarUrl: string;
  glowColor: string;
  country?: string;
  countryFlag?: string;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ name, role, contribution, avatarUrl, glowColor, country, countryFlag }) => {
  const cardStyle: React.CSSProperties = {
    '--glow-color': glowColor,
  } as React.CSSProperties;

  return (
    <Card style={cardStyle} className="relative bg-card/70 border-primary/20 backdrop-blur-sm overflow-hidden hover:border-[var(--glow-color)] transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_var(--glow-color)] group">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--glow-color)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-stretch min-h-[320px]">
        <div className="relative flex-shrink-0 w-40">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-center min-w-0 p-4 pl-5">
          <h3 className="text-base font-headline text-white truncate">{name}</h3>
          <p style={{color: glowColor}} className="text-sm font-semibold">{role}</p>
          {country && countryFlag && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-sm">{countryFlag}</span>
              <span className="text-xs text-gray-400">{country}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ContributorCard;
