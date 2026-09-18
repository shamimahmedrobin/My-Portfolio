'use client';

import { motion } from 'motion/react';
import { Code2, Megaphone, Lightbulb } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed text-justify">
              I am passionate about creating digital experiences that not only look visually stunning but also drive measurable results. My unique background allows me to understand both the <strong className="text-black dark:text-white">logic of code</strong> and the <strong className="text-black dark:text-white">psychology of marketing</strong>.
            </p>
            <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed text-justify">
              Whether it's developing a high-performance Next.js application, designing intuitive user interfaces, or running a data-driven Meta Ad campaign, I focus on delivering scalable and premium solutions tailored to brand growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="glass-card p-6 rounded-2xl">
              <Code2 className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold text-lg text-black dark:text-white mb-2">Web Development</h3>
              <p className="text-sm text-black/60 dark:text-white/60">Modern, responsive, and robust front-end and full-stack architectures.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Megaphone className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-lg text-black dark:text-white mb-2">Digital Marketing</h3>
              <p className="text-sm text-black/60 dark:text-white/60">Strategic ad placements, brand scaling, and ROI-focused campaigns.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl sm:col-span-2 flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500 shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-black dark:text-white mb-2">The Sweet Spot</h3>
                <p className="text-sm text-black/60 dark:text-white/60">By merging technical precision with creative marketing, I build products that are discovered easily and loved by users instantly.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
