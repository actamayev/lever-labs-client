import _ from "lodash"
import { useEffect } from "react"
import { usePipContext } from "../../contexts/pip-context"
import useStyledToast from "../../components/toast-options"
import { useSocketContext } from "../../contexts/socket-context"

export default function useSocketEventsUseEffect(): void {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const toast = useStyledToast()

	useEffect(() => {
		if (_.isNull(socketClass.accessToken)) return
		const handlePipStatusUpdate = (data: PipStatusUpdate): void => {
			pipClass.updatePipConnectionStatus(data)
			const { newConnectionStatus } = data
			if (newConnectionStatus === "online") {
				toast.positive({
					description: `${pipClass.findPipNameFromUUID(data.pipUUID)} is online.`,
					// action:
					// TODO: Add a button in the notification to connect
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
	}, [pipClass, socketClass, toast])
}
