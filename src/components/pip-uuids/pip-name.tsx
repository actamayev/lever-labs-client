import _ from "lodash"
import { Plus } from "lucide-react"
import { observer } from "mobx-react"
import PipStatusTooltip from "./pip-status-tooltip"
import { usePipContext } from "../../contexts/pip-context"

function PipName() {
	const pipClass = usePipContext()

	if (_.isEmpty(pipClass.pipData)) {
		return (
			<div className="flex items-center gap-2">
				<Plus className="h-4 w-4" />
				<span>Add Pip</span>
			</div>
		)
	}
	else if (!pipClass.selectedPip) {
		return (
			<div>Connect to your Pip</div>
		)
	}
	return (
		<>
			<div className="flex items-center gap-2">
				<PipStatusTooltip pipData={pipClass.selectedPip} />
				<div className="truncate max-w-[75px] text-xl">{pipClass.selectedPip.pipName}</div>
			</div>
			<span className="text-zinc-600 dark:text-zinc-200 transition-all duration-300">{pipClass.selectedPip.pipUUID}</span>
		</>
	)
}

export default observer(PipName)
