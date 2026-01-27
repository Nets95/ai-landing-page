import { motion } from "framer-motion";
import { useState } from "react";
import TechCard from "./TechCard";
import ConnectionLines from "./ConnectionLines";

const technologies = [
  {
    icon: "🤖",
    name: "Claude 3.5 Sonnet",
    description:
      "Production-grade LLM applications with advanced reasoning and multi-turn conversations.",
    level: "expert" as const,
  },
  {
    icon: "✨",
    name: "GPT-4",
    description:
      "Building intelligent agents and complex AI workflows with OpenAI's latest models.",
    level: "expert" as const,
  },
  {
    icon: "🔥",
    name: "PyTorch",
    description: "Deep learning model development, training, and deployment at scale.",
    level: "advanced" as const,
  },
  {
    icon: "🧠",
    name: "TensorFlow",
    description: "Production ML pipelines and model serving infrastructure.",
    level: "advanced" as const,
  },
  {
    icon: "⛓️",
    name: "LangChain",
    description:
      "Building complex LLM applications with chains, agents, and custom tools.",
    level: "expert" as const,
  },
  {
    icon: "🗄️",
    name: "Vector Databases",
    description:
      "Pinecone, Weaviate, and ChromaDB for semantic search and RAG applications.",
    level: "advanced" as const,
  },
  {
    icon: "📡",
    name: "Apache Kafka",
    description: "Real-time data streaming and event-driven architectures.",
    level: "advanced" as const,
  },
  {
    icon: "🐳",
    name: "Docker & Kubernetes",
    description: "Containerization and orchestration for scalable AI deployments.",
    level: "advanced" as const,
  },
  {
    icon: "⚡",
    name: "FastAPI",
    description: "High-performance API development for ML and AI services.",
    level: "expert" as const,
  },
];

const TechSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
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
            Technologies & Expertise
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Cutting-Edge</span>
            <br />
            <span className="text-gradient-primary">AI Stack</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in modern AI technologies and frameworks for building
            intelligent, scalable systems
          </p>
        </motion.div>

        {/* Tech grid with connection lines */}
        <div className="relative">
          <ConnectionLines hoveredCard={hoveredCard} cardCount={technologies.length} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                index={index}
                isHovered={hoveredCard === index}
                onHover={setHoveredCard}
                position={{
                  x: (index % 3) * 33 + 16,
                  y: Math.floor(index / 3) * 33 + 16,
                }}
              />
            ))}
          </div>
        </div>

        {/* Tech count indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <span className="text-sm text-muted-foreground">
            Showing <span className="text-primary font-medium">{technologies.length}</span>{" "}
            technologies
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
