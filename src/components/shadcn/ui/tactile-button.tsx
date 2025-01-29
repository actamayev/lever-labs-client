import * as React from "react"
import { Button, ButtonProps } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/shadcn/utils"

type TactileButtonProps = Omit<ButtonProps, 'variant'> & {
  shadowColor?: string
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, shadowColor = "rgb(30, 64, 175)", ...props }, ref) => {
    // Convert RGB color to CSS-compatible format by removing spaces
    const formattedShadowColor = shadowColor.replace(/\s+/g, '')

    return (
      <Button 
        ref={ref}
        variant="tactile"
        className={cn(
          "transform",
          // Use the formatted shadow color in the shadow classes
          `shadow-[0_2px_0_0_${formattedShadowColor}]`,
          "hover:bg-primary/90",
          "active:translate-y-0.5",
          `active:shadow-[0_0_0_0_${formattedShadowColor}]`,
          className
        )}
        {...props}
      />
    )
  }
)

TactileButton.displayName = "TactileButton"

export { TactileButton }
export type { TactileButtonProps }
