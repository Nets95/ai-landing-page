import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechCardProps {
  icon: string;
  name: string;
  description: string;
  level: "expert" | "advanced";
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  position: { x: number; y: number };
}

const TechCard = ({
  icon,
  name,
  description,
  level,
  index,
  isHovered,
  onHover,
  position,
}: TechCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative group"
      data-card-id={index}
      data-position-x={position.x}
      data-position-y={position.y}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative h-full p-6 rounded-2xl glass transition-all duration-500",
          isHovered && "glow-subtle"
        )}
      >
        {/* Gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, hsl(85 20% 55% / 0.3) 0%, hsl(180 70% 45% / 0.2) 100%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{icon}</span>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase",
                level === "expert"
                  ? "bg-primary/20 text-primary"
                  : "bg-accent/20 text-accent"
              )}
            >
              {level}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Connection node */}
        <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-primary/50 transform translate-x-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-accent/50 transform -translate-x-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
};

export default TechCard;
