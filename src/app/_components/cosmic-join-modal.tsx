
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bot, Disc, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';

const CosmicJoinModal = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState('signature'); // signature -> options

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('options');
    }, 1500); // Time for the "signature" text to display

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="fixed inset-0 bg-background/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg text-center text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {status === 'signature' && (
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
           >
            <h2 className="text-4xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Leave Your Cosmic Signature
            </h2>
            <p className="text-lg text-gray-400 mt-2">
              Connecting to the community gateways...
            </p>
           </motion.div>
        )}
        
        {status === 'options' && (
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
           >
            <h2 className="text-4xl font-headline text-primary">
              Choose Your Gateway
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#5865F2]/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_#5865F266] transition-all duration-300">
                    <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">
                        <Disc className="mr-2 h-6 w-6" /> Join on Discord
                    </Link>
                </Button>
                <Button asChild size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_#25D36666] transition-all duration-300">
                    <Link href="https://chat.whatsapp.com/G29jEKT2GZK5t9rQ3T6dBi" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="mr-2 h-6 w-6" /> Join on WhatsApp
                    </Link>
                </Button>
            </div>
           </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default CosmicJoinModal;
