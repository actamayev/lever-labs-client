"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomInstagram: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37m1.5-4.87h.01" />
		</svg>
	)
)

CustomInstagram.displayName = "CustomInstagram"
