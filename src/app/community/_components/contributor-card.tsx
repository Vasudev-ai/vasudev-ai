
import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <Card style={cardStyle} className="bg-card/70 border-primary/20 backdrop-blur-sm p-4 text-center hover:border-[var(--glow-color)] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_var(--glow-color)] group overflow-hidden flex flex-col">
        <div className="flex-grow">
            <div className="relative w-28 h-28 mx-auto mb-4">
                <Image
                    src={avatarUrl}
                    alt={name}
                    width={112}
                    height={112}
                    className="rounded-full object-cover aspect-square border-2 border-primary/30 group-hover:border-[var(--glow-color)] transition-colors"
                />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--glow-color)_0,_transparent_70%)] opacity-0 group-hover:opacity-40 transition-opacity duration-300"/>
            </div>
            <h3 className="text-lg font-headline text-white">{name}</h3>
            <p style={{color: glowColor}} className="text-sm font-semibold">{role}</p>
            {country && countryFlag && (
                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                    <span className="text-lg">{countryFlag}</span>
                    <span className="text-xs text-gray-400">{country}</span>
                </div>
            )}
        </div>
        {contribution && (
            <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-primary/10">{contribution}</p>
        )}
    </Card>
  );
};

export default ContributorCard;

    