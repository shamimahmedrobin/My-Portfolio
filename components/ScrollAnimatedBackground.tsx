'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export function ScrollAnimatedBackground() {
  const { scrollYProgress } = useScroll();

  // Smooth springs for buttery-soft deceleration when scrolling stops
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0001,
  });

  // Rotations tied directly to scroll depth
  const rotateClockwise = useTransform(smoothProgress, [0, 1], [0, 360 * 1.5]);
  const rotateCounter = useTransform(smoothProgress, [0, 1], [0, -360 * 1.2]);
  const rotateFast = useTransform(smoothProgress, [0, 1], [0, 540]);
  const scaleRing = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.08, 1]);
  const yParallaxTop = useTransform(smoothProgress, [0, 1], [-20, 140]);
  const yParallaxBottom = useTransform(smoothProgress, [0, 1], [60, -120]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden select-none"
    >
      {/* Ambient background soft glow orbs */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[130px]" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-emerald-500/5 dark:bg-emerald-600/10 blur-[140px]" />

      {/* TOP-RIGHT ROTATING ORBITAL GYROSCOPE */}
      <motion.div
        style={{ y: yParallaxTop }}
        className="absolute -top-[12%] -right-[12%] sm:-top-[8%] sm:-right-[8%] md:-top-[5%] md:-right-[5%] w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] lg:w-[750px] lg:h-[750px] opacity-35 dark:opacity-30"
      >
        {/* Layer 1: Outer Technical Degree Tick Ring (Spins Clockwise with Scroll + Continuous Gentle Idle) */}
        <motion.div
          style={{ rotate: rotateClockwise, scale: scaleRing }}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <svg viewBox="0 0 500 500" className="w-full h-full text-blue-600 dark:text-blue-400">
            {/* Outer dotted orbit */}
            <circle
              cx="250"
              cy="250"
              r="230"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 8"
              opacity="0.6"
            />
            {/* Segmented architectural arcs */}
            <circle
              cx="250"
              cy="250"
              r="215"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="45 120 70 80"
              opacity="0.8"
            />
            {/* Compass node beacons */}
            <circle cx="250" cy="20" r="4.5" fill="currentColor" opacity="0.9" />
            <circle cx="480" cy="250" r="4.5" fill="currentColor" opacity="0.9" />
            <circle cx="250" cy="480" r="4.5" fill="currentColor" opacity="0.9" />
            <circle cx="20" cy="250" r="4.5" fill="currentColor" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Layer 2: Middle Counter-Rotating Celestial Gyroscope Ring */}
        <motion.div
          style={{ rotate: rotateCounter }}
          className="absolute inset-[14%] flex items-center justify-center will-change-transform"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full text-emerald-600 dark:text-emerald-400">
            {/* Dashed tech polygon & fine ring */}
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="12 12"
              opacity="0.7"
            />
            {/* Inner fine circle */}
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="90 30 180 40"
              opacity="0.6"
            />
            {/* Triangular cross-axis coordinates */}
            <line x1="60" y1="200" x2="340" y2="200" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.4" />
            <line x1="200" y1="60" x2="200" y2="340" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.4" />
            <circle cx="200" cy="60" r="3" fill="currentColor" opacity="0.8" />
            <circle cx="340" cy="200" r="3" fill="currentColor" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Layer 3: Inner Fast Core Ring */}
        <motion.div
          style={{ rotate: rotateFast }}
          className="absolute inset-[32%] flex items-center justify-center will-change-transform"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-500 dark:text-indigo-400">
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeDasharray="20 40"
              opacity="0.8"
            />
            <rect
              x="82"
              y="82"
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              transform="rotate(45 100 100)"
              opacity="0.5"
            />
            <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.9" />
          </svg>
        </motion.div>
      </motion.div>

      {/* BOTTOM-LEFT COUNTER-ROTATING GEOMETRIC CONSTELLATION */}
      <motion.div
        style={{ y: yParallaxBottom }}
        className="absolute -bottom-[15%] -left-[15%] sm:-bottom-[10%] sm:-left-[10%] md:-bottom-[8%] md:-left-[8%] w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] lg:w-[680px] lg:h-[680px] opacity-30 dark:opacity-25"
      >
        {/* Layer 1: Outer Hexagonal Orbit (Spins Counter-Clockwise on Scroll) */}
        <motion.div
          style={{ rotate: rotateCounter }}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <svg viewBox="0 0 500 500" className="w-full h-full text-emerald-600 dark:text-emerald-400">
            <circle
              cx="250"
              cy="250"
              r="220"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="6 14"
              opacity="0.7"
            />
            <polygon
              points="250,50 423,150 423,350 250,450 77,350 77,150"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            <circle cx="250" cy="50" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="423" cy="150" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="423" cy="350" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="250" cy="450" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="77" cy="350" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="77" cy="150" r="4" fill="currentColor" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Layer 2: Inner Clockwise Technical Compass Grid */}
        <motion.div
          style={{ rotate: rotateClockwise }}
          className="absolute inset-[18%] flex items-center justify-center will-change-transform"
        >
          <svg viewBox="0 0 300 300" className="w-full h-full text-blue-500 dark:text-blue-400">
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="80 20 40 20"
              opacity="0.6"
            />
            <circle
              cx="150"
              cy="150"
              r="85"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="8 8"
              opacity="0.5"
            />
            <circle cx="150" cy="150" r="3.5" fill="currentColor" opacity="0.9" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Subtle fine geometric particle nodes that react to scroll */}
      <motion.div
        style={{ rotate: rotateCounter, scale: scaleRing }}
        className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] opacity-15 dark:opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-slate-400 dark:text-slate-500">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 12" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 8" />
        </svg>
      </motion.div>
    </div>
  );
}
