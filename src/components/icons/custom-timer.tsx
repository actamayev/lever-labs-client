"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomTimer: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 0.72 0.72"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path
				fillRule="evenodd"
				d="M.24.09A.03.03 0 0 1 .27.06h.18a.03.03 0 1 1 0 .06H.27A.03.03 0 0 1 .24.09M.09.42A.27.27 0 0 1 .529.209l.02-.02a.03.03 0 1 1 .042.042l-.02.02A.27.27 0 1 1 .09.42M.39.3a.03.03 0 1 0-.06 0v.12a.03.03 0 1 0 .06 0z"
				clipRule="evenodd"
			/>
		</svg>
	)
)

CustomTimer.displayName = "CustomTimer"
