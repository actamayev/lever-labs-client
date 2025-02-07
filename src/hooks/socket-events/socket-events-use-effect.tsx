import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import { useSocketContext } from "../../contexts/socket-context"
import useHandlePipStatusUpdate from "./handle-pip-status-update"

export default function useSocketEventsUseEffect(): void {
	const socketClass = useSocketContext()
	const handlePipStatusUpdate = useHandlePipStatusUpdate()

	useEffect(() => {
		if (isNull(socketClass.accessToken)) return

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate) // Remove listener when the component unmounts
		}
	}, [handlePipStatusUpdate, socketClass])
}
