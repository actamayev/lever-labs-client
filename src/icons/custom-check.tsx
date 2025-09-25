"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomCheck: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="-0.15 -0.21 0.72 0.72"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M0.165 0.292a0.03 0.03 0 0 1 -0.021 -0.009L0.016 0.156A0.03 0.03 0 1 1 0.058 0.113l0.106 0.106L0.355 0.029a0.03 0.03 0 0 1 0.042 0.042L0.186 0.283a0.03 0.03 0 0 1 -0.021 0.009" />
		</svg>
	)
)

CustomCheck.displayName = "CustomCheck"
