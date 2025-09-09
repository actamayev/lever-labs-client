"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { CppParser } from "@bluedotrobots/common-ts/parsers"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import fireConfetti from "../../utils/fire-confetti"
import { isNonSuccessResponse } from "../../utils/type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import { checkForMotorCommands, checkForStartButton } from "./sandbox-safety-measures"

// eslint-disable-next-line complexity
export default async function sendCppToPip(
	cppCode: string,
	rect: DOMRect
) : Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const bytecode = CppParser.cppToByte(cppCode)

			// Check if the program has motor commands but no start button
			const hasMotorCommands = checkForMotorCommands(bytecode)
			const hasStartButton = checkForStartButton(bytecode)

			if (hasMotorCommands && !hasStartButton) {
				return getToastClass().negative({
					title: "Start button required for USB connection",
					// eslint-disable-next-line max-len
					description: "When connected via USB, programs with motor commands must begin with the \"Start program when button is pressed\" block"
				})
			}

			const buffer = MessageBuilder.createBytecodeMessage(bytecode)

			const success = await serialConnectionManagerClass.sendBinaryMessage(buffer)
			if (success) {
				fireConfetti(
					rect,
					({ particleCount: 300, startVelocity: 30 })
				)
			}
			return
		}

		const selectedPip = getPipClass().selectedPip

		if (isNull(selectedPip)) {
			return getToastClass().neutral({
				title: "You have not connected to a Pip",
				description: "Please connect to a Pip to upload code"
			})
		}
		if (getPipClass().isSendingCppToPip === true) {
			return getToastClass().neutral({
				title: "Currently sending code to Pip",
				description: `We're beaming your code over to ${selectedPip.pipName} as fast as we can!`
			})
		}

		if (selectedPip.pipConnectionStatus === "offline") {
			return getToastClass().negative({
				title: `${selectedPip.pipName} is not online`,
				description: `Please connect ${selectedPip.pipName} to the internet to upload code`
			})
		} else if (selectedPip.pipConnectionStatus === "connected to other user") {
			return getToastClass().negative({
				title: `Unable to upload code to ${selectedPip.pipName} at this time`,
				description: `${selectedPip.pipName} is connected to another user`
			})
		}
		getPipClass().setIsSendingCppToPip(true)

		const connectToPipResponse = await getBlueDotApiClientClass().sandboxDataService.sendSandboxCodeToPip(
			selectedPip.pipUUID, cppCode
		)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Connect to Pip failed")
		}
		return fireConfetti(
			rect,
			({ particleCount: 300, startVelocity: 30 })
		)
	} catch (error) {
		console.error(error)
		return getToastClass().negative({
			title: "Unable to upload code to Pip at this time",
			description: "Please reload the page and try again"
		})
	} finally {
		getPipClass().setIsSendingCppToPip(false)
	}
}
