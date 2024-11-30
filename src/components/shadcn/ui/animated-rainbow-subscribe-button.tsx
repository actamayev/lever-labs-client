import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/shadcn/utils";

interface AnimatedRainbowSubscribeButtonProps {
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  className?: string;
}

export const AnimatedRainbowSubscribeButton: React.FC<AnimatedRainbowSubscribeButtonProps> = ({
  subscribeStatus,
  initialText,
  changeText,
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      {subscribeStatus ? (
        <motion.button
          className={cn(
            "relative overflow-hidden rounded-md bg-white px-8 py-3",
            "outline outline-1 outline-black",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold text-black"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className={cn(
            "group relative rounded-md px-8 py-3",
            "bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500",
            "overflow-hidden font-semibold text-white",
            // Rainbow border
            "before:absolute before:inset-[1px] before:rounded-[6px] before:bg-black before:transition-all before:duration-300",
            "hover:before:bg-gradient-to-r hover:before:from-orange-500 hover:before:via-purple-500 hover:before:to-blue-500",
            // Inner background
            "after:absolute after:inset-[3px] after:rounded-[4px] after:bg-black after:transition-all after:duration-300",
            "hover:after:opacity-90",
            className
          )}
          type="submit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative z-10 block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
