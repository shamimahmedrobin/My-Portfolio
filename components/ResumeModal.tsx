'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer } from 'lucide-react';

export function ResumeModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

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

  // Handle print using device native print system
  const handlePrint = () => {
    window.print();
  };

  // Handle download generating an A4 PDF document
  const handleDownload = async () => {
    if (isDownloading) return;
    try {
      setIsDownloading(true);
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      const element = document.getElementById('resume-printable-area');
      if (!element) {
        window.print();
        return;
      }

      const opt = {
        margin: [0, 0, 0, 0] as [number, number, number, number],
        filename: 'Shamim_Ahmed_Robin_Resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc: Document) => {
            clonedDoc.documentElement.classList.remove('dark');
            const container = clonedDoc.querySelector('.resume-grid-container') as HTMLElement;
            if (container) {
              container.style.display = 'grid';
              container.style.gridTemplateColumns = '260px 1fr';
              container.style.width = '794px';
              container.style.minHeight = '1123px';
              container.style.margin = '0 auto';
              container.style.backgroundColor = '#ffffff';
              container.style.borderRadius = '0';
              container.style.boxShadow = 'none';
            }
            const leftCol = clonedDoc.querySelector('.resume-left-col') as HTMLElement;
            if (leftCol) {
              leftCol.style.backgroundColor = '#1c355e';
              leftCol.style.color = '#ffffff';
              leftCol.style.width = '260px';
            }
            const rightCol = clonedDoc.querySelector('.resume-right-col') as HTMLElement;
            if (rightCol) {
              rightCol.style.backgroundColor = '#ffffff';
              rightCol.style.color = '#111827';
            }
          },
        },
        jsPDF: {
          unit: 'mm' as const,
          format: 'a4' as const,
          orientation: 'portrait' as const,
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF download error:', err);
      // Fallback to native print system where user can also save as PDF
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-root fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="resume-modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="resume-modal-card relative w-full max-w-4xl max-h-[94vh] bg-white dark:bg-[#0c0e14] rounded-2xl sm:rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="resume-modal-header flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-black/80 dark:text-white/80">
                  Resume Preview
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Print button (without A4) */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 shadow-xs"
                  title="Open Device Print System"
                >
                  <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="p-1.5 sm:p-2 rounded-xl text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content (Scrollable & Printable Area) */}
            <div
              id="resume-printable-area"
              className="resume-scroll-area p-2 sm:p-6 overflow-y-auto bg-slate-100 dark:bg-[#08090d]"
            >
              {/* Modern 2-Column CV Format matching user uploaded design */}
              <div className="resume-grid-container flex flex-col md:grid md:grid-cols-[250px_1fr] bg-white text-gray-900 shadow-xl rounded-xl overflow-hidden max-w-[800px] mx-auto border border-gray-200">
                {/* Left Column (Deep Navy Blue Sidebar) */}
                <div className="resume-left-col bg-[#1c355e] text-white p-6 sm:p-7 shrink-0 flex flex-col justify-start">
                  {/* Photo with White Border Frame */}
                  <div className="w-36 h-44 sm:w-40 sm:h-48 mx-auto bg-white p-1.5 shadow-md rounded-xs overflow-hidden mb-6 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/profile.jpg"
                      alt="Shamim Ahmed Robin"
                      className="w-full h-full object-cover object-top"
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* CONTACT */}
                  <div className="resume-section mb-6">
                    <h3 className="text-white font-black text-sm tracking-wider uppercase mb-3">
                      CONTACT
                    </h3>
                    <div className="space-y-2 text-xs sm:text-[13px] text-white/90 leading-snug">
                      <p className="break-all font-medium">shamimahmedrobin5@gmail.com</p>
                      <p className="font-medium">+880 1887 353914</p>
                      <p className="font-medium">Sylhet, Bangladesh</p>
                      <p className="break-all font-medium">linkedin.com/in/shamimahmedrobin</p>
                      <p className="break-all font-medium">github.com/shamimahmedrobin</p>
                      <p className="break-all font-medium">shamimahmedrobin.vercel.app</p>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="resume-section mb-6">
                    <h3 className="text-white font-black text-sm tracking-wider uppercase mb-3">
                      SKILLS
                    </h3>
                    <ul className="space-y-1.5 text-xs sm:text-[13px] text-white/90 leading-snug list-disc pl-4 marker:text-white">
                      <li>Next.js, React, TypeScript</li>
                      <li>HTML5, CSS3, JavaScript</li>
                      <li>Tailwind CSS, Responsive UI</li>
                      <li>Node.js, Express, REST APIs</li>
                      <li>Git, GitHub, VS Code, Postman</li>
                      <li>Meta Ads (Facebook & Instagram)</li>
                      <li>CRO & Funnel Design</li>
                      <li>Pixel Setup, CAPI, Analytics</li>
                    </ul>
                  </div>

                  {/* LANGUAGES */}
                  <div className="resume-section mb-6">
                    <h3 className="text-white font-black text-sm tracking-wider uppercase mb-3">
                      LANGUAGES
                    </h3>
                    <div className="space-y-1.5 text-xs sm:text-[13px] text-white/90">
                      <p><span className="font-bold">Bengali:</span> Native</p>
                      <p><span className="font-bold">English:</span> Fluent</p>
                      <p><span className="font-bold">Hindi:</span> Conversational</p>
                    </div>
                  </div>

                  {/* CERTIFICATES */}
                  <div className="resume-section">
                    <h3 className="text-white font-black text-sm tracking-wider uppercase mb-3">
                      CERTIFICATES
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-white/90 leading-snug list-disc pl-4 marker:text-white">
                      <li>Full Stack Web Developer Course – Programming Hero</li>
                      <li>UI/UX Specialization Course – Bangladesh Government</li>
                      <li>E-commerce Training & Operations – e-CAB</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column (Crisp White Content Area) */}
                <div className="resume-right-col bg-white text-[#111827] p-6 sm:p-8 md:p-9 flex-1 flex flex-col justify-start">
                  {/* Name and Title Header */}
                  <div className="mb-4">
                    <h1 className="resume-header-name text-3xl sm:text-4xl font-extrabold text-[#1e3a63] tracking-tight">
                      Shamim Ahmed Robin
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 font-medium mt-1">
                      Web Developer & Digital Marketing Specialist
                    </p>
                    <div className="resume-divider w-full h-[2.5px] bg-black mt-3 mb-5" />
                  </div>

                  {/* SUMMARY */}
                  <div className="resume-section mb-6">
                    <h2 className="resume-heading text-black font-extrabold text-sm sm:text-base tracking-wider uppercase mb-2">
                      SUMMARY
                    </h2>
                    <p className="text-xs sm:text-[13px] text-gray-800 leading-relaxed">
                      Highly motivated <strong className="font-bold text-black">Web Developer & Digital Marketing Specialist</strong> with strong foundations in <strong className="font-bold text-black">modern frontend architecture, full-stack web applications, and performance marketing</strong>. Passionate about coding, problem-solving, and building scalable digital products. Seeking opportunities to apply technical engineering and strategic growth marketing within a dynamic development environment.
                    </p>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="resume-section mb-6">
                    <h2 className="resume-heading text-black font-extrabold text-sm sm:text-base tracking-wider uppercase mb-3">
                      EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                      {/* Experience Item 1 */}
                      <div className="resume-exp-item">
                        <h3 className="font-bold text-xs sm:text-[14px] text-black">
                          StyleSphere | Full Stack E-commerce Platform
                        </h3>
                        <p className="text-xs text-black font-semibold mb-1.5">
                          Lead Web Developer | 2024 - 2025
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs sm:text-[12.5px] text-gray-800 leading-relaxed marker:text-black">
                          <li>Developed a high-performance fashion and lifestyle e-commerce platform using Next.js 15, React, and TypeScript.</li>
                          <li>Built responsive catalog filtering, interactive cart state, and optimized checkout funnel.</li>
                          <li>Enhanced performance and Core Web Vitals, achieving 95+ score and reducing initial load time by 40%.</li>
                          <li>Integrated analytics and event attribution to monitor conversion rates and user retention.</li>
                        </ul>
                      </div>

                      {/* Experience Item 2 */}
                      <div className="resume-exp-item">
                        <h3 className="font-bold text-xs sm:text-[14px] text-black">
                          Olive Oil Premium | High-Converting Landing Page
                        </h3>
                        <p className="text-xs text-black font-semibold mb-1.5">
                          Web Developer & CRO Specialist | 2024
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs sm:text-[12.5px] text-gray-800 leading-relaxed marker:text-black">
                          <li>Designed and built a high-converting sales landing page for premium organic olive oil products.</li>
                          <li>Created conversion-driven UI components, interactive product showcases, and mobile-first layouts.</li>
                          <li>Configured Meta Pixel and Conversions API (CAPI) for precise campaign attribution.</li>
                          <li>Increased mobile conversion rate by 32% through data-driven A/B testing and performance tuning.</li>
                        </ul>
                      </div>

                      {/* Experience Item 3 */}
                      <div className="resume-exp-item">
                        <h3 className="font-bold text-xs sm:text-[14px] text-black">
                          Freelance Web & Digital Marketing
                        </h3>
                        <p className="text-xs text-black font-semibold mb-1.5">
                          Web Developer & Digital Strategist | 2023 - Present
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs sm:text-[12.5px] text-gray-800 leading-relaxed marker:text-black">
                          <li>Delivered custom modern web applications and responsive landing pages tailored for business growth.</li>
                          <li>Managed Meta Ads campaigns (Facebook & Instagram), executing audience testing and CRO strategies.</li>
                          <li>Automated reporting pipelines and campaign monitoring, consistently achieving positive ROAS.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* EDUCATION */}
                  <div className="resume-section mb-5">
                    <h2 className="resume-heading text-black font-extrabold text-sm sm:text-base tracking-wider uppercase mb-2.5">
                      EDUCATION
                    </h2>
                    <div className="space-y-3 text-xs sm:text-[13px] text-gray-900">
                      <div>
                        <p className="font-bold text-black">Bachelor of Arts (Honours)</p>
                        <p className="italic text-gray-700">Murarichand College, Sylhet — 2024 – Present (Running)</p>
                      </div>
                      <div>
                        <p className="font-bold text-black">Higher Secondary Certificate (HSC)</p>
                        <p className="italic text-gray-700">Sunamganj Poura College — 2020 – 2023</p>
                        <p className="text-gray-600 text-[11px]">Graduated: 2023</p>
                      </div>
                      <div>
                        <p className="font-bold text-black">Secondary School Certificate (SSC)</p>
                        <p className="italic text-gray-700">Joynagor Bazar Hazi Goni Baksh High School — 2016 – 2020</p>
                        <p className="text-gray-600 text-[11px]">Graduated: 2020</p>
                      </div>
                    </div>
                  </div>

                  {/* HOBBIES & INTERESTS */}
                  <div className="resume-section">
                    <h2 className="resume-heading text-black font-extrabold text-sm sm:text-base tracking-wider uppercase mb-2">
                      HOBBIES & INTERESTS
                    </h2>
                    <div className="text-xs sm:text-[12.5px] text-gray-800 space-y-1">
                      <p><strong className="font-semibold text-black">Travelling:</strong> Exploring new landscapes and cultures fuels creative problem-solving.</p>
                      <p><strong className="font-semibold text-black">Reading:</strong> Passionate about tech literature, UI/UX articles, and self-growth.</p>
                      <p><strong className="font-semibold text-black">Coding:</strong> Tinkering with modern frameworks, micro-tools, and open-source software.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="resume-modal-footer px-6 py-4 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] flex items-center justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>

              {/* Download button (without A4) */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                title="Download Resume in PDF format"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Downloading PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
