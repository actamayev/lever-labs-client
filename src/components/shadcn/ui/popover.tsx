"use client"

import React, { useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../../../lib/shadcn/utils"

const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    openOnHover?: boolean;
  }
>(({ children, openOnHover = false, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!openOnHover) {
    return (
      <PopoverPrimitive.Root {...props}>
        {children}
      </PopoverPrimitive.Root>
    )
  }
  
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === PopoverTrigger) {
          return React.cloneElement(child as React.ReactElement, {
            onMouseEnter: () => setIsOpen(true),
            onMouseLeave: (e: React.MouseEvent) => {
              // Don't close if moving to the content
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (relatedTarget?.closest('[data-radix-popover-content]')) {
                return;
              }
              setIsOpen(false);
            }
          });
        }
        if (React.isValidElement(child) && child.type === PopoverContent) {
          return React.cloneElement(child as React.ReactElement, {
            onMouseEnter: () => setIsOpen(true),
            onMouseLeave: () => setIsOpen(false),
          });
        }
        return child;
      })}
    </PopoverPrimitive.Root>
  )
});

const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
