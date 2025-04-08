"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../../lib/shadcn/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const width = props.value![0]
  const max = props.max || 100 // Default to 100 if not specified
  
  const widthToRender = (): number => {
    // Convert current value to percentage (0-100 scale)
    const percentValue = (width / max) * 100
    
    // Apply the same adjustments but to the percentage value
    if (percentValue < 6) return percentValue + 2.5
    if (percentValue < 10) return percentValue + 2.3
    if (percentValue < 14) return percentValue + 2.1
    if (percentValue < 16) return percentValue + 1.9
    if (percentValue < 21) return percentValue + 1.7
    if (percentValue < 25) return percentValue + 1.5
    if (percentValue < 29) return percentValue + 1.3
    if (percentValue < 33) return percentValue + 1.1
    if (percentValue < 36) return percentValue + 0.9
    if (percentValue < 40) return percentValue + 0.7
    if (percentValue < 43) return percentValue + 0.5
    if (percentValue < 47) return percentValue + 0.3
    if (48 <= percentValue && percentValue <= 52) return percentValue
    if (percentValue > 91) return percentValue - 2.5
    if (percentValue > 88) return percentValue - 2.2
    if (percentValue > 85) return percentValue - 2
    if (percentValue > 81) return percentValue - 1.8
    if (percentValue > 77) return percentValue - 1.6
    if (percentValue > 73) return percentValue - 1.4
    if (percentValue > 70) return percentValue - 1.2
    if (percentValue > 66) return percentValue - 1
    if (percentValue > 62) return percentValue - 0.6
    if (percentValue > 58) return percentValue - 0.55
    if (percentValue > 56) return percentValue - 0.45
    if (percentValue > 53) return percentValue - 0.3
    if (percentValue === 53) return percentValue - 0.2
    return percentValue
  }

  const rangeStyle = {
    width: `${widthToRender()}%`
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-5 w-full grow overflow-hidden rounded-full bg-eel/15">
        {/* Use inline style to force the width */}
        <div 
          className="absolute h-full bg-eel rounded-none" 
          style={rangeStyle}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-5 rounded-full border border-eel bg-background shadow duration-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 z-20"/>
    </SliderPrimitive.Root>
  )
}
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
