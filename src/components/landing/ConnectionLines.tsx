import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ConnectionLinesProps {
  hoveredCard: number | null;
  cardCount: number;
}

const ConnectionLines = ({ hoveredCard, cardCount }: ConnectionLinesProps) => {
  const [lines, setLines] = useState<
    Array<{ x1: number; y1: number; x2: number; y2: number; delay: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLines = () => {
      const cards = document.querySelectorAll("[data-card-id]");
      const newLines: Array<{
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        delay: number;
      }> = [];

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        // Connect to next card in row
        const nextCard = cards[i + 1];
        if (nextCard && (i + 1) % 3 !== 0) {
          const nextRect = nextCard.getBoundingClientRect();
          newLines.push({
            x1: rect.right - containerRect.left,
            y1: rect.top + rect.height / 2 - containerRect.top,
            x2: nextRect.left - containerRect.left,
            y2: nextRect.top + nextRect.height / 2 - containerRect.top,
            delay: i * 0.1,
          });
        }

        // Connect to card below
        const belowCard = cards[i + 3];
        if (belowCard) {
          const belowRect = belowCard.getBoundingClientRect();
          newLines.push({
            x1: rect.left + rect.width / 2 - containerRect.left,
            y1: rect.bottom - containerRect.top,
            x2: belowRect.left + belowRect.width / 2 - containerRect.left,
            y2: belowRect.top - containerRect.top,
            delay: i * 0.1 + 0.05,
          });
        }
      });

      setLines(newLines);
    };

    const timeout = setTimeout(updateLines, 500);
    window.addEventListener("resize", updateLines);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateLines);
    };
  }, [cardCount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(85 20% 55% / 0.4)" />
            <stop offset="50%" stopColor="hsl(180 70% 45% / 0.6)" />
            <stop offset="100%" stopColor="hsl(85 20% 55% / 0.4)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {lines.map((line, i) => (
          <motion.g key={i}>
            {/* Background line */}
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(220 20% 20%)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: line.delay + 0.5 }}
            />
            {/* Animated pulse line */}
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                delay: line.delay + 1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
            {/* Moving dot */}
            <motion.circle
              r="2"
              fill="hsl(180 70% 55%)"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [line.x1, line.x2],
                cy: [line.y1, line.y2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: line.delay + 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default ConnectionLines;
