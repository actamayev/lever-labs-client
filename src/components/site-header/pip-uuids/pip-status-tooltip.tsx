import { observer } from "mobx-react"
import { useCallback, useState } from "react"

interface Props {
    pipData: PipData
}

function PipStatusTooltip(props: Props) {
	const { pipData } = props

	const [showTooltip, setShowTooltip] = useState(false)

	const getStatusColor = useCallback((pipStatus: PipConnectionStatus): string => {
		switch (pipStatus) {
		case "inactive":
			return "bg-red-500"
		case "online":
			return "bg-blue-500"
		case "connected to other user":
			return "bg-purple-500"
		case "connected":
			return "bg-green-500"
		default:
			return "bg-slate-500"
		}
	}, [])

	const getStatusMessage = useCallback((pipStatus: PipConnectionStatus): string => {
		switch (pipStatus) {
		case "inactive":
			return `${pipData.pipName} is either not turned on, or not connected to the internet`
		case "online":
			return `${pipData.pipName} is online and ready to connect`
		case "connected to other user":
			return `${pipData.pipName} is connected to another user`
		case "connected":
			return `You are connected to ${pipData.pipName}`
		default:
			return "Unknown status"
		}
	}, [pipData.pipName])

	return (
		<div
			className="relative"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<div className={`h-3 w-3 rounded-full ${getStatusColor(pipData.pipConnectionStatus)}`} />

			{showTooltip && (
				<div
					className="absolute right-0 bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50
                    opacity-0 transition-opacity duration-500"
					style={{ opacity: 1 }}
				>
					{getStatusMessage(pipData.pipConnectionStatus)}
				</div>
			)}
		</div>
	)
}

export default observer(PipStatusTooltip)
