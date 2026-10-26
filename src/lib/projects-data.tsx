import React from 'react';
import { Cpu, Waves, MessageSquare, ToyBrick, Sprout, Music, GraduationCap } from 'lucide-react';

export interface Project {
  icon: React.ReactNode;
  title: string;
  slug: string;
  tagline: string;
  status: 'In Development' | 'Live' | 'Concept';
  features: string[];
  problemStatement: string;
  solution: string;
  techStack: string[];
  architecture: string;
  githubUrl: string;
  liveUrl?: string;
  coverImage: string;
  isFlagship?: boolean;
  isExternal?: boolean;
}

export const projects: Project[] = [
  {
    icon: <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Learnivo AI",
    slug: "learnivo-ai",
    tagline: "Our flagship AI-powered learning platform — personalized education for India and beyond. The project we built and represented on the global stage.",
    status: 'Live',
    isFlagship: true,
    isExternal: true,
    liveUrl: "https://learnivo.app",
    features: [
      "AI Personalization",
      "Adaptive Learning",
      "Multi-language Support",
      "Lesson Planning (CBSE / ICSE)",
      "AI Quiz & Assessment Generator",
      "Parent Communication in Native Language",
    ],
    problemStatement: "Teachers in India face immense pressure. They spend countless hours on administrative tasks, lesson planning, creating assessments, and differentiating materials for diverse classrooms. This administrative burden limits their time for direct student interaction and professional development, often leading to burnout. Existing digital tools are often generic, not tailored to the specific curriculum and cultural context of Indian schools. Traditional online platforms also offer a one-size-fits-all approach that doesn't adapt to each learner's unique pace, style, or knowledge gaps — leading to disengagement and poor learning outcomes.",
    solution: "Learnivo AI is the evolved, production-ready successor to Sahayak AI — a comprehensive, web-based platform designed specifically for the modern Indian educator and learner. It acts as an intelligent assistant, leveraging generative AI to automate and streamline a wide range of teaching tasks. From planning lessons that align with Indian school boards (CBSE, ICSE, etc.) to generating hyper-local content and communicating with parents in their native language, Learnivo AI empowers teachers to save time, reduce stress, and create more engaging learning experiences. For learners, it creates fully personalized journeys — adapting content in real-time, identifying knowledge gaps, generating custom quizzes, and providing intelligent coaching to make world-class education accessible to everyone.",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "ShadCN UI",
      "Tailwind CSS",
      "Framer Motion",
      "Google's Genkit",
      "Gemini",
      "Firebase",
      "Firebase App Hosting",
    ],
    architecture: "Learnivo AI is built on a modern, server-centric web architecture. The frontend uses Next.js with the App Router, enabling a fast, interactive user experience with Server Components for performance. The UI is built with the highly customizable ShadCN component library and styled with Tailwind CSS. Firebase serves as the core backend, handling user authentication (Email, Google) and data persistence with Firestore, which stores user profiles, library books, and generated content within workspaces. All generative AI features are powered by Genkit — server-side AI 'flows' are defined for each tool (e.g., Lesson Planner, Quiz Generator, Adaptive Learning Engine). These flows interact with Google's Gemini models to generate text, images, and audio. This server-side approach keeps the frontend light and API keys secure. Custom API routes handle server-side tasks like PDF generation and proxying requests to external services, ensuring security and control.",
    githubUrl: "#",
    coverImage: "https://picsum.photos/seed/learnivo/1200/600",
  },
  {
    icon: <Cpu className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Vasudev Core LLM",
    slug: "vasudev-core-llm",
    tagline: "The soul of Vasudev AI — a locally-optimized Large Language Model.",
    status: 'In Development',
    features: ["Offline & Private", "Speed & Memory Efficient", "Modular Architecture"],
    problemStatement: "Most powerful Large Language Models are cloud-dependent, raising privacy concerns and limiting offline usability. They are often monolithic, making them hard to customize and scale efficiently on local hardware.",
    solution: "Vasudev Core is an open-source LLM designed from the ground up for privacy and performance on local devices. Its modular architecture allows developers to swap components, fine-tune models for specific tasks, and run complex AI workflows without an internet connection.",
    techStack: ["Python", "PyTorch", "JAX", "CUDA", "Rust"],
    architecture: "The Core follows a Mixture-of-Experts (MoE) architecture, enabling dynamic scaling of computational resources based on query complexity. It uses quantized models for memory efficiency and a custom inference engine written in Rust for maximum speed.",
    githubUrl: "#",
    coverImage: "https://picsum.photos/seed/llm/1200/600",
  },
  {
    icon: <Waves className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Vasudev Browser",
    slug: "vasudev-browser",
    tagline: "Where AI meets the web — your intelligent browsing companion.",
    status: 'Live',
    features: ["Built-in Offline AI", "Distraction-Free UI", "Integrated Research Tools"],
    problemStatement: "Modern web browsers are cluttered with distractions and lack integrated intelligence. Users juggle multiple tabs and external tools for tasks like research, summarization, and content creation, leading to a fragmented workflow.",
    solution: "Vasudev Browser is a minimalist, privacy-first browser with the Vasudev Core LLM built-in. It offers on-the-fly page summarization, contextual research assistance, and AI-powered tab management, all while blocking trackers and unnecessary scripts for a focused, fast experience.",
    techStack: ["Next.js", "Electron", "Rust", "TypeScript", "Genkit"],
    architecture: "Built on an Electron shell, the browser uses a Rust-based backend for performance-critical operations. The UI is a lightweight web application built with Next.js. Genkit handles the seamless transition between the local offline LLM and cloud-based models when needed.",
    githubUrl: "https://github.com/Vasudev-ai/Vasudev-Browser",
    liveUrl: "https://github.com/Vasudev-ai/Vasudev-Browser/releases",
    coverImage: "https://picsum.photos/seed/browser/1200/600",
  },
  {
    icon: <Music className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Vasudev Sangeet",
    slug: "vasudev-sangeet",
    tagline: "Your personal DJ, harmonizing your Discord server with crystal-clear audio and intelligent features.",
    status: 'Live',
    features: ["High-Fidelity Audio", "Advanced Queue Management", "Interactive Control Panel"],
    problemStatement: "Discord servers lack a reliable, feature-rich music bot that provides high-quality audio streaming, advanced queue management, and intuitive controls without the complexity of multiple bots or premium subscriptions.",
    solution: "Vasudev Sangeet provides a comprehensive, single-file music bot solution that streams directly from YouTube with professional-grade features like audio filters, DJ role management, voteskip systems, and 24/7 mode - all wrapped in an elegant, interactive Discord interface.",
    techStack: ["Python 3.10+", "discord.py v2", "yt-dlp", "FFmpeg", "PyNaCl", "python-dotenv"],
    architecture: "The bot uses an event-driven architecture with a per-guild music player system. It employs a command handler for both prefix (!) and slash commands, implements a queue system with deque for efficient track management, and streams audio using FFmpeg with real-time processing. The bot features an idle watcher for automatic disconnection, interactive Discord UI components for controls, and supports both text and voice state management.",
    githubUrl: "https://github.com/Vasudev-ai/Vasudev-Sangeet",
    liveUrl: "https://github.com/Vasudev-ai/Vasudev-Sangeet/releases",
    coverImage: "https://picsum.photos/seed/sangeet/1200/600",
  },
  {
    icon: <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Vasudev Chat Assistant",
    slug: "vasudev-chat-assistant",
    tagline: "Conversations redefined — fast, private, intelligent.",
    status: 'In Development',
    features: ["Offline/Cloud Hybrid", "Multi-modal Input", "Custom Personalities"],
    problemStatement: "Standard chat assistants are either fully cloud-based, compromising privacy, or fully offline, limiting their knowledge. There's a need for a hybrid solution that offers the best of both worlds.",
    solution: "Our Chat Assistant is a Genkit-powered application that intelligently routes queries. Sensitive conversations are handled by the local Vasudev Core LLM, while general knowledge questions can be sent to a cloud model. It supports text, voice, and image inputs and allows users to create custom personalities.",
    techStack: ["Next.js", "Genkit", "TypeScript", "Framer Motion", "ShadCN/UI"],
    architecture: "A Next.js application with a Server Action-based backend. Genkit defines the core AI flow, which includes logic to determine whether to call the local model (via a local API endpoint) or a cloud-based model like Gemini. All state management is handled with modern React hooks.",
    githubUrl: "#",
    coverImage: "https://picsum.photos/seed/chat/1200/600",
  },
  {
    icon: <ToyBrick className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Vasudev Tools",
    slug: "vasudev-tools",
    tagline: "Supercharged utilities for developers and creators.",
    status: 'Live',
    features: ["Performance Optimizers", "Automation Scripts", "AI Coding Utilities"],
    problemStatement: "Developers and creators often rely on a scattered collection of scripts and utilities to optimize their workflows. This collection is hard to manage, share, and maintain.",
    solution: "Vasudev Tools is a centralized, open-source repository of high-performance scripts and command-line utilities. It includes code optimizers, file system automators, and AI-powered tools for generating boilerplate, writing tests, and refactoring code, all accessible via a single CLI.",
    techStack: ["Rust", "Python", "Shell Scripting", "Clap (CLI framework)"],
    architecture: "A collection of standalone binaries and scripts, primarily written in Rust for performance. The tools are managed and distributed via a central command-line interface (CLI) built with Clap, allowing for easy installation, updates, and discoverability.",
    githubUrl: "#",
    coverImage: "https://picsum.photos/seed/tools/1200/600",
  },
  {
    icon: <Sprout className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "UTSAVY",
    slug: "utsavy",
    tagline: "A Web Based Invitation Creation Platform. Born in the Vasudev AI community — UTSAVY went on to receive government support in Rajasthan.",
    status: 'Concept',
    features: ["AI-Powered Designs", "Easy Customization", "Event Management"],
    problemStatement: "Creating beautiful, personalized event invitations is often time-consuming and requires design skills. Managing RSVPs and event details is a separate, manual process.",
    solution: "UTSAVY is a one-stop platform for creating and managing events. Users can describe their event, and our AI will generate unique, beautiful invitation designs. The platform also includes tools for guest list management, RSVP tracking, and sending updates.",
    techStack: ["Next.js", "Genkit (Image Generation)", "ShadCN/UI", "Firebase"],
    architecture: "A multi-tenant Next.js application. Genkit's image generation capabilities will be used to create invitation designs from text prompts. Firebase will handle user authentication, and Firestore will store event and guest data. ",
    githubUrl: "#",
    coverImage: "https://picsum.photos/seed/utsavy/1200/600",
  },
];
