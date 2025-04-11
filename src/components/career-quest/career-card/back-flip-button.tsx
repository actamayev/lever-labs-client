"use client"

import { Info } from "lucide-react"

/* eslint-disable max-len */
export default function BackFlipButton({ onFlip } : { onFlip: () => void}) {
	return (
		<button
			onClick={onFlip}
			className="absolute bottom-6 right-6 size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
		>
			<Info size={32} strokeWidth={2.5}/>
		</button>
	)
}
