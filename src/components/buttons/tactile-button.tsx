"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TactileButtonProps = Omit<ButtonProps, "variant"> & {
	shadowColor?: string      // Legacy support - RGB values
	shadowClass?: string      // New approach - Tailwind classes like "shadow-humpback-2"
	shadowHeight?: 2 | 4
	shouldHoverPushButton?: boolean
	disableOpacityOnDisabled?: boolean  // Control whether disabled state reduces opacity
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
	({ className, shadowColor, shadowClass, shadowHeight = 4, style,
		// eslint-disable-next-line complexity
		shouldHoverPushButton = true, disableOpacityOnDisabled = true, ...props }, ref): React.ReactNode => {

		// Determine which shadow approach to use
		const useNewSystem = shadowClass && !shadowColor

		if (useNewSystem) {
			// NEW SYSTEM: Use Tailwind color variables with arbitrary shadows
			// Extract color variable from shadow class (e.g., "shadow-humpback-2" -> "humpback-2")
			const colorVar = shadowClass.replace("shadow-", "")

			// Create consistent shadow system using arbitrary values (like legacy)
			const baseShadowClass = shadowHeight === 4
				? "shadow-[0_4px_0_0_var(--shadow-color)]"
				: "shadow-[0_2px_0_0_var(--shadow-color)]"

			const hoverClass =
				shadowHeight === 4 &&
				shouldHoverPushButton &&
				"hover:shadow-[0_2px_0_0_var(--shadow-color)] hover:translate-y-0.5"

			const activeShadowClass = shadowHeight === 4
				? "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-1"
				: "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0.5"

			return (
				<Button
					ref={ref}
					variant="tactile"
					className={cn(
						"duration-150",
						baseShadowClass,
						hoverClass,
						activeShadowClass,
						!disableOpacityOnDisabled && "disabled:opacity-100",
						className
					)}
					style={{
						...style,
						"--shadow-color": `rgb(var(--${colorVar}))`,
					} as React.CSSProperties}
					{...props}
				/>
			)
		} else {
			// LEGACY SYSTEM: Use RGB shadow colors (backward compatibility)
			const legacyShadowClass = shadowHeight === 4
				? "shadow-[0_4px_0_0_var(--shadow-color)]"
				: "shadow-[0_2px_0_0_var(--shadow-color)]"

			const hoverClass = shadowHeight === 4 && "hover:shadow-[0_2px_0_0_var(--shadow-color)] hover:translate-y-0.5"

			const activeShadowClass = shadowHeight === 4
				? "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-1"
				: "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0.5"

			return (
				<Button
					ref={ref}
					variant="tactile"
					className={cn(
						"duration-150",
						legacyShadowClass,
						hoverClass,
						activeShadowClass,
						!disableOpacityOnDisabled && "disabled:opacity-100",
						className
					)}
					style={{
						...style,
						"--shadow-color": shadowColor || "rgb(30, 64, 175)",
					} as React.CSSProperties}
					{...props}
				/>
			)
		}
	}
)

TactileButton.displayName = "TactileButton"

export { TactileButton }
