/* eslint-disable @typescript-eslint/naming-convention */
"use client"

import clamp from "lodash-es/clamp"
import { observer } from "mobx-react"
import { rgbaToHsva } from "@uiw/color-convert"
import { Minus, PlusIcon } from "lucide-react"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import garageClass from "../../../classes/garage-class"

const INITIAL_DELAY_MS = 400
const REPEAT_INTERVAL_MS = 60

// eslint-disable-next-line max-lines-per-function
function LightBrightnessControl(): ReactNode {
	const [isDecreasing, setIsDecreasing] = useState(false)
	const [isIncreasing, setIsIncreasing] = useState(false)

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const getBrightness = useCallback((): number => {
		return Math.round(rgbaToHsva(garageClass.realColor).v)
	}, [])

	const setBrightnessPct = useCallback((pct: number): void => {
		garageClass.setColorShade(clamp(pct, 0, 100) / 100)
	}, [])

	const stepDelta = useCallback(
		(delta: number): void => {
			const current = getBrightness()
			const next = clamp(current + delta, 0, 100)
			if (next !== current) setBrightnessPct(next)
		},
		[getBrightness, setBrightnessPct],
	)

	const startRepeat = useCallback(
		(delta: number): void => {
			// Immediate single step
			stepDelta(delta)

			// After delay, fast repeat
			timeoutRef.current = setTimeout((): void => {
				intervalRef.current = setInterval((): void => {
					stepDelta(delta)
				}, REPEAT_INTERVAL_MS)
			}, INITIAL_DELAY_MS)
		},
		[stepDelta],
	)

	const clearTimers = useCallback((): void => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		if (intervalRef.current) clearInterval(intervalRef.current)
		timeoutRef.current = null
		intervalRef.current = null
	}, [])

	const stopHold = useCallback((): void => {
		clearTimers()
		setIsDecreasing(false)
		setIsIncreasing(false)
	}, [clearTimers])

	useEffect((): () => void => {
		return (): void => stopHold() // cleanup on unmount
	}, [stopHold])

	const brightnessPercent = getBrightness()

	const onDecreaseDown = useCallback(
		(e: React.PointerEvent): void => {
			e.preventDefault()
			if (getBrightness() <= 0) return
			setIsDecreasing(true)
			startRepeat(-1)
		},
		[getBrightness, startRepeat],
	)

	const onIncreaseDown = useCallback(
		(e: React.PointerEvent): void => {
			e.preventDefault()
			if (getBrightness() >= 100) return
			setIsIncreasing(true)
			startRepeat(1)
		},
		[getBrightness, startRepeat],
	)

	const enforceRGBRange = useCallback((value: string): number => {
		const numValue = parseInt(value || "0", 10)
		return clamp(numValue, 0, 100)
	}, [])

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				disabled={brightnessPercent <= 0}
				aria-pressed={isDecreasing}
				onPointerDown={onDecreaseDown}
				onPointerUp={stopHold}
				onPointerLeave={stopHold}
				onPointerCancel={stopHold}
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
						onChange={(e): void =>
							setBrightnessPct(enforceRGBRange(e.target.value))
						}
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
				disabled={brightnessPercent >= 100}
				aria-pressed={isIncreasing}
				onPointerDown={onIncreaseDown}
				onPointerUp={stopHold}
				onPointerLeave={stopHold}
				onPointerCancel={stopHold}
				className="border-2 border-swan shadow-none rounded-xl"
				style={{ height: "52px", width: "52px" }}
			>
				<PlusIcon className="!size-6 text-questionText" />
			</Button>
		</>
	)
}

export default observer(LightBrightnessControl)
