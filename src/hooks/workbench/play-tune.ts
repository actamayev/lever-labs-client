"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../../utils/type-checks"
import { usePipContext } from "../../classes/pip-context"
import useToastOptions from "../../components/toast-options"
import { useWorkbenchContext } from "../../classes/workbench-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function usePlayTune(): () => Promise<void> {
	const toast = useToastOptions()
	const workbenchClass = useWorkbenchContext()
	const pipClass = usePipContext()

	return useCallback(async () => {
		try {
			if (isNull(pipClass.selectedPip?.pipUUID)) return
			const playTuneResponse = await blueDotApiClientClass.workbenchDataService.playTune(
				workbenchClass.selectedSound,
				pipClass.selectedPip.pipUUID
			)
			if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
				throw Error("Unable to play tune")
			}
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to play tune at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClientClass.workbenchDataService, pipClass.selectedPip?.pipUUID, toast, workbenchClass.selectedSound])
}
