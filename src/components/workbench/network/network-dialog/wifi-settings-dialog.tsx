"use client"

import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useCallback, useEffect } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import { Button } from "../../../shadcn/ui/button"
import ScanNetworksSection from "./scan-networks-section"
import KnownNetworksSection from "./known-networks-section"
import workbenchClass from "../../../../classes/workbench-class"
import useScanForNetworks from "../../../../hooks/use-scan-for-networks"
import PreviouslyConnectedSection from "./previously-connected-section"
import serialMessageManagerClass from "../../../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../../../classes/serial-connection-manager-class"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../../shadcn/ui/dialog"

function WiFiSettingsDialog(): React.ReactNode {
	// Use the custom hook
	const { scanForNetworks } = useScanForNetworks()

	const requestSavedNetworksAndWiFiScan = useCallback(async (): Promise<void> => {
		if (!serialConnectionManagerClass.pipTurnedOn) return

		serialMessageManagerClass.setIsLoadingSavedNetworks(true)

		try {
			const message = MessageBuilder.createGetSavedWiFiNetworks()
			await serialConnectionManagerClass.sendBinaryMessage(message)
			void scanForNetworks("soft")
		} catch (error) {
			console.error("Failed to request saved networks:", error)
			serialMessageManagerClass.setIsLoadingSavedNetworks(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialConnectionManagerClass.pipTurnedOn])

	// Request saved networks when dialog opens
	useEffect((): void => {
		if (workbenchClass.isWiFiDialogOpen && serialConnectionManagerClass.pipTurnedOn) {
			void requestSavedNetworksAndWiFiScan()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestSavedNetworksAndWiFiScan, workbenchClass.isWiFiDialogOpen, serialConnectionManagerClass.pipTurnedOn])

	if (!serialConnectionManagerClass.pipTurnedOn) return null

	return (
		<Dialog open={workbenchClass.isWiFiDialogOpen} onOpenChange={workbenchClass.setIsWiFiDialogOpen}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Wi-Fi Settings</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-6">
					{serialMessageManagerClass.isLoadingSavedNetworks ? (
						<div className="flex items-center justify-center py-8">
							<div className="text-sm text-muted-foreground">Loading saved networks...</div>
						</div>
					) : (
						<>
							<div>
								<h3 className="text-lg font-medium mb-3">
									Known Networks
									{!isEmpty(serialMessageManagerClass.knownNetworks) && (
										<>
											{" "}({serialMessageManagerClass.knownNetworks.length})
										</>
									)}
								</h3>
								<KnownNetworksSection />
							</div>

							<div>
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-lg font-medium">
										Other Networks
										{!serialMessageManagerClass.isScanning && (
											<>
												{" "}({serialMessageManagerClass.scannedNetworksByRssiStrength.length})
											</>
										)}

									</h3>
									<Button
										onClick={async(): Promise<void> => await scanForNetworks("hard")}
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
								<h3 className="text-lg font-medium mb-3">
									Previously Connected
									{!isEmpty(serialMessageManagerClass.previouslyConnected) && (
										<>
											{" "}({serialMessageManagerClass.previouslyConnected.length})
										</>
									)}
								</h3>
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
