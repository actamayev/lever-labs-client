"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomPartyPopper: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<g strokeWidth={0} />
			<g strokeLinecap="round" strokeLinejoin="round" />
			<path
				d="m5.571 14.5 3.895 3.914M19 3.61c-1.596-.015-2.334.722-2.576 1.467-.214.657-.019 2-.528 2.996-.487.951-1.776 1.489-3.239 1.534M20 7.61h.01M19 15.96h.01M7 3.95h.01M19 11.11c-1.5 0-2.5.5-3.405 1.435m-5.357-5.357c.762-1.078 1.262-2.078.77-3.66M3.536 20.464 7.07 9.858l7.071 7.071z"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
)

CustomPartyPopper.displayName = "CustomPartyPopper"
