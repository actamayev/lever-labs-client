import { observer } from "mobx-react"
import { usePipContext } from "../../contexts/pip-context"

function ShowExistingPips() {
	const pipClass = usePipContext()

	// TODO: Add useEffect hook to retrieve pip UUIDs
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
