/* eslint-disable max-len */
"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/shadcn/utils"

interface AnimatedStateButtonProps {
	buttonText: React.ReactNode
	icon?: React.ReactNode
	isDisabled?: boolean
	className?: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	type?: "button" | "submit" | "reset"
}

// eslint-disable-next-line max-lines-per-function
const AnimatedStateButton: React.FC<AnimatedStateButtonProps> = ({
	buttonText,
	icon,
	isDisabled = false,
	className = "",
	onClick,
	type = "button",
}) => {
	const rainbowButtonClasses = cn(
		"group relative inline-flex w-full h-full items-center justify-center rounded-xl border-0 px-8 py-2 font-medium text-primary-foreground transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
		// Animation and background classes
		"bg-size-[200%] brightness-110",
		// hover effect
		// "hover:opacity-90 hover:scale-[1.02] hover:shadow-lg",
		// Primary button has both the content background and the rainbow border
		"relative",
		// Add cursor-pointer since it's a button
		"cursor-pointer",
		// Add transition duration for tactile effect
		"duration-150",
		className
	)
	const shadowClass = "shadow-[0_4px_0_0_var(--shadow-color)]"

	// Hover state - reduce shadow height and translate button down
	const hoverClass = "hover:shadow-[0_2px_0_0_var(--shadow-color)] hover:translate-y-0.5"

	// Active state - remove shadow and complete translation
	const activeShadowClass = "active:shadow-[0_0px_0_0_var(--shadow-color)] active:translate-y-1"

	// Create a separate class for the rainbow border element
	const rainbowBorderClasses = cn(
		"absolute inset-0 rounded-xl -z-10",
		"bg-size-[200%] bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
		"filter-[blur(calc(0.4*1rem))]" // Reduced blur for a tighter effect
	)

	// Inner content that sits on top of the rainbow border
	const buttonContentClasses = cn(
		"absolute inset-[2px] rounded-lg flex items-center justify-center flex-row",
		// light mode colors
		"bg-white",
		// dark mode colors
		"dark:bg-white",
	)

	// const [isClicked, setIsClicked] = React.useState(false)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (isDisabled) return

		// Call the original onClick handler if provided
		if (onClick) onClick(event)
	}

	return (
		<div className="relative h-full w-full">
			<style jsx global>{`
				@keyframes rainbowMove {
					0% {
						background-position: 0% 0%;
					}
					100% {
						background-position: 200% 0%;
					}
				}
				
				.rainbow-animate {
					animation: rainbowMove 8s infinite linear;
				}
				
				.rainbow-border {
					animation: rainbowMove 8s infinite linear;
				}
			`}</style>

			<AnimatePresence mode="wait" initial={false}>
				<motion.button
					key="rainbow-button"
					type={type}
					disabled={isDisabled}
					className={cn(
						rainbowButtonClasses,
						shadowClass,
						hoverClass,
						activeShadowClass,
					)}
					onClick={handleClick}
					style={{
						"--shadow-color": "rgb(175, 175, 175)",
					} as React.CSSProperties}
				>
					{/* Rainbow border/glow element */}
					<div className={`${rainbowBorderClasses} rainbow-border`}></div>

					{/* Content container */}
					<div className={buttonContentClasses}>
						<motion.span
							key="button-text"
							className="relative flex items-center gap-2 font-semibold text-black"
						>
							{buttonText}
							{icon}
						</motion.span>
					</div>
				</motion.button>
			</AnimatePresence>
		</div>
	)
}

export default AnimatedStateButton
