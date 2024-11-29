"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/shadcn/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]  // This makes the animation start as soon as the container enters view
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center w-full">
        <p
          ref={textRef}
          className={cn(
            "flex flex-wrap justify-center p-5 text-2xl font-bold text-black/20 dark:text-white/20",
            "md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          )}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
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
  const opacity = useTransform(progress, range, [0, 1]);
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
