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
	const addPip = useAddPip(false)

	// eslint-disable-next-line complexity
	return useCallback(async () => {
		try {
			const pipUUID = addPipClass?.store.mirroredFormValues.pipUUID as PipUUID
			if (
				_.isNull(addPipClass) ||
				!isPipUUIDValid(pipUUID) ||
				pipClass.checkIfUUIDAlreadyExists(pipUUID) === true ||
				_.isNull(blueDotApiClient.httpClient.accessToken) ||
				addPipClass.store.newPipConnectionStatus !== "connecting"
			) return

			const pipUUIDStatusData = await blueDotApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
			if (!_.isEqual(pipUUIDStatusData.status, 200) || isNonSuccessResponse(pipUUIDStatusData.data)) {
				throw Error ("Unable to retrieve pipUUID status")
			}
			if (pipUUIDStatusData.data.pipConnectionStatus === "connected") {
				addPipClass.store.setNewPipConnectionStatus("connected")
				await addPip()
			} else {
				addPipClass.store.setNewPipConnectionStatus("connecting")
				return
			}
		} catch (error) {
			console.error(error)
		}
	}, [addPip, addPipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, pipClass])
}
