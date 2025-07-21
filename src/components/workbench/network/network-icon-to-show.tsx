import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Usb, Wifi, WifiOff } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import pipClass from "../../../classes/pip-class"

function NetworkIconToShow() {
	const baseClasses = "!h-12 !w-12"
	const strokeWidth = 2.5

	if (isNull(pipClass.selectedPip)) return null
	else if (pipClass.selectedPip.pipConnectionStatus === "offline") {
		return (
			<div className="flex items-center justify-center flex-col text-cardinal opacity-50">
				<WifiOff
					className={cn(baseClasses)}
					strokeWidth={strokeWidth}
				/>
				<span className="text-sm ">OFFLINE</span>
			</div>
		)
	}
	switch (pipClass.selectedPip.pipConnectionStatus) {
	case "online":
		return (
			<div className="flex items-center justify-center flex-col text-macaw">
				<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
				<span className="text-sm">ONLINE</span>
			</div>
		)
	case "connected to other user":
		return (
			<div className="flex items-center justify-center flex-col text-beetle">
				<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
				<span className="text-sm">CONNECTED TO</span>
				<span className="text-sm">ANOTHER USER</span>
			</div>
		)
	case "connected":
		return (
			<div className="flex items-center justify-center flex-col text-green-500">
				<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
				<span className="text-sm">CONNECTED</span>
			</div>
		)
	case "connected to serial":
		return (
			<div className="flex items-center justify-center flex-col text-green-500">
				<Usb className={cn(baseClasses)} strokeWidth={strokeWidth}/>
				<span className="text-sm">CONNECTED TO USB</span>
			</div>
		)
	default:
		return (
			<div className="flex items-center justify-center flex-col text-wolf">
				<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
				<span className="text-sm">UNKNOWN STATUS</span>
			</div>
		)
	}
}

export default observer(NetworkIconToShow)
