"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomInfinity: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M0 9.041a5.443 5.443 0 0 1 9.288-3.847l2.711 2.708 2.708-2.708A5.442 5.442 0 0 1 24 9.041v1.114a5.444 5.444 0 0 1-5.441 5.445 5.44 5.44 0 0 1-3.847-1.594L12 11.299l-2.708 2.708A5.445 5.445 0 0 1 0 10.159V9.045zm10.301.559L7.593 6.892A3.04 3.04 0 0 0 2.4 9.041v1.114a3.04 3.04 0 0 0 5.193 2.149zm3.394 0 2.708 2.708a3.04 3.04 0 0 0 5.193-2.149V9.045a3.04 3.04 0 0 0-5.193-2.149L13.699 9.6z" />
		</svg>
	)
)

CustomInfinity.displayName = "CustomInfinity"
