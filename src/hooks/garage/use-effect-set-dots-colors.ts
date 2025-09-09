"use client"


import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import debounce from "lodash-es/debounce"
import { useEffect, useCallback } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import { LedControlData } from "@bluedotrobots/common-ts/types/garage"
import getPipClass from "../../classes/pip-class"
import getGarageClass from "../../classes/garage-class"
import getSocketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function useEffectSetDefaultColors(): void {
	// Create a debounced emit function for the first useEffect
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedEmitLedColors = useCallback(
		debounce((): void => {
			if (isEmpty(getGarageClass().selectedDots)) return

			const selectedColorShade = getGarageClass().selectedColorShade
			const ledControlData: Omit<LedControlData, "pipUUID"> = {
				topLeftColor: {
					r: Math.round(getGarageClass().dotColors[0].r * selectedColorShade),
					g: Math.round(getGarageClass().dotColors[0].g * selectedColorShade),
					b: Math.round(getGarageClass().dotColors[0].b * selectedColorShade)
				},
				topRightColor: {
					r: Math.round(getGarageClass().dotColors[1].r * selectedColorShade),
					g: Math.round(getGarageClass().dotColors[1].g * selectedColorShade),
					b: Math.round(getGarageClass().dotColors[1].b * selectedColorShade)
				},
				middleLeftColor: {
					r: Math.round(getGarageClass().dotColors[2].r * selectedColorShade),
					g: Math.round(getGarageClass().dotColors[2].g * selectedColorShade),
					b: Math.round(getGarageClass().dotColors[2].b * selectedColorShade)
				},
				middleRightColor: {
					r: Math.round(getGarageClass().dotColors[3].r * selectedColorShade),
					g: Math.round(getGarageClass().dotColors[3].g * selectedColorShade),
					b: Math.round(getGarageClass().dotColors[3].b * selectedColorShade)
				},
				backLeftColor: {
					r: Math.round(getGarageClass().dotColors[4].r * selectedColorShade),
					g: Math.round(getGarageClass().dotColors[4].g * selectedColorShade),
					b: Math.round(getGarageClass().dotColors[4].b * selectedColorShade)
				},
				backRightColor: {
					r: Math.round(getGarageClass().dotColors[5].r * selectedColorShade),
					g: Math.round(getGarageClass().dotColors[5].g * selectedColorShade),
					b: Math.round(getGarageClass().dotColors[5].b * selectedColorShade)
				}
			}

			if (serialConnectionManagerClass.pipTurnedOn) {
				const buffer = MessageBuilder.createLedMessage(ledControlData)

				void serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}

			const selectedPip = getPipClass().selectedPip
			if (
				isNull(selectedPip)
				|| selectedPip.pipConnectionStatus === "offline"
				|| isEmpty(getGarageClass().selectedDots)
			) return

			getSocketClass().emitToServer("new-led-colors", {...ledControlData, pipUUID: selectedPip.pipUUID })
		}, 10),
		[getGarageClass().selectedColorRgba.r,
			getGarageClass().selectedColorRgba.g,
			getGarageClass().selectedColorRgba.b,
			getGarageClass().selectedColorShade]
	)

	// This use
	useEffect((): () => void => {
		debouncedEmitLedColors()

		return (): void => {
			debouncedEmitLedColors.cancel()
		}
	}, [debouncedEmitLedColors])

	// This use effect updates the dot color with no delay, when the selected dots change, or color shade, or selected color change
	useEffect((): void => {
		getGarageClass().updateDotColor(getGarageClass().selectedDots,
			{
				r: getGarageClass().selectedColorRgba.r * getGarageClass().selectedColorShade,
				g: getGarageClass().selectedColorRgba.g * getGarageClass().selectedColorShade,
				b: getGarageClass().selectedColorRgba.b * getGarageClass().selectedColorShade,
				a: 1
			}
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getGarageClass().selectedDots,
		getGarageClass().selectedColorRgba.r,
		getGarageClass().selectedColorRgba.g,
		getGarageClass().selectedColorRgba.b,
		getGarageClass().selectedColorShade])
}
