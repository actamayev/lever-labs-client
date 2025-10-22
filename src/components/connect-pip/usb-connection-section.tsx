"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import { CustomUsb } from "../../icons/custom-usb"
import { CustomChrome } from "../../icons/custom-chrome"
import { CustomEdge } from "../../icons/custom-edge"
import { isUsbSerialSupported, detectBrowser } from "../../utils/browser-detection"

function ConnectToPipDialog(): React.ReactNode {
	const colors = getDuolingoColors("humpback")

	const getUsbButtonClassName = (): string => {
		if (serialConnectionManagerClass.pipTurnedOn) {
			return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
		}
		if (serialConnectionManagerClass.isScanning) {
			return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
		}
		return "text-white bg-humpback"
	}

	const handleUsbConnect = useCallback(async (): Promise<void> => {
		if (serialConnectionManagerClass.pipTurnedOn) return

		// First try auto-reconnect
		const autoConnected = await serialConnectionManagerClass.tryAutoReconnect()
		if (autoConnected) return

		// If auto-reconnect failed, go straight to new device request
		await serialConnectionManagerClass.requestNewDevice()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialConnectionManagerClass.pipTurnedOn])

	const isSupported = isUsbSerialSupported()
	const browserInfo = detectBrowser()

	return (
		<div className="border-t pt-4">
			{isSupported ? (
				<>
					<div className="text-sm font-medium text-wolf mb-3">
						First time connecting Pip to Wi-Fi?
					</div>
					<div className="text-sm text-wolf mb-3">
						Connect Pip to your computer via USB, and press the button below.
						Then, select the first item in the list.
					</div>
					<TactileButton
						onClick={handleUsbConnect}
						className={cn(
							"w-full h-10 rounded-xl text-lg font-medium",
							getUsbButtonClassName()
						)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
						disabled={serialConnectionManagerClass.pipTurnedOn || serialConnectionManagerClass.isScanning}
					>
						<div className="flex items-center justify-center gap-2">
							<CustomUsb />
							<span>
								{((): string => {
									if (serialConnectionManagerClass.pipTurnedOn) return "CONNECTED"
									if (serialConnectionManagerClass.isScanning) return "SCANNING..."
									return "CONNECT"
								})()}
							</span>
							{serialConnectionManagerClass.isScanning && (
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
							)}
						</div>
					</TactileButton>
				</>
			) : (
				<div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
					<div className="text-sm text-beak-inner-2 font-medium mb-3">
						{browserInfo.name} Not Supported
					</div>
					<div className="text-sm text-fox-2 mb-3">
						Please use one of the following browsers to connect to Pip over USB and upload your WiFi credentials:
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<CustomChrome size={20} />
							<span className="text-sm text-fox-2">Google Chrome</span>
						</div>
						<div className="flex items-center gap-2">
							<CustomEdge size={20} />
							<span className="text-sm text-fox-2">Microsoft Edge</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default observer(ConnectToPipDialog)
