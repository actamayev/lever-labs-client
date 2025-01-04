import _ from "lodash"
import { useCallback } from "react"
import useAddPip from "./add-pip"
import { usePipContext } from "../../contexts/pip-context"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePipStatusWhileAdding(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()
	const addPip = useAddPip()

	// TODO: Call this function once per second, for 5 seconds.
	// Start it after the user's online status changes back to true.
	return useCallback(async () => {
		try {
			const pipUUID = addPipClass?.store.mirroredFormValues.pipUUID as PipUUID
			if (
				_.isNull(addPipClass) ||
				!isPipUUIDValid(pipUUID) ||
				pipClass.checkIfUUIDAlreadyExists(pipUUID) === true ||
				_.isNull(blueDotApiClient.httpClient.accessToken) ||
				addPipClass.store.hasPipConnectedToInternet === true
			) return

			const pipUUIDStatusData = await blueDotApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
			if (!_.isEqual(pipUUIDStatusData.status, 200) || isNonSuccessResponse(pipUUIDStatusData.data)) {
				throw Error ("Unable to retrieve pipUUID status")
			}
			if (pipUUIDStatusData.data.pipConnectionStatus === "connected") {
				addPipClass.store.setHasPipConnectedToInternet(true)
				await addPip()
				// TODO: Exit the loop if we're in this block
			} else {
				addPipClass.store.setHasPipConnectedToInternet(false)
				return
			}
		} catch (error) {
			console.error(error)
		}
	}, [addPip, addPipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, pipClass])
}
