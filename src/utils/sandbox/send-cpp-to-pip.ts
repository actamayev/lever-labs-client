"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { CppParser, MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import fireConfetti from "../../utils/fire-confetti"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
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
				return toastClass.negative({
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

		if (isNull(pipClass.selectedPip)) {
			return toastClass.neutral({
				title: "You have not connected to a Pip",
				description: "Please connect to a Pip to upload code"
			})
		}
		if (pipClass.isSendingCppToPip === true) {
			return toastClass.neutral({
				title: "Currently sending code to Pip",
				description: `We're beaming your code over to ${pipClass.selectedPip.pipName} as fast as we can!`
			})
		}

		if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return toastClass.negative({
				title: `${pipClass.selectedPip.pipName} is not online`,
				description: `Please connect ${pipClass.selectedPip.pipName} to the internet to upload code`
			})
		} else if (pipClass.selectedPip.pipConnectionStatus === "connected to other user") {
			return toastClass.negative({
				title: `Unable to upload code to ${pipClass.selectedPip.pipName} at this time`,
				description: `${pipClass.selectedPip.pipName} is connected to another user`
			})
		}
		pipClass.setIsSendingCppToPip(true)

		const connectToPipResponse = await blueDotApiClientClass.sandboxDataService.sendSandboxCodeToPip(
			pipClass.selectedPip.pipUUID, cppCode
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
		return toastClass.negative({
			title: "Unable to upload code to Pip at this time",
			description: "Please reload the page and try again"
		})
	} finally {
		pipClass.setIsSendingCppToPip(false)
	}
}
