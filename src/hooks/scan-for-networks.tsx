import { useCallback, useEffect, useRef } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import serialMessageManagerClass from "../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../classes/serial-connection-manager-class"

export default function useScanForNetworks(): { scanForNetworks: () => Promise<void> } {
	const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const scanForNetworks = useCallback(async () => {
		if (!serialConnectionManagerClass.connected || serialMessageManagerClass.isScanning) return

		serialMessageManagerClass.setIsScanning(true)
		serialMessageManagerClass.clearScannedNetworks()

		// Set 10-second timeout
		scanTimeoutRef.current = setTimeout(() => {
			if (serialMessageManagerClass.isScanning) {
				serialMessageManagerClass.setIsScanning(false)
				console.error("WiFi scan timed out after 10 seconds")
				// You could also show a toast notification here
			}
		}, 10000)

		try {
			const message = MessageBuilder.createScanWiFiNetworksMessage()
			await serialConnectionManagerClass.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to scan for networks:", error)
			serialMessageManagerClass.setIsScanning(false)
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (scanTimeoutRef.current) {
				clearTimeout(scanTimeoutRef.current)
				scanTimeoutRef.current = null
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialConnectionManagerClass.connected, serialMessageManagerClass.isScanning])

	// Clear timeout when scanning completes
	useEffect(() => {
		if (!serialMessageManagerClass.isScanning && scanTimeoutRef.current) {
			clearTimeout(scanTimeoutRef.current)
			scanTimeoutRef.current = null
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialMessageManagerClass.isScanning])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (scanTimeoutRef.current) {
				clearTimeout(scanTimeoutRef.current)
			}
		}
	}, [])

	return { scanForNetworks }
}
