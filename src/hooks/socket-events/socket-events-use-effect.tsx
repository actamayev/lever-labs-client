"use client"

import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import socketClass from "../../classes/socket-class"
import useHandlePipStatusUpdate from "./handle-pip-status-update"
import useHandleIncomingSensorData from "./handle-incoming-sensor-data"

export default function useSocketEventsUseEffect(): void {
	const handlePipStatusUpdate = useHandlePipStatusUpdate()
	const handleIncomingSensorData = useHandleIncomingSensorData()

	useEffect(() => {
		if (isNull(socketClass.accessToken)) return

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)
		socketClass.on("incomingSensorData", handleIncomingSensorData)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate)
			socketClass.off("incomingSensorData", handleIncomingSensorData)
		}
	}, [handlePipStatusUpdate, socketClass, handleIncomingSensorData])
}
