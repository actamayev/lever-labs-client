import { useCallback } from "react"
import { observer } from "mobx-react"
import PipStatusTooltip from "./pip-status-tooltip"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"

function SingleAvailablePip({ pip } : { pip: PipData }) {
	const requestToConnectToPip = useRequestToConnectToPip()

	const requestToConnectToPipCallback = useCallback(async () => {
		await requestToConnectToPip(pip)
	}, [pip, requestToConnectToPip])

	return (
		<Button
			className={cn(
				"w-full flex items-center justify-between px-3 h-7",
				"bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-800 cursor-pointer"
			)}
			onClick={requestToConnectToPipCallback}
		>
			<div className="flex items-center gap-2">
				<PipStatusTooltip pipData={pip} />
				<span className="text-black dark:text-white truncate max-w-[160px]">
					{pip.pipName}
				</span>
			</div>
			<span className="text-sm text-zinc-800 dark:text-zinc-200">{pip.pipUUID}</span>
		</Button>
	)
}

export default observer(SingleAvailablePip)
