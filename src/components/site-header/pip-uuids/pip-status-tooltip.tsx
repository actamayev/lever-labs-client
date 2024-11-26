import { observer } from "mobx-react"
import { useCallback } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

interface Props {
  pipData: PipData
}

function PipStatusTooltip(props: Props) {
	const { pipData } = props

	const getStatusColor = useCallback((pipStatus: PipConnectionStatus) => {
		switch (pipStatus) {
		case "inactive": return "bg-red-500"
		case "online": return "bg-blue-500"
		case "connected to other user": return "bg-purple-500"
		case "connected": return "bg-green-500"
		default: return "bg-zinc-500"
		}
	}, [])

	const getStatusMessage = useCallback((pipStatus: PipConnectionStatus) => {
		switch (pipStatus) {
		case "inactive": return `${pipData.pipName} is either not turned on, or not connected to the internet`
		case "online": return `${pipData.pipName} is online and ready to connect`
		case "connected to other user": return `${pipData.pipName} is connected to another user`
		case "connected": return `You are connected to ${pipData.pipName}`
		default: return "Unknown status"
		}
	}, [pipData.pipName])

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={`h-3 w-3 rounded-full ${getStatusColor(pipData.pipConnectionStatus)}`} />
				</TooltipTrigger>
				<TooltipContent side="bottom" className="bg-zinc-700 text-zinc-100">
					{getStatusMessage(pipData.pipConnectionStatus)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default observer(PipStatusTooltip)
