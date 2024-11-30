import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/shadcn/utils";

interface RainbowSubscribeButtonProps {
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  isSubscribed: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const RainbowSubscribeButton: React.FC<RainbowSubscribeButtonProps> = ({
  initialText,
  changeText,
  isSubscribed,
  isDisabled = false,
  isLoading = false,
  className,
}) => {
  const rainbowButtonClasses = cn(
    "group relative inline-flex h-11 animate-rainbow items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
    "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
    "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
    (isDisabled || isLoading) && "opacity-50 cursor-not-allowed",
    !isDisabled && !isLoading && !isSubscribed && "cursor-pointer"
  );

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          type="button"
          disabled={true}
          className="relative flex w-48 items-center justify-center overflow-hidden rounded-xl bg-white p-2.5 outline outline-1 outline-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="subscribed"
            className="relative block h-full w-full font-semibold text-gray-800"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          type="submit"
          disabled={isDisabled || isLoading}
          className={cn(rainbowButtonClasses, "w-48", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="subscribe"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {isLoading ? "Subscribing..." : initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default RainbowSubscribeButton;
