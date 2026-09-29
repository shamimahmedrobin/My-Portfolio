'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, ZoomIn, ZoomOut } from 'lucide-react';

export function ResumeModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isMobileZoomed, setIsMobileZoomed] = React.useState(false);
  const [photoBase64, setPhotoBase64] = React.useState<string>('/profile.jpg');

  // Preload /profile.jpg into base64 for failsafe PDF rendering
  React.useEffect(() => {
    fetch('/profile.jpg')
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setPhotoBase64(reader.result);
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {});
  }, []);

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

  // Handle download generating an EXACT single-page A4 PDF document using html2canvas-pro + jsPDF
  const handleDownload = async () => {
    if (isDownloading) return;
    try {
      setIsDownloading(true);
      const element = document.getElementById('resume-card-element');
      if (!element) {
        throw new Error('Resume element not found');
      }

      const html2canvasPro = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');

      // Capture exact 794x1123 canvas at 2x resolution
      const canvas = await html2canvasPro(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Fit exactly on 1 single A4 page (210mm x 297mm)
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save('Shamim_Ahmed_Robin_Resume.pdf');
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-root fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="resume-modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="resume-modal-card relative w-full max-w-5xl max-h-[96vh] bg-white dark:bg-[#0c0e14] rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="resume-modal-header flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-black/80 dark:text-white/80">
                  Resume Preview (A4)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile View Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMobileZoomed(!isMobileZoomed)}
                  className="md:hidden px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                  title={isMobileZoomed ? 'Fit to Screen' : 'Zoom 100%'}
                >
                  {isMobileZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Fit Screen</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>100% Zoom</span>
                    </>
                  )}
                </button>

                {/* Print button (without A4) */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 shadow-xs"
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
              className="resume-scroll-area p-2 sm:p-5 overflow-auto flex justify-center bg-slate-200/90 dark:bg-[#06070a]"
            >
              {/* Scaled wrapper for mobile devices to fit screen width cleanly */}
              <div
                className={`transition-all duration-300 flex justify-center ${
                  isMobileZoomed
                    ? 'w-auto'
                    : 'w-full max-w-full overflow-hidden flex justify-center md:w-auto'
                }`}
              >
                <div
                  className={`${
                    isMobileZoomed
                      ? 'transform-none'
                      : 'scale-[0.43] sm:scale-[0.72] md:scale-100 origin-top'
                  }`}
                  style={{
                    height: !isMobileZoomed && typeof window !== 'undefined' && window.innerWidth < 768 ? '490px' : undefined,
                  }}
                >
                  {/* Exact A4 Canvas (794px x 1123px) - Single Page Layout */}
                  <div
                    id="resume-card-element"
                    className="resume-grid-container grid grid-cols-[245px_1fr] bg-white text-gray-900 shadow-2xl rounded-none w-[794px] min-w-[794px] max-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] overflow-hidden shrink-0 border border-gray-300"
                  >
                    {/* Left Column (Deep Navy Blue Sidebar) */}
                    <div className="resume-left-col bg-[#1c355e] text-white p-5 shrink-0 flex flex-col justify-start">
                      {/* Photo with White Border Frame */}
                      <div className="w-28 h-36 mx-auto bg-white p-1 shadow-md rounded-xs overflow-hidden mb-4 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoBase64}
                          alt="Shamim Ahmed Robin"
                          className="w-full h-full object-cover object-top"
                          crossOrigin="anonymous"
                        />
                      </div>

                      {/* CONTACT */}
                      <div className="resume-section mb-4">
                        <h3 className="text-white font-black text-xs tracking-wider uppercase mb-2">
                          CONTACT
                        </h3>
                        <div className="space-y-1.5 text-[11px] text-slate-100 font-medium leading-snug break-all">
                          <p>shamimahmedrobin5@gmail.com</p>
                          <p>+880 1887 353914</p>
                          <p>Sylhet, Bangladesh</p>
                          <p>linkedin.com/in/shamimahmedrobin</p>
                          <p>github.com/shamimahmedrobin</p>
                          <p>shamimahmedrobin.vercel.app</p>
                        </div>
                      </div>

                      {/* SKILLS */}
                      <div className="resume-section mb-4">
                        <h3 className="text-white font-black text-xs tracking-wider uppercase mb-2">
                          SKILLS
                        </h3>
                        <ul className="space-y-1 text-[11px] text-slate-100 leading-snug list-disc pl-3.5 marker:text-white">
                          <li>Next.js, React, TypeScript</li>
                          <li>Tailwind CSS, HTML5, CSS3, JS</li>
                          <li>Node.js, Express, REST APIs</li>
                          <li>Git, GitHub, VS Code, Postman</li>
                          <li>Meta Ads (Facebook & Instagram)</li>
                          <li>CRO & Funnel Design</li>
                          <li>Pixel Setup, CAPI, Analytics</li>
                        </ul>
                      </div>

                      {/* LANGUAGES */}
                      <div className="resume-section mb-4">
                        <h3 className="text-white font-black text-xs tracking-wider uppercase mb-2">
                          LANGUAGES
                        </h3>
                        <div className="space-y-1 text-[11px] text-slate-100 font-medium">
                          <p><span className="font-bold">Bengali:</span> Native</p>
                          <p><span className="font-bold">English:</span> Fluent</p>
                          <p><span className="font-bold">Hindi:</span> Conversational</p>
                        </div>
                      </div>

                      {/* CERTIFICATES */}
                      <div className="resume-section">
                        <h3 className="text-white font-black text-xs tracking-wider uppercase mb-2">
                          CERTIFICATES
                        </h3>
                        <ul className="space-y-1.5 text-[11px] text-slate-100 leading-snug list-disc pl-3.5 marker:text-white">
                          <li>Full Stack Web Developer Course – Programming Hero</li>
                          <li>UI/UX Specialization Course – Bangladesh Government</li>
                          <li>E-commerce Strategy & Operations – e-CAB</li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column (Crisp White Content Area) */}
                    <div className="resume-right-col bg-white text-[#111827] p-6 flex-1 flex flex-col justify-start">
                      {/* Name and Title Header */}
                      <div className="mb-3">
                        <h1 className="resume-header-name text-[28px] leading-tight font-extrabold text-[#1e3a63] tracking-tight">
                          Shamim Ahmed Robin
                        </h1>
                        <p className="text-[13.5px] text-gray-700 font-medium mt-0.5">
                          Web Developer & Digital Marketing Specialist
                        </p>
                        <div className="resume-divider w-full h-[2px] bg-black my-2.5" />
                      </div>

                      {/* SUMMARY */}
                      <div className="resume-section mb-3.5">
                        <h2 className="resume-heading text-black font-extrabold text-xs tracking-wider uppercase mb-1.5">
                          SUMMARY
                        </h2>
                        <p className="text-[11px] text-gray-800 leading-relaxed">
                          Highly motivated <strong className="font-bold text-black">Web Developer & Digital Marketing Specialist</strong> with strong foundations in <strong className="font-bold text-black">modern frontend architecture, full-stack web applications, and performance marketing</strong>. Passionate about building fast, scalable digital products and driving high-converting customer acquisition funnels. Seeking opportunities to apply technical engineering and strategic growth marketing within a dynamic environment.
                        </p>
                      </div>

                      {/* EXPERIENCE (Updated with LinkedIn roles) */}
                      <div className="resume-section mb-3.5">
                        <h2 className="resume-heading text-black font-extrabold text-xs tracking-wider uppercase mb-2">
                          EXPERIENCE
                        </h2>
                        <div className="space-y-3">
                          {/* Experience Item 1: StyleSphere */}
                          <div className="resume-exp-item">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-[12px] text-black">
                                StyleSphere | Founder & Lead Developer
                              </h3>
                              <span className="text-[10.5px] font-semibold text-gray-800">
                                Jul 2024 – Present
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-700 font-medium mb-1">
                              Full-time &bull; Sylhet, Bangladesh (Hybrid) &bull; stylesphere.com.bd
                            </p>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-[10.5px] text-gray-800 leading-normal marker:text-black">
                              <li>Founded StyleSphere, a modern direct-to-consumer (D2C) fashion & lifestyle brand.</li>
                              <li>Architected full-stack e-commerce web platform using Next.js, React, and TypeScript.</li>
                              <li>Leading Search Engine Optimization (SEO), customer funnels, and performance marketing.</li>
                            </ul>
                          </div>

                          {/* Experience Item 2: TrustShopBD */}
                          <div className="resume-exp-item">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-[12px] text-black">
                                TrustShopBD | Social Media Manager
                              </h3>
                              <span className="text-[10.5px] font-semibold text-gray-800">
                                Nov 2022 – Jul 2024
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-700 font-medium mb-1">
                              Part-time &bull; Remote &bull; 3 yrs 9 mos
                            </p>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-[10.5px] text-gray-800 leading-normal marker:text-black">
                              <li>Managed multi-channel social media brand presence, campaign content, and promotions.</li>
                              <li>Handled Customer Relationship Management (CRM) and audience interaction workflows.</li>
                              <li>Drove consistent digital brand growth and customer engagement across key platforms.</li>
                            </ul>
                          </div>

                          {/* Experience Item 3: Fiverr */}
                          <div className="resume-exp-item">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-[12px] text-black">
                                Fiverr | Freelance Graphic Designer
                              </h3>
                              <span className="text-[10.5px] font-semibold text-gray-800">
                                Jan 2020 – May 2024
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-700 font-medium mb-1">
                              Freelance &bull; Remote (International Clients)
                            </p>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-[10.5px] text-gray-800 leading-normal marker:text-black">
                              <li>Created high-converting marketing visuals, digital ad banners, and social creatives.</li>
                              <li>Designed custom brand identity assets and UI graphics using Adobe Photoshop.</li>
                              <li>Maintained top client satisfaction ratings through high-quality visual deliverables.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* EDUCATION */}
                      <div className="resume-section mb-3.5">
                        <h2 className="resume-heading text-black font-extrabold text-xs tracking-wider uppercase mb-1.5">
                          EDUCATION
                        </h2>
                        <div className="space-y-1.5 text-[11px] text-gray-900">
                          <div>
                            <div className="flex justify-between items-baseline">
                              <p className="font-bold text-black text-[11.5px]">Bachelor of Arts (Honours)</p>
                              <span className="text-[10.5px] text-gray-600">2024 – Running</span>
                            </div>
                            <p className="italic text-gray-700 text-[10.5px]">Murarichand College, Sylhet</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-baseline">
                              <p className="font-bold text-black text-[11.5px]">Higher Secondary Certificate (HSC)</p>
                              <span className="text-[10.5px] text-gray-600">2020 – 2023</span>
                            </div>
                            <p className="italic text-gray-700 text-[10.5px]">Sunamganj Poura College — Graduated: 2023</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-baseline">
                              <p className="font-bold text-black text-[11.5px]">Secondary School Certificate (SSC)</p>
                              <span className="text-[10.5px] text-gray-600">2016 – 2020</span>
                            </div>
                            <p className="italic text-gray-700 text-[10.5px]">Joynagor Bazar Hazi Goni Baksh High School — Graduated: 2020</p>
                          </div>
                        </div>
                      </div>

                      {/* HOBBIES & INTERESTS */}
                      <div className="resume-section">
                        <h2 className="resume-heading text-black font-extrabold text-xs tracking-wider uppercase mb-1">
                          HOBBIES & INTERESTS
                        </h2>
                        <div className="text-[10.5px] text-gray-800 leading-snug">
                          <p>
                            <strong className="font-semibold text-black">Travelling:</strong> Exploring new cultures and landscapes. &bull;{' '}
                            <strong className="font-semibold text-black">Reading:</strong> Tech literature, UI/UX, and growth books. &bull;{' '}
                            <strong className="font-semibold text-black">Coding:</strong> Modern web frameworks and open-source tools.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="resume-modal-footer px-4 sm:px-6 py-3 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] flex items-center justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded-full text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
