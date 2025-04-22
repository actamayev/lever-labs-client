/* eslint-disable max-len */
"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/shadcn/utils"

interface AnimatedStateButtonProps {
	buttonText: React.ReactNode;
	icon?: React.ReactNode; // Changed from LucideIcon to ReactNode
	isDisabled?: boolean;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

const AnimatedStateButton: React.FC<AnimatedStateButtonProps> = ({
	buttonText,
	icon,
	isDisabled = false,
	className = "",
	onClick,
	type = "button",
}) => {
	const rainbowButtonClasses = cn(
		"group relative inline-flex w-full h-full items-center justify-center rounded-xl border-0 px-8 py-2 font-medium text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
		// Animation and background classes
		"bg-[length:200%] brightness-110",
		// hover effect
		"hover:opacity-90 hover:scale-[1.02] hover:shadow-lg",
		// Primary button has both the content background and the rainbow border
		"relative",
		// Add cursor-pointer since it's a button
		"cursor-pointer",
		className
	)

	// Create a separate class for the rainbow border element
	const rainbowBorderClasses = cn(
		"absolute inset-0 rounded-xl -z-10",
		"bg-[length:200%] bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
		"[filter:blur(calc(0.4*1rem))]" // Reduced blur for a tighter effect
	)

	// Inner content that sits on top of the rainbow border
	const buttonContentClasses = cn(
		"absolute inset-[2px] rounded-lg flex items-center justify-center flex-row",
		// light mode colors
		"bg-white",
		// dark mode colors
		"dark:bg-white",
	)

	const [isClicked, setIsClicked] = React.useState(false)

	const handleClick = () => {
		if (isDisabled) return
		setIsClicked(true)
		setTimeout(() => setIsClicked(false), 100)
		if (onClick) onClick()
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
					className={rainbowButtonClasses}
					onClick={handleClick}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						scale: isClicked ? 0.95 : 1
					}}
					exit={{ opacity: 0 }}
					whileTap={{
						scale: 0.95,
						transition: { duration: 0.1 }
					}}
				>
					{/* Rainbow border/glow element */}
					<div className={`${rainbowBorderClasses} rainbow-border`}></div>

					{/* Content container */}
					<div className={buttonContentClasses}>
						<motion.span
							key="button-text"
							className="relative flex items-center gap-2 font-semibold text-black" // Added flex, items-center, and gap-2
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1 }}
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
