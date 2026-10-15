'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

// ---------------------------------------------------------------------------
// DEMO DATA — replace with real client testimonials before publishing.
// Each entry: quote, name, role/company, initials for the avatar bubble.
// ---------------------------------------------------------------------------
const testimonials = [
  {
    quote:
      'Shamim rebuilt our store from scratch — page load went from 6 seconds to under 2, and our conversion rate jumped 38% in the first month.',
    name: 'Tanvir Hasan',
    role: 'Founder, Dhaka Fashion House',
    initials: 'TH',
  },
  {
    quote:
      'His Meta Ads took our ROAS from 1.8x to 4.3x in eight weeks. He thinks like a growth partner, not just a media buyer.',
    name: 'Sarah Mitchell',
    role: 'E-commerce Manager, US D2C Brand',
    initials: 'SM',
  },
  {
    quote:
      'Pixel-perfect delivery, clear communication, always on time. The landing page he built doubled our email signups.',
    name: 'Arif Chowdhury',
    role: 'Startup Founder, SaaS',
    initials: 'AC',
  },
  {
    quote:
      'A rare combo — a developer who actually understands marketing. Our site finally looks as good as our product.',
    name: 'Emily Rodriguez',
    role: 'Brand Owner, Lifestyle Store',
    initials: 'ER',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 scroll-mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            What Clients Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Real feedback from founders and teams I&apos;ve shipped work for.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.12 }}
              className="relative rounded-3xl p-7 sm:p-8 glass border border-black/10 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-blue-500/10 dark:bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />

              <Quote className="w-8 h-8 text-blue-500/60 dark:text-blue-400/60 mb-4" />

              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg text-black/80 dark:text-white/80 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-4 pt-5 border-t border-black/10 dark:border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-black dark:text-white text-sm sm:text-base">
                    {t.name}
                  </div>
                  <div className="text-xs sm:text-sm text-black/60 dark:text-white/60">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
