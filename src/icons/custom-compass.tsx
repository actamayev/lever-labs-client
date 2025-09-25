"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomCompass: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M12 24a12 12 0 1 0 0-24 12 12 0 1 0 0 24m2.377-8.761-6.764 2.602c-.909.352-1.805-.544-1.453-1.453l2.602-6.764c.155-.398.464-.708.862-.862l6.764-2.602c.909-.352 1.805.544 1.453 1.453l-2.602 6.764a1.5 1.5 0 0 1-.862.862M13.5 12a1.5 1.5 0 1 0-3 0 1.5 1.5 0 1 0 3 0" />
		</svg>
	)
)

CustomCompass.displayName = "CustomCompass"
