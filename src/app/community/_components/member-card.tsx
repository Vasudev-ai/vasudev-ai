
import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import './member-card.css';

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
  } as React.CSSProperties;

  return (
    <Card style={cardStyle} className="member-card bg-card/70 border-primary/20 backdrop-blur-sm group overflow-hidden">
        <div className="member-card-inner">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--glow-color)_0,_transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-300"/>
            <div className="relative z-10 flex flex-col items-start text-left gap-2 flex-grow">
                <h3 className="text-xl md:text-2xl font-headline text-white">{name}</h3>
                <Badge
                    className="border-transparent text-sm md:text-base"
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
            <div className="relative w-24 h-32 md:w-28 md:h-40 flex-shrink-0 -mr-6 -mb-6 md:-mr-10 md:-mb-10">
                <Image 
                    src={avatarUrl} 
                    alt={name} 
                    width={160}
                    height={220}
                    data-ai-hint={avatarHint}
                    className="object-contain absolute bottom-0 right-0 w-full h-full transition-transform duration-300 group-hover:scale-125"
                />
            </div>
        </div>
    </Card>
  );
};

export default MemberCard;
