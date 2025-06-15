"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../../utils/type-checks"
import { usePipContext } from "../../classes/pip-context"
import useToastOptions from "../../components/toast-options"
import { useWorkbenchContext } from "../../classes/workbench-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useChangeAudibleStatus(): () => Promise<void> {
	const toast = useToastOptions()
	const workbenchClass = useWorkbenchContext()
	const pipClass = usePipContext()

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
	}, [blueDotApiClientClass.workbenchDataService, pipClass.selectedPip?.pipUUID, toast, workbenchClass])
}
