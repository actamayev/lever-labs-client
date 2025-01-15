import _ from "lodash"
import { useEffect } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { Button } from "../../components/shadcn/ui/button"
import useToastOptions from "../../components/toast-options"
import { useSocketContext } from "../../contexts/socket-context"
import useRequestToConnectToPip from "../pip/request-to-connect-to-pip"

export default function useSocketEventsUseEffect(): void {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const toast = useToastOptions()
	const requestToConnectToPip = useRequestToConnectToPip()

	useEffect(() => {
		if (_.isNull(socketClass.accessToken)) return
		const handlePipStatusUpdate = (data: PipStatusUpdate): void => {
			const previousPipConnectionStatus = pipClass.getPipConnectionStatus(data.pipUUID)
			pipClass.updatePipConnectionStatus(data)
			const { newConnectionStatus } = data
			if (newConnectionStatus === "online") {
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

				toast.positive({
					title,
					action: actionElement
				})
			} else if (newConnectionStatus === "inactive") {
				toast.neutral({
					title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet.`
				})
			} else if (newConnectionStatus === "connected") {
				toast.superPositive({
					title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
					description: "Happy building!"
				})
			}
		}

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate) // Remove listener when the component unmounts
		}
	}, [pipClass, requestToConnectToPip, socketClass, toast])
}
