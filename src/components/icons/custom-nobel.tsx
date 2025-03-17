"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomNobel: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 5.932 5.932"
			fill={color}
			width={size}
			height={size}
			className={className}
			{...props}
		>
			<path d="M2.966 0C1.33 0 0 1.33 0 2.966s1.33 2.966 2.966 2.966 2.966-1.33 2.966-2.966S4.601 0 2.966 0M.45 2.966C.45 1.579 1.579.45 2.966.45s2.516 1.129 2.516 2.516a2.5 2.5 0 0 1-.352 1.281L4.043 3.16a1.395 1.395 0 1 0-2.118.172l.308.308L1.16 4.713a2.5 2.5 0 0 1-.71-1.747m2.516 2.516a2.5 2.5 0 0 1-1.465-.472L2.71 3.801a.225.225 0 0 0 0-.318l-.467-.467a.945.945 0 1 1 1.336 0 .225.225 0 0 0 0 .318l1.28 1.28.003.003a2.5 2.5 0 0 1-1.897.866" />
			<path d="M1.62 3.866a.225.225 0 0 0 0-.45h-.56a.225.225 0 0 0 0 .45zm2.946-.468h.492a.225.225 0 0 0 .225-.225.225.225 0 0 0-.225-.225h-.492a.225.225 0 0 0 0 .45m.085-.72h.443a.225.225 0 0 0 .225-.225.225.225 0 0 0-.225-.225h-.443a.225.225 0 0 0 0 .45" />		</svg>
	)
)

CustomNobel.displayName = "CustomNobel"
