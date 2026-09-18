import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProfessionalHighlights } from '@/components/ProfessionalHighlights';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { ResumeModal } from '@/components/ResumeModal';
import { HireModal } from '@/components/HireModal';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Global Background Elements for cohesiveness */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50 dark:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50 dark:opacity-100"></div>
      </div>

      <Navbar />
      <Hero />
      <About />
      <ProfessionalHighlights />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
      <ResumeModal />
      <HireModal />
    </main>
  );
}
