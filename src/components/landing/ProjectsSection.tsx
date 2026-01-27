import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AI-Powered Customer Support Automation",
    description:
      "Enterprise chatbot system using Claude 3.5 Sonnet for handling customer inquiries with 95% accuracy.",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    tags: ["Claude 3.5 Sonnet", "Python", "FastAPI", "Vector DB", "Redis", "Docker"],
    metrics: [
      { label: "Response Time", value: "80% ↓" },
      { label: "Customer Satisfaction", value: "95%" },
    ],
    featured: true,
  },
  {
    title: "Intelligent Document Processing Pipeline",
    description:
      "ML-powered document extraction and classification system processing 10,000+ documents daily.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    tags: ["PyTorch", "Tesseract OCR", "Claude API", "PostgreSQL", "Kafka", "AWS"],
    metrics: [
      { label: "Processing Speed", value: "10K+/day" },
      { label: "Accuracy", value: "98%" },
    ],
    featured: true,
  },
  {
    title: "Real-Time Sentiment Analysis Dashboard",
    description:
      "Analytics platform for monitoring brand sentiment across social media using transformer models.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["BERT", "Python", "Kafka", "Elasticsearch", "React", "D3.js"],
    metrics: [
      { label: "Data Points", value: "1M+ daily" },
      { label: "Response Time", value: "< 2 sec" },
    ],
    featured: false,
  },
  {
    title: "Code Review Assistant",
    description:
      "AI-powered code review tool that identifies bugs, security vulnerabilities, and suggests improvements.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    tags: ["Claude 3.5 Sonnet", "Node.js", "GitHub API", "TypeScript", "Docker"],
    metrics: [
      { label: "Bugs Detected", value: "500+" },
      { label: "Review Time", value: "60% ↓" },
    ],
    featured: true,
  },
];

const ProjectsSection = () => {
  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary tracking-wide uppercase mb-6"
          >
            Featured Projects
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Real-World</span>
            <br />
            <span className="text-gradient-primary">AI Solutions</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering measurable business impact through intelligent automation and
            cutting-edge AI implementations
          </p>
        </motion.div>

        {/* Projects grid - asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* Project count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <span className="text-sm text-muted-foreground">
            Showing <span className="text-primary font-medium">{projects.length}</span>{" "}
            projects
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
