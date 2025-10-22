"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../../lib/shadcn/utils"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  size?: number;
  roundLevel?: string
  thumbWidth?: number
  thumbHeight?: number
  unFilledTrackColor?: string
  filledTrackColor?: string
  thumbBorderColor?: string
  thumbDetails?: React.ReactNode
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size = 20, roundLevel = "rounded-full", thumbWidth = 20, thumbHeight = 20,
  unFilledTrackColor = "bg-eel/15", filledTrackColor = "bg-eel", thumbBorderColor = "border-eel", thumbDetails, ...props }, ref) => {
  const value = props.value![0]
  const max = props.max || 100 // Default to 100 if not specified
  const isVertical = props.orientation === "vertical"
  
  const valueToRender = (): number => {
    // Convert current value to percentage (0-100 scale)
    const percentValue = (value / max) * 100
    
    // Apply the same adjustments to the percentage value
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

  const rangeStyle = isVertical 
    ? { height: `${valueToRender()}%`, backgroundColor: "" } 
    : { width: `${valueToRender()}%`, backgroundColor: "" };

  // Size-based styles
  const trackStyle = {
    width: isVertical ? `${size}px` : '100%',
    height: isVertical ? '100%' : `${size}px`,
  };

  const thumbSize = {
    width: `${thumbWidth}px`,
    height: `${thumbHeight}px`,
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex touch-none select-none",
        isVertical 
          ? "h-full flex-col items-center" 
          : "w-full items-center",
        className
      )}
      style={{ width: isVertical ? `${size}px` : '100%' }}
      {...props}
    >
      <SliderPrimitive.Track 
        className={cn(
          "relative overflow-hidden grow", 
          roundLevel,
          unFilledTrackColor
        )}
        style={trackStyle}
      >
        {/* Fill element */}
        <div 
          className={cn(
            "absolute rounded-none",
            filledTrackColor,
            isVertical 
              ? "w-full bottom-0" 
              : "h-full"
          )}
          style={rangeStyle}
        />
      </SliderPrimitive.Track>
      
      {/* Modified thumb with the three lines */}
      <SliderPrimitive.Thumb 
        className={cn(
          "block border bg-background shadow-sm duration-0 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 z-20",
          thumbBorderColor,
          roundLevel,
          "flex flex-col items-center justify-center"
        )}
        style={thumbSize}
      >
        {thumbDetails}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
