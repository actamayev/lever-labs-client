"use client"

import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomChrome: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 3 3"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>

			<path
				style={{
					fill: "#188fd1",
				}}
				d="M2.1 1.5a.6.6 0 0 1-.6.6.6.6 0 0 1-.6-.6.6.6 0 0 1 1.2 0"
			/>
			<path
				d="M.255.78a1.44 1.44 0 0 1 2.49 0L1.86.885A.72.72 0 0 0 .78 1.5z"
				style={{
					fill: "#ea3939",
				}}
			/>
			<path
				d="M1.5 2.94A1.44 1.44 0 0 1 .255.78l.525.72a.72.72 0 0 0 1.08.615z"
				style={{
					fill: "#4aae48",
				}}
			/>
			<path
				d="M2.745.78A1.44 1.44 0 0 1 1.5 2.94l.36-.825a.72.72 0 0 0 0-1.23z"
				style={{
					fill: "#fed14b",
				}}
			/>

		</svg>
	)
)

CustomChrome.displayName = "CustomChrome"
