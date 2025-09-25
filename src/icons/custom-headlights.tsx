"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomHeadlights: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 192 192"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M120 60a6 6 0 0 1 6-6h54a6 6 0 0 1 0 12h-54a6 6 0 0 1-6-6m60 66h-54a6 6 0 0 0 0 12h54a6 6 0 0 0 0-12m0-48h-54a6 6 0 0 0 0 12h54a6 6 0 0 0 0-12m0 24h-54a6 6 0 0 0 0 12h54a6 6 0 0 0 0-12m-72-54v96a12 12 0 0 1-12 12H66A60 60 0 0 1 6 95.543C6.248 62.715 33.465 36 66.675 36H96a12 12 0 0 1 12 12m-12 0H66.675C40.035 48 18.195 69.367 18 95.633A48 48 0 0 0 66 144h30Z" />
		</svg>
	)
)

CustomHeadlights.displayName = "CustomHeadlights"
