import { observer } from "mobx-react"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import useValidatePipData from "../../../hooks/pip/validate-pip-data"

interface Props {
	formValues: IncompletePipData
}

function AddPipButton(props: Props) {
	const { formValues } = props
	const pipClass = usePipContext()
	const validatePipData = useValidatePipData()

	if (!pipClass.addingNewPipRequirements.isPipOnline) return null
	return (
		<div className="flex justify-between mt-2 items-center">
			<Button
				type="submit"
				disabled={!validatePipData(formValues)}
			>
					Add {formValues.pipName}
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
