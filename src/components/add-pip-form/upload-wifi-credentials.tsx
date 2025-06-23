"use client"

import { observer } from "mobx-react"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"

function UploadWiFiCredentials() {
	// Only show if there are connection issues
	if (
		serialMessageManagerClass.wiFiConnectionStatus !== WiFiConnectionStatus.WIFI_ONLY &&
		serialMessageManagerClass.wiFiConnectionStatus !== WiFiConnectionStatus.FAILED
	) {
		return null
	}

	return (
		<div className="mt-3">
			{/* Show status message */}
			{serialMessageManagerClass.wiFiConnectionStatus === WiFiConnectionStatus.WIFI_ONLY && (
				<div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
					<p className="text-beakInner text-sm">
						⚠ Wi-Fi connected but can't reach our servers. This might be a captive portal network.
					</p>
				</div>
			)}
			{serialMessageManagerClass.wiFiConnectionStatus === WiFiConnectionStatus.FAILED && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-cardinal text-sm">
						✗ Connection failed. Please check your Wi-Fi credentials and try again.
					</p>
				</div>
			)}
		</div>
	)
}

export default observer(UploadWiFiCredentials)
