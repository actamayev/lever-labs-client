/* eslint-disable max-len */
"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/shadcn/utils"

interface AnimatedStateButtonProps {
	buttonText: React.ReactNode;
	isDisabled?: boolean;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

const AnimatedStateButton: React.FC<AnimatedStateButtonProps> = ({
	buttonText,
	isDisabled = false,
	className = "",
	onClick,
	type = "button",
}) => {
	const rainbowButtonClasses = cn(
		"group relative inline-flex w-full h-full items-center justify-center rounded-xl border-0 px-8 py-2 font-medium text-primary-foreground transition-all [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
		// Animation and background classes
		"bg-[length:200%]",
		// hover effect
		"hover:opacity-90 hover:brightness-110 hover:scale-[1.02] hover:shadow-lg",
		// before styles
		"before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[length:200%] before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))]",
		// light mode colors
		"bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
		// dark mode colors
		"dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
		// Add cursor-pointer since it's a button
		"cursor-pointer",
		className
	)

	const [isClicked, setIsClicked] = React.useState(false)

	const handleClick = () => {
		if (isDisabled) return
		setIsClicked(true)
		setTimeout(() => setIsClicked(false), 300)
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
					animation: rainbowMove 2s infinite linear;
				}
				
				.rainbow-animate::before {
					animation: rainbowMove 2s infinite linear;
				}
			`}</style>

			<AnimatePresence mode="wait" initial={false}>
				<motion.button
					key="rainbow-button"
					type={type}
					disabled={isDisabled}
					className={cn(rainbowButtonClasses, "rainbow-animate")}
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
					<motion.span
						key="button-text"
						className="relative block font-semibold"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						{buttonText}
					</motion.span>
				</motion.button>
			</AnimatePresence>
		</div>
	)
}

export default AnimatedStateButton
