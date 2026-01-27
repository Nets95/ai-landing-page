# Developer Quickstart: Footer Component

**Feature**: 004-footer | **Date**: 2026-01-27

## Quick Start

This guide provides step-by-step instructions for implementing the minimal footer component.

---

## Prerequisites

Ensure you have:
- ✅ Node.js 18+ installed
- ✅ Project dependencies installed (`npm install`)
- ✅ Existing sections working (Hero, TechShowcase, Portfolio, Contact)
- ✅ Lucide React icons available

---

## Implementation Steps

### Step 1: Create Footer Component

Create `src/components/sections/Footer.tsx`:

```tsx
'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Technologies', id: 'tech-showcase' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

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
        {/* Navigation Links */}
        <nav className="mb-8" aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
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

        {/* Social Links */}
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

        {/* Copyright */}
        <div className="text-center text-text-muted text-sm">
          <p>© {currentYear} Your Name. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
```

### Step 2: Add Footer to Page

Update `src/app/page.tsx`:

```tsx
import { Hero } from '@/components/sections/Hero';
import { TechShowcase } from '@/components/sections/TechShowcase';
import { Portfolio } from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer'; // ADD THIS

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only...">
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen">
        <Hero />
        <TechShowcase />
        <Portfolio />
        <Contact />
      </main>

      <Footer /> {/* ADD THIS */}
    </>
  );
}
```

### Step 3: Customize Content

Update the following in `Footer.tsx`:

1. **Social Links**: Replace placeholder URLs with your actual profiles
   ```tsx
   const socialLinks = [
     { name: 'GitHub', icon: Github, href: 'https://github.com/YOUR_USERNAME' },
     { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/YOUR_USERNAME' },
     // ...
   ];
   ```

2. **Copyright Name**: Replace "Your Name" with your actual name
   ```tsx
   <p>© {currentYear} Your Actual Name. All rights reserved.</p>
   ```

3. **Optional**: Add/remove social links as needed

---

## Testing Checklist

After implementation, verify:

### Navigation
- [ ] Click "Home" - scrolls to Hero section
- [ ] Click "Technologies" - scrolls to Tech Showcase
- [ ] Click "Portfolio" - scrolls to Portfolio section
- [ ] Click "Contact" - scrolls to Contact section
- [ ] Smooth scroll works (not instant jump)

### Social Links
- [ ] All social icons visible
- [ ] Links open in new tab
- [ ] Hover state changes color
- [ ] Email link opens mail client

### Responsive Design
- [ ] Test on mobile (320px, 375px, 768px)
- [ ] Navigation stacks/wraps properly
- [ ] Social icons remain centered
- [ ] Text readable on all sizes

### Accessibility
- [ ] Tab through all links with keyboard
- [ ] Focus indicators visible
- [ ] Screen reader announces links correctly
- [ ] Semantic HTML structure (footer, nav elements)

### Performance
- [ ] Run `npm run build` - check bundle size
- [ ] No console errors
- [ ] No layout shift when footer loads
- [ ] Smooth scroll completes in <2 seconds

---

## Customization Options

### Add Privacy Policy Link

If you create a privacy policy page later:

```tsx
<div className="text-center text-text-muted text-sm">
  <p>
    © {currentYear} Your Name. All rights reserved.
    {' | '}
    <a
      href="/privacy"
      className="hover:text-accent-sage-light transition-colors"
    >
      Privacy Policy
    </a>
  </p>
</div>
```

### Change Background Color

To make footer more distinct from Contact section:

```tsx
<footer className="... bg-bg-primary"> {/* instead of bg-bg-secondary */}
```

### Add More Social Platforms

```tsx
import { Github, Linkedin, Twitter, Mail, Youtube } from 'lucide-react';

const socialLinks = [
  // ... existing links
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@yourusername' },
];
```

---

## Troubleshooting

### Smooth scroll not working
- Check if section IDs exist: `hero`, `tech-showcase`, `portfolio`, `contact`
- Verify CSS `scroll-behavior: smooth` in globals.css
- Check browser support (works in all modern browsers)

### Social links not opening
- Verify `target="_blank"` and `rel="noopener noreferrer"` present
- Check URLs are valid (include `https://`)

### Focus indicators not visible
- Ensure `focus:ring-2 focus:ring-accent-sage` classes applied
- Check color contrast of focus ring against background
- Test in different browsers

### Layout shift when loading
- Verify footer is outside `<main>` element
- Check no dynamic content loading in footer
- Use fixed heights if needed

---

## Design Tokens Used

The footer reuses existing design tokens:

- **Colors**: `bg-bg-secondary`, `text-secondary`, `text-muted`, `accent-sage-light`
- **Borders**: `border-border-default`
- **Spacing**: `container-padding`, `py-12`, `gap-6`
- **Transitions**: `duration-300` (per Phase 8 specifications)
- **Focus**: `ring-accent-sage` with 2px width

No new styles needed! 🎨

---

## Next Steps

1. ✅ Implement Footer component
2. ✅ Add to page.tsx
3. ✅ Customize content (URLs, name)
4. ✅ Test functionality and responsiveness
5. ✅ Verify accessibility
6. 🚀 Ship it!

---

## Questions?

- Check [spec.md](./spec.md) for requirements
- Review existing section components for patterns
- Test on localhost:3000 before committing
