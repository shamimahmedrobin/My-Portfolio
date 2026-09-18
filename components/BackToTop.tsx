'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past the initial hero section (~400px or hero height)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-button"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Back to Top"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full glass border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/70 text-black dark:text-white shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:border-transparent transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          <span className="sr-only">Back to Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
