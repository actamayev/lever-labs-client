"use client"

import { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { observer } from "mobx-react"
import { Button } from "../../../shadcn/ui/button"
import ForgetNetworkDialog from "./forget-network-dialog"
import forgetNetwork from "../../../../utils/workbench/forget-network"
import serialMessageManagerClass from "../../../../classes/serial-message-manager-class"

function PreviouslyConnectedSection(): React.ReactNode {
	const [forgetDialogOpen, setForgetDialogOpen] = useState(false)
	const [selectedNetworkSSID, setSelectedNetworkSSID] = useState<string>("")
	const [processingNetworkSSID, setProcessingNetworkSSID] = useState<string | null>(null)

	const handleForgetClick = (networkSSID: string): void => {
		setSelectedNetworkSSID(networkSSID)
		setForgetDialogOpen(true)
	}

	const handleConfirmForget = async (): Promise<void> => {
		setProcessingNetworkSSID(selectedNetworkSSID)
		try {
			await forgetNetwork(selectedNetworkSSID)
		} finally {
			setProcessingNetworkSSID(null)
		}
	}

	if (isEmpty(serialMessageManagerClass.previouslyConnected)) {
		return (
			<div className="text-sm text-muted-foreground py-4 border border-dashed
			border-gray-300 dark:border-gray-700 rounded-lg text-center">
				No previously connected networks
			</div>
		)
	}

	return (
		<>
			<div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-lg bg-inherit">
				{serialMessageManagerClass.previouslyConnected.map((network): React.ReactNode => (
					<div
						key={`previous-${network.index}`}
						className="flex items-center justify-between p-3 border-b border-polar last:border-b-0"
					>
						<div className="flex flex-col">
							<span className="font-medium text-sm text-eel">{network.ssid}</span>
							<span className="text-xs text-gray-400">Not in range</span>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={(): void => handleForgetClick(network.ssid)}
							disabled={processingNetworkSSID === network.ssid}
							className="text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
							disabled:opacity-50"
						>
							{processingNetworkSSID === network.ssid ? "Forgetting..." : "Forget"}
						</Button>
					</div>
				))}
			</div>

			<ForgetNetworkDialog
				open={forgetDialogOpen}
				onOpenChange={setForgetDialogOpen}
				networkSSID={selectedNetworkSSID}
				onConfirm={handleConfirmForget}
			/>
		</>
	)
}

export default observer(PreviouslyConnectedSection)
