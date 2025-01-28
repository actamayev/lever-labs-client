import { useCallback, useState } from "react"
import { CustomLightbulb } from "../icons/custom-lightbulb"

function getRandomRGBColor() {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	return `rgb(${r}, ${g}, ${b})`
}

export default function LEDColorChangeAnimation({ iconSize } : { iconSize: number }) {
	const [ledColor, setLedColor] = useState<string | null>(null)

	const handleIconClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setLedColor(getRandomRGBColor())
	}, [])

	return (
		<div className="pointer-events-auto w-fit" onClick={handleIconClick}>
			<CustomLightbulb
				className="origin-left transition-all duration-300 cursor-pointer"
				style={{
					color: ledColor || "currentColor",
					filter: ledColor ? `drop-shadow(0 0 8px ${ledColor})` : "none"
				}}
				size={iconSize}
			/>
		</div>
	)
}
