import _ from "lodash"
import { useCallback } from "react"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"

export default function useAutoCloseModalAfterAddPip(): (
	shouldAutoCloseModal: boolean
) => void {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()

	return useCallback(() => {
		try {
			if (_.isNull(addPipClass)) return
			const { pipName } = addPipClass.store.mirroredFormValues as { pipUUID: PipUUID, pipName: string }
			addPipClass.store.setIsAppPipModalOpen(false)
			addPipClass.store.resetAddingPipRequirements()
			addPipClass.form.reset()
			toast.positive({ description: `${pipName} added` })
		} catch (error) {
			console.error(error)
		}
	}, [addPipClass, toast])
}
