"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import fireConfetti from "../../utils/fire-confetti"
import { isNonSuccessResponse } from "../../utils/type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

// eslint-disable-next-line complexity
export default async function sendCppToPip(cppCode: string, rect?: DOMRect) : Promise<void> {
	try {
		const selectedPip = pipClass.selectedPip

		if (!serialConnectionManagerClass.pipTurnedOn && isNull(selectedPip)) {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to upload code"
			})
		}
		if (serialConnectionManagerClass.pipTurnedOn) {
			pipClass.setIsSendingCppToPip(true)

			const sendSandboxCodeToPipResponse = await leverLabsApiClient.sandboxDataService.sendSandboxCodeToPipUsb(cppCode)

			if (!isEqual(sendSandboxCodeToPipResponse.status, 200) || isNonSuccessResponse(sendSandboxCodeToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}

			const isAbleToRunViaUsb = sendSandboxCodeToPipResponse.data.isAbleToRunViaUsb
			if (!isAbleToRunViaUsb) {
				return toastClass.negative({
					title: "Start button required for USB connection",
					// eslint-disable-next-line max-len
					description: "When connected via USB, programs with motor commands must begin with the \"Start program when button is pressed\" block"
				})
			}
			const buffer = Uint8Array.from(
				atob(sendSandboxCodeToPipResponse.data.bytecode),
				(c: string): number => c.charCodeAt(0)
			).buffer

			const success = await serialConnectionManagerClass.sendBinaryMessage(buffer)
			if (success) {
				pipClass.setIsSendingCppToPip(false)
				fireConfetti(rect, ({ particleCount: 300, startVelocity: 30 }))
			}
			return
		}

		if (isNull(selectedPip)) {
			return toastClass.neutral({
				title: "You have not connected to a Pip",
				description: "Please connect to a Pip to upload code"
			})
		}
		if (pipClass.isSendingCppToPip === true) {
			return toastClass.neutral({
				title: "Currently sending code to Pip",
				description: `We're beaming your code over to ${selectedPip.pipUUID} as fast as we can!`
			})
		}

		if (selectedPip.pipConnectionStatus === "offline") {
			return toastClass.negative({
				title: `${selectedPip.pipUUID} is not online`,
				description: `Please connect ${selectedPip.pipUUID} to the internet to upload code`
			})
		} else if (
			selectedPip.pipConnectionStatus === "connected online to another user" ||
			selectedPip.pipConnectionStatus === "connected to serial to another user"
		) {
			return toastClass.negative({
				title: `Unable to upload code to ${selectedPip.pipUUID} at this time`,
				description: `${selectedPip.pipUUID} is connected to another user`
			})
		}
		pipClass.setIsSendingCppToPip(true)

		const sendSandboxCodeToPipResponse = await leverLabsApiClient.sandboxDataService.sendSandboxCodeToPipWifi(
			selectedPip.pipUUID, cppCode
		)

		if (!isEqual(sendSandboxCodeToPipResponse.status, 200) || isNonSuccessResponse(sendSandboxCodeToPipResponse.data)) {
			throw new Error("Connect to Pip failed")
		}
		return fireConfetti(rect, ({ particleCount: 300, startVelocity: 30 }))
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
