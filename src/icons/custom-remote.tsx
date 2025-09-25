"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomRemote: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="m226-774-56-56q59-62 138.5-96T480-960t171.5 34T790-830l-56 56q-48-50-113.5-78T480-880t-140.5 28T226-774m112 112-56-56q38-38 88.5-60T480-800t109.5 22 88.5 60l-56 56q-27-27-63.5-42.5T480-720t-78.5 15.5T338-662M480 0q-57 0-98.5-41.5T340-140v-322q0-57 41.5-98.5T480-602t98.5 41.5T620-462v322q0 57-41.5 98.5T480 0m0-380q33 0 56.5-23.5T560-460t-23.5-56.5T480-540t-56.5 23.5T400-460t23.5 56.5T480-380" />
		</svg>
	)
)

CustomRemote.displayName = "CustomRemote"
