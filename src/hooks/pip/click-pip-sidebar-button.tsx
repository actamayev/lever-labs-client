"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import useDisconnectFromPip from "./disconnect-from-pip"
import useTypedNavigate from "../navigate/typed-navigate"
import { usePipContext } from "../../contexts/pip-context"
import useRequestToConnectToPip from "./request-to-connect-to-pip"

export default function useClickPipSidebarButton(): () => Promise<void> {
	const pipClass = usePipContext()
	const diconnectFromPip = useDisconnectFromPip()
	const requestToConnectToPip = useRequestToConnectToPip()
	const navigate = useTypedNavigate()

	return useCallback(async () => {
		if (!isNull(pipClass.selectedPip)) {
			if (pipClass.selectedPip.pipConnectionStatus === "connected") {
				return await diconnectFromPip(pipClass.selectedPip)
			} else {
				return await requestToConnectToPip(pipClass.selectedPip.pipUUID)
			}
		}
		// If navigating to /add-pip from a lesson, should go back to that lesson after adding pip
		if (isEmpty(pipClass.pipData)) {
			navigate("/add-pip")
		}
	}, [diconnectFromPip, navigate, pipClass.pipData, pipClass.selectedPip, requestToConnectToPip])
}
