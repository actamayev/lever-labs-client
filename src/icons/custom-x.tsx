"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomX: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M18.244 2.25h3.309l-7.228 8.259 8.503 11.241h-6.656l-5.217-6.816-5.963 6.816H1.678l7.73-8.836L1.256 2.25h6.825l4.711 6.23zm-1.163 17.522h1.833L7.083 4.125H5.114z" />
		</svg>
	)
)

CustomX.displayName = "CustomX"
