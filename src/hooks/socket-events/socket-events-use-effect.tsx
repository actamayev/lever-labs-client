import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import { useSocketContext } from "../../contexts/socket-context"
import useHandlePipStatusUpdate from "./handle-pip-status-update"
import useHandleMotorControlAck from "./handle-motor-control-ack"

export default function useSocketEventsUseEffect(): void {
	const socketClass = useSocketContext()
	const handlePipStatusUpdate = useHandlePipStatusUpdate()
	const handleMotorControlAck = useHandleMotorControlAck()

	useEffect(() => {
		if (isNull(socketClass.accessToken)) return

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)
		socketClass.on("motorControlAck", handleMotorControlAck)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate) // Remove listener when the component unmounts
			socketClass.off("motorControlAck", handleMotorControlAck) // Remove listener when the component unmounts
		}
	}, [handlePipStatusUpdate, handleMotorControlAck, socketClass])
}
