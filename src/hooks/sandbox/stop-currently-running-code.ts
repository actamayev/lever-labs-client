"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialManager from "../../classes/serial-manager-class"

export default function useStopCurrentlyRunningCode(): () => Promise<void> {
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			if (serialManager.connected) {
				const buffer = MessageBuilder.createStopSandboxCodeMessage()

				await serialManager.sendBinaryMessage(buffer)
				return
			}
			if (
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			const stopScriptResponse = await blueDotApiClientClass.sandboxDataService.stopCurrentlyRunningCode(
				pipClass.selectedPip.pipUUID
			)

			if (!isEqual(stopScriptResponse.status, 200) || isNonSuccessResponse(stopScriptResponse.data)) {
				throw new Error("Stop currently running code failed")
			}
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to stop currently running code on Pip at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClientClass.sandboxDataService, pipClass.selectedPip, serialManager, toast])
}
