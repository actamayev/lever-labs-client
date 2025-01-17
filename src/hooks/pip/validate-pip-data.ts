import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { useAddPipContext } from "../../contexts/add-pip-context"

export default function useValidatePipData(): () => boolean {
	const addPipClass = useAddPipContext()

	return useCallback(() => {
		if (isNull(addPipClass)) return false
		if (!addPipClass.store.addingNewPipRequirements.doesPipUUIDExist) return false

		const { pipUUID, wifiNetworkName } = addPipClass.store.mirroredFormValues
		if (
			addPipClass.store.addingNewPipRequirements.isPipOnline === false &&
			!wifiNetworkName
		) return false

		const isUUIDValid = isPipUUIDValid(pipUUID)
		if (addPipClass.store.addingNewPipRequirements.hasPipNamePreviouslyBeenAdded === true) {
			return isUUIDValid
		}

		return addPipClass.store.isPipNameValid && isUUIDValid
	}, [addPipClass])
}
