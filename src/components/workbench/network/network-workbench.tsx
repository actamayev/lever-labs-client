"use client"

import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import toUpper from "lodash-es/toUpper"
import NetworkIcon from "./network-icon"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import WorkbenchCardTemplate from "../workbench-card-template"
import useDisconnectFromPip from "../../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../../hooks/pip/request-to-connect-to-pip"
import useSetSelectedPipToFirstPip from "../../../hooks/pip/set-default-pip-first-pip"

function NetworkWorkbench() {
	const pipClass = usePipContext()
	const diconnectFromPip = useDisconnectFromPip()
	const requestToConnectToPip = useRequestToConnectToPip()
	useSetSelectedPipToFirstPip()

	const NetworkStatus = observer(() => {
		let extraClasses = ""
		if (isNull(pipClass.selectedPip)) return null

		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "offline":
			extraClasses = "text-cardinal bg-cardinal/10"
			break
		case "online":
			extraClasses = "bg-macaw bg-macaw/10"
			break
		case "connected to other user":
			extraClasses = "bg-beetle bg-beetle/10"
			break
		case "connected":
			extraClasses = "bg-green-500 bg-green-500/10"
			break
		default:
			extraClasses = "bg-wolf bg-wolf/10"
		}

		return (
			<div className={cn("py-0.5 px-3 text-base rounded-lg inline-block", extraClasses)}>
				{toUpper(pipClass.selectedPip.pipConnectionStatus)}
			</div>
		)
	})

	const SecondRow = observer(() => {
		const selectedPip = pipClass.selectedPip
		if (isNull(selectedPip)) return null
		switch (selectedPip.pipConnectionStatus) {
		case "offline":
			return (
				<div className="text-base">
					Please connect {selectedPip.pipName} to the internet
				</div>
			)
		case "online":
			return (
				<Button
					onClick={() => requestToConnectToPip(selectedPip.pipUUID)}
					className="rounded-xl bg-eel"
				>
					CONNECT
				</Button>
			)
		case "connected to other user":
			return null
		case "connected":
			return (
				<Button
					onClick={() => diconnectFromPip(selectedPip)}
					className="rounded-xl bg-eel"
				>
					DISCONNECT
				</Button>
			)
		default: return null
		}
	})

	return (
		<WorkbenchCardTemplate>
			<div className="flex items-center">
				<NetworkIcon />
				<div className="ml-4 w-full max-w-sm">
					<div className="mb-2">
						<NetworkStatus />
					</div>
					<div className="flex items-center gap-2 h-8">
						<SecondRow />
					</div>
				</div>
			</div>
		</WorkbenchCardTemplate>
	)
}

export default observer(NetworkWorkbench)
