/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomSprout: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M13.579.18c-1.602-.436-3.86-.262-5.244 2.618-.145.35-.336.492-.336.492a.39.39 0 0 1-.32.182.39.39 0 0 1-.319-.182s-.19-.142-.336-.492C5.641-.082 3.383-.256 1.781.18c0 0-.198 2.167 1.602 3.317 2.185 1.397 3.642.35 3.642 1.397v.743h1.311v-.743c0-1.047 1.457 0 3.642-1.397C13.779 2.347 13.581.18 13.581.18M1.92 6.369h11.52v2.4H1.92zm5.76 3.464H3.259l.947 5.527h6.947l.948-5.527Z"/>
		</svg>
	)
)

CustomSprout.displayName = "CustomSprout"
