'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  User,
  Phone,
  Mail,
  Tag,
  AlignLeft,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const DRAFT_KEY = 'hire_me_form_draft';
const TEN_MINUTES_MS = 10 * 60 * 1000; // 10 minutes in milliseconds

export function HireModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [submittedName, setSubmittedName] = React.useState('');
  const [hasRestoredDraft, setHasRestoredDraft] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    details: '',
  });

  // Restore draft from localStorage if within 10 minutes
  const restoreDraft = React.useCallback(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (!saved) {
        setHasRestoredDraft(false);
        return;
      }

      const parsed = JSON.parse(saved);
      if (parsed?.timestamp && Date.now() - parsed.timestamp < TEN_MINUTES_MS) {
        if (parsed.data) {
          const hasContent = Object.values(parsed.data).some(
            (val) => typeof val === 'string' && val.trim().length > 0
          );
          if (hasContent) {
            setFormData(parsed.data);
            setHasRestoredDraft(true);
            return;
          }
        }
      } else {
        // Expired after 10 minutes
        localStorage.removeItem(DRAFT_KEY);
      }
      setHasRestoredDraft(false);
    } catch {
      localStorage.removeItem(DRAFT_KEY);
      setHasRestoredDraft(false);
    }
  }, []);

  // Close modal and cleanly remove #hire from URL
  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#hire') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Open modal and push #hire to URL
  const openModal = React.useCallback(() => {
    setErrorMessage(null);
    setIsSubmitted(false);
    restoreDraft();
    setIsOpen(true);
    if (typeof window !== 'undefined' && window.location.hash !== '#hire') {
      window.history.pushState(null, '', '#hire');
    }
  }, [restoreDraft]);

  React.useEffect(() => {
    const handleOpen = () => {
      openModal();
    };

    const handleHash = () => {
      if (window.location.hash === '#hire') {
        setErrorMessage(null);
        setIsSubmitted(false);
        restoreDraft();
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-hire-modal', handleOpen);
    window.addEventListener('hashchange', handleHash);

    if (window.location.hash === '#hire') {
      setTimeout(() => {
        restoreDraft();
        setIsOpen(true);
      }, 0);
    }

    return () => {
      window.removeEventListener('open-hire-modal', handleOpen);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [openModal, restoreDraft]);

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

  // Lock scroll when modal is open
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({
            data: updated,
            timestamp: Date.now(),
          })
        );
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });
  };

  // Clear Form handler
  const handleClearForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      details: '',
    });
    setErrorMessage(null);
    setHasRestoredDraft(false);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const fullFullName = formData.name.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullFullName,
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          details: formData.details.trim(),
          type: 'hire',
        }),
      });

      if (res.ok) {
        setSubmittedName(fullFullName);
        setIsSubmitted(true);
        setHasRestoredDraft(false);
        // Clean draft on successful send
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {}
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Failed to send inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error sending hire inquiry:', err);
      setErrorMessage('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    handleClearForm();
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[92vh] bg-white dark:bg-[#0e1117] rounded-2xl sm:rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-sm sm:text-base font-bold text-black dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  Hire Me / Project Inquiry
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 sm:p-2 rounded-xl text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-7 overflow-y-auto">
              {isSubmitted ? (
                <div className="py-6 sm:py-8 text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-500/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-black dark:text-white">Inquiry Received!</h4>
                  <p className="text-sm text-black/70 dark:text-white/70 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-black dark:text-white">{submittedName || 'Friend'}</span>! Your full project requirements have been sent to my email. I will review everything and contact you shortly.
                  </p>
                  <div className="pt-3 sm:pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Send Another
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Status Banner / Clear Form Bar - only shown when returning with an existing unsubmitted draft */}
                  {hasRestoredDraft && (
                    <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="truncate max-w-[190px] sm:max-w-none">Auto-saved draft (saved 10m)</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleClearForm}
                        id="hire-clear-form-btn"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 px-2 py-0.5 rounded-lg hover:bg-rose-500/10 active:scale-95 transition-all cursor-pointer shrink-0"
                        title="Clear all fields"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Clear Form
                      </button>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Your Name */}
                  <div>
                    <label htmlFor="hire-name" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="hire-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Shamim Ahmed Robin"
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Your Phone */}
                  <div>
                    <label htmlFor="hire-phone" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                      Your Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="hire-phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +880 1887-353914"
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor="hire-email" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="hire-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. client@example.com"
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="hire-subject" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                        <Tag className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="hire-subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Full-Stack Web Application"
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label htmlFor="hire-details" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                      Details <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-2.5 sm:top-3 left-0 pl-3.5 pointer-events-none text-black/40 dark:text-white/40">
                        <AlignLeft className="w-4 h-4" />
                      </div>
                      <textarea
                        id="hire-details"
                        name="details"
                        required
                        rows={3}
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Briefly describe your project requirements, goals, budget, or timeline..."
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-3.5 px-6 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
