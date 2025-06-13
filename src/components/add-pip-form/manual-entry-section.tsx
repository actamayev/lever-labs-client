"use client"

import { Control } from "react-hook-form"
import EnterWifiPassword from "./enter-wifi-password"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import UploadWiFiCredentials from "./upload-wifi-credentials"

interface ManualEntrySectionProps {
	control: Control<IncompletePipData>
}

export default function ManualEntrySection({ control }: ManualEntrySectionProps) {
	return (
		<div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
			<h4 className="text-xl font-medium">Enter Network Manually</h4>

			<div>
				<label className="block text-lg font-medium mb-2">Network Name</label>
				<EnterWifiNetworkName control={control} />
			</div>

			<div>
				<label className="block text-lg font-medium mb-2">Network Password</label>
				<EnterWifiPassword control={control} />
			</div>

			<div className="pt-2">
				<UploadWiFiCredentials />
			</div>
		</div>
	)
}
