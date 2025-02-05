import * as React from "react"
import { Button, ButtonProps } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/shadcn/utils"

type TactileButtonProps = Omit<ButtonProps, 'variant'> & {
  shadowColor?: string
  shadowHeight?: 2 | 4
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, shadowColor = "rgb(30, 64, 175)", shadowHeight = 2, style, ...props }, ref) => {
    // Shadow classes for different states
    const shadowClass = shadowHeight === 4 
      ? "shadow-[0_4px_0_0_var(--shadow-color)]"
      : "shadow-[0_2px_0_0_var(--shadow-color)]"
    
    // Hover state - reduce shadow height and translate button down
    const hoverClass = shadowHeight === 4 && "hover:shadow-[0_2px_0_0_var(--shadow-color)] hover:translate-y-0.5"
    
    // Active state - remove shadow and complete translation
    const activeShadowClass = shadowHeight === 4
      ? "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-1"
      : "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0.5"

    return (
      <Button 
        ref={ref}
        variant="tactile"
        className={cn(
          "transform transition-all duration-50",
          shadowClass,
          hoverClass,
          "hover:bg-primary/90",
          activeShadowClass,
          className
        )}
        style={{
          ...style,
          '--shadow-color': shadowColor,
        } as React.CSSProperties}
        {...props}
      />
    )
  }
)

TactileButton.displayName = "TactileButton"

export { TactileButton }
export type { TactileButtonProps }
