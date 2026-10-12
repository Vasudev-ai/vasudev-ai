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

function initials(name: string) {
  return name
    .replace(/[()]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

const ContributorCard: React.FC<ContributorCardProps> = ({ name, role, contribution, avatarUrl, glowColor, country, countryFlag }) => {
  const cardStyle: React.CSSProperties = {
    '--glow-color': glowColor,
  } as React.CSSProperties;
  const isGenericAvatar = avatarUrl === '/vasudev-ai-hero.png';

  return (
    <Card style={cardStyle} className="relative bg-card/70 border-white/[0.07] backdrop-blur-sm overflow-hidden hover:border-[var(--glow-color)] transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_var(--glow-color)] group">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--glow-color)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--glow-color)]/40 to-transparent" />

      <div className="relative p-6 flex flex-col items-center text-center">
        {isGenericAvatar ? (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-black shrink-0"
            style={{ background: `linear-gradient(135deg, ${glowColor}, rgba(255,255,255,0.85))` }}
          >
            {initials(name)}
          </div>
        ) : (
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-black shrink-0">
            <Image src={avatarUrl} alt={name} fill className="object-cover" sizes="80px" />
          </div>
        )}

        <h3 className="mt-4 text-lg font-headline font-bold text-white leading-tight">{name}</h3>
        <p style={{ color: glowColor }} className="text-sm font-semibold mt-1">{role}</p>
        <span className="mt-3 inline-flex items-center rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs text-gray-300">
          {contribution}
        </span>
        {country && countryFlag && (
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-sm">{countryFlag}</span>
            <span className="text-xs text-gray-400">{country}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContributorCard;
