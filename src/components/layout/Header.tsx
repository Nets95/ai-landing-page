'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero', ariaLabel: 'Navigate to Home section' },
  { label: 'Technologies', href: '#tech-showcase', ariaLabel: 'Navigate to Technologies section' },
  { label: 'Portfolio', href: '#portfolio', ariaLabel: 'Navigate to Portfolio section' },
  { label: 'Contact', href: '#contact', ariaLabel: 'Navigate to Contact section' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for header background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    // Special handling for Home - scroll to top
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Header Container - Fixed at top */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-md'
        }`}
        style={{ height: '80px' }}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo / Site Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center"
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-display font-bold neon-text-cyan tracking-wider uppercase transition-all duration-300 hover:scale-105"
              aria-label="Return to top of page"
            >
              AI Engineer
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-medium tracking-wide uppercase text-sm"
                style={{
                  textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
                }}
                aria-label={item.ariaLabel}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Additional Navigation Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#portfolio');
              }}
              className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-medium tracking-wide uppercase text-sm"
              style={{
                textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
              }}
              aria-label="View portfolio projects"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-medium tracking-wide uppercase text-sm"
              style={{
                textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
              }}
              aria-label="Get in touch"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary hover:text-primary-400 transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[80px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl shadow-lg md:hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-medium tracking-wide uppercase text-sm py-2"
                  style={{
                    textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
                  }}
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Additional Navigation Links */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#portfolio');
                  }}
                  className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-medium tracking-wide uppercase text-sm py-2"
                  style={{
                    textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
                  }}
                  aria-label="View portfolio projects"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-medium tracking-wide uppercase text-sm py-2"
                  style={{
                    textShadow: '0 0 5px rgba(103, 232, 249, 0.5), 0 0 10px rgba(103, 232, 249, 0.3)',
                  }}
                  aria-label="Get in touch"
                >
                  Get in Touch
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
