'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

interface InternCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  specialties: string[];
  linkedinUrl?: string;
  index?: number;
}

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.12,
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  }),
};

const InternCard: React.FC<InternCardProps> = ({ name, role, avatarUrl, specialties, linkedinUrl, index = 0 }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative"
    >
      <div className="relative bg-card/50 border border-primary/10 rounded-2xl p-6 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.2)]">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-150" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-accent/50 transition-all duration-500 ring-2 ring-transparent group-hover:ring-accent/20">
              <Image
                src={avatarUrl}
                alt={name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <h3 className="text-lg font-headline font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-accent font-medium mb-4">{role}</p>

          <div className="flex flex-wrap gap-2 justify-center">
            {specialties.map((s) => (
              <span
                key={s}
                className="text-[11px] font-medium px-3 py-1 rounded-full bg-primary/10 text-gray-300 border border-primary/10 group-hover:border-accent/20 group-hover:bg-accent/[0.06] transition-all duration-300"
              >
                {s}
              </span>
            ))}
          </div>

          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent transition-colors duration-300"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InternCard;