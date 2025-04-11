/* eslint-disable max-len */
import { useEffect, useCallback } from "react"
import { debounce, isEmpty, isNull } from "lodash-es"
import { usePipContext } from "../../contexts/pip-context"
import { useGarageContext } from "../../contexts/garage-context"
import { useSocketContext } from "../../contexts/socket-context"

export default function useSetDefaultColorsUseEffect(): void {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()

	// Create a debounced emit function for the first useEffect
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedEmitLedColors = useCallback(
		debounce(() => {
			if (
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			const rgb = garageClass.selectedColorRgba

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
		}, 10),
		[garageClass.selectedColorRgba, garageClass.selectedColorShade, pipClass.selectedPip, socketClass]
	)

	// 1. Fixed useEffect with proper debounce for shade/color changes
	useEffect(() => {
		debouncedEmitLedColors()

		return (): void => {
			debouncedEmitLedColors.cancel()
		}
	}, [debouncedEmitLedColors])

	// 2. New useEffect for immediate updates when dots are selected
	useEffect(() => {
		garageClass.updateDotColor(garageClass.selectedDots,
			{
				r: garageClass.selectedColorRgba.r * garageClass.selectedColorShade,
				g: garageClass.selectedColorRgba.g * garageClass.selectedColorShade,
				b: garageClass.selectedColorRgba.b * garageClass.selectedColorShade,
				a: 1
			}
		)
		if (
			isEmpty(garageClass.selectedDots) ||
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		// Create control data with dot-specific colors
		const ledControlData: LedControlDataToSend = {
			topLeftColor: {
				r: Math.round(garageClass.dotColors[0].r * garageClass.selectedColorShade),
				g: Math.round(garageClass.dotColors[0].g * garageClass.selectedColorShade),
				b: Math.round(garageClass.dotColors[0].b * garageClass.selectedColorShade)
			},
			topRightColor: {
				r: Math.round(garageClass.dotColors[1].r * garageClass.selectedColorShade),
				g: Math.round(garageClass.dotColors[1].g * garageClass.selectedColorShade),
				b: Math.round(garageClass.dotColors[1].b * garageClass.selectedColorShade)
			},
			middleLeftColor: {
				r: Math.round(garageClass.dotColors[2].r * garageClass.selectedColorShade),
				g: Math.round(garageClass.dotColors[2].g * garageClass.selectedColorShade),
				b: Math.round(garageClass.dotColors[2].b * garageClass.selectedColorShade)
			},
			middleRightColor: {
				r: Math.round(garageClass.dotColors[3].r * garageClass.selectedColorShade),
				g: Math.round(garageClass.dotColors[3].g * garageClass.selectedColorShade),
				b: Math.round(garageClass.dotColors[3].b * garageClass.selectedColorShade)
			},
			backLeftColor: {
				r: Math.round(garageClass.dotColors[4].r * garageClass.selectedColorShade),
				g: Math.round(garageClass.dotColors[4].g * garageClass.selectedColorShade),
				b: Math.round(garageClass.dotColors[4].b * garageClass.selectedColorShade)
			},
			backRightColor: {
				r: Math.round(garageClass.dotColors[5].r * garageClass.selectedColorShade),
				g: Math.round(garageClass.dotColors[5].g * garageClass.selectedColorShade),
				b: Math.round(garageClass.dotColors[5].b * garageClass.selectedColorShade)
			},
			pipUUID: pipClass.selectedPip.pipUUID
		}

		// Emit immediately without debounce
		socketClass.emitLedColorControl(ledControlData)
	}, [garageClass.selectedDots, garageClass.selectedColorRgba, garageClass.selectedColorShade, pipClass.selectedPip, socketClass, garageClass])
}
