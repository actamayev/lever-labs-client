"use client"

import { observer } from "mobx-react"
import { useSerialMessageManagerContext } from "../../../../contexts/serial-message-manager"

function ScanNetworksSection () {
	const serialMessageManager = useSerialMessageManagerContext()

	const rssiToSignalQuality = (rssi: number): string => {
		if (rssi > -50) return "Excellent"
		if (rssi > -60) return "Good"
		if (rssi > -70) return "Fair"
		return "Poor"
	}

	if (serialMessageManager.isScanning) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-sm text-muted-foreground">Scanning for networks...</div>
			</div>

		)
	} else if (serialMessageManager.scannedNetworks.length === 0) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed border-gray-300 rounded-lg text-center">
				Click "Scan Networks" to find nearby WiFi networks
			</div>
		)
	}

	return (
		<div className="space-y-2 max-h-60 overflow-y-auto">
			{serialMessageManager.scannedNetworks.map((network, index) => (
				<div
					key={`${network.ssid}-${index}`}
					className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
					onClick={() => {
						// TODO: Handle network selection for connection
						console.log("Selected network:", network.ssid)
					}}
				>
					<div>
						<div className="font-medium text-sm">{network.ssid}</div>
						<div className="text-xs text-gray-500">
							{network.encrypted ? "🔒 Secured" : "🔓 Open"} • {network.rssi} dBm
						</div>
					</div>
					<div className="text-xs text-gray-400">
						{rssiToSignalQuality(network.rssi)}
					</div>
				</div>
			))}
		</div>
	)
}

export default observer(ScanNetworksSection)
