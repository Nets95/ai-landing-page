import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Technologies", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <motion.div
          className="max-w-6xl mx-auto px-6 py-3 rounded-2xl"
          style={{
            backgroundColor: isScrolled
              ? "hsl(220 20% 6% / 0.9)"
              : "transparent",
            backdropFilter: isScrolled ? "blur(20px)" : "none",
            border: isScrolled
              ? "1px solid hsl(220 20% 18% / 0.5)"
              : "1px solid transparent",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="text-xl font-bold"
            >
              <span className="text-gradient-primary">AI</span>
              <span className="text-foreground"> Engineer</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold glow-primary"
              >
                Get in Touch
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl glass"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-card border-l border-border p-6 pt-24"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : 20,
              }}
              transition={{ delay: 0.4 }}
              className="mt-4 w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-primary"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navigation;
