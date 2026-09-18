'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Briefcase, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Star, 
  Code2, 
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: CountUpProps) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function ProfessionalHighlights() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const stats = [
    {
      id: 'years-experience',
      title: 'Years of Experience',
      value: 4,
      suffix: '+',
      subtitle: '4+ Years of Industry Experience',
      description: 'Continuously refining full-stack development, modern UI/UX design, and strategic digital marketing.',
      icon: Clock,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      bgLight: 'bg-blue-500/10',
      textAccent: 'text-blue-600 dark:text-blue-400',
      ringPercent: 90, // visual circular ring percentage
      detailLabel: 'Frontend & Full-Stack Mastery',
    },
    {
      id: 'projects-completed',
      title: 'Projects Completed',
      value: 250,
      suffix: '+',
      subtitle: '250+ Production & Client Builds',
      description: 'End-to-end web applications, interactive portfolio platforms, and high-converting commercial landing pages.',
      icon: CheckCircle2,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-500/10',
      textAccent: 'text-emerald-600 dark:text-emerald-400',
      ringPercent: 98,
      detailLabel: 'High Code Quality & Performance',
    },
    {
      id: 'satisfied-clients',
      title: 'Satisfied Clients',
      value: 50,
      suffix: '+',
      subtitle: '50+ Global & Local Partnerships',
      description: 'Empowering businesses with custom digital solutions, transparent communication, and reliable turnaround.',
      icon: Users,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-500/10',
      textAccent: 'text-amber-600 dark:text-amber-400',
      ringPercent: 96,
      detailLabel: 'Positive Reviews & Return Clients',
    },
    {
      id: 'client-satisfaction',
      title: 'Satisfaction & Commitment',
      value: 99,
      suffix: '%',
      subtitle: 'Punctual & Reliable Delivery',
      description: 'Dedicated to pixel-perfect layouts, responsive design, fast page speed, and seamless user experiences.',
      icon: Star,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-500/10',
      textAccent: 'text-purple-600 dark:text-purple-400',
      ringPercent: 99,
      detailLabel: 'On-Time Project Delivery',
    },
  ];

  const secondaryCapabilities = [
    { label: 'Responsive Architecture', score: '100%', icon: Zap },
    { label: 'Clean Code & Best Practices', score: '98%', icon: Code2 },
    { label: 'Performance & SEO Optimized', score: '96%', icon: TrendingUp },
    { label: 'Reliable Client Support', score: '24/7', icon: ShieldCheck },
  ];

  return (
    <section 
      id="highlights" 
      ref={sectionRef}
      className="py-20 relative z-10 overflow-hidden"
      aria-label="Professional Highlights"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Professional Highlights
          </h2>
          <p className="text-sm sm:text-base text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Tangible milestones and quality benchmarks achieved across software engineering and digital marketing journeys.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            // SVG circular progress math
            const radius = 38;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = isInView 
              ? circumference - (stat.ringPercent / 100) * circumference 
              : circumference;

            return (
              <motion.div
                key={stat.id}
                id={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card relative p-6 sm:p-7 rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all group flex flex-col justify-between"
              >
                {/* Subtle top gradient glow */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <div>
                  {/* Top Row: Icon + Circular Mini Visualization */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bgLight} flex items-center justify-center ${stat.textAccent} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Circular Data Progress Ring */}
                    <div className="relative w-12 h-12 flex items-center justify-center" title={`${stat.ringPercent}% benchmark rating`}>
                      <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 96 96">
                        {/* Background track circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="7"
                          fill="transparent"
                          className="text-black/5 dark:text-white/10"
                        />
                        {/* Dynamic progress circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="7"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className={`${stat.textAccent} transition-all duration-1000 ease-out`}
                        />
                      </svg>
                      <span className="absolute text-[10px] font-bold text-black/70 dark:text-white/70">
                        {stat.ringPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Count-Up Metric Number */}
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1800 + idx * 200} />
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-bold text-base sm:text-lg text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-black/50 dark:text-white/50 mb-3">
                    {stat.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-black/65 dark:text-white/65 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom Tag / Badge */}
                <div className="mt-5 pt-3.5 border-t border-black/5 dark:border-white/10 flex items-center gap-1.5 text-[11px] font-medium text-black/60 dark:text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="truncate">{stat.detailLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Metric Bar / Key Strengths Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-5 sm:p-6 rounded-3xl glass-card border border-black/10 dark:border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10">
            {secondaryCapabilities.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={item.label} 
                  className={`flex items-center gap-3.5 ${i !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-black dark:text-white">
                      {item.score}
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60 font-medium leading-tight">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
