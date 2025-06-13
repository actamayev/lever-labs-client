"use client"

import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { Control, UseFormSetValue } from "react-hook-form"
import { Button } from "../shadcn/ui/button"
import ScannedNetworkList from "./scanned-network-list"
import ManualEntrySection from "./manual-entry-section"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../contexts/serial-message-manager"
import { cn } from "../../lib/shadcn/utils"

interface WiFiScanSectionProps {
	control: Control<IncompletePipData>
	setValue: UseFormSetValue<IncompletePipData>
}

function WiFiScanSection({ control, setValue }: WiFiScanSectionProps) {
	const serialManager = useSerialManagerContext()
	const serialMessageManager = useSerialMessageManagerContext()
	const [showManualEntry, setShowManualEntry] = useState(false)

	const scanForNetworks = useCallback(async () => {
		if (!serialManager.connected || serialMessageManager.isScanning) return

		serialMessageManager.setIsScanning(true)
		serialMessageManager.clearScannedNetworks()

		try {
			const message = MessageBuilder.createScanWiFiNetworksMessage()
			await serialManager.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to scan for networks:", error)
			serialMessageManager.setIsScanning(false)
		}
	}, [serialManager, serialMessageManager])

	return (
		<div className="space-y-6">
			{/* Scan for Networks Section */}
			<div>
				<div className="flex flex-row mb-6">
					<p className="font-bold">Step 2:&nbsp;</p>
					<p>Scan for WiFi networks or enter manually</p>
				</div>

				<div className="flex gap-4 mb-4">
					<Button
						type="button"
						onClick={scanForNetworks}
						disabled={serialMessageManager.isScanning || !serialManager.connected}
						className={cn("flex items-center gap-2", serialMessageManager.isScanning ? "cursor-not-allowed" : "cursor-pointer")}
						variant="outline"
					>
						<Wifi className="h-4 w-4" />
						{serialMessageManager.isScanning ? "Scanning..." : "Scan for Networks"}
					</Button>

					<Button
						type="button"
						onClick={() => setShowManualEntry(!showManualEntry)}
						variant="outline"
						className="cursor-pointer"
					>
						{showManualEntry ? "Hide Manual Entry" : "Enter Manually"}
					</Button>
				</div>

				{/* Scanned Networks List */}
				{(serialMessageManager.isScanning || serialMessageManager.scannedNetworks.length > 0) && (
					<div className="mb-4">
						<ScannedNetworkList
							control={control}
							setValue={setValue}
						/>
					</div>
				)}

				{/* Manual Entry Section */}
				{showManualEntry && (
					<ManualEntrySection control={control} />
				)}
			</div>
		</div>
	)
}

export default observer(WiFiScanSection)
