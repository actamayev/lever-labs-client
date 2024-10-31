import { observer } from "mobx-react"
import { usePipContext } from "../../contexts/pip-context"

function ShowExistingPips() {
	const pipClass = usePipContext()

	return (
		<>
			{pipClass.pipData.map(singlePipData => (
				<div key={singlePipData.pipUUID} className="text-black dark:text-white">
					{singlePipData.pipName}
				</div>
			))}
		</>
	)
}

export default observer(ShowExistingPips)
