"use client"

import clamp from "lodash-es/clamp"
import { observer } from "mobx-react"
import { rgbaToHsva } from "@uiw/color-convert"
import { Minus, PlusIcon } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import garageClass from "../../../classes/garage-class"

function LightBrightnessControl() {
	const [isDecreasing, setIsDecreasing] = useState(false)
	const [isIncreasing, setIsIncreasing] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Calculate the current brightness percentage
	const brightnessPercent = Math.round(rgbaToHsva(garageClass.realColor).v)

	const decreaseBrightness = useCallback(() => {
		const newValue = Math.max(0, brightnessPercent - 5)
		garageClass.setColorShade(newValue / 100)
	}, [brightnessPercent])

	const increaseBrightness = useCallback(() => {
		const newValue = Math.min(100, brightnessPercent + 5)
		garageClass.setColorShade(newValue / 100)
	}, [brightnessPercent])

	const enforceRGBRange = useCallback((value: string) => {
		const numValue = parseInt(value || "0")
		return clamp(numValue, 0, 100)
	}, [])

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
				className="border-2 border-swan shadow-none rounded-xl"
				style={{ height: "52px", width: "52px" }}
			>
				<Minus className="!size-6 text-questionText" />
			</Button>

			<div className="flex items-center flex-col relative">
				<div className="relative w-full">
					<Input
						type="number"
						value={brightnessPercent}
						onChange={(e) => garageClass.setColorShade(enforceRGBRange(e.target.value) / 100)}
						min="0"
						max="100"
						// eslint-disable-next-line max-len
						className="border-2 pr-6 border-swan rounded-xl !text-xl text-center bg-inherit shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
						style={{ width: "120px", height: "52px" }}
					/>
					<span
						className="absolute top-1/2 transform -translate-y-1/2 text-xl pointer-events-none"
						style={{ left: `calc(50% + ${String(brightnessPercent).length * 4}px)` }}
					>
						%
					</span>
				</div>
			</div>

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
				className="border-2 border-swan shadow-none rounded-xl"
				style={{ height: "52px", width: "52px" }}
			>
				<PlusIcon className="!size-6 text-questionText" />
			</Button>
		</>
	)
}

export default observer(LightBrightnessControl)
