"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { MessageBuilder, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../contexts/serial-message-manager"

interface Props {
	getFormValues: () => IncompletePipData
}

function UploadWiFiCredentials(props: Props) {
	const { getFormValues } = props
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
		// NEW: Only require network name, password is optional
		if (!getFormValues().wiFiNetworkName) return
		console.log("Uploading WiFi credentials:", getFormValues().wiFiNetworkName, getFormValues().wiFiPassword)

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
		if (serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS) return "✓ Connected Successfully"
		if (serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY) return "⚠ WiFi Connected (Server Unreachable)"
		if (serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.FAILED) return "✗ Connection Failed - Try Again"
		return "Upload WiFi Credentials"
	}

	const getButtonVariant = () => {
		if (serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS) return "default"
		if (serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY) return "secondary"
		if (serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.FAILED) return "destructive"
		return "default"
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
