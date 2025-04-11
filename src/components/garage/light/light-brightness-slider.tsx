import { observer } from "mobx-react"
import { rgbaToHsva } from "@uiw/color-convert"
import { useGarageContext } from "../../../contexts/garage-context"
import { Minus, PlusIcon } from "lucide-react"
import { Button } from "../../shadcn/ui/button"
import { useCallback, useEffect, useRef, useState } from "react"

function LightBrightnessControl() {
	const garageClass = useGarageContext()
	const [isDecreasing, setIsDecreasing] = useState(false)
	const [isIncreasing, setIsIncreasing] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Calculate the current brightness percentage
	const brightnessPercent = Math.round(rgbaToHsva(garageClass.realColor).v)

	const decreaseBrightness = useCallback(() => {
		const newValue = Math.max(0, brightnessPercent - 5)
		garageClass.setColorShade(newValue / 100)
	}, [brightnessPercent, garageClass])

	const increaseBrightness = useCallback(() => {
		const newValue = Math.min(100, brightnessPercent + 5)
		garageClass.setColorShade(newValue / 100)
	}, [brightnessPercent, garageClass])

	useEffect(() => {
		if (isDecreasing && brightnessPercent > 0) {
			intervalRef.current = setInterval(decreaseBrightness, 200)
		} else if (isIncreasing && brightnessPercent < 100) {
			intervalRef.current = setInterval(increaseBrightness, 200)
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isDecreasing, isIncreasing, brightnessPercent, decreaseBrightness, increaseBrightness])

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				onClick={decreaseBrightness}
				disabled={brightnessPercent <= 0}
				onMouseDown={() => setIsDecreasing(true)}
				onMouseUp={() => setIsDecreasing(false)}
				onMouseLeave={() => setIsDecreasing(false)}
				onTouchStart={() => setIsDecreasing(true)}
				onTouchEnd={() => setIsDecreasing(false)}
				className="border-2 border-swan shadow-none"
			>
				<Minus className="h-4 w-4" />
			</Button>

			<span className="text-2xl font-medium mx-4">
				{brightnessPercent}%
			</span>

			<Button
				variant="outline"
				size="icon"
				onClick={increaseBrightness}
				disabled={brightnessPercent >= 100}
				onMouseDown={() => setIsIncreasing(true)}
				onMouseUp={() => setIsIncreasing(false)}
				onMouseLeave={() => setIsIncreasing(false)}
				onTouchStart={() => setIsIncreasing(true)}
				onTouchEnd={() => setIsIncreasing(false)}
				className="border-2 border-swan shadow-none"
			>
				<PlusIcon className="h-4 w-4" />
			</Button>
		</>
	)
}

export default observer(LightBrightnessControl)
