'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github, Linkedin, Facebook, Twitter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll lock effect for mobile menu
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleThemeToggle = () => {
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Coordinates for the middle of the screen
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <header className="fixed top-0 w-full z-50 py-4 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="relative group">
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-300 drop-shadow-md">
            Shamim Robin
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.href === '#resume') {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-resume-modal'));
                }
              }}
              className="text-sm font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          {/* Desktop Hire Me CTA */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-sm shadow-blue-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            Hire Me
          </button>

          {mounted && (
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`p-2 text-black dark:text-white focus:outline-none transition-opacity cursor-pointer ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden cursor-pointer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.5 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 50 || velocity.x > 200) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed top-0 right-0 h-screen w-[85vw] max-w-sm bg-white dark:bg-black/95 backdrop-blur-3xl border-l border-black/5 dark:border-white/10 flex flex-col pt-20 px-6 gap-3 md:hidden shadow-2xl z-50 touch-none overflow-y-auto"
          >
            {/* Close Button inside Sidebar */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Hire Me CTA at top of Mobile Menu - Full Width */}
            <div className="w-full mb-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-6 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                Hire Me
              </button>
            </div>

            {/* Navigation Links - Full Width */}
            <div className="w-full flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.href === '#resume') {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('open-resume-modal'));
                    }
                  }}
                  className="w-full py-3 px-6 rounded-full text-base font-semibold text-black/80 dark:text-white/80 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/15 hover:text-blue-600 dark:hover:text-blue-400 border border-black/5 dark:border-white/5 active:scale-[0.98] transition-all duration-200 text-center flex items-center justify-center cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Icons at the bottom */}
            <div className="mt-auto pt-6 mb-6 flex justify-center gap-3 w-full border-t border-black/5 dark:border-white/10">
              {[
                { icon: Github, href: 'https://github.com/shamimahmedrobin', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/shamimahmedrobin', label: 'LinkedIn' },
                { icon: Facebook, href: 'https://www.facebook.com/shamimahmedrobin2', label: 'Facebook' },
                { icon: Twitter, href: 'https://x.com/ShamimRobin10', label: 'X (Twitter)' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black/70 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
