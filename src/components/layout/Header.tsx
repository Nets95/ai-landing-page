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
              className="text-2xl font-display font-bold text-text-primary hover:text-primary-400 transition-colors"
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
                className="text-text-secondary hover:text-primary-400 transition-colors font-medium"
                aria-label={item.ariaLabel}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden md:flex items-center space-x-4"
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleNavClick('#portfolio')}
              aria-label="View portfolio projects"
            >
              View Projects
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('#contact')}
              aria-label="Get in touch"
            >
              Get in Touch
            </Button>
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
                  className="text-text-secondary hover:text-primary-400 transition-colors font-medium py-2"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleNavClick('#portfolio')}
                  aria-label="View portfolio projects"
                  className="w-full"
                >
                  View Projects
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleNavClick('#contact')}
                  aria-label="Get in touch"
                  className="w-full"
                >
                  Get in Touch
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
