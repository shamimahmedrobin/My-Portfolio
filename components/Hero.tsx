'use client';

import { motion } from 'motion/react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Content (Text) */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 text-sm font-medium text-black/70 dark:text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-4 leading-[1.1]"
          >
            Hello, I&apos;m <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
              Shamim Ahmed Robin
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-black/80 dark:text-white/80 mb-6 max-w-md md:max-w-none"
          >
            Building Digital Products & Scaling Brands
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="max-w-xl text-base sm:text-lg text-black/70 dark:text-white/60 mb-10 font-light leading-relaxed"
          >
            A Professional Web Developer and Social Media Manager bridging the gap between elegant technical architecture and high-converting marketing strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
          >
            {/* View Projects & Contact Me (Side-by-side on mobile, inline on desktop) */}
            <div className="grid grid-cols-2 gap-3 md:contents w-full">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-7 py-3.5 sm:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm sm:text-base font-medium hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:focus:ring-offset-black cursor-pointer shadow-sm text-center whitespace-nowrap"
              >
                View Projects
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-7 py-3.5 sm:py-4 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-full text-sm sm:text-base font-medium hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:focus:ring-offset-black cursor-pointer shadow-sm text-center whitespace-nowrap"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Contact Me
              </a>
            </div>

            {/* Hire Me Button (Full width on mobile below the two buttons, side-by-side on desktop) */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-hire-modal'));
              }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse" />
              Hire Me
            </button>
          </motion.div>
        </div>

        {/* Right Content (Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] mx-auto md:ml-auto aspect-[4/5]"
        >
          {/* Decorative background shape */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2rem] transform rotate-3 scale-105 blur-lg transition-transform duration-500 hover:rotate-6 hover:scale-110"></div>
          
          {/* Image Container */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden glass border-[4px] border-white/50 dark:border-white/10 shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Shamim Ahmed Robin"
              fill
              priority
              sizes="(max-width: 768px) 300px, 340px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating Badge overlay */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute bottom-6 left-0 sm:-left-6 glass-card px-4 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                🚀
              </div>
              <div className="text-sm text-left">
                <p className="font-bold text-black dark:text-white leading-tight">Web &</p>
                <p className="text-black/80 dark:text-white/80 leading-tight">Marketing</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
