'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Send, 
  Loader2, 
  Phone, 
  MapPin, 
  Clock, 
  Github, 
  User, 
  Tag, 
  AlignLeft, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles,
  AlertCircle 
} from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submittedName, setSubmittedName] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [dhakaTime, setDhakaTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in GMT+6 (Asia/Dhaka)
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }).format(now);
      setDhakaTime(formattedTime);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setSubmittedName('');
    setIsSuccess(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    const senderName = formData.name.trim();
    const data = {
      name: senderName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      type: 'contact',
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmittedName(senderName);
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        const resData = await response.json().catch(() => ({}));
        setErrorMessage(resData.error || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('A network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black/5 dark:bg-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">Let&apos;s Work Together</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Ready to scale your brand or build your next digital product? Drop me a message below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                <a href="mailto:shamimahmedrobin5@gmail.com" className="flex items-center gap-3 sm:gap-4 text-black/70 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="font-medium text-sm sm:text-base break-all">shamimahmedrobin5@gmail.com</span>
                </a>
                <a href="tel:+8801887353914" className="flex items-center gap-3 sm:gap-4 text-black/70 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">+8801887-353914</span>
                </a>
                <div className="flex items-center gap-3 sm:gap-4 text-black/70 dark:text-white/70">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full glass flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">Sylhet, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 text-black/70 dark:text-white/70">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full glass flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">
                    {dhakaTime ? (
                      <>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 font-bold tracking-wide">
                          {dhakaTime}
                        </span>{' '}
                        (GMT+6:00)
                      </>
                    ) : (
                      'Loading time...'
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-black dark:text-white">Social Profiles</h3>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/shamimahmedrobin', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/shamimahmedrobin', label: 'LinkedIn' },
                  { icon: Facebook, href: 'https://www.facebook.com/shamimahmedrobin2', label: 'Facebook' },
                  { icon: Twitter, href: 'https://x.com/ShamimRobin10', label: 'X (Twitter)' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-black/70 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 glass p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-black dark:text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-black/70 dark:text-white/70 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-black dark:text-white">{submittedName || 'Friend'}</span>! Your message has been delivered directly to my email. I will review it and get back to you shortly.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card Sub-Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-5 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <h3 className="text-base sm:text-lg font-bold text-black dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        Send Me a Message
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-black/60 dark:text-white/60 bg-black/[0.04] dark:bg-white/[0.06] px-3 py-1 rounded-full border border-black/5 dark:border-white/5">
                      Direct Inbox
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Row 1: Name and Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1.5">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="contact-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Shamim Ahmed Robin"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            id="contact-email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="youremail@example.com"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone and Subject */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Phone (Optional) */}
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1.5">
                          Phone / WhatsApp <span className="text-black/40 dark:text-white/40 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            id="contact-phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +880 1887-353914"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1.5">
                          Subject <span className="text-black/40 dark:text-white/40 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
                            <Tag className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="e.g. Project Discussion / Query"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-1.5">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-0 pl-3.5 pointer-events-none text-black/40 dark:text-white/40">
                          <AlignLeft className="w-4 h-4" />
                        </div>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can I help you? Briefly describe your project or question..."
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                        ></textarea>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Send Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
