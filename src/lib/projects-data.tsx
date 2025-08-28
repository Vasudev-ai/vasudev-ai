import React from 'react';
import { Cpu, Waves, Hand, MessageSquare, ToyBrick, Sprout } from 'lucide-react';

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
}

export const projects: Project[] = [
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
    icon: <Hand className="h-8 w-8 md:h-10 md:w-10 text-accent" />,
    title: "Sahayak AI",
    slug: "sahayak-ai",
    tagline: "Your AI-powered teaching assistant, always by your side.",
    status: 'In Development',
    features: ["Cross-OS Control", "Voice & Text Automation", "App & Script Integration"],
    problemStatement: "Teachers in India face immense pressure. They spend countless hours on administrative tasks, lesson planning, creating assessments, and differentiating materials for diverse classrooms. This administrative burden limits their time for direct student interaction and professional development, often leading to burnout. Existing digital tools are often generic, not tailored to the specific curriculum and cultural context of Indian schools.",
    solution: "Sahayak AI is a comprehensive, web-based platform designed specifically for the modern Indian educator. It acts as an intelligent assistant, leveraging generative AI to automate and streamline a wide range of teaching tasks. From planning lessons that align with Indian school boards (CBSE, ICSE, etc.) to generating hyper-local content and communicating with parents in their native language, Sahayak AI empowers teachers to save time, reduce stress, and create more engaging learning experiences.",
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
      "Firebase App Hosting"
    ],
    architecture: "Sahayak AI is built on a modern, server-centric web architecture. The frontend uses Next.js with the App Router, enabling a fast, interactive user experience with Server Components for performance. The UI is built with the highly customizable ShadCN component library and styled with Tailwind CSS. Firebase serves as the core backend, handling user authentication (Email, Google) and data persistence with Firestore, which stores user profiles, library books, and generated content within workspaces. All generative AI features are powered by Genkit. Server-side AI 'flows' are defined for each tool (e.g., Lesson Planner, Quiz Generator). These flows interact with Google's Gemini models to generate text, images, and audio. This server-side approach keeps the frontend light and API keys secure. Custom API routes built within Next.js handle server-side tasks like PDF generation and proxying requests to external services, ensuring security and control.",
    githubUrl: "#",
    coverImage: "https://picsum.photos/seed/sahayak/1200/600",
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
    tagline: "A Web Based Invitation Creation Platform.",
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
