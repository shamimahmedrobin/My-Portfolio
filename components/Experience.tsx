'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Code2,
  Palette
} from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  url?: string;
  icon: React.ElementType;
  accentColor: string;
  isCurrent?: boolean;
  summary: string;
  achievements: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'stylesphere',
    company: 'StyleSphere',
    role: 'Founder & Lead Developer',
    period: 'Jul 2024 – Present',
    type: 'Full-time',
    location: 'Sylhet, Bangladesh (Hybrid)',
    url: 'https://stylesphere.com.bd',
    icon: Code2,
    accentColor: 'blue',
    isCurrent: true,
    summary: 'Founded and engineered an independent direct-to-consumer (D2C) fashion & lifestyle brand, steering technical development and growth marketing simultaneously.',
    achievements: [
      'Architected and deployed full-stack e-commerce web platform leveraging Next.js, React, and TypeScript with sub-second page loads.',
      'Engineered high-converting checkout funnels, automated cart flows, and multi-category product cataloging.',
      'Spearheaded performance marketing operations across Meta Ads (Facebook & Instagram), conversion tracking (Pixel & CAPI), and CRO.',
      'Implemented technical SEO best practices, structured schema markup, and responsive UI architecture.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Meta Ads', 'SEO', 'CRO', 'E-commerce'],
  },
  {
    id: 'trustshopbd',
    company: 'TrustShopBD',
    role: 'Social Media Manager',
    period: 'Nov 2022 – Jul 2024',
    type: 'Part-time',
    location: 'Remote',
    icon: TrendingUp,
    accentColor: 'emerald',
    isCurrent: false,
    summary: 'Directed multi-channel digital brand growth, campaign planning, and audience communication for a prominent e-commerce retail store.',
    achievements: [
      'Managed organic and paid social media marketing campaigns across Facebook and Instagram, boosting community engagement.',
      'Structured streamlined Customer Relationship Management (CRM) workflows and customer support response systems.',
      'Coordinated seasonal marketing promotions, product launch campaigns, and digital ad creative production.',
      'Monitored ad performance metrics and audience engagement to consistently optimize ROAS.',
    ],
    skills: ['Social Media Marketing', 'Meta Business Suite', 'Content Strategy', 'CRM', 'Campaign Management'],
  },
  {
    id: 'fiverr',
    company: 'Fiverr',
    role: 'Freelance Graphic Designer',
    period: 'Jan 2020 – May 2024',
    type: 'Freelance',
    location: 'Remote (International Clients)',
    icon: Palette,
    accentColor: 'amber',
    isCurrent: false,
    summary: 'Collaborated with international entrepreneurs and online businesses to design custom visual identities and high-performing advertising graphics.',
    achievements: [
      'Crafted 100+ high-converting promotional banners, social media ad creatives, and product mockups using Adobe Photoshop.',
      'Designed bespoke branding collateral, logos, and digital marketing materials tailored to individual client niches.',
      'Sustained top-tier client ratings and repeat business through dependable communication, quality assurance, and punctual delivery.',
    ],
    skills: ['Adobe Photoshop', 'Brand Identity', 'UI Graphics', 'Social Media Creatives', 'Visual Design'],
  },
];

export function Experience() {
  const [selectedId, setSelectedId] = React.useState<string>(experiences[0].id);
  const activeExp = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <section id="experience" className="py-20 sm:py-28 relative scroll-mt-20">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-blue-500/[0.03] dark:bg-blue-500/[0.02] blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black dark:text-white">
            Work{' '}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-black/65 dark:text-white/65 leading-relaxed">
            Hands-on track record founding e-commerce platforms, architecting modern web apps, and executing performance-driven growth marketing.
          </p>
        </div>

        {/* Desktop & Tablet: Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation / Role Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 mb-2 px-2">
              Select Position
            </p>

            {experiences.map((exp) => {
              const isSelected = exp.id === selectedId;
              const Icon = exp.icon;

              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900/90 border-blue-500/40 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 ring-1 ring-blue-500/20'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:border-black/10 dark:hover:border-white/10'
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeExperienceIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-sky-400"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 group-hover:text-blue-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {exp.company}
                          </h3>
                          {exp.isCurrent && (
                            <span className="flex h-2 w-2 relative" title="Current Role">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-medium">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-black/40 dark:text-white/40 whitespace-nowrap self-start mt-0.5">
                      {exp.period.split('–')[0].trim()}
                    </span>
                  </div>

                  {/* Clean unboxed meta line */}
                  <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/55 dark:text-white/55">
                    <span>{exp.type}</span>
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span>{exp.location}</span>
                  </div>
                </button>
              );
            })}

            {/* Quick Resume CTA card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-transparent border border-blue-500/15 mt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-black dark:text-white">Looking for full resume?</h4>
                  <p className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                    Download complete PDF with certificates and verdict.
                  </p>
                </div>
                <a
                  href="#resume"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shrink-0 active:scale-95 inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>View PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-black/10 dark:border-white/10 shadow-xl shadow-black/[0.02] dark:shadow-black/20"
            >
              {/* Header inside detail card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight">
                      {activeExp.company}
                    </h3>
                    {activeExp.url && (
                      <a
                        href={activeExp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {activeExp.role}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-black/60 dark:text-white/60 mt-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {activeExp.period}
                    </span>
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span>{activeExp.type}</span>
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      {activeExp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-5 text-sm sm:text-base text-black/75 dark:text-white/75 leading-relaxed">
                {activeExp.summary}
              </p>

              {/* Key Achievements Bullet points */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3.5 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Key Achievements &amp; Responsibilities
                </h4>

                <ul className="space-y-3">
                  {activeExp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-black/80 dark:text-white/80 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & Core Competencies */}
              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
                  Technologies &amp; Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeExp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-black/80 dark:text-white/80 border border-black/5 dark:border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
