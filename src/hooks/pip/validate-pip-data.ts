import _ from "lodash"
import { useCallback } from "react"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { useAddPipContext } from "../../contexts/add-pip-context"

export default function useValidatePipData(): () => boolean {
	const addPipClass = useAddPipContext()

	return useCallback(() => {
		if (_.isNull(addPipClass)) return false
		if (!addPipClass.store.addingNewPipRequirements.doesPipUUIDExist) return false

		const { pipName, pipUUID, wifiNetworkName } = addPipClass.form.getValues()
		if (!addPipClass.store.addingNewPipRequirements.isPipOnline === true && !wifiNetworkName) return false

		const isUUIDValid = isPipUUIDValid(pipUUID)
		if (addPipClass.store.addingNewPipRequirements.hasPipNamePreviouslyBeenAdded === true) {
			return isUUIDValid
		}

		if (_.isUndefined(pipName)) return false

		const isNameValid = pipName.length >= 3 && pipName.length <= 20

		return isNameValid && isUUIDValid
	}, [addPipClass])
}
