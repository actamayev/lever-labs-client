"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import Wheel from "@uiw/react-color-wheel"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { ColorResult, HsvaColor, rgbaToHsva } from "@uiw/color-convert"
import pipClass from "../../../classes/pip-class"
import socketClass from "../../../classes/socket-class"
import careerQuestTriggersClass from "../../../classes/career-quest-triggers-class"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

function MeetPipS2P3ColorPicker(): React.ReactNode {
	const colorToShow = useMemo((): HsvaColor => {
		// This is done to ensure the shade of the color wheel stays constant
		const hsva = rgbaToHsva(careerQuestTriggersClass.selectedColorRgba)
		hsva.v = 100
		return hsva
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		careerQuestTriggersClass.selectedColorRgba.r,
		careerQuestTriggersClass.selectedColorRgba.g,
		careerQuestTriggersClass.selectedColorRgba.b,
	])

	const onChange = (colorResult: ColorResult): void => {
		careerQuestTriggersClass.setSelectedColorRgba(colorResult.rgba)
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createLedMessage({
				topLeftColor: colorResult.rgba,
				topRightColor: colorResult.rgba,
				middleLeftColor: colorResult.rgba,
				middleRightColor: colorResult.rgba,
				backLeftColor: colorResult.rgba,
				backRightColor: colorResult.rgba,
			})

			void serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}

		if (
			isNull(pipClass.selectedPip)
			|| pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		socketClass.emitToServer("new-led-colors", {
			topLeftColor: colorResult.rgba,
			topRightColor: colorResult.rgba,
			middleLeftColor: colorResult.rgba,
			middleRightColor: colorResult.rgba,
			backLeftColor: colorResult.rgba,
			backRightColor: colorResult.rgba,
			pipUUID: pipClass.selectedPip.pipUUID
		})
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full">
				<Wheel
					color={colorToShow}
					onChange={onChange}
					width={400}
					height={400}
				/>
			</div>
		</div>
	)
}

export default observer(MeetPipS2P3ColorPicker)
