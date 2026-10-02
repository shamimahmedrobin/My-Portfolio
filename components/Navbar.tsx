'use client';

import * as React from 'react';
import Link from 'next/link';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github, Linkedin, Facebook, Twitter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Highlights', href: '/#highlights' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '/#contact' },
];

const emptySubscribe = () => () => {};

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

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

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Immediately blur the button so no focus circle/ring remains visible after click
    e.currentTarget.blur();

    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    // Get exact center coordinates of the clicked theme toggle button
    const target = e.currentTarget;
    const rect = target?.getBoundingClientRect?.() ?? {
      left: window.innerWidth - 60,
      top: 30,
      width: 40,
      height: 40,
    };
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Radius needed to reach the furthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      // Create a smooth circular wave ripple expanding outward from the theme toggle button across the entire website
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <header className="fixed top-0 w-full z-50 py-4 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative group">
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-300 drop-shadow-md">
            Shamim Robin
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.href === '#resume' || link.name === 'Resume') {
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
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-hire-modal'));
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-sm shadow-blue-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            Hire Me
          </button>

          {mounted && (
            <button
              type="button"
              onClick={handleThemeToggle}
              className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 cursor-pointer group"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <button
              type="button"
              onClick={handleThemeToggle}
              className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 cursor-pointer group"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 group-hover:-rotate-12" />
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
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.4 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 50 || velocity.x > 200) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed top-0 right-0 h-[100dvh] max-h-[100dvh] w-[85vw] max-w-sm bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border-l border-black/10 dark:border-white/10 flex flex-col md:hidden shadow-2xl z-50 overflow-hidden"
          >
            {/* Top Header inside Sidebar */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/5 dark:border-white/10 shrink-0">
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-300">
                Shamim Robin
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors focus:outline-none cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2.5 min-h-0 touch-pan-y overscroll-contain">
              {/* Hire Me CTA at top of Mobile Menu - Full Width */}
              <div className="w-full mb-1 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-hire-modal'));
                  }}
                  className="w-full py-3.5 px-6 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  Hire Me
                </button>
              </div>

              {/* Navigation Links - Full Width */}
              <div className="w-full flex flex-col gap-2 shrink-0">
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
            </div>

            {/* Social Icons Pinned at the Bottom - Always Visible */}
            <div className="shrink-0 w-full px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-center font-medium text-black/50 dark:text-white/50 mb-3 uppercase tracking-wider">
                Follow & Connect
              </p>
              <div className="flex justify-center items-center gap-3 w-full">
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
                    className="w-11 h-11 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black/80 dark:text-white/80 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm border border-black/5 dark:border-white/5"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
