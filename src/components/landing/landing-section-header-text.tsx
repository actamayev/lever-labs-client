"use client"

import { cn } from "../../lib/shadcn/utils"

interface Props {
	text: string
	extraClasses?: string
}

export default function LandingSectionHeaderText({ text, extraClasses = "" } : Props): React.ReactNode {
	return (
		<h2 className={cn("font-heading text-3xl sm:text-4xl md:text-5xl font-semibold", extraClasses)}>
			{text}
		</h2>
	)
}
