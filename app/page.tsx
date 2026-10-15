import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ScrollAnimatedBackground } from '@/components/ScrollAnimatedBackground';
import { ProfessionalHighlights } from '@/components/ProfessionalHighlights';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ScrollAnimatedBackground />

      <Navbar />
      <Hero />
      <About />
      <ProfessionalHighlights />
      <Experience />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
