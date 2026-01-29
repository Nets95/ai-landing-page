'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import content from '@/data/content.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // T004: Smooth scroll handler (reusing pattern from Hero.tsx)
  const handleScrollToSection = (sectionId: string) => {
    // Special handling for Home - scroll to top
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
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

  // T009: Social links array - now using centralized content.json
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: content.social.github },
    { name: 'LinkedIn', icon: Linkedin, href: content.social.linkedin },
    { name: 'Twitter', icon: Twitter, href: content.social.twitter },
    { name: 'Email', icon: Mail, href: `mailto:${content.social.email}` },
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
                  className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-bg-secondary"
                  style={{
                    textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
                  }}
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
          <p
            className="text-center text-cyan-300/70 text-sm mb-4 uppercase tracking-wider"
            style={{
              textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
            }}
          >
            Connect with me
          </p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300/60 hover:text-cyan-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-bg-secondary"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(103, 232, 249, 0.5))',
                  }}
                  aria-label={`Visit ${social.name} profile`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>

        {/* T011, T012: Copyright with dynamic year - now using centralized content.json */}
        <div className="text-center text-cyan-300/60 text-sm tracking-wide">
          <p
            style={{
              textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
            }}
          >
            © {currentYear} {content.owner.name}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
