"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomUserCircle: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M18.703 18.009A6 6 0 0 0 13.5 15h-3a6 6 0 0 0-5.203 3.009C6.947 19.847 9.338 21 12 21s5.053-1.158 6.703-2.991M0 12a12 12 0 1 1 24 0 12 12 0 1 1-24 0m12 .75A3.375 3.375 0 1 0 12 6a3.375 3.375 0 1 0 0 6.75" />
		</svg>
	)
)

CustomUserCircle.displayName = "CustomUserCircle"
