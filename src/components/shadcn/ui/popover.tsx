"use client"

import React, { useState, useRef, useEffect } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../../../lib/shadcn/utils"

const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    openOnHover?: boolean;
    hoverDelay?: number;
    closeDelay?: number;
  }
>(({ children, openOnHover = true, hoverDelay = 0, closeDelay = 0, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);
  
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    if (!isOpen && !openTimeoutRef.current) {
      openTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        openTimeoutRef.current = null;
      }, hoverDelay);
    }
  };
  
  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    
    if (isOpen && !closeTimeoutRef.current) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        closeTimeoutRef.current = null;
      }, closeDelay);
    }
  };
  
  if (!openOnHover) {
    return (
      <PopoverPrimitive.Root {...props}>
        {children}
      </PopoverPrimitive.Root>
    )
  }
  
  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
        {children}
      </PopoverPrimitive.Root>
    </div>
  )
});

const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 0, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-2xl border-[3px] border-swan bg-standardBackground px-5 py-5 text-popover-foreground outline-none origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
