"use client"

import { createContext, useContext } from "react"
import { makeAutoObservable, runInAction } from "mobx"
import { MessageType } from "@bluedotrobots/common-ts"

class SerialManagerClass {
	public port: SerialPort | null = null
	public reader: ReadableStreamDefaultReader<Uint8Array> | null = null
	public writer: WritableStreamDefaultWriter<Uint8Array> | null = null
	public connected: boolean = false
	public messages: Message[] = []
	public errorMessage: string | null = null
	private keepAliveInterval: ReturnType<typeof setInterval> | null = null

	constructor() {
		makeAutoObservable(this)
		if (typeof window === "undefined") return
		window.addEventListener("beforeunload", () => {
			// Can't use async here, so use a synchronous approach
			if (this.connected && this.writer) {
				try {
					const disconnectMsg = new Uint8Array([MessageType.SERIAL_END])
					this.writer.write(disconnectMsg)
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
			})

			// Send handshake immediately after connection established
			if (this.writer) {
				// Use the binary protocol - create a 1-byte buffer with HANDSHAKE value (11)
				const handshakeMsg = new Uint8Array([MessageType.SERIAL_HANDSHAKE]) // 11 is HANDSHAKE enum value
				await this.writer.write(handshakeMsg)
				console.log("Sent handshake to ESP32")
			}

			port.addEventListener("disconnect", () => {
				console.log("Device disconnected")
				this.cleanupConnection()
			})

			// Start reading loop
			this.readLoop()
			this.startKeepAlive()
		} catch (error) {
			// Check if it's a user cancellation (NotFoundError)
			if (error instanceof DOMException && error.name === "NotFoundError") {
				// User canceled the selection - don't show an error
				console.log("User canceled device selection")
			} else {
				// Other errors should still be shown
				runInAction(() => {
					this.errorMessage = error instanceof Error ? error.message : String(error)
				})
			}
		}
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
					const keepaliveMsg = new Uint8Array([MessageType.SERIAL_KEEPALIVE])
					await this.writer.write(keepaliveMsg)
					console.log("sending message")
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
				const disconnectMsg = new Uint8Array([MessageType.SERIAL_END])
				await this.writer.write(disconnectMsg)
				console.log("Sent disconnect notification to ESP32")

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
				// eslint-disable-next-line max-depth
					for (let i = 0; i < lines.length - 1; i++) {
						const line = lines[i].trim()
						// eslint-disable-next-line max-depth
						if (line) {
							runInAction(() => {
								this.messages.push({
									content: line,
									direction: "received",
									timestamp: new Date()
								})
							})
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
			// TODO: Await a success response from the ESP before returning true
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

	public async logout(): Promise<void> {
		await this.disconnect() // This handles port, reader, writer and connected
		runInAction(() => {
			this.messages = []
			this.errorMessage = null
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
