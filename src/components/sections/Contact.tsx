'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import content from '@/data/content.json';

export default function Contact() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: content.social.github,
      label: 'View my GitHub profile',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: content.social.linkedin,
      label: 'Connect on LinkedIn',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: content.social.twitter,
      label: 'Follow on Twitter',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${content.social.email}`,
      label: 'Send an email',
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 md:py-16 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)', minHeight: '100vh', scrollMarginTop: '100px' }}
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
        className="relative z-10 max-w-7xl mx-auto h-full flex flex-col"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section header - Cyberpunk Neon Style */}
        <motion.div className="text-center mb-10" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading tracking-wide uppercase">
            <span
              className="text-cyan-400"
              style={{
                textShadow: `
                  0 0 10px rgba(34, 211, 238, 0.8),
                  0 0 20px rgba(34, 211, 238, 0.6),
                  0 0 30px rgba(34, 211, 238, 0.4),
                  0 0 40px rgba(6, 182, 212, 0.3)
                `,
              }}
            >
              Let&apos;s Build Something
            </span>
            <br />
            <span
              className="text-magenta-400"
              style={{
                textShadow: `
                  0 0 10px rgba(236, 72, 153, 0.8),
                  0 0 20px rgba(236, 72, 153, 0.6),
                  0 0 30px rgba(236, 72, 153, 0.4)
                `,
              }}
            >
              Amazing Together
            </span>
          </h2>
          <p
            className="text-base text-cyan-300/90 max-w-2xl mx-auto tracking-wide"
            style={{
              textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
            }}
          >
            Have a project in mind? Want to discuss AI opportunities? I&apos;d
            love to hear from you. Drop me a message and I&apos;ll get back to
            you within 24 hours.
          </p>
        </motion.div>

        {/* Contact content - side by side layout - items-stretch for equal heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch flex-1">
          {/* Contact form */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <ContactForm />
          </motion.div>

          {/* Contact information - T045: Refined card styling */}
          <motion.div className="flex flex-col gap-4 h-full" variants={fadeInUp}>
            {/* Contact info card - flex-1 to grow and fill space */}
            <div className="card-minimal p-6 flex-1 flex flex-col">
              <h3
                className="text-xl font-bold text-cyan-400 font-heading mb-5 uppercase tracking-wider text-left"
                style={{
                  textShadow: '0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.4)',
                }}
              >
                Get in Touch
              </h3>

              <div className="space-y-5 flex-1">
                {/* Direct Email */}
                <div className="text-left">
                  <h4
                    className="text-xs font-bold text-cyan-300/70 uppercase tracking-widest mb-2"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
                    }}
                  >
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${content.social.email}`}
                    className="text-sm text-cyan-300 hover:text-cyan-400 transition-all duration-300 inline-flex items-center gap-2 group"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.5)',
                    }}
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="break-all">{content.social.email}</span>
                  </a>
                </div>

                {/* Response Time */}
                <div className="text-left">
                  <h4
                    className="text-xs font-bold text-cyan-300/70 uppercase tracking-widest mb-2"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
                    }}
                  >
                    Response Time
                  </h4>
                  <p
                    className="text-sm text-cyan-300/80 leading-relaxed"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
                    }}
                  >
                    Usually within 24 hours during business days
                  </p>
                </div>

                {/* Available For */}
                <div className="text-left">
                  <h4
                    className="text-xs font-bold text-cyan-300/70 uppercase tracking-widest mb-2"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
                    }}
                  >
                    Available For
                  </h4>
                  <ul
                    className="space-y-2 text-sm text-cyan-300/80"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
                    }}
                  >
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 text-base mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">AI/ML consulting and strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 text-base mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">LLM application development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 text-base mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Full-stack AI integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 text-base mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Technical workshops and talks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="card-minimal p-6 flex-shrink-0">
              <h3
                className="text-lg font-bold text-cyan-400 font-heading mb-4 uppercase tracking-wider text-left"
                style={{
                  textShadow: '0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.4)',
                }}
              >
                Connect on Social
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex items-center justify-start gap-2 p-3 rounded-xl bg-transparent border border-cyan-900/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        boxShadow: '0 0 5px rgba(6, 182, 212, 0.1)',
                      }}
                    >
                      <Icon
                        className="w-5 h-5 flex-shrink-0 text-cyan-300/60 group-hover:text-cyan-400 transition-colors"
                        style={{
                          filter: 'drop-shadow(0 0 3px rgba(103, 232, 249, 0.4))',
                        }}
                      />
                      <span
                        className="text-cyan-300/80 group-hover:text-cyan-300 transition-colors font-medium text-left text-sm"
                        style={{
                          textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
                        }}
                      >
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
