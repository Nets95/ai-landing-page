'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { fadeInUp, staggerChildren } from '@/lib/animations';

export default function Contact() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/yourusername',
      label: 'View my GitHub profile',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/yourusername',
      label: 'Connect on LinkedIn',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/yourusername',
      label: 'Follow on Twitter',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:your@email.com',
      label: 'Send an email',
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* T045: Subtle ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(122, 131, 102, 0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section header - T045: Refined styling */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            <span className="gradient-text-sage-earth">
              Let&apos;s Build Something
            </span>
            <br />
            <span className="text-text-primary">Amazing Together</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have a project in mind? Want to discuss AI opportunities? I&apos;d
            love to hear from you. Drop me a message and I&apos;ll get back to
            you within 24 hours.
          </p>
        </motion.div>

        {/* Contact content - side by side layout - items-stretch for equal heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Contact form */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <ContactForm />
          </motion.div>

          {/* Contact information - T045: Refined card styling */}
          <motion.div className="space-y-8 flex flex-col h-full" variants={fadeInUp}>
            {/* Contact info card */}
            <div className="card-minimal p-8">
              <h3 className="text-2xl font-bold text-text-primary font-heading mb-6">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Direct Email
                  </h4>
                  <a
                    href="mailto:your@email.com"
                    className="text-lg text-text-primary hover:text-accent-sage-light transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    your@email.com
                  </a>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Response Time
                  </h4>
                  <p className="text-text-secondary">
                    Usually within 24 hours during business days
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Available For
                  </h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-start">
                      <span className="text-accent-sage mr-2">•</span>
                      AI/ML consulting and strategy
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-sage mr-2">•</span>
                      LLM application development
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-sage mr-2">•</span>
                      Full-stack AI integrations
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-sage mr-2">•</span>
                      Technical workshops and talks
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="card-minimal p-8">
              <h3 className="text-xl font-bold text-text-primary font-heading mb-6">
                Connect on Social
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex items-center gap-3 p-4 rounded-xl bg-transparent border border-border-default hover:border-border-hover transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-6 h-6 text-text-muted group-hover:text-accent-sage-light transition-colors" />
                      <span className="text-text-secondary group-hover:text-text-primary transition-colors font-medium">
                        {social.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
