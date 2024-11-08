import _ from "lodash"
import { useCallback } from "react"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"

export default function useValidatePipData(): (
	pipData: IncompletePipData,
	doesPipUUIDExist: boolean,
	isPipNameNeeded: boolean
) => boolean {
	return useCallback((
		pipData: IncompletePipData,
		doesPipUUIDExist: boolean,
		isPipNameNeeded: boolean
	) => {
		const { pipName, pipUUID } = pipData

		if (!doesPipUUIDExist) return false

		const isUUIDValid = isPipUUIDValid(pipUUID)
		if (isPipNameNeeded === false) {
			return isUUIDValid
		}

		if (_.isUndefined(pipName)) return false

		const isNameValid = pipName.length >= 3 && pipName.length <= 20

		return isNameValid && isUUIDValid
	}, [])
}
