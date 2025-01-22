
/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomWizardHat: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path d="M3 19.5 7.903 8.47a8.97 8.97 0 0 1 3.375-3.923L18.164.141a.9.9 0 0 1 .469-.136.86.86 0 0 1 .867.867v.075a1 1 0 0 1-.066.352l-2.803 6.994c-.089.22-.131.455-.131.689 0 .258.056.516.159.755L21 19.5h-9.708l.553-1.659 1.894-.633a.751.751 0 0 0 0-1.424l-1.894-.633-.633-1.894a.753.753 0 0 0-1.424.005l-.633 1.894-1.894.633a.751.751 0 0 0 0 1.424l1.894.633.553 1.655zM13.106 6.633c-.052-.155-.192-.258-.356-.258s-.305.103-.356.258l-.314.947-.947.314c-.155.052-.258.192-.258.356s.103.305.258.356l.947.314.314.947c.052.155.192.258.356.258s.305-.103.356-.258l.314-.947.947-.314c.155-.052.258-.192.258-.356s-.103-.305-.258-.356l-.947-.314zM1.5 21h21c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-21C.67 24 0 23.33 0 22.5S.67 21 1.5 21" />
		</svg>
	)
)

CustomWizardHat.displayName = "CustomWizardHat"
