"use client"

import * as React from "react"

import { cn } from "@/lib/shadcn/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xl border-2 border-input bg-transparent px-3 py-1 text-base shadow-none",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "focus-visible:outline-none focus-visible:border-ring", // Changed here
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          "focus-visible:!border-pipTheme",
          "dark:focus-visible:!border-pipThemeOffWhite",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
