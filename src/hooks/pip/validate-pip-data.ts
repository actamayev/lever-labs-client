import _ from "lodash"
import { useCallback } from "react"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { usePipContext } from "../../contexts/pip-context"

export default function useValidatePipData(): (pipData: IncompletePipData) => boolean {
	const pipClass = usePipContext()

	return useCallback((pipData: IncompletePipData) => {
		if (!pipClass.addingNewPipRequirements.doesPipUUIDExist) return false

		const { pipName, pipUUID, wifiNetworkName } = pipData
		if (!pipClass.addingNewPipRequirements.isPipOnline === true && !wifiNetworkName) return false

		const isUUIDValid = isPipUUIDValid(pipUUID)
		if (pipClass.addingNewPipRequirements.hasPipNamePreviouslyBeenAdded === true) {
			return isUUIDValid
		}

		if (_.isUndefined(pipName)) return false

		const isNameValid = pipName.length >= 3 && pipName.length <= 20

		return isNameValid && isUUIDValid
	}, [pipClass.addingNewPipRequirements.doesPipUUIDExist,
		pipClass.addingNewPipRequirements.hasPipNamePreviouslyBeenAdded,
		pipClass.addingNewPipRequirements.isPipOnline
	])
}
