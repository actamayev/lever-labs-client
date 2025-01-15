import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAddPipContext } from "../../contexts/add-pip-context"

export default function useExitAfterAddPip(): () => void {
	const addPipClass = useAddPipContext()
	const navigate = useTypedNavigate()

	return useCallback(() => {
		if (_.isNull(addPipClass)) return
		addPipClass.store.setIsUserReadyToConnectToPipDialog(null)
		addPipClass.store.setNewPipConnectionStatus(null)
		addPipClass.store.resetAddingPipRequirements()
		addPipClass.form.reset()
		navigate("/lab/element-1")
	}, [addPipClass, navigate])
}
