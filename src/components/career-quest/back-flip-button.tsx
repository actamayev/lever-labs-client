
"use client"

import { Info } from "lucide-react"

interface Props {
	onFlip: () => void
	extraClasses?: string
	style?: React.CSSProperties
}

export default function BackFlipButton(props: Props) {
	const { onFlip, extraClasses, style } = props

	return (
		<button
			onClick={onFlip}
			className={extraClasses}
			style={style}
		>
			<Info size={32} strokeWidth={2.5}/>
		</button>
	)
}
