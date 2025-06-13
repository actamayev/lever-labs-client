/* eslint-disable max-depth */
"use client"

import { createContext, useContext } from "react"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { makeObservable, observable, runInAction } from "mobx"
import { createCustomEvent } from "../utils/custom-event-dispatcher"

// Define your Pip robot's USB identifiers
// eslint-disable-next-line @typescript-eslint/naming-convention
const PIP_ROBOT_USB_ID = {
	usbVendorId: 0x303a,
	usbProductId: 0x1001  // ESP32-S3 DevKit
}

interface DetectedDevice {
  port: SerialPort
  info: SerialPortInfo
  displayName: string
  isKnownRobot: boolean
}

class SerialConnectionManagerClass extends EventTarget {
	public port: SerialPort | null = null
	public reader: ReadableStreamDefaultReader<Uint8Array> | null = null
	public writer: WritableStreamDefaultWriter<Uint8Array> | null = null
	public connected: boolean = false
	public errorMessage: string | null = null
	public detectedDevices: DetectedDevice[] = []
	public isScanning: boolean = false
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
			hasUserActivity: observable,
			detectedDevices: observable,
			isScanning: observable
		})

		if (typeof window === "undefined") return

		// Try to auto-reconnect on page load
		this.tryAutoReconnect()

		// Listen for USB device connections (when devices are plugged in)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (navigator.serial) {
			navigator.serial.addEventListener("connect", (event) => {
				console.log("USB device connected:", event)
				this.handleDevicePluggedIn(event.target as SerialPort)
			})

			navigator.serial.addEventListener("disconnect", (event) => {
				console.log("USB device disconnected:", event)
				this.handleDeviceUnplugged(event.target as SerialPort)
			})
		}

		window.addEventListener("beforeunload", () => {
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

	// Try to auto-reconnect to previously authorized devices
	async tryAutoReconnect(): Promise<boolean> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!navigator.serial) return false

			const ports = await navigator.serial.getPorts()

			// Look for a previously connected Pip robot
			for (const port of ports) {
				const info = port.getInfo()
				if (this.isPipRobot(info)) {
					console.log("Found previously authorized Pip robot, attempting auto-reconnect...")
					await this.connectToSpecificPort(port)
					return true
				}
			}

			// If we have any previously authorized port and no specific Pip robot found,
			// try the first one (assuming user only connects Pip robots)
			if (ports.length > 0) {
				console.log("Found previously authorized device, attempting auto-reconnect...")
				await this.connectToSpecificPort(ports[0])
				return true
			}

			return false
		} catch (error) {
			console.error("Auto-reconnect failed:", error)
			return false
		}
	}

	// Handle when a USB device is plugged in
	private async handleDevicePluggedIn(port: SerialPort): Promise<void> {
		console.log("New device plugged in, checking if it's a Pip robot...")

		// Don't auto-connect if we're already connected
		if (this.connected) return

		try {
			const info = port.getInfo()

			// Check if this is a Pip robot
			if (this.isPipRobot(info)) {
				console.log("Pip robot detected! Attempting auto-connect...")

				// Emit event for UI feedback
				this.dispatchEvent(createCustomEvent("deviceDetected", { isKnownRobot: true }))

				// Attempt to connect
				await this.connectToSpecificPort(port)
			} else {
				console.log("Unknown device plugged in:", "Pip")

				// Still emit event for UI awareness
				this.dispatchEvent(createCustomEvent("deviceDetected", { isKnownRobot: false }))
			}
		} catch (error) {
			console.error("Error handling plugged device:", error)
		}
	}

	// Handle when a USB device is unplugged
	private handleDeviceUnplugged(port: SerialPort): void {
		console.log("Device unplugged")

		// Check if it's our currently connected port
		if (this.port === port && this.connected) {
			console.log("Our connected device was unplugged")
			this.handleDisconnection()
		} else {
			console.log("Unrelated device was unplugged")
		}

		// Emit event for UI feedback
		this.dispatchEvent(createCustomEvent("deviceRemoved"))
	}
	private isPipRobot(info: SerialPortInfo): boolean {
		return (
			(PIP_ROBOT_USB_ID.usbVendorId === info.usbVendorId) &&
			(PIP_ROBOT_USB_ID.usbProductId === info.usbProductId)
		)
	}

	// Scan for available devices (this will show what's connected but not authorized)
	async scanForDevices(): Promise<DetectedDevice[]> {
		runInAction(() => {
			this.isScanning = true
			this.detectedDevices = []
		})

		try {
			// Get already authorized ports
			const authorizedPorts = await navigator.serial.getPorts()

			const devices: DetectedDevice[] = authorizedPorts.map(port => {
				const info = port.getInfo()
				return {
					port,
					info,
					displayName: "Pip",
					isKnownRobot: this.isPipRobot(info)
				}
			})

			runInAction(() => {
				this.detectedDevices = devices
				this.isScanning = false
			})

			return devices
		} catch (error) {
			runInAction(() => {
				this.isScanning = false
				this.errorMessage = error instanceof Error ? error.message : String(error)
			})
			return []
		}
	}

	// Connect to a specific port (used for auto-reconnect and device selection)
	async connectToSpecificPort(port: SerialPort): Promise<void> {
		if (this.connected) return

		try {
			await port.open({ baudRate: 115200 })

			if (!port.readable || !port.writable) {
				throw new Error("Port is not readable or writable")
			}

			const reader = port.readable.getReader()
			const writer = port.writable.getWriter()

			runInAction(() => {
				this.port = port
				this.reader = reader
				this.writer = writer
				this.connected = true
				this.errorMessage = null
			})

			this.dispatchEvent(createCustomEvent("connected"))

			// Send handshake
			if (this.writer) {
				const handshakeMsg = MessageBuilder.createSerialHandshakeMessage()
				await this.writer.write(new Uint8Array(handshakeMsg))
			}

			// Note: We don't add a port-specific disconnect listener here because
			// we already handle disconnects globally in the constructor with
			// navigator.serial.addEventListener("disconnect", ...)

			this.readLoop()
			this.startKeepAlive()
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error)
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			console.error("Error connecting to port:", error)
		}
	}

	// Original connect method - now uses filtered device selection
	async connectToDevice(): Promise<void> {
		if (this.connected) return

		try {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!navigator.serial) {
				throw new Error("Web Serial API not supported in this browser")
			}

			// First try auto-reconnect
			const autoConnected = await this.tryAutoReconnect()
			if (autoConnected) return

			// If auto-reconnect failed, show filtered device selector
			const port = await navigator.serial.requestPort({
				filters: [PIP_ROBOT_USB_ID]
			})

			await this.connectToSpecificPort(port)
		} catch (error) {
			// Check if it's a user cancellation
			if (!(error instanceof DOMException && error.name === "NotFoundError")) {
				const errorMsg = error instanceof Error ? error.message : String(error)
				runInAction(() => {
					this.errorMessage = errorMsg
				})
				console.error("Error requesting port:", error)
			}
		}
	}

	// Connect to a device from the scanned list
	async connectToDetectedDevice(device: DetectedDevice): Promise<void> {
		await this.connectToSpecificPort(device.port)
	}

	// Request permission for a new device (forces the native browser dialog)
	async requestNewDevice(): Promise<void> {
		try {
			const port = await navigator.serial.requestPort({
				filters: [PIP_ROBOT_USB_ID]
			})
			await this.connectToSpecificPort(port)
		} catch (error) {
			if (!(error instanceof DOMException && error.name === "NotFoundError")) {
				const errorMsg = error instanceof Error ? error.message : String(error)
				runInAction(() => {
					this.errorMessage = errorMsg
				})
				console.error("Error requesting new device:", error)
			}
		}
	}

	private handleDisconnection(): void {
		// Prevent multiple disconnection handling
		if (!this.connected) {
			console.log("Disconnection already handled")
			return
		}

		console.log("Handling device disconnection")
		this.dispatchEvent(createCustomEvent("disconnected"))
		this.cleanupConnection()
	}

	private startKeepAlive(): void {
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval)
		}

		this.keepAliveInterval = setInterval(async () => {
			if (this.connected && this.writer) {
				try {
					const keepaliveMsg = MessageBuilder.createSerialKeepaliveMessage()
					await this.writer.write(new Uint8Array(keepaliveMsg))
				} catch (error) {
					console.error("Keepalive error:", error)
					await this.cleanupConnection()
				}
			}
		}, 5000)
	}

	async disconnect(): Promise<void> {
		if (!this.connected) return

		try {
			if (this.writer) {
				const disconnectMsg = MessageBuilder.createSerialEndMessage()
				await this.writer.write(new Uint8Array(disconnectMsg))
				await new Promise(resolve => setTimeout(resolve, 50))
			}
			this.dispatchEvent(createCustomEvent("disconnected"))
			await this.cleanupConnection()
		} catch (error) {
			console.error("Error disconnecting:", error)
		}
	}

	private async readLoop(): Promise<void> {
		if (!this.reader) return

		try {
			const decoder = new TextDecoder()
			let buffer = ""

			while (this.connected) {
				const { value, done } = await this.reader.read()

				if (done) break

				buffer += decoder.decode(value, { stream: true })
				const lines = buffer.split("\n")

				if (lines.length > 1) {
					for (let i = 0; i < lines.length - 1; i++) {
						const line = lines[i].trim()
						if (line) {
							console.info("Received:", line)
							this.dispatchEvent(createCustomEvent("rawMessage", line))
						}
					}
					buffer = lines[lines.length - 1]
				}
			}
		} catch (error) {
			console.error("Error in read loop:", error)
			const errorMsg = error instanceof Error ? error.message : String(error)
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			await this.cleanupConnection()
		}
	}

	async sendBinaryMessage(buffer: ArrayBuffer): Promise<boolean> {
		if (!this.connected || !this.writer) {
			const errorMsg = "Not connected to device"
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			console.error(errorMsg)
			return false
		}

		try {
			const data = new Uint8Array(buffer)
			await this.writer.write(data)

			const formattedData = this.formatBinaryForDisplay(buffer)
			this.dispatchEvent(createCustomEvent("messageSent", {
				content: formattedData,
				timestamp: new Date(),
				isBinary: true
			}))

			return true
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error)
			runInAction(() => {
				this.errorMessage = errorMsg
			})
			console.error("Error sending binary message:", error)
			await this.cleanupConnection()
			return false
		}
	}

	private formatBinaryForDisplay(buffer: ArrayBuffer): string {
		const array = new Uint8Array(buffer)
		return Array.from(array)
			.map(byte => byte.toString(16).padStart(2, "0"))
			.join(" ")
	}

	// eslint-disable-next-line complexity
	private async cleanupConnection(): Promise<void> {
		// Prevent multiple cleanup attempts
		if (!this.connected && !this.port && !this.reader && !this.writer) {
			return // Already cleaned up
		}

		console.log("Cleaning up connection...")

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
				// Only try to close if the port is actually open
				if (this.port.readable || this.port.writable) {
					await this.port.close()
				}
			} catch (e) {
				// Ignore errors if port is already closed or closing
				if (e instanceof DOMException && e.name === "InvalidStateError") {
					console.log("Port already closed or closing")
				} else {
					console.error("Error closing port:", e)
				}
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

		console.log("Connection cleanup complete")
	}

	public markUserActivity = (): void => {
		runInAction(() => {
			this.hasUserActivity = true
		})
	}

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
