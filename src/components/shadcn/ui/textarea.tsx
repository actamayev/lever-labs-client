"use client"

import * as React from "react"

import { cn } from "@/lib/shadcn/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-xl border-2 border-input bg-transparent px-3 py-2 text-base shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring  focus-visible:!border-pipTheme",
          "dark:focus-visible:!border-pipThemeOffWhite disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
