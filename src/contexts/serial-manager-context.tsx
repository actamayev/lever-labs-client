import { createContext, useContext } from "react"
import { makeAutoObservable, runInAction } from "mobx"
import { MessageType } from "@bluedotrobots/common-ts"

class SerialManagerClass {
	public port: SerialPort | null = null
	public reader: ReadableStreamDefaultReader<Uint8Array> | null = null
	public writer: WritableStreamDefaultWriter<Uint8Array> | null = null
	public connected: boolean = false
	public connecting: boolean = false
	public messages: Message[] = []
	public errorMessage: string | null = null
	private keepAliveInterval: ReturnType<typeof setInterval> | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async connectToDevice(): Promise<void> {
		if (this.connected) return

		try {
			this.connecting = true

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
				this.connecting = false
				this.errorMessage = null
			})

			// Send handshake immediately after connection established
			if (this.writer) {
				// Use the binary protocol - create a 1-byte buffer with HANDSHAKE value (11)
				const handshakeMsg = new Uint8Array([MessageType.SERIAL_HANDSHAKE]) // 11 is HANDSHAKE enum value
				await this.writer.write(handshakeMsg)
				console.log("Sent handshake to ESP32")
			}

			// Start reading loop
			this.readLoop()
			this.startKeepAlive()
		} catch (error) {
			runInAction(() => {
				this.connecting = false
				this.errorMessage = error instanceof Error ? error.message : String(error)
			})
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
					// Use the binary protocol - create a 1-byte buffer with KEEPALIVE value (12)
					const keepaliveMsg = new Uint8Array([MessageType.SERIAL_KEEPALIVE]) // 12 is KEEPALIVE enum value
					await this.writer.write(keepaliveMsg)
					console.log("sending message")
				} catch (error) {
					console.error("Keepalive error:", error)
				}
			}
		}, 5000)
	}

	async disconnect(): Promise<void> {
		if (!this.connected) return

		try {
			// Send disconnect notification before closing
			if (this.writer) {
			// Create a 1-byte buffer with SERIAL_END value (13)
				const disconnectMsg = new Uint8Array([MessageType.SERIAL_END])
				await this.writer.write(disconnectMsg)
				console.log("Sent disconnect notification to ESP32")

				// Short delay to allow message to be sent
				await new Promise(resolve => setTimeout(resolve, 50))
			}

			// Then proceed with normal disconnect procedure
			if (this.reader) {
				await this.reader.cancel()
				this.reader.releaseLock()
			}

			if (this.writer) {
				this.writer.releaseLock()
			}

			if (this.port) {
				await this.port.close()
			}

		} catch (error) {
			console.error("Error disconnecting:", error)
		}

		// Clear the keepalive interval
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval)
			this.keepAliveInterval = null
		}

		runInAction(() => {
			this.port = null
			this.reader = null
			this.writer = null
			this.connected = false
			this.errorMessage = null
		})
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
				this.connected = false
			})
		}
	}

	async sendBinaryMessage(buffer: ArrayBuffer): Promise<void> {
		if (!this.connected || !this.writer) {
			this.errorMessage = "Not connected to device"
			return
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
		} catch (error) {
			runInAction(() => {
				this.errorMessage = error instanceof Error ? error.message : String(error)
			})
		}
	}

	// Helper to format binary data for display
	private formatBinaryForDisplay(buffer: ArrayBuffer): string {
		const array = new Uint8Array(buffer)
		return Array.from(array)
			.map(byte => byte.toString(16).padStart(2, "0"))
			.join(" ")
	}

	public async logout(): Promise<void> {
		await this.disconnect()
		this.port = null
		this.reader = null
		this.writer = null
		this.connected = false
		this.connecting = false
		this.messages = []
		this.errorMessage = null
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
