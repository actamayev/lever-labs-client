"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useCallback, useState } from "react"
import { ChevronRight, Eye, EyeOff, Lock } from "lucide-react"
import { MessageBuilder, ScannedWiFiNetworkItem } from "@bluedotrobots/common-ts"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import NetworkStrengthIcon from "../../network-strength-icon"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"
import serialMessageManagerClass from "../../../classes/serial-message-manager-class"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../shadcn/ui/collapsible"

// eslint-disable-next-line max-lines-per-function
function ScanNetworksSection() {
	const [selectedNetworkIndex, setSelectedNetworkIndex] = useState<number | null>(null)
	const [password, setPassword] = useState("")
	const [isConnecting, setIsConnecting] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const handleConnectToNetwork = useCallback(async (network: ScannedWiFiNetworkItem) => {
		if (
			!serialConnectionManagerClass.connected ||
			(network.encrypted && !password.trim())
		) return

		setIsConnecting(true)

		try {
			const message = MessageBuilder.createWiFiCredentialsMessage(
				network.ssid,
				password.trim()
			)
			const success = await serialConnectionManagerClass.sendBinaryMessage(message)
			if (success) {
				// Add to saved networks (this will make it appear in knownNetworks)
				serialMessageManagerClass.addSavedNetwork({
					ssid: network.ssid,
					index: 0 // or appropriate index
				})
				// Don't remove from scannedNetworks - keep it there
				setPassword("") // Only clear password
				setSelectedNetworkIndex(null)
			}
		} catch (error) {
			console.error("Failed to connect to network:", error)
		} finally {
			setIsConnecting(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password, serialConnectionManagerClass.connected])

	if (serialMessageManagerClass.isScanning) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-sm text-muted-foreground">Scanning for networks...</div>
			</div>
		)
	} else if (isEmpty(serialMessageManagerClass.otherNetworks)) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed border-gray-300
			dark:border-gray-700 rounded-lg text-center">
				Click "Scan Networks" to find nearby WiFi networks
			</div>
		)
	}

	return (
		<div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-inherit">
			{serialMessageManagerClass.otherNetworks.map((network, index) => (
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
								<NetworkStrengthIcon rssi={network.rssi} />
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
									<div className="relative w-full">
										<Input
											type={showPassword ? "text" : "password"}
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
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-swan"
											onClick={() => setShowPassword(prevState => !prevState)}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 md:!h-4 md:!w-4" />
											) : (
												<Eye className="h-4 w-4 md:!h-4 md:!w-4" />
											)}
										</Button>
									</div>
								)}
								<Button
									onClick={(e) => {
										e.stopPropagation() // Add this to prevent event bubbling
										handleConnectToNetwork(network)
									}}
									disabled={(network.encrypted && !password.trim()) || isConnecting}
									className={`h-8 px-3 text-sm ${network.encrypted ? "" : "ml-auto"}`}
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
