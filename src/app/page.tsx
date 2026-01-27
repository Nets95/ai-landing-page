import { Hero } from '@/components/sections/Hero';
import { TechShowcase } from '@/components/sections/TechShowcase';
import { Portfolio } from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-primary-start focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-start focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Technology Showcase Section */}
        <TechShowcase />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Contact Section */}
        <Contact />
      </main>
    </>
  );
}
