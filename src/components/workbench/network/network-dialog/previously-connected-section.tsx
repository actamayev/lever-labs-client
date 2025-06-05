"use client"

import { observer } from "mobx-react"
import { SavedWiFiNetwork } from "@bluedotrobots/common-ts"

interface PreviouslyConnectedSectionProps {
    networks: SavedWiFiNetwork[]
}

function PreviouslyConnectedSection({ networks }: PreviouslyConnectedSectionProps) {
	if (networks.length === 0) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed
			border-gray-300 dark:border-gray-700 rounded-lg text-center">
                No previously connected networks
			</div>
		)
	}

	return (
		<div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white">
			{networks.map((network) => (
				<div
					key={`previous-${network.index}`}
					className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
				>
					<span className="font-medium text-sm text-gray-600">{network.ssid}</span>
					<span className="text-xs text-gray-400">Not in range</span>
				</div>
			))}
		</div>
	)
}

export default observer(PreviouslyConnectedSection)
