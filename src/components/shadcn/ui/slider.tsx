"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../../lib/shadcn/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const width = props.value![0]
  const widthToRender = (): number => {
    if (width < 6) return width + 2.5
    if (width < 10) return width + 2.3
    if (width < 14) return width + 2.1
    if (width < 16) return width + 1.9
    if (width < 21) return width + 1.7
    if (width < 25) return width + 1.5
    if (width < 29) return width + 1.3
    if (width < 33) return width + 1.1
    if (width < 36) return width + 0.9
    if (width < 40) return width + 0.7
    if (width < 43) return width + 0.5
    if (width < 47) return width + 0.3
    if (48 <= width && width <= 52) return width
    if (width > 91) return width - 2.5
    if (width > 88) return width - 2.2
    if (width > 85) return width - 2
    if (width > 81) return width - 1.8
    if (width > 77) return width - 1.6
    if (width > 73) return width - 1.4
    if (width > 70) return width - 1.2
    if (width > 66) return width - 1
    if (width > 62) return width - 0.6
    if (width > 58) return width - 0.55
    if (width > 56) return width - 0.45
    if (width > 53) return width - 0.3
    if (width === 53) return width - 0.2
    return width
  }
  const rangeStyle = {
    width: `${widthToRender()}%`
  };

  // console.log(props)
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden rounded-full bg-eel/15">
        {/* Use inline style to force the width */}
        <div 
          className="absolute h-full bg-eel rounded-none" 
          style={rangeStyle}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-eel bg-background shadow transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 z-20"/>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
