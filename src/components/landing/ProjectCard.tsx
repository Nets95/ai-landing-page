import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
  featured?: boolean;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  metrics,
  featured,
  index,
}: ProjectCardProps) => {
  const isLarge = featured && index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={cn(
        "group relative",
        isLarge && "md:col-span-2 md:row-span-2"
      )}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full rounded-2xl overflow-hidden glass"
      >
        {/* Image */}
        <div className={cn("relative overflow-hidden", isLarge ? "h-72 md:h-96" : "h-48")}>
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Featured badge */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wide uppercase"
            >
              Featured
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Title */}
          <h3
            className={cn(
              "font-bold text-foreground mb-3 group-hover:text-primary transition-colors",
              isLarge ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2.5 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground">
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-lg font-bold text-primary">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* View details link */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-sm font-medium text-primary"
            whileHover={{ x: 5 }}
          >
            <span>View Details</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-subtle" />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
