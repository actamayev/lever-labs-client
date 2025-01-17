/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomShieldReflect: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 15.36 15.36"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="m.581.584-.011.835 8.014 4.643-1.761.597 1.728.581-4.287 4.266-.576-.576-1.544 3.43 3.694-1.304-.525-.569 4.556-4.556.373 1.292.689-2.055 1.7-.497-1.724-.465-.688-2.395-.424 1.448L1.736.597zm10.537 1.874q-.204.001-.405.009-.147.006-.293.016l.938 3.264 3.121.841c.186-1.173.267-2.408.275-3.602a12.8 12.8 0 0 0-3.5-.528zm-1.106.063c-.96.11-1.83.365-2.49.776l1.935 1.119.556-1.895zm4.445 4.2-3.088.903-1.168 3.482-.608-2.107-1.172 1.172c.564 1.061 1.383 1.869 2.585 2.328 1.424-.535 2.357-1.884 2.94-3.648.22-.664.387-1.383.511-2.13" />
		</svg>
	)
)

CustomShieldReflect.displayName = "CustomShieldReflect"
