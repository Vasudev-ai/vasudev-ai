import { PenTool, Code2, LayoutTemplate, Brush, Brain, Database, Clapperboard, Users } from 'lucide-react';
import type { ReactNode } from 'react';

// ============================================================
// Internship program constants — apply form lives on /career
// ============================================================

export const INTERNSHIP_DRIVE = {
  title: 'Internship Program',
  duration: '3 Months',
  mode: 'Fully Remote',
  location: 'Open across India & worldwide',
  stipend: 'Unpaid — Volunteer Internship',
  openings: 8,
  reviewNote: 'Applications are reviewed on a rolling basis — early applications get noticed first.',
};

export interface InternshipRole {
  slug: string;
  title: string;
  department: string;
  category: string;
  type: string;
  icon: ReactNode;
  tagline: string;
  hubDescription: string;
  highlights: string[];
  about: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const sharedBenefits = [
  'Hands-on experience with real AI-powered products and developer tools.',
  'Technical mentorship, feedback, and collaborative reviews from the founding team.',
  'Exposure to modern AI-powered workflows and tools.',
  'Portfolio development through meaningful, shipped work.',
  'Certificate of completion upon successful completion.',
  'Potential future paid opportunities based on performance and business needs.',
];

export const internshipRoles: InternshipRole[] = [
  {
    slug: 'content-strategist',
    title: 'Content Strategist Intern (AI & Technology)',
    department: 'Marketing & Growth',
    category: 'Content & Growth',
    type: 'Internship',
    icon: <PenTool className="h-6 w-6 text-green-400" />,
    tagline:
      'Turn complex technology into engaging content and help Vasudev AI reach the right audience.',
    hubDescription:
      'Turn AI trends, product updates, and technology insights into compelling content. Help shape our brand voice, content strategy, and community presence.',
    highlights: [
      'Content strategy, calendars & campaigns',
      'LinkedIn posts, carousels & short-form scripts',
      'AI-powered research & content workflows',
    ],
    about: [
      "At Vasudev AI, we're building AI-powered products, developer tools, and a community of technology enthusiasts. We're looking for a creative and strategic thinker who can turn complex technology into engaging content and help our brand reach the right audience.",
      "This is a hands-on opportunity to work on real content campaigns, product launches, AI trends, and community initiatives. You'll collaborate with the team to shape how Vasudev AI communicates its ideas, products, and vision.",
    ],
    responsibilities: [
      'Develop content strategies and weekly content calendars.',
      'Research AI models, emerging technologies, developer tools, and industry trends.',
      'Create LinkedIn posts, social media content, carousel concepts, and short-form video scripts.',
      'Support product announcements, launch campaigns, and community initiatives.',
      'Track content performance and identify opportunities for growth.',
      'Experiment with AI-powered research, writing, and content creation workflows.',
    ],
    requirements: [
      'Strong writing, communication, and storytelling skills.',
      'Genuine interest in AI, technology, startups, or developer communities.',
      'Ability to research topics and turn ideas into clear, engaging content.',
      'Creativity, initiative, and willingness to experiment.',
      'Familiarity with AI tools, Canva, social media platforms, or analytics is a plus.',
      'Portfolio, writing samples, or previous content projects are welcome.',
    ],
    benefits: [
      'Hands-on experience with real startup content and marketing initiatives.',
      'Mentorship and constructive feedback from the founding team.',
      'Exposure to AI-powered content workflows and tools.',
      'Portfolio development through meaningful projects — published campaigns you can showcase.',
      'Certificate of completion upon successful completion.',
      'Potential future paid opportunities based on performance and business needs.',
    ],
  },
  {
    slug: 'web-developer',
    title: 'Web Developer Intern',
    department: 'Engineering & Product',
    category: 'Engineering & Product',
    type: 'Internship',
    icon: <Code2 className="h-6 w-6 text-yellow-400" />,
    tagline:
      'Build and ship real web products — from database to deployment. Not a basic coding training program.',
    hubDescription:
      'Build modern web applications end to end — Next.js, TypeScript, APIs, and cloud deployment. Contribute real features to live products used by real users.',
    highlights: [
      'Full web development on live products',
      'APIs, databases, auth & deployment',
      'GitHub contributions, code reviews & demos',
    ],
    about: [
      "This is not a basic coding training program. It's a hands-on opportunity for developers who want to build and ship real web products.",
      "At Vasudev AI, you'll contribute to production web applications — authentication, databases, APIs, and the interfaces on top of them. You'll work with modern frameworks and AI-assisted development tools, while fully understanding the code you ship — and you'll care about performance, usability, and the details that make software feel exceptional.",
    ],
    responsibilities: [
      'Build responsive, high-quality web applications using Next.js, React, and TypeScript.',
      'Develop features by integrating APIs, databases, and backend services.',
      'Implement authentication, data flows, and deployment pipelines.',
      'Use modern development tools and AI assistants to accelerate development while understanding every line you ship.',
      'Test, refine, and optimize features for usability, performance, and reliability.',
      'Contribute to GitHub repositories, code reviews, documentation, and product demos.',
    ],
    requirements: [
      'Strong fundamentals in HTML, CSS, and JavaScript.',
      'Familiarity with React and TypeScript; Next.js is a plus.',
      'Understanding of APIs, Git, GitHub, and basic debugging.',
      'Familiarity with a backend or database (Firebase, Node.js, SQL) is a plus.',
      'Interest in UI/UX and AI-powered software.',
      'Ability to understand, review, and improve AI-generated code.',
      'Previous projects or a GitHub portfolio demonstrating practical skills.',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer Intern',
    department: 'Engineering & Product',
    category: 'Engineering & Product',
    type: 'Internship',
    icon: <LayoutTemplate className="h-6 w-6 text-yellow-400" />,
    tagline:
      'Focus 100% on the interface — pixel-perfect, responsive UIs that feel great to use.',
    hubDescription:
      'Turn designs into fast, beautiful, responsive interfaces. Own components end to end and learn what separates a page that works from an experience that feels exceptional.',
    highlights: [
      'Pixel-perfect, responsive UI development',
      'Reusable components & design systems',
      'Animations, micro-interactions & performance',
    ],
    about: [
      "Frontend is where products earn or lose users. As a Frontend Developer Intern at Vasudev AI, you'll live in the interface layer — turning designs and ideas into fast, beautiful, responsive experiences.",
      "You'll work closely with designers and developers on our live products, own components end to end, and learn the craft details — spacing, motion, states, accessibility — that make software feel exceptional.",
    ],
    responsibilities: [
      'Translate designs and wireframes into responsive, accessible interfaces.',
      'Build and maintain reusable component libraries.',
      'Add purposeful animations and micro-interactions.',
      'Optimize performance — bundle size, rendering, and loading states.',
      'Ensure cross-browser and mobile-first quality.',
      'Collaborate in code reviews and ship to production via GitHub.',
    ],
    requirements: [
      'Strong fundamentals in HTML and CSS (Flexbox, Grid, Tailwind or similar).',
      'Solid JavaScript (ES6+) and React basics.',
      'A sharp eye for detail and pixel-perfect UI.',
      'Understanding of responsive design and accessibility basics.',
      'Git and GitHub familiarity.',
      'Portfolio or GitHub with UI projects.',
      'Next.js, TypeScript, or Framer Motion experience is a plus.',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Design Intern',
    department: 'Design & Product',
    category: 'Design & Product',
    type: 'Internship',
    icon: <Brush className="h-6 w-6 text-pink-400" />,
    tagline:
      'Design interfaces people love — research, wireframe, prototype, and polish real product experiences.',
    hubDescription:
      'Design the look and feel of real AI products in Figma — flows, prototypes, and a living design system — and see them shipped to production.',
    highlights: [
      'Real product design in Figma',
      'Design systems, prototypes & user testing',
      'Direct collaboration with developers',
    ],
    about: [
      "Design at Vasudev AI is not decoration — it's how our products earn trust. As a UI/UX Design Intern, you'll own design work for real products, from first sketch to shipped interface.",
      "You'll partner with developers and the founding team, run lightweight research, build prototypes, and maintain the design system — and watch your designs go live.",
    ],
    responsibilities: [
      'Design UI for web products in Figma — user flows, wireframes, and high-fidelity screens.',
      'Build and maintain the design system — components, tokens, and patterns.',
      'Prototype interactions and gather feedback from users and the team.',
      'Conduct lightweight user research and usability testing.',
      'Collaborate with developers through design handoff and implementation review.',
      'Contribute brand and marketing visuals when needed.',
    ],
    requirements: [
      'Portfolio showcasing UI/UX work (case studies welcome).',
      'Strong Figma skills.',
      'Understanding of layout, typography, color, and accessibility.',
      'Interest in AI products and startups.',
      'Ability to explain and defend design decisions.',
      'Motion design or brand illustration skills are a plus.',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'ai-engineer',
    title: 'AI/ML Engineering Intern',
    department: 'Engineering & Research',
    category: 'Engineering & Research',
    type: 'Internship',
    icon: <Brain className="h-6 w-6 text-green-400" />,
    tagline:
      'Build the AI layer of real products — LLM integrations, generative flows, and evaluation pipelines.',
    hubDescription:
      'Work on production AI features — prompts, flows, model integrations, and the evaluation work that makes AI actually reliable.',
    highlights: [
      'LLM integrations in production',
      'Prompt design & evaluation pipelines',
      'Real users depending on your work',
    ],
    about: [
      "Vasudev AI's products are powered by generative AI — and someone has to build, test, and improve those brains. As an AI/ML Engineering Intern, you'll work on the AI features our users actually touch.",
      "This is production AI work: prompt and flow design, model integrations, retrieval, and rigorous evaluation — the unglamorous work that makes AI reliable instead of impressive-in-demos.",
    ],
    responsibilities: [
      'Build and refine LLM-powered features and automation flows.',
      'Design prompts and evaluate outputs with structured testing.',
      'Integrate AI APIs and manage context and data pipelines.',
      'Monitor quality, latency, and cost of AI features.',
      'Document experiments, findings, and learnings.',
      'Contribute to open AI tooling and demos.',
    ],
    requirements: [
      'Solid programming fundamentals in Python or TypeScript.',
      'Understanding of LLM concepts — prompts, tokens, context windows, embeddings.',
      'Willingness to learn frameworks like Genkit, LangChain, or similar.',
      'Curiosity and a rigorous experimentation habit.',
      'GitHub portfolio or AI projects are a plus.',
      'Familiarity with Gemini or OpenAI APIs is a plus.',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer Intern',
    department: 'Engineering & Infrastructure',
    category: 'Engineering & Infrastructure',
    type: 'Internship',
    icon: <Database className="h-6 w-6 text-yellow-400" />,
    tagline:
      'Own the server side — APIs, databases, auth, and the infrastructure our products run on.',
    hubDescription:
      'Build and maintain the APIs, data models, and services behind live products — with real users depending on your work every day.',
    highlights: [
      'APIs, databases & auth in production',
      'Reliability, security & performance',
      'Collaboration with frontend & AI teams',
    ],
    about: [
      "Great products need a backbone. As a Backend Developer Intern at Vasudev AI, you'll build the server-side systems our products depend on — APIs, data models, authentication, and the services that keep everything running.",
      "You'll ship to production, handle real traffic, and learn what it takes to keep software reliable, secure, and fast.",
    ],
    responsibilities: [
      'Design and build REST APIs and backend services.',
      'Model data and maintain databases (Firestore, SQL, or similar).',
      'Implement authentication and authorization.',
      'Ensure reliability, security, and performance of backend systems.',
      'Write tests and monitor production behavior.',
      'Collaborate with frontend and AI teams on integrations.',
    ],
    requirements: [
      'Understanding of HTTP, REST, and server-side programming (Node.js/TypeScript or Python).',
      'Database fundamentals — SQL or NoSQL.',
      'Git, GitHub, and basic debugging skills.',
      'Familiarity with Firebase or cloud services is a plus.',
      'Interest in system design and scalability.',
      'Projects or a GitHub portfolio demonstrating practical skills.',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'video-editor',
    title: 'Video Editor & Motion Design Intern',
    department: 'Creative & Media',
    category: 'Creative & Media',
    type: 'Internship',
    icon: <Clapperboard className="h-6 w-6 text-green-400" />,
    tagline: 'Turn launches, tutorials, and ideas into videos people actually watch.',
    hubDescription:
      'Edit reels, explainers, launch videos, and event recaps for Vasudev AI — and shape how our story looks and feels in motion.',
    highlights: [
      'Reels, YouTube & launch videos',
      'Motion graphics & storytelling',
      'Real audience watching your work',
    ],
    about: [
      "Video is how developer communities grow. As a Video Editor & Motion Design Intern at Vasudev AI, you'll edit short-form and long-form content for our products and community — reels, explainers, launch videos, and event recaps.",
      "You'll own edits end to end, work from scripts and hooks to final delivery, and shape how our story looks and feels in motion.",
    ],
    responsibilities: [
      'Edit short-form videos (Reels/Shorts) and long-form YouTube content.',
      'Add motion graphics, subtitles, and sound design.',
      'Collaborate on scripts, hooks, and storyboards.',
      'Repurpose content across platforms.',
      'Maintain an organized asset and delivery workflow.',
      'Track performance and iterate on what works.',
    ],
    requirements: [
      'Portfolio or samples of edited videos.',
      'Proficiency with at least one tool — Premiere Pro, DaVinci Resolve, CapCut, or After Effects.',
      'Understanding of pacing, storytelling, and platform-specific formats.',
      'Basic motion graphics and thumbnail design skills are a plus.',
      'Consistency and deadline reliability.',
      'Interest in tech and AI content.',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'community-intern',
    title: 'Community & Events Intern',
    department: 'Community & Growth',
    category: 'Community & Growth',
    type: 'Internship',
    icon: <Users className="h-6 w-6 text-pink-400" />,
    tagline:
      'Grow and energize the Vasudev AI community — events, campus outreach, and member love.',
    hubDescription:
      'Run the day-to-day of a growing tech community — welcome members, coordinate events and hackathons, and make sure builders feel at home.',
    highlights: [
      'Events, workshops & hackathons',
      'Campus outreach & partnerships',
      'Real community growth ownership',
    ],
    about: [
      "Communities are built by people who show up. As a Community & Events Intern at Vasudev AI, you'll help run the day-to-day of a growing tech community.",
      "You'll welcome members, coordinate online events and hackathons, support campus outreach, and make sure builders feel at home — the role that grows your network faster than any other.",
    ],
    responsibilities: [
      'Moderate and energize community channels (Discord and others).',
      'Coordinate online events, workshops, and hackathons.',
      'Support campus outreach and partnerships.',
      'Onboard new members and gather feedback.',
      'Document community processes and FAQs.',
      'Share member wins and stories with the team.',
    ],
    requirements: [
      'Strong communication and people skills.',
      'Active presence and credibility in online communities.',
      'Event coordination or leadership experience — college clubs count.',
      'Organized, responsive, and consistent.',
      'Interest in AI and developer communities.',
      'Social media familiarity is a plus.',
    ],
    benefits: sharedBenefits,
  },
];

// ============================================================
// /career hub — "More Than an Internship" benefits
// ============================================================

export const hubBenefits = [
  {
    title: 'Real-World Experience',
    description:
      'Work on meaningful projects, contribute to actual deliverables, and experience how a technology startup builds and ships products.',
  },
  {
    title: 'Mentorship & Learning',
    description:
      'Learn through collaboration, feedback, project reviews, and exposure to modern AI-powered workflows.',
  },
  {
    title: 'Recognition on Our Platform',
    description:
      'Outstanding contributors may be featured on the official Vasudev AI website and across our social channels, with their consent.',
  },
  {
    title: 'Portfolio & Professional Visibility',
    description:
      'Showcase eligible projects, published work, and meaningful contributions to strengthen your professional profile.',
  },
  {
    title: 'Performance-Based Rewards',
    description:
      'Exceptional contributions may be recognized through branded merchandise, special spotlights, and other rewards announced by Vasudev AI.',
  },
  {
    title: 'Certificates & Recommendations',
    description:
      'Receive a certificate upon successful completion. Letters of recommendation and LinkedIn recommendations may be provided based on demonstrated performance.',
  },
  {
    title: 'Future Career Opportunities',
    description:
      'High-performing interns may be considered for future paid positions or extended collaborations, depending on available opportunities.',
  },
  {
    title: 'A Remote-First Experience',
    description:
      'Collaborate remotely, share ideas, take ownership of your work, and learn to contribute effectively in a distributed team.',
  },
];

// ============================================================
// /career — tiered benefits (Level 1 / 2 / 3)
// ============================================================

export interface BenefitLevel {
  level: string;
  title: string;
  note: string;
  highlight: boolean;
  items: string[];
}

export const benefitLevels: BenefitLevel[] = [
  {
    level: 'Level 1',
    title: 'Every Intern',
    note: 'For everyone in the program — guaranteed.',
    highlight: true,
    items: [
      'Three-month remote internship.',
      'Real project experience and role-specific mentorship.',
      'Regular feedback and progress reviews.',
      'Completion certificate, subject to requirements.',
      'Showcase completed work in your portfolio, with applicable permissions.',
    ],
  },
  {
    level: 'Level 2',
    title: 'Outstanding Contributors',
    note: 'Earned through consistently strong performance.',
    highlight: false,
    items: [
      'Official website spotlight or feature.',
      'LinkedIn feature or recommendation.',
      'Performance-based swag and goodies.',
      'Letter of recommendation, where warranted.',
      'Greater ownership of projects and public demos.',
    ],
  },
  {
    level: 'Level 3',
    title: 'Future Opportunities',
    note: 'For exceptional performance, when opportunities exist.',
    highlight: false,
    items: [
      'Priority consideration for suitable paid openings.',
      'Extended collaboration opportunities.',
      'Advanced project ownership.',
      'Invitation to relevant future initiatives and team activities.',
    ],
  },
];

// ============================================================
// /career hub page — 3-month journey, hiring process, FAQ
// ============================================================

export const hubJourney = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Understand the team, tools, product, and workflow. Start with well-defined tasks and build context.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Take ownership of assigned responsibilities, collaborate with the team, and improve through feedback.',
  },
  {
    number: '03',
    title: 'Deliver',
    description:
      'Complete your planned deliverables, document your work, and present your progress and outcomes.',
  },
];

export const hiringSteps = [
  {
    number: '01',
    title: 'Apply',
    description: 'Submit your details, relevant experience, and work samples.',
  },
  {
    number: '02',
    title: 'Application Review',
    description: 'We review your interests, skills, portfolio, and availability.',
  },
  {
    number: '03',
    title: 'Role-Specific Assessment',
    description: 'Shortlisted candidates may be invited to complete a small, relevant task.',
  },
  {
    number: '04',
    title: 'Conversation',
    description: 'Discuss your approach, interests, availability, and expectations.',
  },
  {
    number: '05',
    title: 'Final Decision',
    description: 'Selected candidates receive the next steps and internship details.',
  },
];

export const faqItems = [
  {
    question: 'Who can apply?',
    answer:
      'Students, aspiring professionals, and self-taught individuals with relevant skills and a genuine interest in the role are welcome to apply.',
  },
  {
    question: 'Is the internship remote?',
    answer:
      'Yes. All internship positions are fully remote and open to applicants from any location. Relocation is not required.',
  },
  {
    question: 'What is the duration and weekly commitment?',
    answer:
      'All internships are planned for three months, with a flexible, async-friendly weekly commitment that fits alongside college or work.',
  },
  {
    question: 'Is the internship paid?',
    answer:
      'This is currently an unpaid, volunteer internship. In return you get real product experience, mentorship, a certificate of completion, and first consideration for future paid opportunities based on performance.',
  },
  {
    question: 'Do I need professional experience?',
    answer:
      'Previous professional experience is not mandatory if you can demonstrate relevant skills, initiative, and practical work. Each role has its own requirements.',
  },
  {
    question: 'Will I receive a certificate?',
    answer:
      'A certificate of completion will be provided to interns who successfully meet the internship completion requirements.',
  },
  {
    question: 'Can an internship lead to a paid role?',
    answer:
      'Future paid opportunities may be considered based on performance, available positions, and business needs. Conversion is not guaranteed.',
  },
  {
    question: 'How do I apply?',
    answer:
      'Pick an open role on this page, then fill out the application form right below the hiring process — it takes a couple of minutes. Add any work samples you want us to see.',
  },
];
