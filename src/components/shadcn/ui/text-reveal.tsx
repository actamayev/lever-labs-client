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
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  // Define specific reveal points for each word
  const revealPoints = [0.15, 0.25];

  return (
    <div ref={targetRef} className={cn("relative z-0", className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <p className="flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            // Use predefined reveal points instead of calculating them
            const start = revealPoints[i];
            const end = start + 0.1; // Quick transition over 10% of scroll
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
  const opacity = useTransform(progress, 
    [0, range[0], range[1]], 
    [0, 0, 1]
  );
  
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
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
