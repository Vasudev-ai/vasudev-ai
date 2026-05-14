
'use client';
import React, { memo } from 'react';
import './roadmap.css';
import { motion } from 'framer-motion';
import { Check, Rocket, Flag } from 'lucide-react';

const roadmapData = [
    {
        phase: 'Past Achievements',
        icon: <Check />,
        color: 'text-green-400',
        borderColor: 'border-green-400/30',
        items: [
            'Community Launch', 
            'Train LLM from Scratch', 
            'AI Chatbot', 
            'Building Sahayak AI', 
            'Building Open Source Vasudev Browser'
        ],
    },
    {
        phase: 'Current Focus',
        icon: <Rocket />,
        color: 'text-yellow-400',
        borderColor: 'border-yellow-400/30',
        items: [
            'Developing Vasudev Browser', 
            'Expanding Sahayak AI', 
            'Developing Utsavy'
        ],
    },
    {
        phase: 'Future Goals',
        icon: <Flag />,
        color: 'text-purple-400',
        borderColor: 'border-purple-400/30',
        items: [
            'Launch Sahayak AI'
        ],
    },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};


const RoadmapComponent = function Roadmap() {
  return (
    <section className="w-full py-20 bg-card/20 overflow-hidden">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
                Our Cosmic Journey
            </h2>
            <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-20">
                Charting our course from foundational achievements to future horizons.
            </p>
            <div className="roadmap-container relative">
                {roadmapData.map((phase, phaseIndex) => (
                    <div key={phaseIndex} className="roadmap-phase relative flex">
                        <div className="roadmap-icon-wrapper">
                            <div className={`roadmap-icon ${phase.color}`}>
                                {phase.icon}
                            </div>
                        </div>
                        <motion.div
                            className="roadmap-content"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div
                                className={`roadmap-card bg-card/50 border ${phase.borderColor} backdrop-blur-sm`}
                                variants={cardVariants}
                            >
                                <h3 className={`text-2xl font-headline mb-4 ${phase.color}`}>{phase.phase}</h3>
                                <ul className="space-y-3">
                                    {phase.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${phase.color.replace('text-', 'bg-')}`}></div>
                                            <span className="text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

export default memo(RoadmapComponent);
