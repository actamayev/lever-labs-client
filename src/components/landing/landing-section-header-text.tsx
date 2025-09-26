"use client"

import { cn } from "../../lib/shadcn/utils"

interface Props {
	text: string
	extraClasses?: string
}

export default function LandingSectionHeaderText({ text, extraClasses = "" } : Props): React.ReactNode {
	return (
		<h2 className={cn("text-5xl md:text-5xl lg:text-5xl font-bold text-humpbackText", extraClasses)}>
			{text}
		</h2>
	)
}
