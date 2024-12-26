import { Button } from "../../shadcn/ui/button"
import useValidatePipData from "../../../hooks/pip/validate-pip-data"

interface Props {
	formValues: IncompletePipData
}

export default function AddPipButton(props: Props) {
	const { formValues } = props
	const validatePipData = useValidatePipData()

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
