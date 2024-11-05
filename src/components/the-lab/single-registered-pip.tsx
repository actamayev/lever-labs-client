import { useCallback, useState } from "react"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"

export default function SingleRegisteredPip({ singlePipData }: { singlePipData: PipData }) {
	const [showTooltip, setShowTooltip] = useState(false)
	const requestToConnectToPip = useRequestToConnectToPip()

	const getStatusColor = useCallback((status: PipConnectionStatus): string => {
		switch (status) {
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

	const getStatusMessage = useCallback((status: PipConnectionStatus): string => {
		switch (status) {
		case "inactive":
			return `${singlePipData.pipName} is either not turned on, or not connected to the internet`
		case "online":
			return `${singlePipData.pipName} is online and ready to connect`
		case "connected to other user":
			return `${singlePipData.pipName} is connected to another user`
		case "connected":
			return `You are connected to ${singlePipData.pipName}`
		default:
			return "bg-slate-500"
		}
	}, [singlePipData.pipName])

	return (
		<div
			className="relative bg-pipTheme dark:bg-slate-700 text-white dark:text-white
			rounded-2xl border border-slate-400 p-4 w-48 text-center"
			style={{ cursor: singlePipData.pipConnectionStatus === "online" ? "pointer" : "default" }}
			onClick={() => requestToConnectToPip(singlePipData)}
		>
			{/* Status Badge with Tooltip */}
			<div
				className={`absolute top-2 right-2 h-3 w-3 rounded-full ${getStatusColor(singlePipData.pipConnectionStatus)}`}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				{/* Tooltip */}
				{showTooltip && (
					<div
						className="absolute -top-8 right-0 bg-slate-700 text-white text-xs px-2 py-1 rounded
						opacity-0 transition-opacity duration-500"
						style={{ opacity: 1 }}
					>
						{getStatusMessage(singlePipData.pipConnectionStatus)}
					</div>
				)}
			</div>

			<div className="font-bold text-lg">{singlePipData.pipName}</div>

			<div className="text-sm text-slate-300">{singlePipData.pipUUID}</div>
		</div>
	)
}
