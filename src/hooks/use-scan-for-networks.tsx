"use client"

import { useCallback, useEffect, useRef } from "react"
import { MessageBuilder } from "@actamayev/lever-labs-common-ts/message-builder"
import serialMessageManagerClass from "../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../classes/serial-connection-manager-class"

export default function useScanForNetworks(): {
	scanForNetworks: (softOrHard: "soft" | "hard") => Promise<void>
} {
	const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const scanForNetworks = useCallback(async (softOrHard: "soft" | "hard"): Promise<void> => {
		if (!serialConnectionManagerClass.pipTurnedOn || serialMessageManagerClass.isScanning) return

		serialMessageManagerClass.setIsScanning(true)
		serialMessageManagerClass.clearScannedNetworks()

		// Set 10-second timeout
		scanTimeoutRef.current = setTimeout((): void => {
			if (serialMessageManagerClass.isScanning) {
				serialMessageManagerClass.setIsScanning(false)
				console.error("Wi-Fi scan timed out after 10 seconds")
				// You could also show a toast notification here
			}
		}, 10000)

		let message: ArrayBuffer
		try {
			if (softOrHard === "soft") {
				message = MessageBuilder.createSoftScanWiFiNetworksMessage()
			} else {
				message = MessageBuilder.createHardScanWiFiNetworksMessage()
			}
			await serialConnectionManagerClass.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to scan for networks:", error)
			serialMessageManagerClass.setIsScanning(false)

			if (scanTimeoutRef.current) {
				clearTimeout(scanTimeoutRef.current)
				scanTimeoutRef.current = null
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialConnectionManagerClass.pipTurnedOn, serialMessageManagerClass.isScanning])

	// Clear timeout when scanning completes
	useEffect((): void => {
		if (!serialMessageManagerClass.isScanning && scanTimeoutRef.current) {
			clearTimeout(scanTimeoutRef.current)
			scanTimeoutRef.current = null
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialMessageManagerClass.isScanning])

	// Cleanup on unmount
	useEffect((): () => void => {
		return (): void => {
			if (scanTimeoutRef.current) {
				clearTimeout(scanTimeoutRef.current)
			}
		}
	}, [])

	return { scanForNetworks }
}
