# Prompt for Building "Vasudev AI" Website

## 1. Project Overview

**Goal:** Create a complete, production-ready website for "Vasudev AI," a community-driven AI initiative. The site should have a "divine + futuristic" aesthetic, featuring a dark theme, cinematic animations, and a focus on community and innovation.

**Core Identity:** The brand merges spiritual or "divine" concepts (inspired by Indian Vedic culture) with cutting-edge, futuristic technology (AI, holograms, space themes).

## 2. Tech Stack

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI
- **AI Functionality:** Genkit
- **Animations:** Framer Motion or a similar library for animations, Tailwind CSS animations.
- **Icons:** `lucide-react`

## 3. Global Style & Design System

- **Primary Color:** Deep navy-black (`#0D0F1A`) for backgrounds.
- **Accent Color:** Vibrant Cyan (`#00E5FF`) for CTAs, highlights, and glowing effects.
- **Secondary Accent:** Golden/Yellow for divine glows and highlights.
- **Fonts:**
  - **Headlines:** 'Space Grotesk' (futuristic, clean, modern).
  - **Body:** 'Inter' (clean, readable).
- **Overall Feel:** Dark, cinematic, spacious, with glowing holographic elements.
- **Layout:** Use a responsive grid system. Components should have rounded corners and subtle shadows for a modern feel.
- **Backgrounds:** Use animated, multi-layered backgrounds with gradients, floating particles, and subtle patterns (like neural networks or constellations) to create depth and a sense of a living "cosmos."
- **Scrollbar:** Customize the scrollbar to match the dark theme (dark track, primary/accent colored thumb).

## 4. Core App Structure & Layout (`src/app/layout.tsx`)

- A root layout that includes:
  - `Header` component.
  - `Footer` component.
  - An `AnimatedBackground` component that renders a persistent, animated background across all pages.
  - A main content area where the page components are rendered.
  - `Toaster` for notifications.
  - Font setup for 'Inter' and 'Space Grotesk'.

## 5. Key Components

- **`Header.tsx`**: A sticky header with a blurred background. It should contain the `Logo`, navigation links, and a "Join" button. It needs to be responsive, with a hamburger menu (using `Sheet`) for mobile.
- **`Footer.tsx`**: A footer with key navigation links, social media icons (GitHub, Discord, etc.), a central quote, and copyright info.
- **`Logo.tsx`**: A component displaying the `BrainCircuit` icon and "Vasudev AI" text with a gradient.
- **`AnimatedBackground.tsx`**: A fixed-position component that creates a global, animated background with floating star-like particles and subtle gradients.
- **`PageHeader.tsx`**: A reusable component for page titles and subtitles, featuring large, gradient text.
- **`IntroAnimation.tsx`**: A component for a cinematic intro animation that plays on the first site load.

## 6. Page-by-Page Requirements

### A. Intro Animation (`IntroAnimation.tsx` & `page.tsx`)

- **Trigger:** Plays once when the homepage is first loaded.
- **Animation Flow (5 seconds):**
    1.  Start with a completely dark screen (deep navy-black).
    2.  The text "Vasudev AI" fades in, large and centered.
    3.  A subtitle "Awakening Intelligence..." fades in below it.
    4.  A soft, radial light glow fades in and expands from the center, illuminating the text.
    5.  The entire animation component fades out, revealing the homepage content.
- **Implementation:** Use CSS keyframe animations. To avoid hydration errors, the loading state should be managed with `useState` and `useEffect` hooks.

### B. Home Page (`src/app/page.tsx`)

- **Hero Section:**
  - A central, floating, circular image of a divine, AI-like figure (e.g., Krishna-inspired AI hologram). The image should have a "float" animation and a "shockwave" pulse effect emanating from it.
  - Main Headline: "Vasudev AI" (large, gradient text).
  - Subtitle: "Where Intelligence Meets Innovation."
  - Paragraph: A brief mission statement about the community.
  - CTA Buttons: "Join Community" (primary) and "Explore Projects" (outline).
