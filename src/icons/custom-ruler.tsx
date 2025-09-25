"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomRuler: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 19.2"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M0 12.6a1.8 1.8 0 0 0 1.8 1.8h20.4a1.8 1.8 0 0 0 1.8-1.8v-6a1.8 1.8 0 0 0-1.8-1.8h-2.4v3c0 .33-.27.6-.6.6s-.6-.27-.6-.6v-3h-2.4v3c0 .33-.27.6-.6.6s-.6-.27-.6-.6v-3h-2.4v3c0 .33-.27.6-.6.6s-.6-.27-.6-.6v-3H9v3c0 .33-.27.6-.6.6s-.6-.27-.6-.6v-3H5.4v3c0 .33-.27.6-.6.6s-.6-.27-.6-.6v-3H1.8A1.8 1.8 0 0 0 0 6.6z" />		</svg>
	)
)

CustomRuler.displayName = "CustomRuler"
