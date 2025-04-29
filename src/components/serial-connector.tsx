/* eslint-disable no-nested-ternary */
import { observer } from "mobx-react"
import React, { useState } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { Button } from "./shadcn/ui/button"
import { useSerialManager } from "../contexts/serial-manager-context"

// eslint-disable-next-line max-lines-per-function, complexity
function SerialConnector () {
	const [messageText, setMessageText] = useState("")
	const serialManager = useSerialManager() // Use the hook to get the serial manager instance

	const handleConnect = async () => {
		await serialManager.connectToDevice()
	}

	const handleDisconnect = async () => {
		await serialManager.disconnect()
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (messageText.trim()) {
			await serialManager.sendMessage(messageText)
			setMessageText("")
		}
	}

	const handleTurnOnLEDs = async () => {
		if (!serialManager.connected) return

		const whiteColor = { r: 255, g: 255, b: 255 }
		const buffer = MessageBuilder.createLedMessage(
			{
				topLeftColor: whiteColor,
				topRightColor: whiteColor,
				middleLeftColor: whiteColor,
				middleRightColor: whiteColor,
				backLeftColor: whiteColor,
				backRightColor: whiteColor,
			}
		)

		await serialManager.sendBinaryMessage(buffer)
	}

	const handleTurnOffLEDs = async () => {
		if (!serialManager.connected) return

		// Method 1: Using TURN_OFF animation
		const offColor = { r: 0, g: 0, b: 0 }
		const buffer = MessageBuilder.createLedMessage(
			{
				topLeftColor: offColor,
				topRightColor: offColor,
				middleLeftColor: offColor,
				middleRightColor: offColor,
				backLeftColor: offColor,
				backRightColor: offColor,
			}
		)

		await serialManager.sendBinaryMessage(buffer)
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
						{serialManager.connecting
							? "Connecting..."
							: serialManager.connected
								? "Connected"
								: "Disconnected"}
					</span>
				</div>

				<div className="flex space-x-2">
					<button
						onClick={handleConnect}
						disabled={serialManager.connected || serialManager.connecting}
						className={`px-4 py-2 rounded ${
							serialManager.connected || serialManager.connecting
								? "bg-gray-300 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600 text-white"
						}`}
					>
						Connect
					</button>

					<button
						onClick={handleDisconnect}
						disabled={!serialManager.connected}
						className={`px-4 py-2 rounded ${
							!serialManager.connected
								? "bg-gray-300 cursor-not-allowed"
								: "bg-red-500 hover:bg-red-600 text-white"
						}`}
					>
						Disconnect
					</button>
				</div>

				{serialManager.errorMessage && (
					<div className="mt-2 text-red-500">
						Error: {serialManager.errorMessage}
					</div>
				)}
			</div>

			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2">LED Controls</h2>
				<div className="flex space-x-2">
					<button
						onClick={handleTurnOnLEDs}
						disabled={!serialManager.connected}
						className={`px-4 py-2 rounded ${
							!serialManager.connected
								? "bg-gray-300 cursor-not-allowed"
								: "bg-green-500 hover:bg-green-600 text-white"
						}`}
					>
            Turn On LEDs (White)
					</button>

					<button
						onClick={handleTurnOffLEDs}
						disabled={!serialManager.connected}
						className={`px-4 py-2 rounded ${
							!serialManager.connected
								? "bg-gray-300 cursor-not-allowed"
								: "bg-yellow-500 hover:bg-yellow-600 text-white"
						}`}
					>
            Turn Off LEDs
					</button>
				</div>
			</div>

			{/* Message Sender */}
			<div className="mb-6">
				<form onSubmit={handleSendMessage} className="flex space-x-2">
					<input
						type="text"
						value={messageText}
						onChange={(e) => setMessageText(e.target.value)}
						placeholder="Type a message to send to ESP32..."
						disabled={!serialManager.connected}
						className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<button
						type="submit"
						disabled={!serialManager.connected || !messageText.trim()}
						className={`px-4 py-2 rounded ${
							!serialManager.connected || !messageText.trim()
								? "bg-gray-300 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600 text-white"
						}`}
					>
						Send
					</button>
				</form>
			</div>

			{/* Messages */}
			<div>
				<h2 className="text-xl font-semibold mb-2">
					<div className="flex flex-row justify-between">
						<div>
					Message Log
						</div>
						<Button
							onClick={() => serialManager.messages = []}
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
