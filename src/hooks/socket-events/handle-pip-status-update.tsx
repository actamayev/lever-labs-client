import { useCallback } from "react"
import { Button } from "../../components/shadcn/ui/button"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import useRequestToConnectToPip from "../pip/request-to-connect-to-pip"

export default function useHandlePipStatusUpdate(): (data: PipStatusUpdate) => void {
	const pipClass = usePipContext()
	const toast = useToastOptions()
	const requestToConnectToPip = useRequestToConnectToPip()

	return useCallback((data: PipStatusUpdate) =>  {
		const previousPipConnectionStatus = pipClass.getPipConnectionStatus(data.pipUUID)
		pipClass.updatePipConnectionStatus(data)
		const { newConnectionStatus } = data
		if (newConnectionStatus === "online") {
			// 1/29/25 TODO: Change this to be a <TactileButton />
			const actionElement = (
				<Button
					onClick={() => requestToConnectToPip(data.pipUUID)}
					className="bg-white hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800
					text-black dark:text-white transition-none"
					variant="tactile"
				>
					{previousPipConnectionStatus === "connected" ? "Reconnect" : "Connect"}
				</Button>
			)

			let title
			if (previousPipConnectionStatus === "connected") {
				title = `Disconnected from ${pipClass.findPipNameFromUUID(data.pipUUID)}`
			} else {
				title = `${pipClass.findPipNameFromUUID(data.pipUUID)} is online. Ready to connect?`
			}

			return toast.positive({
				title,
				action: actionElement
			})
		} else if (newConnectionStatus === "inactive") {
			return toast.neutral({
				title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
			})
		} else if (newConnectionStatus === "connected") {
			return toast.superPositive({
				title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
				description: "Happy building!"
			})
		}
	}, [pipClass, requestToConnectToPip, toast])
}
