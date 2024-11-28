import { useCallback } from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import PipStatusTooltip from "./pip-status-tooltip"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"

function SingleAvailablePip({ pip } : { pip: PipData }) {
	const requestToConnectToPip = useRequestToConnectToPip()

	const requestToConnectToPipCallback = useCallback(async () => {
		await requestToConnectToPip(pip.pipUUID)
	}, [pip, requestToConnectToPip])

	return (
		<Button
			className={cn(
				"w-full flex items-center justify-between px-3 h-8",
				"bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer mb-2"
			)}
			onClick={requestToConnectToPipCallback}
		>
			<div className="flex items-center gap-2">
				<PipStatusTooltip pipData={pip} />
				<span className="text-black dark:text-white truncate max-w-[100px] text-xl">
					{pip.pipName}
				</span>
			</div>
			<span className="text-zinc-600 dark:text-zinc-200">{pip.pipUUID}</span>
		</Button>
	)
}

export default observer(SingleAvailablePip)
