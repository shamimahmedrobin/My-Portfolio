'use client';

import { motion } from 'motion/react';

const webSkills = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Supabase', 'Git'
];

const marketingSkills = [
  'Facebook Ads', 'Meta Ads', 'Instagram Management', 'Content Creation', 'Advanced SEO', 'Analytics'
];

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: 'spring' as const,
      stiffness: 100,
    }
  })
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-black/5 dark:bg-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">Core Competencies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Web Dev Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Web Development</h3>
            <div className="flex flex-wrap gap-3 relative z-10">
              {webSkills.map((skill, i) => (
                <motion.span
                  custom={i}
                  variants={badgeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-white/10 text-black/80 dark:text-white shadow-sm border border-black/5 dark:border-white/5 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Marketing Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Marketing & SEO</h3>
            <div className="flex flex-wrap gap-3 relative z-10">
              {marketingSkills.map((skill, i) => (
                <motion.span
                  custom={i}
                  variants={badgeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-white/10 text-black/80 dark:text-white shadow-sm border border-black/5 dark:border-white/5 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