- **Pillars Section:**
  - A 3-column grid of `Card` components.
  - Each card represents a core pillar (e.g., "AI with Divinity," "Innovation Together," "Knowledge for All").
  - Each card should contain an icon, a title, and a short description.
  - Cards should have a hover effect (e.g., lift, border glow).
- **Final CTA Section:**
  - A centered section with a large, accent-colored headline ("Awaken with Vasudev AI") and a "Join Now" button with a prominent glow/pulse effect.

### C. Projects Page (`src/app/projects/page.tsx`)

- **Theme:** A "Cosmic Hub" of innovations. The background should be space-like.
- **Layout:** A grid of "holographic" project cards.
- **Card Style:**
  - Glassmorphism effect (semi-transparent with blurred background).
  - Glowing, animated borders.
  - Hover effect: Card should tilt slightly (3D effect) and have a subtle pulse/glow.
- **Project Details (on cards):**
  - **Vasudev Core LLM:** Tagline, features (Offline, Efficient, Modular), and an icon.
  - **Vasudev Browser:** Tagline, features, and an icon.
  - **Sahayak AI:** Tagline, features, and an icon.
  - **Vasudev Chat Assistant:** Tagline, features, and an icon.
  - **Vasudev Tools:** Tagline, features, and an icon.
- **Interactivity:**
  - Projects should feel like they are floating in space.
  - A "Coming Soon" card with a placeholder/glitch effect.
  - A final CTA section inviting users to join the community.

### D. Team Page (`src/app/team/page.tsx`)

- **Theme:** A "Galaxy" of visionaries. Background should be a deep space scene with nebulae and stars.
- **Layout:** A 2-column grid of profile cards.
- **Card Style:**
  - Styled to look like celestial bodies or planets with unique color schemes per member.
  - Glassmorphism style with glowing borders matching the member's theme (e.g., golden for Surya, cyan for Aman).
  - 3D tilt effect on hover (`transform-style: preserve-3d`).
- **Member Details (on cards):**
  - Large, circular `Avatar` with a themed border that glows on hover.
  - Member's name, role (in a distinct accent color), and a description.
  - Placeholders for avatars should be used, with `data-ai-hint` for image generation.
- **Background:** An animated background with gradients and subtle patterns to enhance the cosmic feel.

### E. Community Page (`src/app/community/page.tsx`)

- **Header:** Title "The Vasudev AI Community" with a subtitle.
- **"Why Join" Section:** A 3-column grid of cards highlighting benefits like "Collaborate & Innovate," "Learn & Share," etc., each with an icon.
- **"What We Do" Section:** A multi-column list of community activities (e.g., "AI Ethics Discussions," "Open Source Projects").
- **Final CTA:** A prominent, centered section with a call to action and a button to "Become a Member," linking to Discord.

### F. Other Pages

- **About Page (`/about`):** A simple page with "Our Vision" and "Our Mission" cards.
- **Contact Page (`/contact`):** A two-column layout with a contact form on one side and social media links (with icons) on the other.
- **Content Optimizer Page (`/optimize`):** An AI tool page.

## 7. AI Functionality (`src/ai/` and `src/app/optimize/`)

- **Feature:** "AI Content Optimizer."
- **Backend (Genkit Flow):**
  - Create a Genkit flow in `src/ai/flows/content-optimization.ts`.
  - It should accept a `title` and `description` as input.
  - It should use an AI prompt to analyze the text and return `keywords` (an array of strings) and `suggestions` (a string).
- **Frontend (React Server Component & Action):**
  - Create a page at `/optimize`.
  - The page will contain a form (`OptimizeForm.tsx`) with fields for title and description.
  - Use a React Server Action (`handleOptimizeContent`) to call the Genkit flow.
  - Use the `useActionState` hook to manage form state (pending, error, and result).
  - Display the returned keywords (as `Badge` components) and suggestions below the form upon success.

This detailed prompt should provide any capable AI with all the necessary information to replicate the Vasudev AI website with its specific theme, features, and functionality.