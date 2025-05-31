"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { MessageBuilder, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"

interface Props {
	formValues: IncompletePipData
	isTestingWiFiConnection: boolean
	wifiConnectionStatus: WiFiConnectionStatus | null
	setIsTestingWiFiConnection: (testing: boolean) => void
	setWifiConnectionStatus: (status: WiFiConnectionStatus) => void
}

function UploadWiFiCredentials(props: Props) {
	const {
		isTestingWiFiConnection,
		formValues,
		setIsTestingWiFiConnection,
		wifiConnectionStatus,
		setWifiConnectionStatus
	} = props
	const serialManager = useSerialManagerContext()

	// Listen for WiFi connection results
	useEffect(() => {
		serialManager.onWiFiConnectionResult = (status: WiFiConnectionStatus) => {
			setIsTestingWiFiConnection(false)
			setWifiConnectionStatus(status)
		}

		return () => {
			serialManager.onWiFiConnectionResult = null
		}
	}, [serialManager, setIsTestingWiFiConnection, setWifiConnectionStatus])

	const uploadCredentials = useCallback(async () => {
		// NEW: Only require network name, password is optional
		if (!formValues.wiFiNetworkName) return

		setIsTestingWiFiConnection(true)

		const message = MessageBuilder.createWiFiCredentialsMessage(
			formValues.wiFiNetworkName,
			formValues.wiFiPassword || "" // Use empty string if no password
		)
		const success = await serialManager.sendBinaryMessage(message)

		if (!success) {
			setIsTestingWiFiConnection(false)
		}
	}, [formValues.wiFiNetworkName, formValues.wiFiPassword, serialManager, setIsTestingWiFiConnection])

	const getButtonText = () => {
		if (isTestingWiFiConnection) return "Testing Connection..."
		if (wifiConnectionStatus === WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS) return "✓ Connected Successfully"
		if (wifiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY) return "⚠ WiFi Connected (Server Unreachable)"
		if (wifiConnectionStatus === WiFiConnectionStatus.FAILED) return "✗ Connection Failed - Try Again"
		return "Upload WiFi Credentials"
	}

	const getButtonVariant = () => {
		if (wifiConnectionStatus === WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS) return "default"
		if (wifiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY) return "secondary"
		if (wifiConnectionStatus === WiFiConnectionStatus.FAILED) return "destructive"
		return "default"
	}

	const isButtonDisabled = () => {
		return isTestingWiFiConnection ||
			!serialManager.connected ||
			!formValues.wiFiNetworkName || // NEW: Only require network name
			wifiConnectionStatus === WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS
	}

	return (
		<div className="mt-6">
			<div className="flex flex-col">
				{/* Show status message */}
				{wifiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY && (
					<p className="text-amber-600 mb-2">
						WiFi connected but can't reach our servers. This might be a captive portal network.
					</p>
				)}
				{wifiConnectionStatus === WiFiConnectionStatus.FAILED && (
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
