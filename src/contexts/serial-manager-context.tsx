/* eslint-disable max-depth */
"use client"

import { makeObservable, observable, runInAction } from "mobx"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { createContext, useContext } from "react"

class SerialConnectionManagerClass extends EventTarget {
	public port: SerialPort | null = null
	public reader: ReadableStreamDefaultReader<Uint8Array> | null = null
	public writer: WritableStreamDefaultWriter<Uint8Array> | null = null
	public connected: boolean = false
	public errorMessage: string | null = null
	private keepAliveInterval: ReturnType<typeof setInterval> | null = null
	public hasUserActivity = false

	constructor() {
		super()
		makeObservable(this, {
			port: observable,
			reader: observable,
			writer: observable,
			connected: observable,
			errorMessage: observable,
			hasUserActivity: observable
		})
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
			})

			// Emit connected event
			this.dispatchEvent(new CustomEvent("connected"))

			// Send handshake immediately after connection established
			if (this.writer) {
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
				const errorMsg = error instanceof Error ? error.message : String(error)
				runInAction(() => {
					this.errorMessage = errorMsg
				})
				this.dispatchEvent(new CustomEvent("error", { detail: errorMsg }))
			}
		}
	}

	private handleDisconnection(): void {
		this.dispatchEvent(new CustomEvent("disconnected"))
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
					const errorMsg = error instanceof Error ? error.message : String(error)
					this.dispatchEvent(new CustomEvent("error", { detail: errorMsg }))
					await this.cleanupConnection()
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
			this.dispatchEvent(new CustomEvent("disconnected"))

			await this.cleanupConnection()
		} catch (error) {
			console.error("Error disconnecting:", error)
			const errorMsg = error instanceof Error ? error.message : String(error)
			this.dispatchEvent(new CustomEvent("error", { detail: errorMsg }))
		}
	}

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
							// Emit raw message event
							this.dispatchEvent(new CustomEvent("rawMessage", { detail: line }))
						}
					}

					// Keep incomplete line in buffer
					buffer = lines[lines.length - 1]
				}
			}
		} catch (error) {
			console.error("Error in read loop:", error)
			const errorMsg = error instanceof Error ? error.message : String(error)
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			this.dispatchEvent(new CustomEvent("error", { detail: errorMsg }))
			await this.cleanupConnection()
		}
	}

	async sendBinaryMessage(buffer: ArrayBuffer): Promise<boolean> {
		if (!this.connected || !this.writer) {
			const errorMsg = "Not connected to device"
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			this.dispatchEvent(new CustomEvent("error", { detail: errorMsg }))
			return false
		}

		try {
			// Convert to Uint8Array for writing
			const data = new Uint8Array(buffer)

			// Send data
			await this.writer.write(data)

			// Emit sent message event with formatted display
			const formattedData = this.formatBinaryForDisplay(buffer)
			this.dispatchEvent(new CustomEvent("messageSent", {
				detail: {
					content: formattedData,
					timestamp: new Date(),
					isBinary: true
				}
			}))

			return true
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error)
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			this.dispatchEvent(new CustomEvent("error", { detail: errorMsg }))
			await this.cleanupConnection()
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

	public markUserActivity = (): void => {
		runInAction(() => {
			this.hasUserActivity = true
		})
	}

	// Method to check and reset user activity
	public checkAndResetUserActivity = (): boolean => {
		const hadActivity = this.hasUserActivity
		runInAction(() => {
			this.hasUserActivity = false
		})
		return hadActivity
	}

	public async logout(): Promise<void> {
		await this.disconnect()
		runInAction(() => {
			this.errorMessage = null
		})
	}
}

export const serialConnectionManager = new SerialConnectionManagerClass()

const SerialManagerContext = createContext(serialConnectionManager)

export default function SerialManagerProvider({ children }: { children: React.ReactNode }) {
	return (
		<SerialManagerContext.Provider value={serialConnectionManager}>
			{children}
		</SerialManagerContext.Provider>
	)
}

export const useSerialManagerContext = () => useContext(SerialManagerContext)
