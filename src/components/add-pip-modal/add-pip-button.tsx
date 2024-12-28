import _ from "lodash"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useValidatePipData from "../../hooks/pip/validate-pip-data"

function AddPipButton() {
	const addPipClass = useAddPipContext()
	const validatePipData = useValidatePipData()

	if (
		_.isNull(addPipClass) ||
		!addPipClass.store.addingNewPipRequirements.isPipOnline
	) return null

	const { pipName } = addPipClass.form.watch()

	return (
		<div className="flex justify-between mt-2 items-center">
			<Button
				type="submit"
				disabled={!validatePipData}
			>
				Add {pipName}
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
