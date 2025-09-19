"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomGarage: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M6.545 17.455h10.91v2.181H6.545zm0-4.364h10.91v2.182H6.545z" />
			<path d="M23.455 6.456 12.546.147a1.09 1.09 0 0 0-1.092 0L.545 6.456A1.09 1.09 0 0 0 0 7.4v15.509C0 23.512.489 24 1.091 24h3.273V12c0-.602.489-1.091 1.091-1.091h13.091A1.09 1.09 0 0 1 19.637 12v12h3.273A1.09 1.09 0 0 0 24 22.909V7.4a1.09 1.09 0 0 0-.545-.944" />
			<path d="M6.545 21.818V24h10.91v-2.182Z" />
		</svg>
	)
)

CustomGarage.displayName = "CustomGarage"
