"use client"

import { useCallback, useState } from "react"
import { CustomLightbulb } from "../icons/custom-lightbulb"

export default function LEDColorChangeAnimation({ iconSize }: { iconSize: number }): React.ReactNode {
	const [ledColor, setLedColor] = useState<string | null>(null)

	const getRandomRGBColor = useCallback((): string => {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		return `rgb(${r}, ${g}, ${b})`
	}, [])

	const handleIconClick = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		setLedColor(getRandomRGBColor())
	}, [getRandomRGBColor])

	return (
		<div className="pointer-events-auto w-fit" onClick={handleIconClick}>
			<CustomLightbulb
				className="origin-left duration-300 cursor-pointer text-questionText"
				style={{
					color: ledColor || "",
					filter: ledColor ? `drop-shadow(0 0 8px ${ledColor})` : "none"
				}}
				size={iconSize}
			/>
		</div>
	)
}
