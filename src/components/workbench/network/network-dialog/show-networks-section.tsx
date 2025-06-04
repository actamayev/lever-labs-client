"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useSerialMessageManagerContext } from "../../../../contexts/serial-message-manager"

function ShowNetworksSection () {
	const serialMessageManager = useSerialMessageManagerContext()

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
}

export default observer(ShowNetworksSection)
