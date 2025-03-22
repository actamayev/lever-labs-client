"use client"

import { ReactNode } from "react";
import { cn } from "@/lib/shadcn/utils";

export const BentoGrid = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) => {
  return (
      <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4 w-full",
          className
      )}>
          {children}
      </div>
  );
};