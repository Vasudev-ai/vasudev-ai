import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevFest GDG Ranchi 2026 × Vasudev AI | Community Partner',
  description:
    'Vasudev AI is an official Community Partner at GDG Ranchi DevFest 2026. Sessions, booth demos (Learnivo, Vasudev Browser), student mentorship. Meet us in Ranchi.',
  keywords: ['DevFest Ranchi 2026', 'GDG Ranchi', 'Vasudev AI DevFest', 'community partner DevFest'],
  openGraph: {
    title: 'Vasudev AI × GDG Ranchi DevFest 2026',
    description: 'Official Community Partner — sessions, booth, campus connects. See you in Ranchi.',
    url: 'https://www.vasudevai.in/community/devfest-gdg-ranchi-2026',
  },
};

export default function DevfestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
