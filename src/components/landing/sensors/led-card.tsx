import { FaLightbulb } from "react-icons/fa"
import { useCallback, useState } from "react"
import { bentoIconSize } from "../../../utils/constants"
import SensorsSkeleton from "./sensors-skeleton"

function getRandomRGBColor() {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	return `rgb(${r}, ${g}, ${b})`
}

export default function LEDCard() {
	const [ledColor, setLedColor] = useState<string | null>(null)

	const handleIconClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setLedColor(getRandomRGBColor())
	}, [])

	return (
		<SensorsSkeleton
			title="5× RGB LEDs"
			description="Create dazzling light displays and visual indicators"
			icon={
				<div className="pointer-events-auto w-fit" onClick={handleIconClick}>
					<FaLightbulb
						className="origin-left transition-all duration-300 cursor-pointer"
						style={{
							color: ledColor || "currentColor",
							filter: ledColor ? `drop-shadow(0 0 8px ${ledColor})` : "none"
						}}
						size={bentoIconSize}
					/>
				</div>
			}
			outerDivStyles="row-start-1 col-start-1"
		/>
	)
}
