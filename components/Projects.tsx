'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

type Category = 'All' | 'E-commerce' | 'Business' | 'Landing Pages' | 'Portfolios';

const categories: Category[] = ['All', 'E-commerce', 'Business', 'Landing Pages', 'Portfolios'];

const projects = [
  {
    id: 1,
    title: 'StyleSphere',
    description: 'A modern E-commerce platform offering a seamless shopping experience for lifestyle and fashion products.',
    image: 'https://picsum.photos/seed/stylesphere/800/600',
    category: 'E-commerce',
    tags: ['E-commerce', 'Web Development'],
    liveUrl: 'https://stylesphere.com.bd/',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Olive Oil',
    description: 'A high-converting landing page designed for premium Olive Oil products.',
    image: 'https://picsum.photos/seed/oliveoil/800/600',
    category: 'Landing Pages',
    tags: ['Landing Page', 'Web Design'],
    liveUrl: 'https://oliveoil.stylesphere.com.bd/',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'e-commerce landing',
    description: 'A modern e-commerce landing page optimized for product sales and conversions.',
    image: 'https://picsum.photos/seed/boxer/800/600',
    category: 'Landing Pages',
    tags: ['E-commerce', 'Landing Page'],
    liveUrl: 'https://boxer.stylesphere.com.bd/',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'G3 Architects',
    description: 'A professional business website designed for an architecture firm to showcase their portfolio and services.',
    image: 'https://picsum.photos/seed/g3architects/800/600',
    category: 'Business',
    tags: ['Architecture', 'Business Website'],
    liveUrl: 'https://shamimahmedrobin.github.io/g3-architects-website/',
    githubUrl: '#',
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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform" aria-label="View Live">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform" aria-label="View Source">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{project.title}</h3>
                  <p className="text-sm text-black/70 dark:text-white/70 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2 py-1 bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {project.liveUrl !== '#' && (
                    <div className="mt-6">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
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
