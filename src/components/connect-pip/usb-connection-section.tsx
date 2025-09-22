"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import { CustomUsb } from "../../icons/custom-usb"

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

	return (
		<div className="border-t pt-4">
			<div className="text-sm font-medium text-wolf mb-3">
				Never connected Pip to WiFi?
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
		</div>
	)
}

export default observer(ConnectToPipDialog)
