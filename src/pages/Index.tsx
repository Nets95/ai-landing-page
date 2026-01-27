import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import TechSection from "@/components/landing/TechSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navigation />

      <div id="main-content">
        <HeroSection />

        <section id="tech">
          <TechSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Index;
