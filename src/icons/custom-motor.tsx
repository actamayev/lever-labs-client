"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomMotor: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M.54.285V.24H.51V.21A.06.06 0 0 0 .45.15H.12a.06.06 0 0 0-.06.06v.21a.06.06 0 0 0 .06.06h.33A.06.06 0 0 0 .51.42V.39h.03V.345h.12v-.06ZM.42.42H.15V.39h.27Zm0-.06H.15V.33h.27Zm0-.06H.15V.27h.27Zm0-.06H.15V.21h.27ZM.09.51h.39v.06H.09Z" />
			<path fill="none" d="M0 0h.72v.72H0z" />
		</svg>
	)
)

CustomMotor.displayName = "CustomMotor"
