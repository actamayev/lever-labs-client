/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useValidatePipData from "../../hooks/pip/validate-pip-data"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useResetAddingPipValuesAfterAddPip from "../../hooks/pip/reset-adding-pip-values-after-add-pip"

function AddPipButton() {
	const addPipClass = useAddPipContext()
	const validatePipData = useValidatePipData()
	const resetAddingPipValuesAfterAddPip = useResetAddingPipValuesAfterAddPip()
	const navigate = useTypedNavigate()

	const closeButtonAfterAddPipAction = useCallback(() => {
		if (_.isNull(addPipClass)) return
		addPipClass.store.setIsUserReadyToConnectToPipDialog(null)
		addPipClass.store.setNewPipConnectionStatus(null)
		resetAddingPipValuesAfterAddPip()
		navigate("/lab/element-1")

	}, [addPipClass, navigate, resetAddingPipValuesAfterAddPip])

	if (
		_.isNull(addPipClass) ||
		!addPipClass.store.mirroredFormValues.pipName
	) return null

	// If the pip is online, but the inputed name isn't valid, show nothing
	if (
		addPipClass.store.addingNewPipRequirements.isPipOnline &&
		!addPipClass.store.isPipNameValid
	) return null

	// If the Pip isn't online, and we haven't receieved confirmation it's connected yet, don't show add.
	// The confirmation comes when the pip connects to backend
	if (
		!addPipClass.store.addingNewPipRequirements.isPipOnline &&
		addPipClass.store.newPipConnectionStatus !== "connected"
	) return null

	if (addPipClass.store.newPipConnectionStatus === "connected") {
		return (
			<div className="flex justify-between mt-2 items-center">
				<Button type="button" onClick={closeButtonAfterAddPipAction}>
					Close
				</Button>
			</div>
		)
	}

	return (
		<div className="flex justify-between mt-6 items-center">
			<Button
				type="submit"
				disabled={!validatePipData}
				className="p-5 text-2xl"
			>
				Add
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
