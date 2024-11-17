import _ from "lodash"
import { observer } from "mobx-react"
import { usePipContext } from "../../../contexts/pip-context"
import useGetStatusColor from "../../../hooks/pip/get-status-color"

function PipName() {
	const pipClass = usePipContext()
	const getStatusColor = useGetStatusColor()

	return (
		<div
			className={`flex flex-grow items-center px-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600
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
							<span className={`h-3 w-3 rounded-full ${getStatusColor(pipClass.selectedPip.pipConnectionStatus)}`}/>
							<div className="truncate max-w-[160px]">{pipClass.selectedPip.pipName || "Connect to your Pip"}</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default observer(PipName)
