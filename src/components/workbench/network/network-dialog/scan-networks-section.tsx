"use client"

import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { ChevronRight, Lock, Wifi, WifiHigh, WifiLow } from "lucide-react"
import { ScannedWiFiNetworkItem } from "@bluedotrobots/common-ts"
import { Input } from "../../../shadcn/ui/input"
import { Button } from "../../../shadcn/ui/button"
import { useSerialManagerContext } from "../../../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../../../contexts/serial-message-manager"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../shadcn/ui/collapsible"

interface ScanNetworksSectionProps {
    networks?: ScannedWiFiNetworkItem[]
}

// eslint-disable-next-line max-lines-per-function
function ScanNetworksSection({ networks }: ScanNetworksSectionProps) {
	const serialMessageManager = useSerialMessageManagerContext()
	const networksToShow = networks || serialMessageManager.scannedNetworks

	const [selectedNetworkIndex, setSelectedNetworkIndex] = useState<number | null>(null)
	const [password, setPassword] = useState("")
	const [isConnecting, setIsConnecting] = useState(false)
	const serialManager = useSerialManagerContext()

	const getWiFiStrengthIcon = (rssi: number) => {
		if (rssi > -50) {
			return <Wifi className="h-4 w-4 text-gray-700" />
		} else if (rssi > -60) {
			return <WifiHigh className="h-4 w-4 text-gray-600" />
		}
		return <WifiLow className="h-4 w-4 text-gray-500" />
	}

	const handleConnectToNetwork = useCallback((network: ScannedWiFiNetworkItem) => {
		if (!serialManager.connected) return
		if (network.encrypted && !password.trim()) return  // Only check password for encrypted networks

		setIsConnecting(true)

		try {
			// TODO: Send connect message to ESP32
			console.log(`Connecting to ${network.ssid} with password: ${network.encrypted ? password : ""}`)

			// Reset form after connection attempt
			setSelectedNetworkIndex(null)
			setPassword("")
		} catch (error) {
			console.error("Failed to connect to network:", error)
		} finally {
			setIsConnecting(false)
		}
	}, [serialManager, password])

	if (serialMessageManager.isScanning) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-sm text-muted-foreground">Scanning for networks...</div>
			</div>
		)
	} else if (networksToShow.length === 0) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed border-gray-300
			dark:border-gray-700 rounded-lg text-center">
				Click "Scan Networks" to find nearby WiFi networks
			</div>
		)
	}

	return (
		<div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-inherit">
			{networksToShow.map((network, index) => (
				<Collapsible
					key={`${network.ssid}-${index}`}
					open={selectedNetworkIndex === index}
					onOpenChange={(open) => {
						if (open) {
							setSelectedNetworkIndex(index)
							setPassword("")
						} else {
							setSelectedNetworkIndex(null)
							setPassword("")
						}
					}}
				>
					<CollapsibleTrigger asChild>
						<div className="flex items-center justify-between p-3 bg-inherit hover:bg-gray-50 dark:hover:bg-gray-800
						cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0">
							<div className="flex items-center gap-3">
								{getWiFiStrengthIcon(network.rssi)}
								<span className="font-medium text-sm">{network.ssid}</span>
							</div>
							<div className="flex items-center gap-2">
								{network.encrypted && <Lock className="h-4 w-4 text-gray-500" />}
								<ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${
									selectedNetworkIndex === index ? "rotate-90" : ""
								}`} />
							</div>
						</div>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<div className="px-3 pb-3 pt-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
							<div className="flex items-center gap-2">
								{network.encrypted && (  // Add this condition
									<Input
										type="password"
										placeholder="Enter password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="flex-1 h-8 text-sm"
										disabled={isConnecting}
										onKeyDown={(e) => {
											if (e.key === "Enter" && password.trim()) {
												handleConnectToNetwork(network)
											}
										}}
									/>
								)}
								<Button
									onClick={() => handleConnectToNetwork(network)}
									disabled={network.encrypted ? !password.trim() : false || isConnecting}
									className={`h-8 px-3 text-sm ${!network.encrypted ? "ml-auto" : ""}`}  // Add margin for open networks
									size="sm"
								>
									{isConnecting ? "Connecting..." : "Connect"}
								</Button>
							</div>
						</div>
					</CollapsibleContent>
				</Collapsible>
			))}
		</div>
	)
}

export default observer(ScanNetworksSection)
