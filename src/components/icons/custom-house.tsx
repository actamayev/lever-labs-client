"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomHouse: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 21.333"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M23.992 10.646c0 .75-.625 1.337-1.333 1.337h-1.333l.029 6.675q0 .17-.021.337v.675c0 .921-.746 1.667-1.667 1.667H19q-.07.001-.137-.004-.087.005-.175.004l-1.355-.004h-1a1.667 1.667 0 0 1-1.667-1.667v-3.667c0-.737-.596-1.333-1.333-1.333h-2.667c-.737 0-1.333.596-1.333 1.333v3.667c0 .921-.746 1.667-1.667 1.667H5.337q-.094-.001-.188-.008-.075.007-.15.008h-.667a1.667 1.667 0 0 1-1.667-1.667V15c0-.037 0-.079.004-.117v-2.904H1.336c-.75 0-1.333-.583-1.333-1.337 0-.375.125-.708.417-1L11.1.333c.292-.292.625-.333.917-.333s.625.083.875.292l10.642 9.354c.333.292.5.625.458 1" />
		</svg>
	)
)

CustomHouse.displayName = "CustomHouse"
