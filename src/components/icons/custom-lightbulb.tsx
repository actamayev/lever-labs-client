/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomLightbulb: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18 24"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M12.75 18c.45-1.495 1.383-2.77 2.306-4.041.244-.333.488-.666.722-1.003A8.251 8.251 0 0 0 9 0a8.25 8.25 0 0 0-6.778 12.952c.234.338.478.67.722 1.003.928 1.27 1.861 2.55 2.306 4.041h7.5zM9 24a3.75 3.75 0 0 0 3.75-3.75v-.75h-7.5v.75A3.75 3.75 0 0 0 9 24M5.25 8.25c0 .413-.338.75-.75.75s-.75-.338-.75-.75A5.247 5.247 0 0 1 9 3c.413 0 .75.338.75.75s-.338.75-.75.75a3.75 3.75 0 0 0-3.75 3.75" />
		</svg>
	)
)

CustomLightbulb.displayName = "CustomLightbulb"

// To make an SVG like this, paste it into https://www.svgviewer.dev/svg-to-react-jsx, copy the svg settings from above, and insert the website's generated path
