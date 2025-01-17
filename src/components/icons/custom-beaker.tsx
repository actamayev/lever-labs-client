/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomBeaker: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path
				fillRule="evenodd"
				d="M8.4 2.4a1.2 1.2 0 0 0-.848 2.048l.848.849v4.51a1.2 1.2 0 0 1-.352.848l-4.8 4.8C.98 17.723 2.587 21.6 5.794 21.6h12.412c3.208 0 4.814-3.877 2.546-6.145l-4.8-4.8a1.2 1.2 0 0 1-.352-.849V5.297l.848-.848A1.2 1.2 0 0 0 15.6 2.4zm2.4 7.406V4.8h2.4v5.006a3.6 3.6 0 0 0 1.055 2.544l1.232 1.234a4.8 4.8 0 0 0-2.605.122l-.564.187a4.8 4.8 0 0 1-3.036 0l-.676-.224-.137-.042 1.276-1.276A3.6 3.6 0 0 0 10.8 9.806"
				clipRule="evenodd"
			/>
		</svg>
	)
)

CustomBeaker.displayName = "CustomBeaker"
