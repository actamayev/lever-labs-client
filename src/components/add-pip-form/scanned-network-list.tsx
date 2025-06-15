/* eslint-disable max-lines-per-function */
"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useState, useCallback, useEffect } from "react"
import { Control, UseFormSetValue, useWatch } from "react-hook-form"
import { ChevronRight, Eye, EyeOff, Lock } from "lucide-react"
import { ScannedWiFiNetworkItem, MessageBuilder, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import NetworkStrengthIcon from "../network-strength-icon"
import UploadWiFiCredentials from "./upload-wifi-credentials"
import { useSerialManagerContext } from "../../classes/serial-manager-context"
import { useSerialMessageManagerContext } from "../../classes/serial-message-manager"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../shadcn/ui/collapsible"

interface ScannedNetworksListProps {
	control: Control<IncompletePipData>
	setValue: UseFormSetValue<IncompletePipData>
	selectedNetworkIndex: number | null
	setSelectedNetworkIndex: (index: number | null) => void
}

function ScannedNetworksList({ control, setValue, selectedNetworkIndex, setSelectedNetworkIndex }: ScannedNetworksListProps) {
	const serialMessageManager = useSerialMessageManagerContext()
	const serialManager = useSerialManagerContext()
	const [showPassword, setShowPassword] = useState(false)

	// Watch the password field for real-time updates
	const watchedPassword = useWatch({
		control,
		name: "selectedWiFiPassword",
		defaultValue: ""
	})

	// Listen for WiFi connection results
	useEffect(() => {
		serialMessageManager.onWiFiConnectionResult = (status: WiFiConnectionStatus) => {
			serialMessageManager.setIsTestingWiFiConnection(false)
			serialMessageManager.setWiFiConnectionStatus(status)
		}

		return () => {
			serialMessageManager.onWiFiConnectionResult = null
		}
	}, [serialMessageManager])

	const handleNetworkSelect = useCallback((network: ScannedWiFiNetworkItem, index: number) => {
		// Set the form values when a network is selected
		setValue("selectedWiFiNetworkName", network.ssid)

		setSelectedNetworkIndex(index)
		setValue("selectedWiFiPassword", "")
		setShowPassword(false)
	}, [setSelectedNetworkIndex, setValue])

	// Upload credentials function
	const uploadCredentials = useCallback(async (network: ScannedWiFiNetworkItem, networkPassword: string) => {
		if (!network.ssid) return

		serialMessageManager.setIsTestingWiFiConnection(true)
		serialMessageManager.setWiFiConnectionStatus(null) // Reset status

		const message = MessageBuilder.createWiFiCredentialsMessage(
			network.ssid,
			networkPassword || ""
		)
		const success = await serialManager.sendBinaryMessage(message)

		if (!success) {
			serialMessageManager.setIsTestingWiFiConnection(false)
		}
	}, [serialManager, serialMessageManager])

	const handlePasswordSubmit = useCallback(async (network: ScannedWiFiNetworkItem) => {
		// Upload credentials using the watched password value
		await uploadCredentials(network, network.encrypted ? watchedPassword : "")

		// Reset selection
		setValue("selectedWiFiPassword", "")
		setShowPassword(false)
	}, [uploadCredentials, watchedPassword, setValue])

	if (serialMessageManager.isScanning) {
		return (
			<div className="flex items-center justify-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
				<div className="text-lg text-muted-foreground">Scanning for networks...</div>
			</div>
		)
	}

	if (isEmpty(serialMessageManager.scannedNetworks)) {
		return (
			<div
				className="text-lg text-muted-foreground py-4 border border-dashed
				border-gray-300 dark:border-gray-700 rounded-lg text-center"
			>
				No networks found. Try scanning again or use manual entry.
			</div>
		)
	}

	return (
		<div>
			<h4 className="text-xl font-medium mb-3">
				Available Networks ({serialMessageManager.scannedNetworksByRssiStrength.length})
			</h4>
			<div className="max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
				{serialMessageManager.scannedNetworksByRssiStrength.map((network, index) => (
					<Collapsible
						key={`${network.ssid}-${index}`}
						open={selectedNetworkIndex === index}
						onOpenChange={(open) => {
							if (open) {
								handleNetworkSelect(network, index)
							} else {
								setSelectedNetworkIndex(null)
								setValue("selectedWiFiPassword", "")
								setShowPassword(false)
							}
						}}
					>
						<CollapsibleTrigger asChild>
							<div
								className="flex items-center justify-between p-4 bg-inherit hover:bg-gray-50
								dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
							>
								<div className="flex items-center gap-3">
									<NetworkStrengthIcon rssi={network.rssi} />
									<span className="font-medium text-lg">{network.ssid}</span>
								</div>
								<div className="flex items-center gap-2">
									{network.encrypted && <Lock className="h-5 w-5 text-gray-500" />}
									<ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
										selectedNetworkIndex === index ? "rotate-90" : ""
									}`} />
								</div>
							</div>
						</CollapsibleTrigger>

						<CollapsibleContent>
							<div className="px-4 pb-4 pt-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
								{!network.encrypted ? (
									<div className="space-y-3">
										<div className="text-lg text-green-600 mb-2">
											✓ Open network - no password required
										</div>
										<Button
											onClick={async () => {
												// Update form values
												setValue("selectedWiFiNetworkName", network.ssid)
												setValue("selectedWiFiPassword", "")
												// Upload credentials
												await uploadCredentials(network, "")
											}}
											disabled={serialMessageManager.isTestingWiFiConnection}
											className="h-12 px-6 text-lg"
											size="lg"
										>
											{serialMessageManager.isTestingWiFiConnection ? "Testing..." : "Connect"}
										</Button>
										<UploadWiFiCredentials />
									</div>
								) : (
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<div className="relative flex-1">
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Enter WiFi password"
													value={watchedPassword || ""}
													onChange={(e) => setValue("selectedWiFiPassword", e.target.value)}
													className="h-12 !text-xl pr-12"
													onKeyDown={(e) => {
														if (e.key === "Enter" && watchedPassword) {
															handlePasswordSubmit(network)
														}
													}}
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1.5 hover:bg-gray-100"
													onClick={() => setShowPassword(prevState => !prevState)}
												>
													{showPassword ? (
														<EyeOff className="h-5 w-5 md:!h-6 md:!w-6" />
													) : (
														<Eye className="h-5 w-5 md:!h-6 md:!w-6" />
													)}
												</Button>
											</div>
											<Button
												onClick={() => handlePasswordSubmit(network)}
												disabled={!watchedPassword || serialMessageManager.isTestingWiFiConnection}
												className="h-12 px-6 text-lg"
												size="lg"
											>
												{serialMessageManager.isTestingWiFiConnection ? "Testing..." : "Connect"}
											</Button>
										</div>
										<UploadWiFiCredentials />
									</div>
								)}
							</div>
						</CollapsibleContent>
					</Collapsible>
				))}
			</div>
		</div>
	)
}

export default observer(ScannedNetworksList)
