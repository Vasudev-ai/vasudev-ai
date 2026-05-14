
'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

const techItems = [
  { name: 'Next.js', icon: <NextjsIcon /> },
  { name: 'React', icon: <ReactIcon /> },
  { name: 'TypeScript', icon: <TypeScriptIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindCssIcon /> },
  { name: 'Genkit', icon: <GenkitIcon /> },
  { name: 'Firebase', icon: <FirebaseIcon /> },
  { name: 'Vercel', icon: <VercelIcon /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const TechStackComponent = function TechStack() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
          Powered by a Cutting-Edge Tech Stack
        </h2>
        <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-16">
          We use modern, scalable, and powerful technologies to build the future of divine AI.
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {techItems.map((tech) => (
            <motion.div key={tech.name} variants={itemVariants}>
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-card/50 rounded-full border border-primary/20 group-hover:border-primary group-hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)] transition-all duration-300">
                  {tech.icon}
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-primary transition-colors duration-300">{tech.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// SVG Icons (simplified)
function NextjsIcon() {
  return <svg className="w-10 h-10" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="64" fill="white"></circle><path d="M101.95 38.0261L64.3184 94.9739H54.0432L91.6748 38.0261H101.95Z" fill="black"></path><path d="M109.516 38.0261H120.075V94.9739H109.516V38.0261Z" fill="black"></path></svg>;
}
function ReactIcon() {
  return <svg className="w-10 h-10 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor"><circle cx="0" cy="0" r="2.05"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>;
}
function TypeScriptIcon() {
    return <svg className="w-8 h-8" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#3178C6" d="M0 0h128v128H0z"></path><path fill="#fff" d="M93.323 80.324c-1.22 10.742-9.155 17.62-19.845 17.62-9.67 0-17.525-6.096-18.73-15.86h11.23c.83 4.228 4.227 6.99 7.419 6.99 4.398 0 7.265-2.457 7.265-8.083V25.3h12.65v54.71c0 .1.015.2.016.313Zm-52.88-29.07c0-7.854 5.495-12.564 13.682-12.564 4.965 0 8.847 1.543 11.458 4.14l-6.52 7.78c-1.39-1.21-3.1-2.02-5.06-2.02-2.12 0-3.6 1.12-3.6 3.03v18.77h-9.96V51.253Z"></path></svg>;
}
function TailwindCssIcon() {
  return <svg className="w-10 h-10" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.878 13.633C11.018 12.493 13.43 11.25 16 11.25s4.982 1.243 6.122 2.383c1.14 1.14 1.233 3.211.357 5.222-1.234 2.833-3.034 4.282-5.116 4.882-2.75.792-4.49-.125-5.918-1.553s-1.84-3.567-.884-5.578zm12.244 6.111C23.262 17.622 24.125 15 24.125 15s-1.87-2.625-3-3.75c-2.25-2.25-5.625-2.25-5.625-2.25s-4.125 0-6 1.875C7.625 12.75 6 15.375 6 15.375s.857 2.45 2.122 3.715c1.265 1.265 3.429 1.933 5.242 1.48a9.197 9.197 0 0 0 4.167-2.824z" fill="#38BDF8"></path></svg>;
}
function GenkitIcon() {
  return <svg className="w-8 h-8 text-[#FF6F61]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>;
}
function FirebaseIcon() {
  return <svg className="w-8 h-8" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.243 17.59L.014 15.717a.23.23 0 0 1 .116-.425l11.9-4.225.228-6.059a.232.232 0 0 1 .424-.116L15.97 11.22a.232.232 0 0 1-.228.32H3.923l-.68 6.05z" fill="#FFC24A"></path><path d="M3.243 17.59L.014 15.717a.23.23 0 0 1 .116-.425l11.9-4.225.228-6.059a.232.232 0 0 1 .424-.116L15.97 11.22a.232.232 0 0 1-.228.32H3.923l-.68 6.05z" fill="url(#A)"></path><path d="M12.247 4.908L3.243 17.59l.68-6.05h11.822a.232.232 0 0 0 .228-.321L12.67.923a.232.232 0 0 0-.424-.116l-.001 4.101z" fill="#FFA000"></path><path d="M12.671.923a.232.232 0 0 0-.424-.116L3.243 17.59l.232 3.48a.232.232 0 0 0 .424.116L15.97 11.22a.232.232 0 0 0-.228-.321L3.923 11.54l8.748-10.617z" fill="#F57C00"></path><path d="M12.671.923a.232.232 0 0 0-.424-.116L3.243 17.59l.232 3.48a.232.232 0 0 0 .424.116L15.97 11.22a.232.232 0 0 0-.228-.321L3.923 11.54l8.748-10.617z" fill="url(#B)"></path><defs><linearGradient id="A" x1="6.069" y1="11.458" x2="6.069" y2="15.862" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".1"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient><linearGradient id="B" x1="9.606" y1="1.428" x2="9.606" y2="19.467" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".2"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient></defs></svg>;
}
function VercelIcon() {
  return <svg className="w-8 h-8" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM64 114.667C91.9838 114.667 114.667 91.9838 114.667 64C114.667 36.0162 91.9838 13.3333 64 13.3333C36.0162 13.3333 13.3333 36.0162 13.3333 64C13.3333 91.9838 36.0162 114.667 64 114.667ZM98 42.6667L64 98L30 42.6667H98Z" fill="white"></path></svg>;
}

export default memo(TechStackComponent);

