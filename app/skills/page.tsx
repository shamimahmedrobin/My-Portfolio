import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Skills } from '@/components/Skills';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Skills | Shamim Ahmed Robin',
  description: 'Technical and digital marketing skills of Shamim Ahmed Robin, including React, Next.js, TypeScript, Tailwind CSS, and Meta Ads.',
  alternates: {
    canonical: 'https://shamimahmedrobin.vercel.app/skills',
  },
};

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-20">
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50 dark:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50 dark:opacity-100"></div>
      </div>

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-black/60 dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <Skills />
      <Footer />
      <BackToTop />
    </main>
  );
}
