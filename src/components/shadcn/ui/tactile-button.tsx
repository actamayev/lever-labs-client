import * as React from "react"
import { Button, ButtonProps } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/shadcn/utils"

type TactileButtonProps = Omit<ButtonProps, 'variant'> & {
  shadowColor?: string
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, shadowColor = "rgb(30, 64, 175)", style, ...props }, ref) => {
    return (
      <Button 
        ref={ref}
        variant="tactile"
        className={cn(
          "transform",
          "shadow-[0_2px_0_0_var(--shadow-color)]",
          "hover:bg-primary/90",
          "active:translate-y-0.5",
          "active:shadow-[0_0_0_0_var(--shadow-color)]",
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
