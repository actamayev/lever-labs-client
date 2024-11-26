import { useCallback } from "react"
import { observer } from "mobx-react"
import PipStatusTooltip from "./pip-status-tooltip"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"

function SingleAvailablePip({ pip } : { pip: PipData }) {
	const requestToConnectToPip = useRequestToConnectToPip()

	const requestToConnectToPipCallback = useCallback(async () => {
		await requestToConnectToPip(pip)
	}, [pip, requestToConnectToPip])

	return (
		<div
			key={pip.pipUUID}
			className="flex items-center justify-between px-3 py-2 cursor-pointer
			hover:bg-zinc-100 dark:hover:bg-zinc-700"
			onClick={requestToConnectToPipCallback}
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
