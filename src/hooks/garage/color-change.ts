/* eslint-disable max-len */
import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import debounce from "lodash-es/debounce"
import { RgbaColor } from "@uiw/color-convert"
import { usePipContext } from "../../contexts/pip-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useGarageContext } from "../../contexts/garage-context"

export default function useColorChange(): (rgbaColor: RgbaColor) => void {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const garageClass = useGarageContext()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedEmitLedColors = useCallback(
		debounce((rgb: RgbaColor) => {
			if (
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			const ledControlData = {
				topLeftColor: { r: rgb.r * garageClass.selectedColorShade, g: rgb.g * garageClass.selectedColorShade, b: rgb.b * garageClass.selectedColorShade},
				topRightColor: { r: rgb.r * garageClass.selectedColorShade, g: rgb.g * garageClass.selectedColorShade, b: rgb.b * garageClass.selectedColorShade},
				middleLeftColor: { r: rgb.r * garageClass.selectedColorShade, g: rgb.g * garageClass.selectedColorShade, b: rgb.b * garageClass.selectedColorShade},
				middleRightColor: { r: rgb.r * garageClass.selectedColorShade, g: rgb.g * garageClass.selectedColorShade, b: rgb.b * garageClass.selectedColorShade},
				backLeftColor: { r: rgb.r * garageClass.selectedColorShade, g: rgb.g * garageClass.selectedColorShade, b: rgb.b * garageClass.selectedColorShade},
				backRightColor: { r: rgb.r * garageClass.selectedColorShade, g: rgb.g * garageClass.selectedColorShade, b: rgb.b * garageClass.selectedColorShade},
				pipUUID: pipClass.selectedPip.pipUUID
			}

			socketClass.emitLedColorControl(ledControlData)
		}, 10), // 10ms debounce
		[pipClass.selectedPip, socketClass, garageClass.selectedColorShade] // Dependencies
	)

	// Handle color change from color wheel
	return useCallback((rgbaColor: RgbaColor) => {
		garageClass.setSelectedColorRgba(rgbaColor)

		// Update dot colors if dots are selected
		if (garageClass.selectedDots && garageClass.selectedDots.length > 0) {
			garageClass.updateDotColor(garageClass.selectedDots, rgbaColor)
		}

		debouncedEmitLedColors(rgbaColor)
	}, [garageClass, debouncedEmitLedColors])

}
