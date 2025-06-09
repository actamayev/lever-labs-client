"use client"

import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import { useCallback, useEffect, useRef } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { Button } from "../../../shadcn/ui/button"
import ScanNetworksSection from "./scan-networks-section"
import KnownNetworksSection from "./known-networks-section"
import PreviouslyConnectedSection from "./previously-connected-section"
import { useSerialManagerContext } from "../../../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../../../contexts/serial-message-manager"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../../shadcn/ui/dialog"

interface WiFiSettingsDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

// eslint-disable-next-line max-lines-per-function
function WiFiSettingsDialog({ open, onOpenChange }: WiFiSettingsDialogProps) {
	const serialManager = useSerialManagerContext()
	const serialMessageManager = useSerialMessageManagerContext()
	const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const requestSavedNetworks = useCallback(async () => {
		if (!serialManager.connected) return

		serialMessageManager.setIsLoadingSavedNetworks(true)

		try {
			const message = MessageBuilder.createGetSavedWiFiNetworks()
			await serialManager.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to request saved networks:", error)
			serialMessageManager.setIsLoadingSavedNetworks(false)
		}
	}, [serialManager, serialMessageManager])

	const scanForNetworks = useCallback(async () => {
		if (!serialManager.connected || serialMessageManager.isScanning) return

		serialMessageManager.setIsScanning(true)
		serialMessageManager.clearScannedNetworks()

		// Set 10-second timeout
		scanTimeoutRef.current = setTimeout(() => {
			if (serialMessageManager.isScanning) {
				serialMessageManager.setIsScanning(false)
				console.error("WiFi scan timed out after 10 seconds")
				// You could also show a toast notification here
			}
		}, 10000)

		try {
			const message = MessageBuilder.createScanWiFiNetworksMessage()
			await serialManager.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to scan for networks:", error)
			serialMessageManager.setIsScanning(false)
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (scanTimeoutRef.current) {
				clearTimeout(scanTimeoutRef.current)
				scanTimeoutRef.current = null
			}
		}
	}, [serialManager, serialMessageManager])

	// Request saved networks when dialog opens
	useEffect(() => {
		if (open && serialManager.connected) {
			requestSavedNetworks()
		}
	}, [open, requestSavedNetworks, serialManager.connected])

	// Clear timeout when scanning completes or component unmounts
	useEffect(() => {
		if (!serialMessageManager.isScanning && scanTimeoutRef.current) {
			clearTimeout(scanTimeoutRef.current)
			scanTimeoutRef.current = null
		}
	}, [serialMessageManager.isScanning])

	useEffect(() => {
		return () => {
			if (scanTimeoutRef.current) {
				clearTimeout(scanTimeoutRef.current)
			}
		}
	}, [])

	if (!serialManager.connected) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>WiFi Settings</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-6">
					{serialMessageManager.isLoadingSavedNetworks ? (
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
										disabled={serialMessageManager.isScanning}
										className="flex items-center gap-2"
										variant="outline"
									>
										<Wifi className="h-4 w-4" />
										{serialMessageManager.isScanning ? "Scanning..." : "Scan Networks"}
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
