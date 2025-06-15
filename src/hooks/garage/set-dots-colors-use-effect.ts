"use client"

/* eslint-disable max-len */
import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import debounce from "lodash-es/debounce"
import { useEffect, useCallback } from "react"
import { LedControlData, MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-manager-class"

// eslint-disable-next-line max-lines-per-function
export default function useSetDefaultColorsUseEffect(): void {
	// Create a debounced emit function for the first useEffect
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedEmitLedColors = useCallback(
		debounce(() => {
			if (isEmpty(garageClass.selectedDots)) return

			const selectedColorShade = garageClass.selectedColorShade
			const ledControlData: Omit<LedControlData, "pipUUID"> = {
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
				leftHeadlightColor: {
					r: Math.round(garageClass.dotColors[6].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[6].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[6].b * selectedColorShade)
				},
				rightHeadlightColor: {
					r: Math.round(garageClass.dotColors[7].r * selectedColorShade),
					g: Math.round(garageClass.dotColors[7].g * selectedColorShade),
					b: Math.round(garageClass.dotColors[7].b * selectedColorShade)
				}
			}

			if (serialConnectionManagerClass.connected) {
				const buffer = MessageBuilder.createLedMessage(ledControlData)

				void serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}

			if (
				isNull(pipClass.selectedPip)
				|| pipClass.selectedPip.pipConnectionStatus === "offline"
				|| isEmpty(garageClass.selectedDots)
			) return

			socketClass.emitLedColorControl({...ledControlData, pipUUID: pipClass.selectedPip.pipUUID })
		}, 10),
		[garageClass.selectedColorRgba.r,
			garageClass.selectedColorRgba.g,
			garageClass.selectedColorRgba.b,
			garageClass.selectedColorShade, pipClass.selectedPip, socketClass]
	)

	// This use
	useEffect(() => {
		debouncedEmitLedColors()

		return (): void => {
			debouncedEmitLedColors.cancel()
		}
	}, [debouncedEmitLedColors])

	// This use effect updates the dot color with no delay, when the selected dots change, or color shade, or selected color change
	useEffect(() => {
		garageClass.updateDotColor(garageClass.selectedDots,
			{
				r: garageClass.selectedColorRgba.r * garageClass.selectedColorShade,
				g: garageClass.selectedColorRgba.g * garageClass.selectedColorShade,
				b: garageClass.selectedColorRgba.b * garageClass.selectedColorShade,
				a: 1
			}
		)
	}, [garageClass.selectedDots,
		garageClass.selectedColorRgba.r,
		garageClass.selectedColorRgba.g,
		garageClass.selectedColorRgba.b,
		garageClass.selectedColorShade, garageClass])
}
