"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomFriend: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M7.2 9.6c2.321 0 4.2-1.879 4.2-4.2S9.521 1.2 7.2 1.2 3 3.079 3 5.4s1.879 4.2 4.2 4.2m2.88 1.2h-.311c-.78.375-1.646.6-2.569.6s-1.785-.225-2.569-.6H4.32A4.32 4.32 0 0 0 0 15.12v1.08A1.8 1.8 0 0 0 1.8 18h10.8a1.8 1.8 0 0 0 1.8-1.8v-1.08a4.32 4.32 0 0 0-4.32-4.32M18 9.6c1.987 0 3.6-1.613 3.6-3.6S19.987 2.4 18 2.4 14.4 4.013 14.4 6s1.613 3.6 3.6 3.6m1.8 1.2h-.142c-.521.18-1.073.3-1.657.3s-1.136-.12-1.657-.3H16.2a4.16 4.16 0 0 0-2.089.578A5.5 5.5 0 0 1 15.6 15.12v1.44c0 .083-.019.161-.022.24H22.2A1.8 1.8 0 0 0 24 15c0-2.321-1.879-4.2-4.2-4.2" />
		</svg>
	)
)

CustomFriend.displayName = "CustomFriend"
