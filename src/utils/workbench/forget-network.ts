"use client"

import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import toastClass from "../../classes/toast-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"

export default async function forgetNetwork(networkSSID: string): Promise<void> {
	try {
		if (!serialConnectionManagerClass.pipTurnedOn) return

		// Create a promise that resolves when we get the wifi-deleted-network response
		const responsePromise = new Promise<boolean>((resolve, reject): void => {
			// Store the original handler
			const originalHandler = serialMessageManagerClass.onWiFiDeletionResult

			// Create a timeout to prevent hanging forever
			const timeout = setTimeout((): void => {
				serialMessageManagerClass.onWiFiDeletionResult = originalHandler
				reject(new Error("Timeout waiting for network deletion response"))
			}, 10000) // 10 second timeout

			// Set up a one-time listener for the wifi deletion result
			serialMessageManagerClass.onWiFiDeletionResult = (success: boolean): void => {
				clearTimeout(timeout)
				serialMessageManagerClass.onWiFiDeletionResult = originalHandler

				// If successful, remove from local state
				if (success) {
					serialMessageManagerClass.removeSavedNetwork(networkSSID)
				}

				resolve(success)
			}
		})

		const buffer = MessageBuilder.createForgetNetworkMessage(networkSSID)
		const success = await serialConnectionManagerClass.sendBinaryMessage(buffer)

		if (!success) {
			throw new Error("Failed to send forget network message")
		}

		// Wait for the device response
		const deletionSuccess = await responsePromise

		if (deletionSuccess) return
		toastClass.negative({
			title: "Unable to forget network",
			description: `Failed to remove "${networkSSID}" from your Pip`
		})
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to forget network at this time",
			description: "Please reload the page and try again"
		})
	}
}
