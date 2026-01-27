'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  // T048: Muted confetti animation with prefers-reduced-motion support
  const triggerConfetti = () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return; // Skip animation if user prefers reduced motion
    }

    // Fire muted confetti with earth-tone colors
    const count = 100; // Reduced from 200 for subtlety
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
      colors: ['#8FA88F', '#C9B8A8', '#9AA184', '#A89383', '#7A8366'], // Muted earth tones
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.3, {
      spread: 30,
      startVelocity: 40, // Reduced velocity
    });

    fire(0.2, {
      spread: 50,
    });

    fire(0.3, {
      spread: 80,
      decay: 0.91,
      scalar: 0.7, // Smaller particles
    });

    fire(0.2, {
      spread: 100,
      startVelocity: 20,
      decay: 0.92,
      scalar: 0.9,
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      setSubmissionState('success');
      reset();

      // Trigger confetti animation on success
      triggerConfetti();

      // Reset success state after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmissionState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className="card-minimal p-8">
      <AnimatePresence mode="wait">
        {submissionState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0.9, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.9, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center py-12"
          >
            {/* T048: Muted success state */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-sage/20 border border-accent-sage/30 mb-6"
            >
              <CheckCircle className="w-8 h-8 text-accent-sage-light" />
            </motion.div>
            <h3 className="text-2xl font-bold text-text-primary font-heading mb-3">
              Message Sent Successfully!
            </h3>
            <p className="text-text-secondary mb-6">
              Thank you for reaching out. I&apos;ll get back to you within 24
              hours.
            </p>
            <Button
              variant="secondary"
              onClick={() => setSubmissionState('idle')}
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                disabled={submissionState === 'submitting'}
                className="input"
                placeholder="Your full name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <motion.p
                  id="name-error"
                  initial={{ opacity: 0.9, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-semantic-error flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                disabled={submissionState === 'submitting'}
                className="input"
                placeholder="your@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0.9, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-semantic-error flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Inquiry type field */}
            <div>
              <label
                htmlFor="inquiryType"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Inquiry Type
              </label>
              <select
                {...register('inquiryType')}
                id="inquiryType"
                disabled={submissionState === 'submitting'}
                className="input"
                aria-describedby={
                  errors.inquiryType ? 'inquiryType-error' : undefined
                }
              >
                <option value="">Select an option</option>
                <option value="consultation">Consultation</option>
                <option value="project">Project Collaboration</option>
                <option value="general">General Inquiry</option>
              </select>
              {errors.inquiryType && (
                <motion.p
                  id="inquiryType-error"
                  initial={{ opacity: 0.9, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-semantic-error flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.inquiryType.message}
                </motion.p>
              )}
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Message *
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                disabled={submissionState === 'submitting'}
                className="input resize-none"
                placeholder="Tell me about your project or inquiry..."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <motion.p
                  id="message-error"
                  initial={{ opacity: 0.9, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-semantic-error flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            {/* Error message */}
            {submissionState === 'error' && errorMessage && (
              <motion.div
                initial={{ opacity: 0.9, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-semantic-error/10 border border-semantic-error/20 rounded-lg"
                role="alert"
              >
                <p className="text-sm text-semantic-error flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </p>
              </motion.div>
            )}

            {/* T046: Submit button styling consistent with hero CTAs */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={submissionState === 'submitting'}
              className="w-full"
            >
              {submissionState === 'submitting' ? (
                <>
                  <Loader2
                    className="w-5 h-5 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" aria-hidden="true" />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
