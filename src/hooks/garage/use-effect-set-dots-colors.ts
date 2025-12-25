/* eslint-disable react-hooks/exhaustive-deps */
"use client"


import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import debounce from "lodash-es/debounce"
import { useEffect, useCallback, useRef } from "react"
import { MessageBuilder } from "@actamayev/lever-labs-common-ts/message-builder"
import { LedControlData } from "@actamayev/lever-labs-common-ts/types/garage"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function useEffectSetDefaultColors(): void {
	// Track if this is the initial load to prevent automatic LED emission
	const isInitialLoad = useRef(true)
	// Create a debounced emit function for the first useEffect

	const debouncedEmitLedColors = useCallback(
		debounce((): void => {
			if (isEmpty(garageClass.selectedDots)) return

			// Skip emitting LED colors on initial load
			if (isInitialLoad.current) {
				isInitialLoad.current = false
				return
			}

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
				}
			}

			if (serialConnectionManagerClass.pipTurnedOn) {
				const buffer = MessageBuilder.createLedMessage(ledControlData)

				void serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}

			const selectedPip = pipClass.selectedPip
			if (
				isNull(selectedPip)
				|| selectedPip.pipConnectionStatus === "offline"
				|| isEmpty(garageClass.selectedDots)
			) return

			socketClass.emitToServer("new-led-colors", {...ledControlData, pipUUID: selectedPip.pipUUID })
		}, 10),
		[garageClass.selectedColorRgba.r,
			garageClass.selectedColorRgba.g,
			garageClass.selectedColorRgba.b,
			garageClass.selectedColorShade]
	)

	// This useEffect emits LED colors when color values change, but not on initial load
	useEffect((): () => void => {
		debouncedEmitLedColors()

		return (): void => {
			debouncedEmitLedColors.cancel()
		}
	}, [debouncedEmitLedColors])

	// This use effect updates the dot color with no delay, when the selected dots change, or color shade, or selected color change
	useEffect((): void => {
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
		garageClass.selectedColorShade])
}
