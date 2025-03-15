"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomPalette: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M24 12v.127C23.981 13.838 22.425 15 20.714 15h-4.589a2.25 2.25 0 0 0-2.203 2.714c.098.478.305.938.506 1.402.286.647.567 1.289.567 1.969 0 1.491-1.013 2.845-2.503 2.906q-.245.008-.497.009C5.372 24 0 18.628 0 12S5.372 0 12 0s12 5.372 12 12M6 13.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 1 0 3 0M6 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 1 0 0 3m7.5-4.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 1 0 3 0M18 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 1 0 0 3" />
		</svg>
	)
)

CustomPalette.displayName = "CustomPalette"
