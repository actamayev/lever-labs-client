/* eslint-disable max-len */
"use client"

import { Info } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"

interface Props {
	onFlip: () => void
	extraClasses?: string
}

export default function BackFlipButton(props: Props) {
	const { onFlip, extraClasses } = props

	return (
		<button
			onClick={onFlip}
			className={cn(
				"absolute bottom-6 right-6 size-8 rounded-full flex items-center justify-center focus:outline-none duration-0",
				extraClasses
			)}
		>
			<Info size={32} strokeWidth={2.5}/>
		</button>
	)
}
