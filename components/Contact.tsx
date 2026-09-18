'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Mail, Facebook, Linkedin, Twitter, Send, Loader2, Phone, MapPin, Clock, Github } from 'lucide-react';
// import { supabase } from '@/lib/supabase'; // Ready to be used for actual form submission

export function Contact() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
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
        setIsSuccess(true);
        formElement.reset();
        setTimeout(() => setIsSuccess(false), 5000);
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="name" className="text-xs sm:text-sm font-medium text-black/80 dark:text-white/80">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-black dark:text-white text-base sm:text-sm transition-all"
                    placeholder="e.g. Shamim Ahmed Robin"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium text-black/80 dark:text-white/80">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-black dark:text-white text-base sm:text-sm transition-all"
                    placeholder="youremail@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="message" className="text-xs sm:text-sm font-medium text-black/80 dark:text-white/80">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-black dark:text-white text-base sm:text-sm resize-none transition-all"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSuccess ? (
                  'Message Sent Successfully!'
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
