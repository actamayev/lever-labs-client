/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomMarsRover: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<style>
				{
					".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
				}
			</style>
			<path
				className="st0"
				d="M21 19.875a1.875 1.875 0 0 1-1.875 1.875 1.875 1.875 0 0 1-1.875-1.875 1.875 1.875 0 0 1 3.75 0m-7.5 0a1.875 1.875 0 0 1-1.875 1.875 1.875 1.875 0 0 1-1.875-1.875 1.875 1.875 0 0 1 3.75 0m-7.5 0a1.875 1.875 0 0 1-1.875 1.875 1.875 1.875 0 0 1-1.875-1.875 1.875 1.875 0 0 1 3.75 0M11.25 6.75h-4.5c-1.275 0-2.25-.975-2.25-2.25v0c0-1.275.975-2.25 2.25-2.25h4.5c1.275 0 2.25.975 2.25 2.25v0c0 1.275-.975 2.25-2.25 2.25m-2.25 6v-6M6.75 4.5h.75m3 0h.75m4.5 2.25h3m-3 6v-6m-6 8.25h3.75m9-9.75h-2.25l-1.5 1.5 1.5 1.5h2.25m-9 11.25h3.75m-11.325 0H9.75"
			/>
			<path className="st0" d="m18.975 18-1.725-5.25H6L4.275 18" />
		</svg>
	)
)

CustomMarsRover.displayName = "CustomMarsRover"
