"use client"

/* eslint-disable max-len */
import { forwardRef } from "react"
import type { LucideIcon, LucideProps } from "lucide-react"
import { cn } from "../lib/shadcn/utils"

export const CustomUsb: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
	({ color = "currentColor", size = 24, className = "", ...props }, ref) => (
		<svg
			ref={ref}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={color}
			width={size}
			height={size}
			className={cn("bi bi-usb-plug-fill", className)}
			{...props}
		>
			<path d="M9 .75A.75.75 0 0 1 9.75 0h6a.75.75 0 0 1 .75.75v6H9zm1.5.75V3H12V1.5zm3 0V3H15V1.5zm-5.25 6a.75.75 0 0 0-.75.75v7.341a3 3 0 0 0 .504 1.665l1.245 1.868a7.45 7.45 0 0 1 1.251 4.131c0 .413.333.746.746.746h3.009a.746.746 0 0 0 .746-.746c0-1.47.435-2.907 1.251-4.131l1.245-1.868a3 3 0 0 0 .504-1.665V8.25a.75.75 0 0 0-.75-.75z" />
		</svg>
	)
)

CustomUsb.displayName = "CustomUsb"
