"use client"

import { Control, useWatch } from "react-hook-form" // Add useWatch import
import { Button } from "../shadcn/ui/button"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import EnterWifiPassword from "./enter-wifi-password"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import UploadWiFiCredentials from "./upload-wifi-credentials"
import serialConnectionManagerClass from "../../classes/serial-manager-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import { observer } from "mobx-react"

interface ManualEntrySectionProps {
    control: Control<IncompletePipData>
}

function ManualEntrySection({ control }: ManualEntrySectionProps) {
	// Watch the manual form fields for real-time updates
	const watchedManualNetworkName = useWatch({
		control,
		name: "manualWiFiNetworkName",
		defaultValue: ""
	})

	const watchedManualPassword = useWatch({
		control,
		name: "manualWiFiPassword", // Use the manual password field
		defaultValue: ""
	})

	const handleManualConnect = async () => {
		if (
			serialMessageManagerClass.isTestingWiFiConnection ||
			!watchedManualNetworkName ||
			watchedManualNetworkName.trim() === ""
		) {
			return // Don't submit if no network name
		}

		serialMessageManagerClass.setIsTestingWiFiConnection(true)
		serialMessageManagerClass.setWiFiConnectionStatus(null) // Reset status

		const message = MessageBuilder.createWiFiCredentialsMessage(
			watchedManualNetworkName.trim(),
			watchedManualPassword || ""
		)
		const success = await serialConnectionManagerClass.sendBinaryMessage(message)

		if (!success) {
			serialMessageManagerClass.setIsTestingWiFiConnection(false)
		}
	}

	return (
		<div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
			<h4 className="text-xl font-medium">Enter Network Manually</h4>

			<div>
				<label className="block text-lg font-medium mb-2">Network Name</label>
				<EnterWifiNetworkName control={control} onSubmit={handleManualConnect} />
			</div>

			<div>
				<label className="block text-lg font-medium mb-2">Network Password</label>
				<EnterWifiPassword control={control} onSubmit={handleManualConnect} />
			</div>

			<div className="pt-2">
				<Button
					type="button"
					onClick={handleManualConnect}
					disabled={
						serialMessageManagerClass.isTestingWiFiConnection ||
                        !watchedManualNetworkName ||
                        watchedManualNetworkName.trim() === ""
					}
					className="h-12 px-6 text-lg mb-4"
					size="lg"
				>
					{serialMessageManagerClass.isTestingWiFiConnection ? "Testing..." : "Connect"}
				</Button>
				<UploadWiFiCredentials />
			</div>
		</div>
	)
}

export default observer(ManualEntrySection)
