'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // T004: Smooth scroll handler (reusing pattern from Hero.tsx)
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // T005: Navigation links array
  const navigationLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Technologies', id: 'tech-showcase' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

  // T009: Social links array
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yourusername' },
    { name: 'Email', icon: Mail, href: 'mailto:your@email.com' },
  ];

  return (
    <footer
      className="relative border-t border-border-default bg-bg-secondary"
      role="contentinfo"
    >
      <motion.div
        className="container mx-auto container-padding py-12"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* T006, T007, T014: Navigation Links with ARIA labels and responsive classes */}
        <nav className="mb-8" aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleScrollToSection(link.id)}
                  className="text-text-secondary hover:text-accent-sage-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-sage focus:ring-offset-2 focus:ring-offset-bg-secondary"
                  aria-label={`Navigate to ${link.name} section`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* T010, T013: Social Links with "Connect with me" heading */}
        <div className="mb-8">
          <p className="text-center text-text-muted text-sm mb-4">Connect with me</p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-sage-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-sage focus:ring-offset-2 focus:ring-offset-bg-secondary"
                  aria-label={`Visit ${social.name} profile`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>

        {/* T011, T012: Copyright with dynamic year */}
        <div className="text-center text-text-muted text-sm">
          <p>© {currentYear} Your Name. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
