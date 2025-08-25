

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface MemberCardProps {
  name: string;
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  avatarUrl: string;
  avatarHint: string;
  glowColor: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ name, badgeIcon, badgeLabel, avatarUrl, avatarHint, glowColor }) => {
  const cardStyle: React.CSSProperties = {
    '--glow-color': glowColor,
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties;

  return (
    <Card style={cardStyle} className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-[var(--glow-color)] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_var(--glow-color)] group">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--glow-color)_0,_transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-300"/>
      <CardContent className="flex flex-row items-center justify-between gap-4 relative z-10 p-0">
        <div className="flex flex-col items-start text-left gap-2">
          <h3 className="text-2xl font-headline text-white">{name}</h3>
          <Badge
            className="border-transparent text-base"
            style={{ 
              backgroundColor: `${glowColor}33`, // 20% opacity
              color: glowColor,
              border: `1px solid ${glowColor}80` // 50% opacity
            }}
          >
            <div className="flex items-center gap-2">
              {badgeIcon}
              <span>{badgeLabel}</span>
            </div>
          </Badge>
        </div>
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image 
            src={avatarUrl} 
            alt={name} 
            width={96}
            height={96}
            data-ai-hint={avatarHint}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
