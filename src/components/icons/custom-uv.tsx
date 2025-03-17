"use client"


/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"

export const CustomUV: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
			<path
				d="M10.359 9.691h-.856c-.041 0-.067.027-.067.067v2.856c0 .546-.303.856-.761.856-.465 0-.768-.31-.768-.856V9.758c0-.041-.027-.067-.067-.067h-.856c-.041 0-.067.027-.067.067v2.829c0 1.139.727 1.759 1.758 1.759 1.024 0 1.752-.62 1.752-1.759V9.758a.064.064 0 0 0-.067-.067m4.768 0h-.869q-.069-.002-.087.067l-.889 3.005h-.02l-.917-3.005q-.019-.069-.087-.067h-.876c-.047 0-.074.027-.061.074l1.455 4.44c.014.041.041.067.088.067h.781c.041 0 .067-.027.08-.067l1.455-4.44c.014-.047-.013-.074-.054-.074M4.107 0A3.138 3.138 0 0 1 0 4.63v10.73L15.36 0zM1.272 8.196v-1.53h.787v1.53zm4.517-1.545L4.708 5.569l.557-.557 1.081 1.082zm.572-4.286v-.788h1.53v.788z"
				style={{
					fill: "#000",
				}}
			/>
		</svg>
	)
)

CustomUV.displayName = "CustomUV"
