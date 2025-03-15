"use client"


/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomSandbox: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "none", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={color}
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<path d="M19.953 8.017l1.047 6.983v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2l1.245 -8.297a2 2 0 0 1 1.977 -1.703h3.778" />
			<path d="M3 15h18" />
			<path d="M13 3l5.5 1.5" />
			<path d="M15.75 3.75l-2 7" />
			<path d="M7 10.5c1.667 -.667 3.333 -.667 5 0c1.667 .667 3.333 .667 5 0" />
		</svg>
	)
)

CustomSandbox.displayName = "CustomSandbox"
