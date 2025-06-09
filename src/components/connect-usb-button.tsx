
import { observer } from "mobx-react"
import { useSerialManagerContext } from "../contexts/serial-manager-context"
import CustomTooltip from "./custom-tooltip"
import { CustomUsb } from "./icons/custom-usb"

function ConnectUsbButton() {
	const serialManager = useSerialManagerContext()

	const handleConnect = async () => {
		if (serialManager.connected) return
		await serialManager.connectToDevice()
	}

	return (
		<CustomTooltip
			tooltipTrigger={
				<button
					type="button"
					onClick={handleConnect}
					className={`p-2 rounded-md transition-none ${
						serialManager.connected
							? "bg-blue-100 dark:bg-blue-900 text-macaw !border-macaw"
							: "text-blue-600 dark:text-blue-300 hover:bg-polar"
					}`}
					title={serialManager.connected ? "Connected" : "Connect"}
				>
					<div className="flex items-center justify-start space-x-2 font-medium">
						<CustomUsb />
						<span className="ml-2">
							{serialManager.connected ? "CONNECTED" : "CONNECT"}
						</span>
					</div>
				</button>
			}
			tooltipContent={serialManager.connected ? "CONNECTED" : "CONNECT"}
		/>
	)
}

export default observer(ConnectUsbButton)
