"use client"

import { cn } from "../../../lib/shadcn/utils"

type ColorType = "blue" | "orange"

type Props = {
	extraClasses?: string
	children: React.ReactNode
	noSpaceBefore?: boolean
	noSpaceAfter?: boolean
	color: ColorType
}

export default function ColoredText(props: Props) {
	const {
		extraClasses,
		children,
		noSpaceBefore = false,
		noSpaceAfter = false,
		color
	} = props

	const colorClasses = {
		blue: "text-blue-600 dark:text-blue-400",
		orange: "text-orange-600 dark:text-fox"
	}

	return (
		<>
			{!noSpaceBefore && <>&nbsp;</>}
			<span className={cn(
				"font-bold",
				colorClasses[color],
				extraClasses
			)}>
				{children}
			</span>
			{!noSpaceAfter && <>&nbsp;</>}
		</>
	)
}
