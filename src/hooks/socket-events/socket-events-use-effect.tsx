"use client"

import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import socketClass from "../../classes/socket-class"
import handlePipStatusUpdate from "../../utils/socket/handle-pip-status-update"
import handleIncomingSensorData from "../../utils/socket/handle-incoming-sensor-data"

export default function useSocketEventsUseEffect(): void {
	useEffect(() => {
		if (!authClass.isLoggedIn) return

		// Listen for the 'pipStatusUpdate' event emitted from SocketClass
		socketClass.on("pipStatusUpdate", handlePipStatusUpdate)
		socketClass.on("incomingSensorData", handleIncomingSensorData)

		return (): void => {
			socketClass.off("pipStatusUpdate", handlePipStatusUpdate)
			socketClass.off("incomingSensorData", handleIncomingSensorData)
		}
	}, [])
}
