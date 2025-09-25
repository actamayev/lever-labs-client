"use client"


import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomYoutube: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -0.15 1.02 1.02"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M.406.493.682.35.406.205zM.512 0q.096 0 .185.003t.131.005L.87.01l.01.001.014.002H.893l.013.003.017.005V.02l.016.007.018.011.016.015.009.01q.01.015.016.032v.001a.2.2 0 0 1 .015.057v.001q.005.037.007.078t.003.065v.109q0 .084-.011.164l.001-.006a.2.2 0 0 1-.015.058L.999.62A.1.1 0 0 1 .98.656l-.008.01-.016.015-.017.011H.938L.922.699.906.703.892.706.879.708.87.709Q.727.72.512.72.394.719.307.716T.192.712L.164.71.143.708.11.702h.002L.082.69h.001A.1.1 0 0 1 .051.667L.042.657.026.625V.624A.2.2 0 0 1 .011.567V.566Q.006.529.004.488T.001.423V.314q0-.083.011-.164L.011.156A.2.2 0 0 1 .025.097L.024.099A.2.2 0 0 1 .043.063l.008-.01.016-.015.017-.011h.001L.101.02.117.016.13.013.143.011.153.01Q.296 0 .511 0z" />
		</svg>
	)
)

CustomYoutube.displayName = "CustomYoutube"
