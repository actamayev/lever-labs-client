/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import { observer } from "mobx-react"
import { useState, useEffect } from "react"
import CustomTooltip from "./custom-tooltip"
import { CustomUsb } from "./icons/custom-usb"
import { useSerialManagerContext } from "../contexts/serial-manager-context"

// Device Selection Dialog Component
function DeviceSelectionDialog({
	isOpen,
	onClose,
	devices,
	onDeviceSelect,
	onRequestNew,
	isScanning
}: {
	isOpen: boolean
	onClose: () => void
	devices: DetectedDevice[]
	onDeviceSelect: (device: DetectedDevice) => void
	onRequestNew: () => void
	isScanning: boolean
}) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Connect Your Pip Robot</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
					>
            ✕
					</button>
				</div>

				{isScanning ? (
					<div className="flex items-center justify-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						<span className="ml-3">Scanning for devices...</span>
					</div>
				) : (
					<>
						{devices.length > 0 ? (
							<div className="space-y-3 mb-4">
								<p className="text-sm text-gray-600 dark:text-gray-400">
                  Select a previously authorized device:
								</p>
								{devices.map((device, index) => (
									<button
										key={index}
										onClick={() => onDeviceSelect(device)}
										className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
											device.isKnownRobot
												? "border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-900 dark:hover:bg-green-800"
												: "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
										}`}
									>
										<div className="flex items-center space-x-3">
											<div className={`w-3 h-3 rounded-full ${
												device.isKnownRobot ? "bg-green-500" : "bg-gray-400"
											}`}></div>
											<div>
												<div className="font-medium">{device.displayName}</div>
												{device.isKnownRobot && (
													<div className="text-xs text-green-600 dark:text-green-400">
                            ✓ Pip Robot Detected
													</div>
												)}
												<div className="text-xs text-gray-500">
                          USB: {device.info.usbVendorId?.toString(16) || "Unknown"}:
													{device.info.usbProductId?.toString(16) || "Unknown"}
												</div>
											</div>
										</div>
									</button>
								))}
							</div>
						) : (
							<div className="text-center py-6">
								<div className="text-4xl mb-2">🔌</div>
								<p className="text-gray-600 dark:text-gray-400 mb-4">
                  No previously authorized devices found
								</p>
							</div>
						)}

						<div className="border-t pt-4">
							<button
								onClick={onRequestNew}
								className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
							>
                Connect New Pip Robot
							</button>
							<p className="text-xs text-gray-500 mt-2 text-center">
                This will open your browser's device selector
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

function EnhancedConnectUsbButton() {
	const serialManager = useSerialManagerContext()
	const [showDeviceDialog, setShowDeviceDialog] = useState(false)
	const [deviceDetectionMessage, setDeviceDetectionMessage] = useState<string | null>(null)

	// Listen for device detection events
	useEffect(() => {
		const handleDeviceDetected = (event: CustomEvent) => {
			const { deviceName, isKnownRobot } = event.detail
			if (isKnownRobot) {
				setDeviceDetectionMessage(`🤖 ${deviceName} detected - connecting automatically...`)
				setTimeout(() => setDeviceDetectionMessage(null), 3000)
			} else {
				setDeviceDetectionMessage(`🔌 ${deviceName} detected`)
				setTimeout(() => setDeviceDetectionMessage(null), 2000)
			}
		}

		const handleDeviceRemoved = () => {
			setDeviceDetectionMessage("📱 Device disconnected")
			setTimeout(() => setDeviceDetectionMessage(null), 2000)
		}

		serialManager.addEventListener("deviceDetected", handleDeviceDetected as EventListener)
		serialManager.addEventListener("deviceRemoved", handleDeviceRemoved as EventListener)

		return () => {
			serialManager.removeEventListener("deviceDetected", handleDeviceDetected as EventListener)
			serialManager.removeEventListener("deviceRemoved", handleDeviceRemoved as EventListener)
		}
	}, [serialManager])

	const handleConnect = async () => {
		if (serialManager.connected) return

		// First try auto-reconnect
		const autoConnected = await serialManager.tryAutoReconnect()
		if (autoConnected) return

		// If auto-reconnect failed, show device selection dialog
		setShowDeviceDialog(true)
		await serialManager.scanForDevices()
	}

	const handleDeviceSelect = async (device: DetectedDevice) => {
		setShowDeviceDialog(false)
		await serialManager.connectToDetectedDevice(device)
	}

	const handleRequestNew = async () => {
		setShowDeviceDialog(false)
		await serialManager.requestNewDevice()
	}

	const getButtonState = () => {
		if (serialManager.connected) {
			return {
				text: "CONNECTED",
				className: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
				disabled: true
			}
		}

		if (serialManager.isScanning) {
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
							{serialManager.isScanning && (
								<div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
							)}
						</div>
					</button>
				}
				tooltipContent={
					serialManager.connected
						? "Robot connected successfully!"
						: "Click to connect your Pip robot"
				}
			/>

			{/* Device detection notification */}
			{deviceDetectionMessage && (
				<div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm animate-fade-in">
					{deviceDetectionMessage}
				</div>
			)}

			<DeviceSelectionDialog
				isOpen={showDeviceDialog}
				onClose={() => setShowDeviceDialog(false)}
				devices={serialManager.detectedDevices}
				onDeviceSelect={handleDeviceSelect}
				onRequestNew={handleRequestNew}
				isScanning={serialManager.isScanning}
			/>

			{/* Error display */}
			{serialManager.errorMessage && (
				<div className="mt-2 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm">
					{serialManager.errorMessage}
				</div>
			)}
		</>
	)
}

export default observer(EnhancedConnectUsbButton)
