import _ from "lodash"
import { observer } from "mobx-react"
import PipStatusTooltip from "./pip-status-tooltip"
import { usePipContext } from "../../../contexts/pip-context"

function PipName() {
	const pipClass = usePipContext()

	return (
		<div
			className={`flex flex-grow items-center px-3 cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-600
			${_.isEmpty(pipClass.pipData) ? "rounded-lg" : "rounded-l-lg"}`}
		>
			{_.isEmpty(pipClass.pipData) ? (
				<div>
					+ Add Pip
				</div>
			) : (
				<>
					{!pipClass.selectedPip ? (
						<div>Connect to your Pip</div>
					) : (
						<div className="flex items-center gap-2">
							<PipStatusTooltip pipData={pipClass.selectedPip} />
							<div className="truncate max-w-[160px]">{pipClass.selectedPip.pipName}</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default observer(PipName)
