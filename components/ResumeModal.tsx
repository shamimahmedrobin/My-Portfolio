'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  CheckCircle, 
  Award, 
  Compass, 
  BookOpen, 
  Terminal, 
  Heart,
  FileText,
  FolderGit2
} from 'lucide-react';

export function ResumeModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pdfUrl = '/resume.pdf';
  const pdfFilename = 'Shamim_Ahmed_Robin_Resume.pdf';

  // Close modal and cleanly remove #resume from URL
  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#resume') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Open modal and push #resume to URL
  const openModal = React.useCallback(() => {
    setIsOpen(true);
    if (typeof window !== 'undefined' && window.location.hash !== '#resume') {
      window.history.pushState(null, '', '#resume');
    }
  }, []);

  React.useEffect(() => {
    const handleOpen = () => {
      openModal();
    };

    const handleHash = () => {
      if (window.location.hash === '#resume') {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-resume-modal', handleOpen);
    window.addEventListener('hashchange', handleHash);

    if (window.location.hash === '#resume') {
      setTimeout(() => setIsOpen(true), 0);
    }

    return () => {
      window.removeEventListener('open-resume-modal', handleOpen);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [openModal]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle direct PDF print of the set PDF
  const handlePrint = () => {
    // On mobile devices (iOS / Android), hidden iframe print is often unsupported or blocked.
    // Opening directly in a new tab lets the native mobile PDF viewer display & print reliably.
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(pdfUrl, '_blank');
      return;
    }

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.src = pdfUrl;

    document.body.appendChild(printFrame);

    let printed = false;
    const triggerPrint = () => {
      if (printed) return;
      printed = true;
      try {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
      } catch {
        window.open(pdfUrl, '_blank');
      }
      setTimeout(() => {
        try {
          document.body.removeChild(printFrame);
        } catch {}
      }, 60000);
    };

    printFrame.onload = () => {
      setTimeout(triggerPrint, 300);
    };

    setTimeout(() => {
      if (!printed) {
        triggerPrint();
      }
    }, 2000);
  };

  // Handle direct PDF download of the set PDF
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfFilename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            id="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            id="resume-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-[#0f1117] rounded-2xl sm:rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div id="resume-modal-header" className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-black/80 dark:text-white/80">Resume Preview</span>
              </div>

              {/* Header Action: Only Print Icon and Close (X) */}
              <div className="flex items-center gap-1">
                {/* Print Icon Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-xl text-black/70 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
                  title="Print Resume"
                  aria-label="Print Resume"
                >
                  <Printer className="w-5 h-5" />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-xl text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content (Scrollable) - Preview remains 100% untouched */}
            <div id="resume-printable-area" className="p-4 sm:p-10 overflow-y-auto space-y-6 sm:space-y-8 text-black dark:text-white">
              {/* Header Info */}
              <div className="border-b border-black/10 dark:border-white/10 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Shamim Ahmed Robin</h1>
                  <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-semibold mt-1">
                    Web Developer & Digital Marketing Specialist
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-black/70 dark:text-white/70 mt-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                      Sylhet, Bangladesh
                    </span>
                    <span className="flex items-center gap-1.5 break-all">
                      <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                      shamimahmedrobin5@gmail.com
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.hash = '#contact';
                        }
                      }, 100);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer text-center"
                  >
                    Contact Me
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-black dark:text-white">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Professional Summary
                </h2>
                <p className="text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed text-justify">
                  Web Developer and Digital Marketing Specialist with hands-on experience building and managing e-commerce platforms, social media campaigns, customer acquisition funnels, SEO, and performance marketing. Founder and Lead Developer of StyleSphere, where I work across product development, digital marketing, analytics, and business operations.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  Experience
                </h2>
                <div className="space-y-4">
                  {/* StyleSphere */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                      <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-black dark:text-white">StyleSphere</h3>
                        <span className="text-black/30 dark:text-white/30 font-normal">|</span>
                        <span className="font-semibold text-sm sm:text-base text-blue-600 dark:text-blue-400">Founder &amp; Lead Developer</span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 whitespace-nowrap self-start sm:self-auto">
                        Jul 2024 – Present
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-black/60 dark:text-white/60 mt-1 font-medium">
                      <span>Full-time</span>
                      <span className="text-black/30 dark:text-white/30">•</span>
                      <span>Sylhet, Bangladesh (Hybrid)</span>
                      <span className="text-black/30 dark:text-white/30">•</span>
                      <a 
                        href="https://stylesphere.com.bd" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        stylesphere.com.bd
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-black/75 dark:text-white/75">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>Founded StyleSphere, a modern direct-to-consumer (D2C) fashion &amp; lifestyle brand.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>Architected full-stack e-commerce web platform using Next.js, React, and TypeScript.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>Leading Search Engine Optimization (SEO), customer funnels, and performance marketing.</span>
                      </li>
                    </ul>
                  </div>

                  {/* TrustShopBD */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                      <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-black dark:text-white">TrustShopBD</h3>
                        <span className="text-black/30 dark:text-white/30 font-normal">|</span>
                        <span className="font-semibold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">Social Media Manager</span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 whitespace-nowrap self-start sm:self-auto">
                        Nov 2022 – Jul 2024
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-black/60 dark:text-white/60 mt-1 font-medium">
                      <span>Part-time</span>
                      <span className="text-black/30 dark:text-white/30">•</span>
                      <span>Remote</span>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-black/75 dark:text-white/75">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>Managed multi-channel social media brand presence, campaign content, and promotions.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>Handled Customer Relationship Management (CRM) and audience interaction workflows.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>Drove consistent digital brand growth and customer engagement across key platforms.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fiverr */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                      <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-black dark:text-white">Fiverr</h3>
                        <span className="text-black/30 dark:text-white/30 font-normal">|</span>
                        <span className="font-semibold text-sm sm:text-base text-purple-600 dark:text-purple-400">Freelance Graphic Designer</span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 whitespace-nowrap self-start sm:self-auto">
                        Jan 2020 – May 2024
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-black/60 dark:text-white/60 mt-1 font-medium">
                      <span>Freelance</span>
                      <span className="text-black/30 dark:text-white/30">•</span>
                      <span>Remote (International Clients)</span>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-black/75 dark:text-white/75">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span>Created high-converting marketing visuals, digital ad banners, and social creatives.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span>Designed custom brand identity assets and UI graphics using Adobe Photoshop.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span>Maintained top client satisfaction ratings through high-quality visual deliverables.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Core Skills */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <Code className="w-5 h-5 text-emerald-500" />
                  Technical & Marketing Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                    <h3 className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">Web Development</h3>
                    <ul className="text-xs sm:text-sm text-black/70 dark:text-white/70 space-y-1">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Next.js 14/15, React, TypeScript</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Tailwind CSS, Framer Motion, Responsive UI</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Node.js, Express, REST APIs, Git</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                    <h3 className="font-semibold text-sm mb-2 text-emerald-600 dark:text-emerald-400">Digital Marketing</h3>
                    <ul className="text-xs sm:text-sm text-black/70 dark:text-white/70 space-y-1">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Meta Ads (Facebook & Instagram campaigns)</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Conversion Rate Optimization (CRO) & Funnel Design</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Pixel Setup, Conversions API (CAPI) & Analytics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <FolderGit2 className="w-5 h-5 text-purple-500" />
                  Key Projects & Portfolios
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base">StyleSphere E-commerce Platform</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Live</span>
                    </div>
                    <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                      High-performance fashion and lifestyle e-commerce platform built for conversion-driven sales.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base">Olive Oil Premium Landing Page</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Live</span>
                    </div>
                    <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                      High-converting sales landing page designed for premium organic olive oil products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Qualifications */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <Award className="w-5 h-5 text-blue-500" />
                  Technical Qualifications
                </h2>
                <div className="space-y-3">
                  {/* Full Stack Web Developer Course */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-blue-500/30 transition-colors">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className="font-bold text-base text-blue-600 dark:text-blue-400">
                          Full Stack Web Developer Course
                        </h3>
                        <span className="w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                        From <span className="font-semibold text-black dark:text-white">Programming Hero</span>
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 self-start sm:self-auto whitespace-nowrap">
                      2025
                    </div>
                  </div>

                  {/* UI/UX Course */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-purple-500/30 transition-colors">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className="font-bold text-base text-blue-600 dark:text-blue-400">
                          UI/UX Course
                        </h3>
                        <span className="w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                        From <span className="font-semibold text-black dark:text-white">Bangladesh Government</span>
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 self-start sm:self-auto whitespace-nowrap">
                      2024
                    </div>
                  </div>

                  {/* E-commerce Training */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-emerald-500/30 transition-colors">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className="font-bold text-base text-blue-600 dark:text-blue-400">
                          E-commerce Training
                        </h3>
                        <span className="w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                        From <span className="font-semibold text-black dark:text-white">e-CAB</span>
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 self-start sm:self-auto whitespace-nowrap">
                      2022
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Qualifications */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <GraduationCap className="w-5 h-5 text-amber-500" />
                  Educational Qualifications
                </h2>
                <div className="space-y-3">
                  {/* BA (Honours) */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-blue-500/30 transition-colors">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className="font-bold text-base text-black dark:text-white">BA (Honours)</h3>
                        <span className="w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          Running
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1 font-medium">
                        Murarichand College, Sylhet
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 self-start sm:self-auto whitespace-nowrap">
                      2024 - Running
                    </div>
                  </div>

                  {/* HSC */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-emerald-500/30 transition-colors">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className="font-bold text-base text-black dark:text-white">HSC (Higher Secondary Certificate)</h3>
                        <span className="w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1 font-medium">
                        Sunamganj Poura College
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 self-start sm:self-auto whitespace-nowrap">
                      2020 - 2023
                    </div>
                  </div>

                  {/* SSC */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-emerald-500/30 transition-colors">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className="font-bold text-base text-black dark:text-white">SSC (Secondary School Certificate)</h3>
                        <span className="w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1 font-medium">
                        Joynagor Bazar Hazi Goni Baksh High School
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 self-start sm:self-auto whitespace-nowrap">
                      2016 - 2020
                    </div>
                  </div>
                </div>
              </div>

              {/* Hobbies & Interests */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Hobbies & Interests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Travelling */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Compass className="w-4 h-4 text-blue-500" />
                      <h3 className="font-bold text-sm text-black dark:text-white">1. Travelling</h3>
                    </div>
                    <p className="text-xs text-black/65 dark:text-white/65 leading-relaxed">
                      Exploring diverse places and landscapes inspires fresh perspectives, fuels creative problem-solving, and keeps the mind refreshed.
                    </p>
                  </div>

                  {/* Reading */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen className="w-4 h-4 text-amber-500" />
                      <h3 className="font-bold text-sm text-black dark:text-white">2. Reading</h3>
                    </div>
                    <p className="text-xs text-black/65 dark:text-white/65 leading-relaxed">
                      Passionate about reading tech literature, UI/UX design articles, and self-growth books to continuously expand depth of knowledge.
                    </p>
                  </div>

                  {/* Coding */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Terminal className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-bold text-sm text-black dark:text-white">3. Coding</h3>
                    </div>
                    <p className="text-xs text-black/65 dark:text-white/65 leading-relaxed">
                      Tinkering with modern web frameworks, developing creative micro-tools, and exploring open-source software as both a craft and passion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div id="resume-modal-footer" className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
              {/* Close Button on the Left */}
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all cursor-pointer active:scale-95"
              >
                Close
              </button>

              {/* Download Button on the Right */}
              <button
                type="button"
                onClick={handleDownload}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
