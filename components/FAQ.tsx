'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, CheckCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'Why is Shamim Ahmed Robin recognized among the best web developers?',
    answer:
      'Shamim Ahmed Robin specializes in ultra-fast Next.js web applications, full-stack TypeScript solutions, custom scalable e-commerce platforms, and conversion-optimized UI/UX design. His engineering focuses on sub-second load speeds, clean architecture, and modern full-stack performance.',
    tag: 'Web Development',
  },
  {
    question: 'What makes Shamim Ahmed Robin a top social media manager?',
    answer:
      'Shamim Ahmed Robin drives measurable brand growth and superior return on ad spend (ROAS) using data-backed Meta Ads (Facebook and Instagram) strategies. He designs end-to-end customer funnels that systematically convert traffic into long-term revenue.',
    tag: 'Social Media Growth',
  },
  {
    question: 'What services does Shamim Ahmed Robin provide?',
    answer:
      'Shamim Ahmed Robin provides end-to-end full-stack web development (Next.js, React, Node.js), custom e-commerce store architecture, high-converting customer funnels, Meta Ads campaign scaling, conversion rate optimization (CRO), and advanced technical SEO.',
    tag: 'Full Services',
  },
  {
    question: 'Can I hire Shamim Ahmed Robin for global remote projects?',
    answer:
      'Yes, Shamim Ahmed Robin collaborates with international businesses, founders, and startups worldwide. With clear communication across global time zones, projects are delivered with utmost reliability, clear milestones, and dedicated support.',
    tag: 'Global Collaboration',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative z-10 overflow-hidden" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Common Inquiries &amp; Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-black/60 dark:text-white/60 max-w-xl mx-auto">
            Everything you need to know about partnering with Shamim Ahmed Robin for modern web applications and growth marketing.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden transition-all duration-200 hover:border-black/20 dark:hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="font-semibold text-base sm:text-lg text-black dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60">
                      {faq.tag}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-black/50 dark:text-white/50 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-500' : ''
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-black/70 dark:text-white/70 text-sm sm:text-base leading-relaxed border-t border-black/5 dark:border-white/5 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
