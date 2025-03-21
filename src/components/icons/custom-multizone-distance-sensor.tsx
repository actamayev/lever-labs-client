"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomMultizoneDistanceSensor: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z"
			/>
		</svg>
	)
)

CustomMultizoneDistanceSensor.displayName = "CustomMultizoneDistanceSensor"
