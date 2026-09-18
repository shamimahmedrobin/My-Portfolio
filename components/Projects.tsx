'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowUpRight, Globe } from 'lucide-react';

type Category = 'All' | 'E-commerce' | 'Business' | 'Landing Pages' | 'Portfolios';

const categories: Category[] = ['All', 'E-commerce', 'Business', 'Landing Pages', 'Portfolios'];

const projects = [
  {
    id: 1,
    title: 'StyleSphere',
    description: 'A modern E-commerce platform offering a seamless shopping experience for lifestyle and fashion products.',
    category: 'E-commerce',
    tags: ['E-commerce', 'Web Development'],
    liveUrl: 'https://stylesphere.com.bd/',
    githubUrl: '#',
    status: 'live',
  },
  {
    id: 2,
    title: 'Olive Oil',
    description: 'A high-converting landing page designed for premium Olive Oil products.',
    category: 'Landing Pages',
    tags: ['Landing Page', 'Web Design'],
    liveUrl: 'https://oliveoil.stylesphere.com.bd/',
    githubUrl: '#',
    status: 'live',
  },
  {
    id: 3,
    title: 'e-commerce landing',
    description: 'A modern e-commerce landing page optimized for product sales and conversions.',
    category: 'Landing Pages',
    tags: ['E-commerce', 'Landing Page'],
    liveUrl: 'https://boxer.stylesphere.com.bd/',
    githubUrl: '#',
    status: 'live',
  },
  {
    id: 4,
    title: 'G3 Architects',
    description: 'A professional business website designed for an architecture firm to showcase their portfolio and services.',
    category: 'Business',
    tags: ['Architecture', 'Business Website'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'private',
  },
  {
    id: 5,
    title: 'GadgetNest BD',
    description: 'A smart electronics and mobile gadget retail store featuring automated product cataloging and cart system.',
    category: 'E-commerce',
    tags: ['E-commerce', 'Tech Store', 'React'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'paused',
  },
  {
    id: 6,
    title: 'Apex Fitness Club',
    description: 'A gym membership and fitness class booking web application designed for personal trainer appointments.',
    category: 'Business',
    tags: ['Health & Fitness', 'Booking System', 'UI/UX'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'paused',
  },
  {
    id: 7,
    title: 'Creative Agency Studio',
    description: 'A dynamic creative agency portfolio highlighting brand identity case studies and client campaign results.',
    category: 'Portfolios',
    tags: ['Agency Portfolio', 'Design', 'Branding'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'paused',
  }
];

export function Projects() {
  const [activeCategory, setActiveCategory] = React.useState<Category>('All');

  const filteredProjects = projects.filter(
    project => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">Featured Work</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'bg-transparent text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative rounded-3xl p-8 sm:p-10 glass border border-black/10 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl overflow-hidden"
              >
                {/* Subtle Ambient Gradient Glow on Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-400/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-400/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <div>
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/20">
                      <Globe className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <span className="text-sm font-mono text-black/40 dark:text-white/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Large Project Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {project.title}
                    {project.status === 'live' && (
                      <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-blue-600 dark:text-blue-400" />
                    )}
                  </h3>

                  {/* Project Description */}
                  <p className="text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/5 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link / Button */}
                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  {project.status === 'live' ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link cursor-pointer"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <div
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-black/40 dark:text-white/40 cursor-not-allowed select-none pointer-events-none"
                      title={project.status === 'private' ? 'Project is private' : 'Project is currently paused'}
                      aria-disabled="true"
                    >
                      <span className="line-through">Visit Live Website</span>
                      <ExternalLink className="w-4 h-4 opacity-40 line-through" />
                    </div>
                  )}
                  
                  {project.status === 'private' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 dark:text-amber-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Private
                    </span>
                  ) : project.status === 'paused' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Paused
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
