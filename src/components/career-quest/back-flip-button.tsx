/* eslint-disable max-len */
"use client"

import { Info } from "lucide-react"

interface Props {
	onFlip: () => void
	extraClasses?: string
}

export default function BackFlipButton(props: Props) {
	const { onFlip, extraClasses } = props

	return (
		<button
			onClick={onFlip}
			className={extraClasses}
		>
			<Info size={32} strokeWidth={2.5}/>
		</button>
	)
}
