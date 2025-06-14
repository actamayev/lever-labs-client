"use client"

import { observer } from "mobx-react"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { useSerialMessageManagerContext } from "../../contexts/serial-message-manager"

function UploadWiFiCredentials() {
	const serialMessageManager = useSerialMessageManagerContext()

	// Only show if there are connection issues
	if (
		serialMessageManager.wiFiConnectionStatus !== WiFiConnectionStatus.WIFI_ONLY &&
		serialMessageManager.wiFiConnectionStatus !== WiFiConnectionStatus.FAILED
	) {
		return null
	}

	return (
		<div className="mt-3">
			{/* Show status message */}
			{serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY && (
				<div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
					<p className="text-beakInner text-sm">
						⚠ WiFi connected but can't reach our servers. This might be a captive portal network.
					</p>
				</div>
			)}
			{serialMessageManager.wiFiConnectionStatus === WiFiConnectionStatus.FAILED && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-cardinal text-sm">
						✗ Connection failed. Please check your WiFi credentials and try again.
					</p>
				</div>
			)}
		</div>
	)
}

export default observer(UploadWiFiCredentials)
