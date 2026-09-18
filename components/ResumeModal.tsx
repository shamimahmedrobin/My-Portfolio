'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Briefcase, GraduationCap, Code, CheckCircle } from 'lucide-react';

export function ResumeModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleHash = () => {
      if (window.location.hash === '#resume') {
        setIsOpen(true);
      }
    };

    window.addEventListener('open-resume-modal', handleOpen);
    window.addEventListener('hashchange', handleHash);

    if (window.location.hash === '#resume') {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('open-resume-modal', handleOpen);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Lock scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0f1117] rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-semibold text-black/70 dark:text-white/70">Resume Preview</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-xl text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content (Scrollable) */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-black dark:text-white">
              {/* Header Info */}
              <div className="border-b border-black/10 dark:border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Shamim Ahmed Robin</h1>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mt-1">
                    Web Developer & Digital Marketing Specialist
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-black/70 dark:text-white/70 mt-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      Dhaka, Bangladesh
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-emerald-500" />
                      shamimahmedrobin5@gmail.com
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href="mailto:shamimahmedrobin5@gmail.com"
                    className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Contact Me
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-black dark:text-white">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  Professional Summary
                </h2>
                <p className="text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
                  Versatile Web Developer and Digital Marketing Strategist passionate about crafting blazing-fast, responsive web applications and high-converting marketing campaigns. Expert at bridging modern web frameworks (Next.js, React, Tailwind CSS) with performance-driven user acquisition (Meta Ads, Google Analytics, CRO).
                </p>
              </div>

              {/* Core Skills */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <Code className="w-5 h-5 text-emerald-500" />
                  Technical & Marketing Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                    <h3 className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">Web Development</h3>
                    <ul className="text-xs sm:text-sm text-black/70 dark:text-white/70 space-y-1">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Next.js 14/15, React, TypeScript</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Tailwind CSS, Framer Motion, Responsive UI</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Node.js, Express, REST APIs, Git</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                    <h3 className="font-semibold text-sm mb-2 text-emerald-600 dark:text-emerald-400">Digital Marketing</h3>
                    <ul className="text-xs sm:text-sm text-black/70 dark:text-white/70 space-y-1">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Meta Ads (Facebook & Instagram campaigns)</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Conversion Rate Optimization (CRO) & Funnel Design</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Pixel Setup, Conversions API (CAPI) & Analytics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  Key Projects & Portfolios
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base">StyleSphere E-commerce Platform</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Live</span>
                    </div>
                    <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                      High-performance fashion and lifestyle e-commerce platform built for conversion-driven sales.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base">Olive Oil Premium Landing Page</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Live</span>
                    </div>
                    <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                      High-converting sales landing page designed for premium organic olive oil products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-black dark:text-white">
                  <GraduationCap className="w-5 h-5 text-amber-500" />
                  Education & Training
                </h2>
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <h3 className="font-bold text-base">Web Development & Digital Marketing</h3>
                  <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">
                    Comprehensive modern front-end engineering & performance marketing specialization.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                Print / Save Resume
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
