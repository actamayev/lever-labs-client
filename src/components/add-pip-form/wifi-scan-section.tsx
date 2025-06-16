"use client"

import { useState } from "react"
import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { Control, UseFormSetValue } from "react-hook-form"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import ScannedNetworkList from "./scanned-network-list"
import ManualEntrySection from "./manual-entry-section"
import useScanForNetworks from "../../hooks/scan-for-networks"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

interface WiFiScanSectionProps {
	control: Control<IncompletePipData>
	setValue: UseFormSetValue<IncompletePipData>
}

function WiFiScanSection({ control, setValue }: WiFiScanSectionProps) {
	const [showManualEntry, setShowManualEntry] = useState(false)
	const [selectedNetworkIndex, setSelectedNetworkIndex] = useState<number | null>(null)
	const { scanForNetworks } = useScanForNetworks()

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
						disabled={serialMessageManagerClass.isScanning || !serialConnectionManagerClass.connected}
						className={cn(
							"flex items-center gap-2",
							serialMessageManagerClass.isScanning ? "cursor-not-allowed" : "cursor-pointer"
						)}
						variant="outline"
					>
						<Wifi className="h-4 w-4" />
						{serialMessageManagerClass.isScanning ? "Scanning..." : "Scan for Networks"}
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
				{(serialMessageManagerClass.isScanning || !isEmpty(serialMessageManagerClass.scannedNetworks)) && (
					<div className="mb-4">
						<ScannedNetworkList
							control={control}
							setValue={setValue}
							selectedNetworkIndex={selectedNetworkIndex}
							setSelectedNetworkIndex={setSelectedNetworkIndex}
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
