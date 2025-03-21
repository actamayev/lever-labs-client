"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomTreasureMap: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 0.72 0.72"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M.431.065a.06.06 0 0 1 .038 0l.15.05A.06.06 0 0 1 .66.172v.417a.06.06 0 0 1-.079.057L.45.602.289.656a.06.06 0 0 1-.038 0l-.15-.05A.06.06 0 0 1 .06.548V.132A.06.06 0 0 1 .139.075L.27.118zM.45.122.289.176a.06.06 0 0 1-.038 0L.12.132v.416l.15.05.161-.054a.06.06 0 0 1 .038 0L.6.588V.172zM.399.249a.03.03 0 0 1 .042 0l.024.024.024-.024a.03.03 0 1 1 .042.042L.507.315l.024.024a.03.03 0 0 1-.042.042L.465.357.441.381A.03.03 0 0 1 .399.339L.423.315.399.291a.03.03 0 0 1 0-.042M.18.48a.03.03 0 1 0 0-.06.03.03 0 0 0 0 .06M.27.36a.03.03 0 1 1-.06 0 .03.03 0 0 1 .06 0m.06 0a.03.03 0 1 0 0-.06.03.03 0 0 0 0 .06"
				fill="#000"
			/>
		</svg>
	)
)

CustomTreasureMap.displayName = "CustomTreasureMap"
