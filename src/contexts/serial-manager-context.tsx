/* eslint-disable max-depth */
"use client"

import { createContext, useContext } from "react"
import { ESPMessage, MessageBuilder, PipIDPayload,
	PipUUID, WiFiConnectionResultPayload, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { action, makeAutoObservable, runInAction } from "mobx"

class SerialManagerClass {
	public port: SerialPort | null = null
	public reader: ReadableStreamDefaultReader<Uint8Array> | null = null
	public writer: WritableStreamDefaultWriter<Uint8Array> | null = null
	public connected: boolean = false
	public messages: Message[] = []
	public errorMessage: string | null = null
	private keepAliveInterval: ReturnType<typeof setInterval> | null = null
	public hasUserActivity = false
	public onWiFiConnectionResult: ((status: WiFiConnectionStatus) => void) | null = null

	// NEW: Add Pip flow state
	public pipId: PipUUID | null = null
	public showWiFiSection: boolean = false
	public showNameSection: boolean = false
	public wiFiTestCompleted: boolean = false
	public hasBeenDisconnected: boolean = false

	constructor() {
		makeAutoObservable(this)
		if (typeof window === "undefined") return
		window.addEventListener("beforeunload", () => {
			// Can't use async here, so use a synchronous approach
			if (this.connected && this.writer) {
				try {
					const disconnectMsg = MessageBuilder.createSerialEndMessage()
					void this.writer.write(new Uint8Array(disconnectMsg))
				} catch (e) {
					console.error("Error during page unload:", e)
				}
			}
		})
	}

	async connectToDevice(): Promise<void> {
		if (this.connected) return

		try {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!navigator.serial) {
				throw new Error("Web Serial API not supported in this browser")
			}

			// Request port access from user
			const port = await navigator.serial.requestPort()
			await port.open({ baudRate: 115200 })

			if (!port.readable || !port.writable) {
				throw new Error("Port is not readable or writable")
			}
			// Get reader and writer
			const reader = port.readable.getReader()
			const writer = port.writable.getWriter()

			runInAction(() => {
				this.port = port
				this.reader = reader
				this.writer = writer
				this.connected = true
				this.errorMessage = null
				// Reset flow state on new connection
				this.hasBeenDisconnected = false
			})

			// Send handshake immediately after connection established
			if (this.writer) {
				// Use the binary protocol - create a 1-byte buffer with HANDSHAKE value (11)
				const handshakeMsg = MessageBuilder.createSerialHandshakeMessage()
				await this.writer.write(new Uint8Array(handshakeMsg))
			}

			port.addEventListener("disconnect", () => {
				this.handleDisconnection()
			})

			// Start reading loop
			this.readLoop()
			this.startKeepAlive()
		} catch (error) {
			// Check if it's a user cancellation (NotFoundError)
			if (!(error instanceof DOMException && error.name === "NotFoundError")) {
				runInAction(() => {
					this.errorMessage = error instanceof Error ? error.message : String(error)
				})
			}
		}
	}

	// NEW: Handle disconnection
	private handleDisconnection(): void {
		runInAction(() => {
			this.hasBeenDisconnected = true
		})
		this.cleanupConnection()
	}

	private startKeepAlive(): void {
		// Clear any existing interval
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval)
		}

		// Send keepalive message every 5 seconds
		this.keepAliveInterval = setInterval(async () => {
			if (this.connected && this.writer) {
				try {
					const keepaliveMsg = MessageBuilder.createSerialKeepaliveMessage()
					await this.writer.write(new Uint8Array(keepaliveMsg))
				} catch (error) {
					console.error("Keepalive error:", error)
					await this.cleanupConnection() // Add this line
				}
			}
		}, 5000)
	}

	async disconnect(): Promise<void> {
		if (!this.connected) return

		try {
		// Send disconnect notification before closing
			if (this.writer) {
				const disconnectMsg = MessageBuilder.createSerialEndMessage()
				await this.writer.write(new Uint8Array(disconnectMsg))

				// Short delay to allow message to be sent
				await new Promise(resolve => setTimeout(resolve, 50))
			}

			await this.cleanupConnection()
		} catch (error) {
			console.error("Error disconnecting:", error)
		}
	}

	// eslint-disable-next-line complexity
	private async readLoop(): Promise<void> {
		if (!this.reader) return

		try {
		// Create text decoder for converting Uint8Array to string
			const decoder = new TextDecoder()
			let buffer = ""

			while (this.connected) {
				const { value, done } = await this.reader.read()

				if (done) {
					break
				}

				// Decode chunk and add to buffer
				buffer += decoder.decode(value, { stream: true })

				// Process complete lines (messages end with newline)
				const lines = buffer.split("\n")

				// If there's at least one complete line
				if (lines.length > 1) {
				// Process all complete lines
					for (let i = 0; i < lines.length - 1; i++) {
						const line = lines[i].trim()
						if (line) {
							console.log("Received:", line)

							// Try to parse as JSON to see if it's structured data
							try {
								const jsonMessage = JSON.parse(line)
								if (jsonMessage.route && jsonMessage.payload) {
									// This is a structured message, handle it
									this.handleStructuredMessage(jsonMessage)
									// Still add to messages for debugging
									runInAction(() => {
										this.messages.push({
											content: line,
											direction: "received",
											timestamp: new Date(),
											isStructured: true
										})
									})
								} else {
									// Regular log message
									runInAction(() => {
										this.messages.push({
											content: line,
											direction: "received",
											timestamp: new Date()
										})
									})
								}
							} catch {
								// Not JSON, treat as regular log message
								runInAction(() => {
									this.messages.push({
										content: line,
										direction: "received",
										timestamp: new Date()
									})
								})
							}
						}
					}

					// Keep incomplete line in buffer
					buffer = lines[lines.length - 1]
				}
			}
		} catch (error) {
			console.error("Error in read loop:", error)
			runInAction(() => {
				this.errorMessage = error instanceof Error ? error.message : String(error)

			})
			await this.cleanupConnection()
		}
	}

	private handleStructuredMessage(message: ESPMessage): void {
		// NEW: Handle PipID message
		if (message.route === "/pip-id") {
			runInAction(() => {
				this.pipId = (message.payload as PipIDPayload).pipId
				this.showWiFiSection = true
				console.log("Received PipID:", this.pipId)
			})
			return
		}

		if (message.route !== "/wifi-connection-result") return
		const status = (message.payload as WiFiConnectionResultPayload).status

		// Convert to enum
		let enumStatus: WiFiConnectionStatus
		switch (status) {
		case "success":
			enumStatus = WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS
			runInAction(() => {
				this.wiFiTestCompleted = true
				this.showNameSection = true
			})
			break
		case "wifi_only":
			enumStatus = WiFiConnectionStatus.WIFI_ONLY
			break
		case "failed":
			enumStatus = WiFiConnectionStatus.FAILED
			break
		default:
			enumStatus = WiFiConnectionStatus.FAILED
		}

		this.onWiFiConnectionResult?.(enumStatus)
	}

	async sendBinaryMessage(buffer: ArrayBuffer): Promise<boolean> {
		if (!this.connected || !this.writer) {
			this.errorMessage = "Not connected to device"
			return false
		}

		try {
		// Convert to Uint8Array for writing
			const data = new Uint8Array(buffer)

			// Send data
			await this.writer.write(data)

			// Add to messages list with formatted display
			runInAction(() => {
				this.messages.push({
					content: this.formatBinaryForDisplay(buffer),
					direction: "sent",
					timestamp: new Date(),
					isBinary: true
				})
			})
			// 4/30/25 TODO: Await a success response from the ESP before returning true
			return true
		} catch (error) {
			runInAction(() => {
				this.errorMessage = error instanceof Error ? error.message : String(error)
			})
			await this.cleanupConnection() // Add this line
			return false
		}
	}

	// Helper to format binary data for display
	private formatBinaryForDisplay(buffer: ArrayBuffer): string {
		const array = new Uint8Array(buffer)
		return Array.from(array)
			.map(byte => byte.toString(16).padStart(2, "0"))
			.join(" ")
	}

	private async cleanupConnection(): Promise<void> {
	// Clean up reader
		if (this.reader) {
			try {
				await this.reader.cancel()
				this.reader.releaseLock()
			} catch (e) {
				console.error("Error releasing reader:", e)
			}
		}

		// Clean up writer
		if (this.writer) {
			try {
				this.writer.releaseLock()
			} catch (e) {
				console.error("Error releasing writer:", e)
			}
		}

		// Close port
		if (this.port) {
			try {
				await this.port.close()
			} catch (e) {
				console.error("Error closing port:", e)
			}
		}

		// Clear keepalive interval
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval)
			this.keepAliveInterval = null
		}

		// Reset state
		runInAction(() => {
			this.port = null
			this.reader = null
			this.writer = null
			this.connected = false
		})
	}

	public clearMessages = action(() => {
		this.messages = []
	})

	public markUserActivity = action(() => {
		this.hasUserActivity = true
	})

	// Method to check and reset user activity
	public checkAndResetUserActivity = action(() => {
		const hadActivity = this.hasUserActivity
		this.hasUserActivity = false
		return hadActivity
	})

	// NEW: Reset flow state
	public resetFlowState = action(() => {
		this.pipId = null
		this.showWiFiSection = false
		this.showNameSection = false
		this.wiFiTestCompleted = false
		this.hasBeenDisconnected = false
	})

	// NEW: Check if ready to add pip
	public isReadyToAddPip = (): boolean => {
		return this.pipId !== null &&
			this.wiFiTestCompleted &&
			this.hasBeenDisconnected &&
			!this.connected
	}

	public async logout(): Promise<void> {
		await this.disconnect() // This handles port, reader, writer and connected
		runInAction(() => {
			this.messages = []
			this.errorMessage = null
			this.resetFlowState()
		})
	}
}

const serialManagerClass = new SerialManagerClass()

const SerialManagerContext = createContext(serialManagerClass)

export default function SerialManagerProvider({ children }: { children: React.ReactNode }) {
	return (
		<SerialManagerContext.Provider value={serialManagerClass}>
			{children}
		</SerialManagerContext.Provider>
	)
}

export const useSerialManagerContext = () => useContext(SerialManagerContext)
