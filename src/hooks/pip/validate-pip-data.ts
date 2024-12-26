import _ from "lodash"
import { useCallback } from "react"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { usePipContext } from "../../contexts/pip-context"

export default function useValidatePipData(): (pipData: IncompletePipData) => boolean {
	const pipClass = usePipContext()

	return useCallback((pipData: IncompletePipData) => {
		if (!pipClass.addingNewPipRequirements.doesPipUUIDExist) return false

		const { pipName, pipUUID } = pipData

		const isUUIDValid = isPipUUIDValid(pipUUID)
		if (pipClass.addingNewPipRequirements.isPipNameNeeded === false) {
			return isUUIDValid
		}

		if (_.isUndefined(pipName)) return false

		const isNameValid = pipName.length >= 3 && pipName.length <= 20

		return isNameValid && isUUIDValid
	}, [pipClass.addingNewPipRequirements.doesPipUUIDExist, pipClass.addingNewPipRequirements.isPipNameNeeded])
}
