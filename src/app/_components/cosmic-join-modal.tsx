
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const CosmicJoinModal = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState('signature'); // signature -> connecting

  useEffect(() => {
    // Start the connection process after a short delay
    const connectTimer = setTimeout(() => {
      setStatus('connecting');
    }, 1500);

    // Redirect after the "connecting" message has been shown
    const redirectTimer = setTimeout(() => {
      window.open('https://discord.gg/e5uPQDXSSk', '_self');
    }, 3500);

    return () => {
      clearTimeout(connectTimer);
      clearTimeout(redirectTimer);
    };
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
      />
      <motion.div
        className="relative z-10 w-full max-w-lg text-center text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
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
              Making your mark on the universe...
            </p>
           </motion.div>
        )}
        
        {status === 'connecting' && (
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
           >
            <div className="flex items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <h2 className="text-4xl font-headline text-primary">
                  Connecting to the cosmos...
                </h2>
            </div>
           </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default CosmicJoinModal;
