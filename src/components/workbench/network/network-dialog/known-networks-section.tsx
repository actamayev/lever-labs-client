"use client"

import { observer } from "mobx-react"
import { ScannedWiFiNetworkItem } from "@bluedotrobots/common-ts"
import { Wifi, WifiHigh, WifiLow, Check } from "lucide-react"

interface KnownNetworksSectionProps {
    networks: ScannedWiFiNetworkItem[]
}

function KnownNetworksSection({ networks }: KnownNetworksSectionProps) {
	const getWiFiStrengthIcon = (rssi: number) => {
		if (rssi > -50) {
			return <Wifi className="h-4 w-4 text-gray-700" />
		} else if (rssi > -60) {
			return <WifiHigh className="h-4 w-4 text-gray-600" />
		}
		return <WifiLow className="h-4 w-4 text-gray-500" />
	}

	if (networks.length === 0) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed
			border-gray-300 dark:border-gray-700 rounded-lg text-center">
                No known networks nearby
			</div>
		)
	}

	return (
		<div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white">
			{networks.map((network, index) => (
				<div
					key={`known-${network.ssid}-${index}`}
					className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
				>
					<div className="flex items-center gap-3">
						{getWiFiStrengthIcon(network.rssi)}
						<span className="font-medium text-sm">{network.ssid}</span>
					</div>
					<Check className="h-4 w-4 text-green-600" />
				</div>
			))}
		</div>
	)
}

export default observer(KnownNetworksSection)
