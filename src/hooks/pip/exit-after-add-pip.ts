import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAddPipContext } from "../../contexts/add-pip-context"

export default function useExitAfterAddPip(): () => void {
	const addPipClass = useAddPipContext()
	const navigate = useTypedNavigate()

	return useCallback(() => {
		if (isNull(addPipClass)) return
		addPipClass.store.resetAddPipMethods()
		addPipClass.form.reset()
		navigate("/lab/element-1")
	}, [addPipClass, navigate])
}
