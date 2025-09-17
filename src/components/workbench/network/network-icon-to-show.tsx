import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Usb, Wifi, WifiOff } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import pipClass from "../../../classes/pip-class"

interface NetworkIconToShowProps {
	colorClasses?: string
	iconClasses?: string
}

function NetworkIconToShow({ colorClasses, iconClasses }: NetworkIconToShowProps): React.ReactNode {
	const baseClasses = "!h-12 !w-12"
	const strokeWidth = 2.5

	if (pipClass.pipPluggedInSerial) {
		return (
			<div className={cn("flex items-center justify-center flex-col text-green-500", colorClasses)}>
				<Usb className={cn(baseClasses, iconClasses)} strokeWidth={strokeWidth}/>
				<span className="text-sm">CONNECTED</span>
			</div>
		)
	}
	const selectedPip = pipClass.selectedPip
	if (isNull(selectedPip)) return null
	else if (selectedPip.pipConnectionStatus === "offline") {
		return (
			<div className={cn("flex items-center justify-center flex-col text-cardinal opacity-50", colorClasses)}>
				<WifiOff
					className={cn(baseClasses, iconClasses)}
					strokeWidth={strokeWidth}
				/>
				<span className="text-sm ">OFFLINE</span>
			</div>
		)
	}
	switch (selectedPip.pipConnectionStatus) {
		case "online":
			return (
				<div className={cn("flex items-center justify-center flex-col text-macaw", colorClasses)}>
					<Wifi className={cn(baseClasses, iconClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">ONLINE</span>
				</div>
			)
		case "connected to another user":
			return (
				<div className={cn("flex items-center justify-center flex-col text-beetle", colorClasses)}>
					<Wifi className={cn(baseClasses, iconClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">CONNECTED TO</span>
					<span className="text-sm">ANOTHER USER</span>
				</div>
			)
		case "connected to you":
			return (
				<div className={cn("flex items-center justify-center flex-col text-green-500", colorClasses)}>
					<Wifi className={cn(baseClasses, iconClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">CONNECTED</span>
				</div>
			)
		case "connected to serial":
			return (
				<div className={cn("flex items-center justify-center flex-col text-green-500", colorClasses)}>
					<Usb className={cn(baseClasses, iconClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">CONNECTED TO USB</span>
				</div>
			)
		default:
			return (
				<div className={cn("flex items-center justify-center flex-col text-wolf", colorClasses)}>
					<Wifi className={cn(baseClasses, iconClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">UNKNOWN STATUS</span>
				</div>
			)
	}
}

export default observer(NetworkIconToShow)
