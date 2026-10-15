'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowUpRight, Globe } from 'lucide-react';
import Image from 'next/image';

type Category = 'All' | 'E-commerce' | 'Landing Pages';

const categories: Category[] = ['All', 'E-commerce', 'Landing Pages'];

const projects = [
  {
    id: 1,
    title: 'StyleSphere',
    description:
      'A modern D2C e-commerce platform for fashion & lifestyle — full product catalog, cart, checkout and growth marketing baked in.',
    category: 'E-commerce',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://stylesphere.com.bd/',
    image: '/images/projects/stylesphere.webp',
  },
  {
    id: 2,
    title: 'Keo Karpin Olivoyl',
    description:
      'Bengali single-product landing page for Keo Karpin moisturizing body oil — offer badges, COD ordering and customer reviews built for conversion.',
    category: 'Landing Pages',
    tags: ['Landing Page', 'CRO', 'Web Design'],
    liveUrl: 'https://oliveoil.stylesphere.com.bd/',
    image: '/images/projects/oliveoil.webp',
  },
  {
    id: 3,
    title: 'StyleSphere Boxer',
    description:
      'Bengali single-product landing page for premium men\u2019s boxer underwear (3-piece combo offer) with cash-on-delivery ordering across Bangladesh.',
    category: 'Landing Pages',
    tags: ['E-commerce', 'Landing Page', 'CRO'],
    liveUrl: 'https://boxer.stylesphere.com.bd/',
    image: '/images/projects/boxer.webp',
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = React.useState<Category>('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-12 scroll-mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
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
                className="group relative rounded-3xl p-6 sm:p-8 glass border border-black/10 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 flex flex-col hover:shadow-2xl overflow-hidden"
              >
                {/* Subtle Ambient Gradient Glow on Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-400/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-400/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                {/* Project Thumbnail */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} live website`}
                  className="relative block rounded-2xl overflow-hidden mb-6 border border-black/10 dark:border-white/10 aspect-[16/10] bg-black/5 dark:bg-white/5"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </a>

                <div className="flex-1">
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/20">
                      <Globe className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-blue-600 dark:text-blue-400" />
                  </h3>

                  {/* Project Description */}
                  <p className="text-base text-black/70 dark:text-white/70 leading-relaxed mb-5 font-normal">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
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

                {/* Action Link */}
                <div className="pt-5 mt-4 border-t border-black/10 dark:border-white/10">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
