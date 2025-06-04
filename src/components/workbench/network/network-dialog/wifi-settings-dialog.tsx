"use client"

import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { useSerialManagerContext } from "../../../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../../../contexts/serial-message-manager"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../../shadcn/ui/dialog"
import ShowNetworksSection from "./show-networks-section"
import { Button } from "../../../shadcn/ui/button"
import ScanNetworksSection from "./scan-networks-section"

interface WiFiSettingsDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

function WiFiSettingsDialog({ open, onOpenChange }: WiFiSettingsDialogProps) {
	const serialManager = useSerialManagerContext()
	const serialMessageManager = useSerialMessageManagerContext()

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
		serialMessageManager.clearScannedNetworks() // Clear before starting new scan

		try {
			const message = MessageBuilder.createScanWiFiNetworksMessage()
			await serialManager.sendBinaryMessage(message)
		} catch (error) {
			console.error("Failed to scan for networks:", error)
			serialMessageManager.setIsScanning(false)
		}
	}, [serialManager, serialMessageManager])

	// Request saved networks when dialog opens
	useEffect(() => {
		if (open && serialManager.connected) {
			requestSavedNetworks()
		}
	}, [open, requestSavedNetworks, serialManager.connected])

	if (!serialManager.connected) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>WiFi Settings</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-6">
					{/* Saved Networks Section */}
					<div>
						<h3 className="text-lg font-medium mb-3">Saved Networks</h3>

						<ShowNetworksSection />
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-lg font-medium">Add New Network</h3>
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
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(WiFiSettingsDialog)
