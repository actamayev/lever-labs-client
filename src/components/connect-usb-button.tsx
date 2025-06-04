
import { observer } from "mobx-react"
import { useSerialManagerContext } from "../contexts/serial-manager-context"
import CustomTooltip from "./custom-tooltip"
import { CustomUsb } from "./icons/custom-usb"

function ConnectUsbButton() {
	const serialManager = useSerialManagerContext()

	const handleConnect = async () => {
		await serialManager.connectToDevice()
	}

	const handleDisconnect = async () => {
		await serialManager.disconnect()
	}

	return (
		<CustomTooltip
			tooltipTrigger={
				<button
					type="button"
					onClick={serialManager.connected ? handleDisconnect : handleConnect}
					className={`p-2 rounded-md transition-none ${
						serialManager.connected
							? "bg-red-100 dark:bg-red-900 text-cardinal"
							: "text-blue-600 dark:text-blue-300 hover:bg-polar"
					}`}
					title={serialManager.connected ? "Disconnect" : "Connect"}
				>
					<div className="flex items-center justify-start space-x-2 font-medium">
						<CustomUsb />
						<span className="ml-2">
							{serialManager.connected ? "DISCONNECT" : "CONNECT"}
						</span>
					</div>
				</button>
			}
			tooltipContent={serialManager.connected ? "DISCONNECT" : "CONNECT"}
		/>
	)
}

export default observer(ConnectUsbButton)
