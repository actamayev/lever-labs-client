"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useCallback, useEffect } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { useSerialManagerContext } from "../../../contexts/serial-manager-context"
import { useSerialMessageManagerContext } from "../../../contexts/serial-message-manager"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../shadcn/ui/dialog"

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

	// Request saved networks when dialog opens
	useEffect(() => {
		if (open && serialManager.connected) {
			requestSavedNetworks()
		}
	}, [open, requestSavedNetworks, serialManager.connected])

	if (!serialManager.connected) return null

	const ShowNetworksSection  = observer(() => {
		if (serialMessageManager.isLoadingSavedNetworks) {
			return (
				<div className="flex items-center justify-center py-8">
					<div className="text-sm text-muted-foreground">Loading saved networks...</div>
				</div>
			)
		}

		if (isEmpty(serialMessageManager.savedNetworks)) {
			return (
				<div className="text-sm text-muted-foreground py-4 border border-dashed border-gray-300 rounded-lg text-center">
					No saved networks found
				</div>
			)
		}

		return (
			<div className="space-y-2">
				{serialMessageManager.savedNetworks.map((network) => (
					<div
						key={network.index}
						className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
					>
						<div className="font-medium text-sm">{network.ssid}</div>
					</div>
				))}
			</div>
		)
	})

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
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(WiFiSettingsDialog)
