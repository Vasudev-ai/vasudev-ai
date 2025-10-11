
import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContributorCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  glowColor: string;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ name, role, avatarUrl, glowColor }) => {
  const cardStyle: React.CSSProperties = {
    '--glow-color': glowColor,
  } as React.CSSProperties;

  return (
    <Card style={cardStyle} className="bg-card/70 border-primary/20 backdrop-blur-sm p-4 text-center hover:border-[var(--glow-color)] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_var(--glow-color)] group overflow-hidden">
        <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
                src={avatarUrl}
                alt={name}
                width={96}
                height={96}
                className="rounded-full object-cover border-2 border-primary/30 group-hover:border-[var(--glow-color)] transition-colors"
            />
             <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--glow-color)_0,_transparent_70%)] opacity-0 group-hover:opacity-40 transition-opacity duration-300"/>
        </div>
        <h3 className="text-lg font-headline text-white">{name}</h3>
        <p style={{color: glowColor}} className="text-sm font-semibold">{role}</p>
    </Card>
  );
};

export default ContributorCard;
