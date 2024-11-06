import _ from "lodash"
import { useEffect } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { useSocketContext } from "../../contexts/socket-context"

export default function useSocketEventsUseEffect(): void {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()

	useEffect(() => {
		if (_.isNull(socketClass.accessToken)) return
		const handlePipStatusUpdate = (data: PipStatusUpdate): void => {
			pipClass.updatePipConnectionStatus(data)
		}

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate) // Remove listener when the component unmounts
		}
	}, [pipClass, socketClass])
}
