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
				topLeftColor: { r: rgb.r, g: rgb.g, b: rgb.b },
				topRightColor: { r: rgb.r, g: rgb.g, b: rgb.b },
				middleLeftColor: { r: rgb.r, g: rgb.g, b: rgb.b },
				middleRightColor: { r: rgb.r, g: rgb.g, b: rgb.b },
				backLeftColor: { r: rgb.r, g: rgb.g, b: rgb.b },
				backRightColor: { r: rgb.r, g: rgb.g, b: rgb.b },
				pipUUID: pipClass.selectedPip.pipUUID
			}

			socketClass.emitLedColorControl(ledControlData)
		}, 10), // 10ms debounce
		[pipClass.selectedPip, socketClass] // Dependencies
	)

	// Handle color change from color wheel
	return useCallback((rgbaColor: RgbaColor) => {
		garageClass.setSelectedColor(rgbaColor)

		// Update dot colors if dots are selected
		if (garageClass.selectedDots && garageClass.selectedDots.length > 0) {
			garageClass.updateDotColor(garageClass.selectedDots, rgbaColor)
		}

		debouncedEmitLedColors(rgbaColor)
	}, [garageClass, debouncedEmitLedColors])

}
