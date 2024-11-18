import _ from "lodash"
import { useEffect } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useNotificationsContext } from "../../contexts/notifications-context"

export default function useSocketEventsUseEffect(): void {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const notificationsClass = useNotificationsContext()

	useEffect(() => {
		if (_.isNull(socketClass.accessToken)) return
		const handlePipStatusUpdate = (data: PipStatusUpdate): void => {
			pipClass.updatePipConnectionStatus(data)
			const { newConnectionStatus } = data
			if (newConnectionStatus === "online") {
				notificationsClass.setPositiveNotification(`${pipClass.findPipNameFromUUID(data.pipUUID)} is online.`)
				// TODO: Add a button in the notification to connect
			} else if (newConnectionStatus === "inactive") {
				notificationsClass.setNeutralNotification(
					`${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet.`
				)
			} else if (newConnectionStatus === "connected") {
				notificationsClass.setSuperPositiveNotification(
					`Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`
				)
			}
		}

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate) // Remove listener when the component unmounts
		}
	}, [notificationsClass, pipClass, socketClass])
}
