"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomHorn: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M22.5 1.5A1.504 1.504 0 0 0 19.936.436l-2.044 2.049a12 12 0 0 1-8.485 3.516H3c-1.655 0-3 1.345-3 3v4.5c0 1.655 1.345 3 3 3v6c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5-.67 1.5-1.5V16.5h.408a12 12 0 0 1 8.485 3.516l2.044 2.044c.431.431 1.073.558 1.636.323s.928-.778.928-1.388v-6.919c.872-.413 1.5-1.523 1.5-2.831s-.628-2.419-1.5-2.831zm-3 3.595v12.31A15 15 0 0 0 9.408 13.5H9V9h.408c3.74 0 7.336-1.397 10.092-3.905" />
		</svg>
	)
)

CustomHorn.displayName = "CustomHorn"
