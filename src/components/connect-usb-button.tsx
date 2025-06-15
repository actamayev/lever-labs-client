"use client"

import { observer } from "mobx-react"
import CustomTooltip from "./custom-tooltip"
import { CustomUsb } from "./icons/custom-usb"
import serialConnectionManagerClass from "../classes/serial-connection-manager-class"

function EnhancedConnectUsbButton() {

	const handleConnect = async () => {
		if (serialConnectionManagerClass.connected) return

		// First try auto-reconnect
		const autoConnected = await serialConnectionManagerClass.tryAutoReconnect()
		if (autoConnected) return

		// If auto-reconnect failed, go straight to new device request
		await serialConnectionManagerClass.requestNewDevice()
	}

	const getButtonState = () => {
		if (serialConnectionManagerClass.connected) {
			return {
				text: "CONNECTED",
				className: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
				disabled: true
			}
		}

		if (serialConnectionManagerClass.isScanning) {
			return {
				text: "SCANNING...",
				className: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
				disabled: true
			}
		}

		return {
			text: "CONNECT",
			className: "text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 border-blue-300 dark:border-blue-700",
			disabled: false
		}
	}

	const buttonState = getButtonState()

	return (
		<>
			<CustomTooltip
				tooltipTrigger={
					<button
						type="button"
						onClick={handleConnect}
						disabled={buttonState.disabled}
						className={`p-3 rounded-lg border-2 transition-all duration-200 ${buttonState.className} ${
							buttonState.disabled ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						title={buttonState.text}
					>
						<div className="flex items-center justify-center space-x-2 font-medium">
							<CustomUsb />
							<span className="ml-2">{buttonState.text}</span>
							{serialConnectionManagerClass.isScanning && (
								<div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
							)}
						</div>
					</button>
				}
				tooltipContent={
					serialConnectionManagerClass.connected
						? "Pip connected successfully!"
						: "Click to connect your Pip"
				}
			/>

		</>
	)
}

export default observer(EnhancedConnectUsbButton)
