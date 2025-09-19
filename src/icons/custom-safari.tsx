

"use client"



import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomSafari: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "none", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={color}
			className={className}
			{...props}
		>
			<g strokeWidth={0} />
			<g strokeLinecap="round" strokeLinejoin="round" />
			<g fill="none" fillRule="evenodd">
				<path
					fill="#00ABFF"
					d="M24 12a12 12 0 0 1-12 12A12 12 0 0 1 0 12a12 12 0 0 1 24 0"
				/>
				<path fill="#FFF" d="m4.452 19.549 8.644-6.452-1.6-2.267z" />
				<path fill="#E00" d="m19.549 4.452-6.453 8.644-1.311-1.311z" />
				<path fill="#FFF" d="m4.452 19.549 6.452-8.645L12 12z" />
				<path fill="#E00" d="m10.904 10.904 8.645-6.452L12 12z" />
			</g>
		</svg>
	)
)

CustomSafari.displayName = "CustomSafari"
