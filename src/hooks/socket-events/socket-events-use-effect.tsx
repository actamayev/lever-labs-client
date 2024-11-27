import _ from "lodash"
import { useEffect } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { Button } from "../../components/shadcn/ui/button"
import useStyledToast from "../../components/toast-options"
import { useSocketContext } from "../../contexts/socket-context"
import { ToastActionElement } from "../../components/shadcn/ui/toast"
import useRequestToConnectToPip from "../pip/request-to-connect-to-pip"

export default function useSocketEventsUseEffect(): void {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const toast = useStyledToast()
	const requestToConnectToPip = useRequestToConnectToPip()

	useEffect(() => {
		if (_.isNull(socketClass.accessToken)) return
		const handlePipStatusUpdate = (data: PipStatusUpdate): void => {
			pipClass.updatePipConnectionStatus(data)
			const { newConnectionStatus } = data
			if (newConnectionStatus === "online") {
				const actionElement = (
						<Button
							onClick={() => requestToConnectToPip(data.pipUUID)}
							className="bg-white hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 text-black dark:text-white"
						>
							Connect
						</Button>
				) as ToastActionElement

				toast.positive({
					description: `${pipClass.findPipNameFromUUID(data.pipUUID)} is online.`,
					action: actionElement
				})
			} else if (newConnectionStatus === "inactive") {
				toast.neutral({
					description: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet.`
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
