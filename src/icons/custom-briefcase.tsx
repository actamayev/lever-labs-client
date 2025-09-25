"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomBriefcase: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M9.75 1.5A2.25 2.25 0 0 0 7.5 3.75v.75H2.25A2.25 2.25 0 0 0 0 6.75v2.076l11.421 3.045a2.25 2.25 0 0 0 1.158 0L24 8.826V6.75a2.25 2.25 0 0 0-2.25-2.25H16.5v-.75a2.25 2.25 0 0 0-2.25-2.25zm0 1.5h4.5a.75.75 0 0 1 .75.75v.75H9v-.75A.75.75 0 0 1 9.75 3" />
			<path d="M0 18.75A2.25 2.25 0 0 0 2.25 21h19.5A2.25 2.25 0 0 0 24 18.75v-8.475L12.194 13.42a.75.75 0 0 1-.387 0L0 10.275z" />
		</svg>
	)
)

CustomBriefcase.displayName = "CustomBriefcase"
