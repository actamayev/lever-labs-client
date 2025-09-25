"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomEngine: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M192 90v36a12 12 0 0 1-12 12h-9.518L144 164.483a11.9 11.9 0 0 1-8.482 3.518H77.483A11.9 11.9 0 0 1 69 164.483L39.517 135A11.9 11.9 0 0 1 36 126.517V111H18v18a6 6 0 0 1-12 0V81a6 6 0 0 1 12 0v18h18V60a12 12 0 0 1 12-12h45V30H75a6 6 0 0 1 0-12h48a6 6 0 0 1 0 12h-18v18h30.517A11.9 11.9 0 0 1 144 51.517L170.483 78H180a12 12 0 0 1 12 12" />
		</svg>
	)
)

CustomEngine.displayName = "CustomEngine"
