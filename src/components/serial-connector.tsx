"use client"

/* eslint-disable no-nested-ternary */
import { observer } from "mobx-react"
import { Button } from "./shadcn/ui/button"
import { useSerialManagerContext } from "../contexts/serial-manager-context"

// eslint-disable-next-line max-lines-per-function, complexity
function SerialConnector () {
	const serialManager = useSerialManagerContext() // Use the hook to get the serial manager instance

	const handleConnect = async () => {
		await serialManager.connectToDevice()
	}

	const handleDisconnect = async () => {
		await serialManager.disconnect()
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">ESP32 Serial Communication</h1>

			{/* Connection Status */}
			<div className="mb-6">
				<div className="flex items-center mb-2">
					<div
						className={`w-3 h-3 rounded-full mr-2 ${serialManager.connected ? "bg-green-500" : "bg-red-500"}`}
					/>
					<span>
						{serialManager.connected ? "Connected" : "Disconnected"}
					</span>
				</div>

				<div className="flex space-x-2">
					<Button
						onClick={handleConnect}
						disabled={serialManager.connected}
						className={`px-4 py-2 rounded ${
							serialManager.connected
								? "bg-gray-300 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600 text-white"
						}`}
					>
						Connect
					</Button>

					<Button
						onClick={handleDisconnect}
						disabled={!serialManager.connected}
						className={`px-4 py-2 rounded ${
							!serialManager.connected
								? "bg-gray-300 cursor-not-allowed"
								: "bg-red-500 hover:bg-red-600 text-white"
						}`}
					>
						Disconnect
					</Button>
				</div>

				{serialManager.errorMessage && (
					<div className="mt-2 text-red-500">
						Error: {serialManager.errorMessage}
					</div>
				)}
			</div>

			{/* Messages */}
			<div>
				<h2 className="text-xl font-semibold mb-2">
					<div className="flex flex-row justify-between">
						<div>
					Message Log
						</div>
						<Button
							onClick={serialManager.clearMessages}
						>
							Clear messages
						</Button>
					</div>
				</h2>

				<div className="border rounded-lg p-4 bg-gray-50 h-80 overflow-y-auto">
					{serialManager.messages.length === 0 ? (
						<div className="text-gray-500 text-center py-4">
							No messages yet. Connect to your ESP32 and start sending messages.
						</div>
					) : (
						<div className="space-y-2">
							{serialManager.messages.map((message, index) => (
								<div
									key={index}
									className={`p-2 rounded-lg ${
										message.direction === "sent"
											? "bg-blue-100 ml-8"
											: "bg-green-100 mr-8"
									}`}
								>
									<div className="font-medium">
										{message.direction === "sent" ? "Sent" : "Received"}
									</div>
									<div>{message.content}</div>
									<div className="text-xs text-gray-500">
										{message.timestamp.toLocaleTimeString()}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(SerialConnector)
