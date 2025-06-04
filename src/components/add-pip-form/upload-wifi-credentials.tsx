"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { MessageBuilder, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../contexts/serial-message-manager"

function UploadWiFiCredentials({ getFormValues }: { getFormValues: () => IncompletePipData }) {
	const serialManager = useSerialManagerContext()
	const serialMessageManager = useSerialMessageManagerContext()

	// Listen for WiFi connection results
	useEffect(() => {
		serialMessageManager.onWiFiConnectionResult = (status: WiFiConnectionStatus) => {
			serialMessageManager.setIsTestingWiFiConnection(false)
			serialMessageManager.setWiFiConnectionStatus(status)
		}

		return () => {
			serialMessageManager.onWiFiConnectionResult = null
		}
	}, [serialManager, serialMessageManager])

	const uploadCredentials = useCallback(async () => {
		if (!getFormValues().wiFiNetworkName) return

		serialMessageManager.setIsTestingWiFiConnection(true)

		const message = MessageBuilder.createWiFiCredentialsMessage(
			getFormValues().wiFiNetworkName,
			getFormValues().wiFiPassword || "" // Use empty string if no password
		)
		const success = await serialManager.sendBinaryMessage(message)

		if (!success) {
			serialMessageManager.setIsTestingWiFiConnection(false)
		}
	}, [getFormValues, serialManager, serialMessageManager])

	const getButtonText = () => {
		if (serialMessageManager.isTestingWiFiConnection) return "Testing Connection..."
		switch (serialMessageManager.wiFiConnectionStatus) {
		case WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS:
			return "✓ Connected Successfully"
		case WiFiConnectionStatus.WIFI_ONLY:
			return "⚠ WiFi Connected (Server Unreachable)"
		case WiFiConnectionStatus.FAILED:
			return "✗ Connection Failed - Try Again"
		}
		return "Upload WiFi Credentials"
	}

	const getButtonVariant = () => {
		switch (serialMessageManager.wiFiConnectionStatus) {
		case WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS:
			return "default"
		case WiFiConnectionStatus.WIFI_ONLY:
			return "secondary"
		case WiFiConnectionStatus.FAILED:
			return "destructive"
		default:
			return "default"
		}
	}

	const isButtonDisabled = () => {
		return serialMessageManager.isTestingWiFiConnection ||
			!serialManager.connected ||
			!getFormValues().wiFiNetworkName || // NEW: Only require network name
			serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS
	}

	return (
		<div className="mt-6">
			<div className="flex flex-col">
				{/* Show status message */}
				{serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY && (
					<p className="text-amber-600 mb-2">
						WiFi connected but can't reach our servers. This might be a captive portal network.
					</p>
				)}
				{serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.FAILED && (
					<p className="text-red-600 mb-2">
						Connection failed. Please check your WiFi credentials and try again.
					</p>
				)}

				<Button
					type="button"
					className="mt-6 text-2xl h-12"
					variant={getButtonVariant()}
					onClick={uploadCredentials}
					disabled={isButtonDisabled()}
				>
					{getButtonText()}
				</Button>
			</div>
		</div>
	)
}

export default observer(UploadWiFiCredentials)
