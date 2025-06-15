"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import { isErrorResponse } from "../../utils/type-checks"
import workbenchClass from "../../classes/workbench-class"
import useToastOptions from "../../components/toast-options"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useChangeAudibleStatus(): () => Promise<void> {
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			if (isNull(pipClass.selectedPip?.pipUUID)) return
			const playTuneResponse = await blueDotApiClientClass.workbenchDataService.changeAudibleStatus(
				!workbenchClass.isMuted,
				pipClass.selectedPip.pipUUID
			)
			if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
				throw Error("Unable to change mute status")
			}
			workbenchClass.setIsMuted(!workbenchClass.isMuted)
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to change mute status",
				description: "Please reload the page and try again"
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toast, workbenchClass.isMuted, pipClass.selectedPip])
}
