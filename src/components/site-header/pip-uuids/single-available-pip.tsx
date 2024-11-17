import { observer } from "mobx-react"
import PipStatusTooltip from "./pip-status-tooltip"
import useRequestToConnectToPip from "../../../hooks/pip/request-to-connect-to-pip"

interface Props {
	pip: PipData
}

function SingleAvailablePip(props: Props) {
	const { pip } = props
	const requestToConnectToPip = useRequestToConnectToPip()

	return (
		<div
			key={pip.pipUUID}
			className="flex items-center justify-between px-3 py-2 cursor-pointer
			hover:bg-slate-100 dark:hover:bg-slate-700"
			onClick={() => requestToConnectToPip(pip)}
		>
			<div className="flex items-center gap-2">
				<PipStatusTooltip pipData={pip} />
				<span className="text-black dark:text-white truncate max-w-[160px]">{pip.pipName}</span>
			</div>
			<span className="text-sm text-slate-500">{pip.pipUUID}</span>
		</div>
	)
}

export default observer(SingleAvailablePip)
