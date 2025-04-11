"use client"

/* eslint-disable max-len */
import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import debounce from "lodash-es/debounce"
import { useEffect, useCallback } from "react"
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
				isNull(pipClass.selectedPip)
				|| pipClass.selectedPip.pipConnectionStatus === "offline"
				|| isEmpty(garageClass.selectedDots)
			) return

			const selectedColorShade = garageClass.selectedColorShade
			const ledControlData: LedControlDataToSend = {
				topLeftColor: {
					r: Math.round(garageClass.dotColors[0].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[0].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[0].b * selectedColorShade)
				},
				topRightColor: {
					r: Math.round(garageClass.dotColors[1].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[1].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[1].b * selectedColorShade)
				},
				middleLeftColor: {
					r: Math.round(garageClass.dotColors[2].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[2].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[2].b * selectedColorShade)
				},
				middleRightColor: {
					r: Math.round(garageClass.dotColors[3].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[3].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[3].b * selectedColorShade)
				},
				backLeftColor: {
					r: Math.round(garageClass.dotColors[4].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[4].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[4].b * selectedColorShade)
				},
				backRightColor: {
					r: Math.round(garageClass.dotColors[5].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[5].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[5].b * selectedColorShade)
				},
				pipUUID: pipClass.selectedPip.pipUUID
			}

			socketClass.emitLedColorControl(ledControlData)
		}, 10),
		[garageClass.selectedColorRgba, garageClass.selectedColorShade, pipClass.selectedPip, socketClass]
	)

	// This use
	useEffect(() => {
		debouncedEmitLedColors()

		return (): void => {
			debouncedEmitLedColors.cancel()
		}
	}, [debouncedEmitLedColors])

	// This use effect updates the dot color with no delay, when the selected dots change, or color shdae, or selected color change
	useEffect(() => {
		garageClass.updateDotColor(garageClass.selectedDots,
			{
				r: garageClass.selectedColorRgba.r * garageClass.selectedColorShade,
				g: garageClass.selectedColorRgba.g * garageClass.selectedColorShade,
				b: garageClass.selectedColorRgba.b * garageClass.selectedColorShade,
				a: 1
			}
		)
	}, [garageClass.selectedDots, garageClass.selectedColorRgba, garageClass.selectedColorShade, garageClass])
}
