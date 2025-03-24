"use client"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import { Button, buttonVariants } from "../../shadcn/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover"
import NetworkIcon from "./network-icon"
import { usePipContext } from "../../../contexts/pip-context"
import useDisconnectFromPip from "../../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../../hooks/pip/request-to-connect-to-pip"
import useSetSelectedPipToFirstPip from "../../../hooks/pip/set-default-pip-first-pip"

function NetworkWorkbench() {
	const pipClass = usePipContext()
	const diconnectFromPip = useDisconnectFromPip()
	const requestToConnectToPip = useRequestToConnectToPip()
	useSetSelectedPipToFirstPip()

	const SecondRow = observer(() => {
		const selectedPip = pipClass.selectedPip
		if (isNull(selectedPip)) return null
		switch (selectedPip.pipConnectionStatus) {
		case "offline":
			return (
				<div className="text-base font-medium">
					Please connect {selectedPip.pipName} to the internet
				</div>
			)
		case "online":
			return (
				<Button
					onClick={() => requestToConnectToPip(selectedPip.pipUUID)}
					className="rounded-xl bg-eel h-9"
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
		<Popover openOnHover>
			<PopoverTrigger asChild>
				<div
					className={cn(
						buttonVariants({
							variant: "ghost",
							size: "lg",
							className: "hover:bg-polar flex flex-col items-center cursor-default justify-center \
							h-auto hover:text-current rounded-2xl p-0 outline-none"
						})
					)}
				>
					<div className="flex flex-col items-center justify-center w-20 h-20">
						<NetworkIcon />
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<SecondRow />
			</PopoverContent>
		</Popover>
	)
}

export default observer(NetworkWorkbench)
