"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { Check } from "lucide-react"
import serialMessageManagerClass from "../../../../classes/serial-message-manager-class"
import NetworkStrengthIcon from "../../../network-strength-icon"

function KnownNetworksSection() {
	if (isEmpty(serialMessageManagerClass.knownNetworks)) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed
			border-gray-300 dark:border-gray-700 rounded-lg text-center">
				No known networks nearby
			</div>
		)
	}

	return (
		<div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white">
			{serialMessageManagerClass.knownNetworks.map((network, index) => (
				<div
					key={`known-${network.ssid}-${index}`}
					className="flex items-center justify-between p-3 border-b border-polar last:border-b-0"
				>
					<div className="flex items-center gap-3">
						<NetworkStrengthIcon rssi={network.rssi} />
						<span className="font-medium text-sm">{network.ssid}</span>
					</div>
					<Check className="h-4 w-4 text-green-600" />
				</div>
			))}
		</div>
	)
}

export default observer(KnownNetworksSection)
