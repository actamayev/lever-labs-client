"use client"

import { observer } from "mobx-react"
import Wheel from "@uiw/react-color-wheel"
import isNull from "lodash-es/isNull"
import debounce from "lodash-es/debounce"
import { useState, useCallback } from "react"
import { ColorResult, hsvaToHex, hsvaToRgba, rgbaToHsva } from "@uiw/color-convert"
import { usePipContext } from "../../../contexts/pip-context"
import { useGarageContext } from "../../../contexts/garage-context"
import { useSocketContext } from "../../../contexts/socket-context"

// eslint-disable-next-line max-lines-per-function
function ColorPicker() {
	const garage = useGarageContext()
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const [hsva, setHsva] = useState({ h: 0, s: 100, v: 100, a: 1 })

	// Get RGB values using the library conversion
	const getRgbValues = useCallback(() => {
		const rgba = hsvaToRgba(hsva)
		return {
			r: Math.round(rgba.r),
			g: Math.round(rgba.g),
			b: Math.round(rgba.b)
		}
	}, [hsva])

	// Create a debounced function for socket emission only
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedEmitLedColors = useCallback(
		debounce((rgb) => {
			if (
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			const ledControlData = {
				topLeftColor: { red: rgb.r, green: rgb.g, blue: rgb.b },
				topRightColor: { red: rgb.r, green: rgb.g, blue: rgb.b },
				middleLeftColor: { red: rgb.r, green: rgb.g, blue: rgb.b },
				middleRightColor: { red: rgb.r, green: rgb.g, blue: rgb.b },
				backLeftColor: { red: rgb.r, green: rgb.g, blue: rgb.b },
				backRightColor: { red: rgb.r, green: rgb.g, blue: rgb.b },
				pipUUID: pipClass.selectedPip.pipUUID
			}

			socketClass.emitLedColorControl(ledControlData)
		}, 10), // 10ms debounce
		[pipClass.selectedPip, socketClass] // Dependencies
	)

	// Handle color change from color wheel
	const handleColorChange = useCallback((color: ColorResult) => {
		setHsva(color.hsva)

		// Immediately update app state
		const hexColor = hsvaToHex(color.hsva)
		garage.setSelectedColor(hexColor)

		// Update dot colors if dots are selected
		if (garage.selectedDots && garage.selectedDots.length > 0) {
			garage.updateDotColor(garage.selectedDots, hexColor)
		}

		// Debounce only the socket emission
		const rgb = {
			r: Math.round(color.rgba.r),
			g: Math.round(color.rgba.g),
			b: Math.round(color.rgba.b)
		}
		debouncedEmitLedColors(rgb)
	}, [garage, debouncedEmitLedColors])

	// Handle RGB input change
	const handleRgbChange = useCallback((component: "r" | "g" | "b", value: number) => {
		const rgb = getRgbValues()
		rgb[component] = Math.max(0, Math.min(255, value))

		const newHsva = rgbaToHsva({
			r: rgb.r,
			g: rgb.g,
			b: rgb.b,
			a: hsva.a
		})

		// Update HSVA state
		setHsva(newHsva)

		// Immediately update app state
		const hexColor = hsvaToHex(newHsva)
		garage.setSelectedColor(hexColor)

		// Update dot colors if dots are selected
		if (garage.selectedDots && garage.selectedDots.length > 0) {
			garage.updateDotColor(garage.selectedDots, hexColor)
		}

		// Debounce only the socket emission
		debouncedEmitLedColors(rgb)
	}, [getRgbValues, hsva.a, garage, debouncedEmitLedColors])

	const rgb = getRgbValues()

	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="w-full max-w-[180px] h-[180px]">
				<Wheel
					color={hsva}
					onChange={handleColorChange}
					width={180}
					height={180}
				/>
			</div>

			<div className="flex items-center space-x-2">
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">R:</span>
					<input
						type="number"
						value={rgb.r}
						onChange={(e) => handleRgbChange("r", parseInt(e.target.value || "0"))}
						min="0"
						max="255"
						className="p-1 border border-swan rounded text-sm w-14 text-center bg-inherit"
					/>
				</div>
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">G:</span>
					<input
						type="number"
						value={rgb.g}
						onChange={(e) => handleRgbChange("g", parseInt(e.target.value || "0"))}
						min="0"
						max="255"
						className="p-1 border border-swan rounded text-sm w-14 text-center bg-inherit"
					/>
				</div>
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">B:</span>
					<input
						type="number"
						value={rgb.b}
						onChange={(e) => handleRgbChange("b", parseInt(e.target.value || "0"))}
						min="0"
						max="255"
						className="p-1 border border-swan rounded text-sm w-14 text-center bg-inherit"
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
