"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/shadcn/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  instantTransition?: boolean; // New prop to control transition style
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  instantTransition = false, // Default to gradual transition
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <p className={cn(
        "flex flex-wrap justify-center text-8xl font-bold text-black/20 dark:text-white/20"
      )}>
        {words.map((word, i) => {
          const start = (i / words.length) * 0.5;
          // If instant transition, make the range tiny, otherwise use normal range
          const end = instantTransition 
            ? start + 0.001 
            : start + (1 / words.length) * 0.5;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(
    progress, 
    [range[0], range[1]], 
    [0, 1],
    { clamp: true }
  );

  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity }}
        className="text-black dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
