import { useCallback } from "react"
import { isEqual, isNull } from "lodash-es"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"

export default function useStopCurrentlyRunningCode(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			if (isNull(pipClass.selectedPip)) {
				return toast.neutral({
					title: "You have not connected to a Pip",
					description: "Please connect to a Pip to stop the currently running code"
				})
			}

			if (pipClass.selectedPip.pipConnectionStatus === "offline") {
				return toast.negative({
					title: `${pipClass.selectedPip.pipName} is not online`,
					description: `Please connect ${pipClass.selectedPip.pipName} to the internet to stop the currently running code`
				})
			}

			const stopScriptResponse = await blueDotApiClient.sandboxDataService.stopCurrentlyRunningCode(
				pipClass.selectedPip.pipUUID
			)

			if (!isEqual(stopScriptResponse.status, 200) || isNonSuccessResponse(stopScriptResponse.data)) {
				throw new Error("Stop currently running code failed")
			}
			return toast.positive({ title: `Stopped currently running code on ${pipClass.selectedPip.pipName || "Pip"}` })
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to stop currently running code on Pip at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.sandboxDataService, pipClass.selectedPip, toast])
}
