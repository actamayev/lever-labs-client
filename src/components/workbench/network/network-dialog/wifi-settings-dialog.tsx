"use client"

import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { Button } from "../../../shadcn/ui/button"
import ScanNetworksSection from "./scan-networks-section"
import KnownNetworksSection from "./known-networks-section"
import useScanForNetworks from "../../../../hooks/scan-for-networks"
import PreviouslyConnectedSection from "./previously-connected-section"
import serialMessageManagerClass from "../../../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../../../classes/serial-connection-manager-class"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../../shadcn/ui/dialog"

interface WiFiSettingsDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

// eslint-disable-next-line max-lines-per-function
function WiFiSettingsDialog({ open, onOpenChange }: WiFiSettingsDialogProps) {
	// Use the custom hook
	const { scanForNetworks } = useScanForNetworks()

	const requestSavedNetworks = useCallback(async () => {
		if (!serialConnectionManagerClass.connected) return

		serialMessageManagerClass.setIsLoadingSavedNetworks(true)

		try {
			console.log("Requesting saved networks...")
			// Send the message to request saved networks
			const message = MessageBuilder.createGetSavedWiFiNetworks()
			await serialConnectionManagerClass.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to request saved networks:", error)
			serialMessageManagerClass.setIsLoadingSavedNetworks(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialConnectionManagerClass.connected])

	// Request saved networks when dialog opens
	useEffect(() => {
		if (open && serialConnectionManagerClass.connected) {
			requestSavedNetworks()
		}
	}, [open, requestSavedNetworks])

	if (!serialConnectionManagerClass.connected) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>WiFi Settings</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-6">
					{serialMessageManagerClass.isLoadingSavedNetworks ? (
						<div className="flex items-center justify-center py-8">
							<div className="text-sm text-muted-foreground">Loading saved networks...</div>
						</div>
					) : (
						<>
							{/* Known Networks Section */}
							<div>
								<h3 className="text-lg font-medium mb-3">Known Networks</h3>
								<KnownNetworksSection />
							</div>

							{/* Other Networks Section */}
							<div>
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-lg font-medium">Other Networks</h3>
									<Button
										onClick={scanForNetworks}
										disabled={serialMessageManagerClass.isScanning}
										className="flex items-center gap-2"
										variant="outline"
									>
										<Wifi className="h-4 w-4" />
										{serialMessageManagerClass.isScanning ? "Scanning..." : "Scan Networks"}
									</Button>
								</div>
								<ScanNetworksSection />
							</div>

							{/* Previously Connected Section */}
							<div>
								<h3 className="text-lg font-medium mb-3">Previously Connected</h3>
								<PreviouslyConnectedSection />
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(WiFiSettingsDialog)
