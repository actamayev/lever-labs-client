"use client"

import { Control, useWatch } from "react-hook-form" // Add useWatch import
import { Button } from "../shadcn/ui/button"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import EnterWifiPassword from "./enter-wifi-password"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import UploadWiFiCredentials from "./upload-wifi-credentials"
import { useSerialManagerContext } from "../../classes/serial-manager-context"
import { useSerialMessageManagerContext } from "../../classes/serial-message-manager"
import { observer } from "mobx-react"

interface ManualEntrySectionProps {
    control: Control<IncompletePipData>
}

function ManualEntrySection({ control }: ManualEntrySectionProps) {
	const serialManager = useSerialManagerContext()
	const serialMessageManager = useSerialMessageManagerContext()

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
			serialMessageManager.isTestingWiFiConnection ||
			!watchedManualNetworkName ||
			watchedManualNetworkName.trim() === ""
		) {
			return // Don't submit if no network name
		}

		serialMessageManager.setIsTestingWiFiConnection(true)
		serialMessageManager.setWiFiConnectionStatus(null) // Reset status

		const message = MessageBuilder.createWiFiCredentialsMessage(
			watchedManualNetworkName.trim(),
			watchedManualPassword || ""
		)
		const success = await serialManager.sendBinaryMessage(message)

		if (!success) {
			serialMessageManager.setIsTestingWiFiConnection(false)
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
						serialMessageManager.isTestingWiFiConnection ||
                        !watchedManualNetworkName ||
                        watchedManualNetworkName.trim() === ""
					}
					className="h-12 px-6 text-lg mb-4"
					size="lg"
				>
					{serialMessageManager.isTestingWiFiConnection ? "Testing..." : "Connect"}
				</Button>
				<UploadWiFiCredentials />
			</div>
		</div>
	)
}

export default observer(ManualEntrySection)
