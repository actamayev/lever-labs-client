"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/shadcn/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  instantTransition?: boolean;
  wordClasses?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  wordClasses,
  instantTransition = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"]
  });

  const lines = text.split('¤'); // Split into lines first
  const processedLines = lines.map(line => line.split(" ")); // Then split each line into words

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className={cn(
        "flex flex-col items-center text-8xl font-bold text-black/20 dark:text-white/20",
        wordClasses
      )}>
        {processedLines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap justify-center">
            {line.map((word, i) => {
              const totalWords = lines.join(" ").split(" ").length;
              const wordsBeforeLine = lines
                .slice(0, lineIndex)
                .join(" ")
                .split(" ").length;
              const wordIndex = wordsBeforeLine + i;
              const start = (wordIndex / totalWords) * 0.5;
              const end = instantTransition 
                ? start + 0.001 
                : start + (1 / totalWords) * 0.5;

              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </div>
        ))}
      </div>
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
