/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomMaze: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 9.9 9.9"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M2.075 6.9a.45.45 0 1 0 0 .9H4.95a.45.45 0 0 0 .45-.45V5.4h1.5v1.95a.45.45 0 1 0 .9 0V2.146a.45.45 0 1 0-.9 0V4.5h-6V.9h2.252a.45.45 0 1 0 0-.9H.45A.45.45 0 0 0 0 .45v9c0 .249.201.45.45.45h4.5a.45.45 0 1 0 0-.9H.9V5.4h3.6v1.5z" />
			<path d="M9.45 0h-4.5a.45.45 0 0 0-.45.45V2.4H2.25a.45.45 0 1 0 0 .9h2.7a.45.45 0 0 0 .45-.45V.9H9V9H6.75a.45.45 0 1 0 0 .9h2.7a.45.45 0 0 0 .45-.45v-9A.45.45 0 0 0 9.45 0" />
		</svg>
	)
)

CustomMaze.displayName = "CustomMaze"
