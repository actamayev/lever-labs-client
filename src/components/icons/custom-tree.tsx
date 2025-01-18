/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomTree: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M11.282.316 3.321 9.075a1.235 1.235 0 0 0 .917 2.068h1.333l-3.932 3.932a1.21 1.21 0 0 0 .857 2.068h1.79L.289 21.938a1.258 1.258 0 0 0 .97 2.063h9.027v1.714c0 .948.766 1.714 1.714 1.714s1.714-.766 1.714-1.714v-1.714h9.027a1.258 1.258 0 0 0 .97-2.063l-3.997-4.795h1.789a1.21 1.21 0 0 0 .857-2.068l-3.931-3.932h1.334a1.239 1.239 0 0 0 .917-2.068L12.718.316C12.536.113 12.273 0 12 0s-.536.113-.718.316" />
		</svg>
	)
)

CustomTree.displayName = "CustomTree"
