
"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomConditional: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 0.96 0.96"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M.775.334.931.178.777.025.749.053.855.16H.56v.32H.318a.14.14 0 1 0 0 .04H.44V.8h.412L.746.906l.028.028L.93.778.777.625.749.653.855.76H.48V.52H.6V.2h.252L.746.306zM.18.6a.1.1 0 1 1 .1-.1.1.1 0 0 1-.1.1" />
			<path fill="none" d="M0 0h.96v.96H0z" />
		</svg>
	)
)

CustomConditional.displayName = "CustomConditional"
