/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomLinkedin: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 27.429"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M22.286 1.714H1.709C.766 1.714 0 2.491 0 3.445v20.539c0 .954.766 1.73 1.709 1.73h20.577c.943 0 1.714-.777 1.714-1.73V3.445c0-.954-.771-1.73-1.714-1.73M7.254 22.286H3.696V10.832h3.563v11.454zM5.475 9.268a2.063 2.063 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.126m15.113 13.018h-3.557v-5.573c0-1.329-.027-3.038-1.848-3.038-1.854 0-2.137 1.446-2.137 2.941v5.669H9.489V10.832h3.413v1.564h.048c.477-.9 1.639-1.848 3.37-1.848 3.6 0 4.27 2.373 4.27 5.459z" />
		</svg>
	)
)

CustomLinkedin.displayName = "CustomLinkedin"

// To make an SVG like this, paste it into https://www.svgviewer.dev/svg-to-react-jsx, copy the svg settings from above, and insert the website's generated path
