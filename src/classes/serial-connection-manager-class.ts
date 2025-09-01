/* eslint-disable max-depth */
"use client"

import { makeAutoObservable, runInAction } from "mobx"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import authClass from "./auth-class"
import { PIP_ROBOT_USB_ID } from "../utils/constants/constants"
import serialMessageManagerClass from "./serial-message-manager-class"
import workbenchClass from "./workbench-class"
import pipClass from "./pip-class"

class SerialConnectionManagerClass {
	public port: SerialPort | null = null
	public reader: ReadableStreamDefaultReader<Uint8Array> | null = null
	public writer: WritableStreamDefaultWriter<Uint8Array> | null = null
	public connected: boolean = false
	// eslint-disable-next-line max-len
	public pipTurnedOn: boolean = false // This is to track if Pip has fully turned on (waits until Pip's button has been pressed for 1 second)
	public detectedDevices: DetectedDevice[] = []
	public isScanning: boolean = false
	private keepAliveInterval: ReturnType<typeof setInterval> | null = null

	// Web Worker for background keepalives
	private keepaliveWorker: Worker | null = null
	private workerMessageHandler?: (e: MessageEvent) => void
	private readonly keepAliveTimeout = 100

	constructor() {
		makeAutoObservable(this)

		if (typeof window === "undefined") return

		// Initialize Web Worker
		this.initializeKeepaliveWorker()

		// Listen for USB device connections (when devices are plugged in)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (navigator.serial) {
			navigator.serial.addEventListener("connect", (event) => {
				console.info("USB device connected:", event)
				this.handleDevicePluggedIn(event.target as SerialPort)
			})

			navigator.serial.addEventListener("disconnect", (event) => {
				console.info("USB device disconnected:", event)
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

	private initializeKeepaliveWorker(): void {
		try {
			this.keepaliveWorker = new Worker("/keepalive-worker.js")

			this.workerMessageHandler = (e: MessageEvent): void => {
				if (e.data.type === "SEND_KEEPALIVE") {
					// Worker is telling us to send a keepalive
					void this.sendKeepaliveFromWorker()
				}
			}

			this.keepaliveWorker.addEventListener("message", this.workerMessageHandler)

			// console.info("Keepalive worker initialized successfully")
		} catch (error) {
			console.error("Failed to initialize keepalive worker:", error)
			this.fallbackToMainThreadKeepalive()
		}
	}

	private async sendKeepaliveFromWorker(): Promise<void> {
		if (!this.pipTurnedOn || !this.writer) return

		try {
			const keepaliveMsg = MessageBuilder.createSerialKeepaliveMessage()
			await this.writer.write(new Uint8Array(keepaliveMsg))
		} catch (error) {
			console.error("Keepalive error from worker:", error)
			await this.cleanupConnection()
		}
	}

	private fallbackToMainThreadKeepalive(): void {
		console.warn("Falling back to main thread keepalive")
		this.startMainThreadKeepalive()
	}

	private startMainThreadKeepalive(): void {
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval)
		}

		this.keepAliveInterval = setInterval(async () => {
			if (this.pipTurnedOn && this.writer) {
				try {
					const keepaliveMsg = MessageBuilder.createSerialKeepaliveMessage()
					await this.writer.write(new Uint8Array(keepaliveMsg))
				} catch (error) {
					console.error("Main thread keepalive error:", error)
					await this.cleanupConnection()
				}
			}
		}, this.keepAliveTimeout)
	}

	// Try to auto-reconnect to previously authorized devices
	async tryAutoReconnect(): Promise<boolean> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!navigator.serial) return false

			const ports = await navigator.serial.getPorts()

			// Look for a previously connected Pip
			for (const port of ports) {
				const info = port.getInfo()
				if (this.isPipRobot(info)) {
					console.info("Found previously authorized Pip, attempting auto-reconnect...")
					await this.connectToSpecificPort(port)
					return true
				}
			}

			// If we have any previously authorized port and no specific Pip found,
			// try the first one (assuming user only connects Pip)
			if (ports.length > 0) {
				console.info("Found previously authorized device, attempting auto-reconnect...")
				await this.connectToSpecificPort(ports[0])
				return true
			}

			return false
		} catch (error) {
			console.error("Auto-reconnect failed:", error)
			return false
		}
	}

	// Check and auto-connect if user is logged in (called when user logs in)
	public async checkAndAutoConnectIfLoggedIn(): Promise<void> {
		if (!authClass.isFinishedWithSignup || this.pipTurnedOn) return

		try {
			await this.tryAutoReconnect()
		} catch (error) {
			console.error("Login auto-connect failed:", error)
		}
	}

	// Handle when a USB device is plugged in
	private async handleDevicePluggedIn(port: SerialPort): Promise<void> {
		// Don't auto-connect if we're already connected OR if user isn't logged in
		if (this.pipTurnedOn || !authClass.isFinishedWithSignup) return

		try {
			const info = port.getInfo()

			// Check if this is a Pip
			if (this.isPipRobot(info)) {
				// Attempt to connect
				await this.connectToSpecificPort(port)
			} else {
				console.info("Unknown device plugged in:", "Pip")
			}
		} catch (error) {
			console.error("Error handling plugged device:", error)
		}
	}

	// Handle when a USB device is unplugged
	private handleDeviceUnplugged(port: SerialPort): void {
		// Check if it's our currently connected port
		if (this.port === port && this.pipTurnedOn) {
			console.info("Pip was unplugged or turned off")
			this.handleDisconnection()
		} else {
			console.info("Unrelated device was unplugged")
		}
	}

	private isPipRobot(info: SerialPortInfo): boolean {
		return (
			(PIP_ROBOT_USB_ID.usbVendorId === info.usbVendorId) &&
			(PIP_ROBOT_USB_ID.usbProductId === info.usbProductId)
		)
	}

	// Connect to a specific port (used for auto-reconnect and device selection)
	async connectToSpecificPort(port: SerialPort): Promise<void> {
		// Check auth state
		if (!authClass.isFinishedWithSignup) {
			console.error("Cannot connect: user not logged in")
			return
		}

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
				// Don't set pipTurnedOn here - wait until we get the response from serial message manager
			})

			// Directly call the message manager's connected handler
			serialMessageManagerClass.handleConnected()

			// Send handshake
			if (this.writer) {
				const handshakeMsg = MessageBuilder.createSerialHandshakeMessage()
				await this.writer.write(new Uint8Array(handshakeMsg))
			}
			this.readLoop()
			this.startWorkerKeepalive()
		} catch (error) {
			console.error("Error connecting to port:", error)
		}
	}

	// Original connect method - now uses filtered device selection
	public async connectToDevice(): Promise<void> {
		// Check auth state
		if (!authClass.isFinishedWithSignup) {
			console.error("Cannot connect: user not logged in")
			return
		}

		if (this.pipTurnedOn) return

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
				console.error("Error requesting port:", error)
			}
		}
	}

	// Request permission for a new device (forces the native browser dialog)
	public async requestNewDevice(): Promise<void> {
		// Check auth state
		if (!authClass.isFinishedWithSignup) {
			console.error("Cannot request new device: user not logged in")
			return
		}

		try {
			const port = await navigator.serial.requestPort({
				filters: [PIP_ROBOT_USB_ID]
			})
			await this.connectToSpecificPort(port)
		} catch (error) {
			if (!(error instanceof DOMException && error.name === "NotFoundError")) {
				console.error("Error requesting new device:", error)
			}
		}
	}

	private handleDisconnection(): void {
		// Prevent multiple disconnection handling
		if (!this.pipTurnedOn) {
			console.info("Disconnection already handled")
			return
		}

		console.info("Handling device disconnection")

		// Directly call the message manager's disconnected handler
		serialMessageManagerClass.handleDisconnected()

		void this.cleanupConnection()
	}

	private startWorkerKeepalive(): void {
		if (this.keepaliveWorker) {
			console.info("Starting worker-based keepalive")
			this.keepaliveWorker.postMessage({
				type: "START_KEEPALIVE",
				data: { interval: this.keepAliveTimeout }
			})
		} else {
			console.warn("Worker not available, using main thread keepalive")
			this.startMainThreadKeepalive()
		}
	}

	private stopKeepalive(): void {
		// Stop worker keepalive
		if (this.keepaliveWorker) {
			this.keepaliveWorker.postMessage({ type: "STOP_KEEPALIVE" })
		}

		// Stop main thread keepalive
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval)
			this.keepAliveInterval = null
		}
	}

	async disconnect(): Promise<void> {
		if (!this.pipTurnedOn) return

		try {
			if (this.writer) {
				const disconnectMsg = MessageBuilder.createSerialEndMessage()
				await this.writer.write(new Uint8Array(disconnectMsg))
				await new Promise(resolve => setTimeout(resolve, 50))
			}

			// Directly call the message manager's disconnected handler
			serialMessageManagerClass.handleDisconnected()

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
						console.log("line", line)
						if (line) {
							serialMessageManagerClass.handleRawMessage(line)
						}
					}
					buffer = lines[lines.length - 1]
				}
			}
		} catch (error) {
			console.error("Error in read loop:", error)
			await this.cleanupConnection()
		}
	}

	async sendBinaryMessage(buffer: ArrayBuffer): Promise<boolean> {
		if (!this.pipTurnedOn || !this.writer) {
			console.error("Not connected to device")
			return false
		}

		try {
			const data = new Uint8Array(buffer)
			await this.writer.write(data)

			const formattedData = this.formatBinaryForDisplay(buffer)
			serialMessageManagerClass.handleMessageSent({
				content: formattedData,
				timestamp: new Date(),
				isBinary: true
			})

			return true
		} catch (error) {
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

		console.info("Cleaning up connection...")

		// Stop keepalives first
		this.stopKeepalive()

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
					console.info("Port already closed or closing")
				} else {
					console.error("Error closing port:", e)
				}
			}
		}

		// Reset state
		runInAction(() => {
			this.port = null
			this.reader = null
			this.writer = null
			this.connected = false
			this.pipTurnedOn = false
			workbenchClass.setBatteryDataNull()
			pipClass.setPipPluggedInSerial(false)
		})

		console.info("Connection cleanup complete")
	}

	public async logout(): Promise<void> {
		// Cleanup worker
		if (this.keepaliveWorker && this.workerMessageHandler) {
			this.keepaliveWorker.removeEventListener("message", this.workerMessageHandler)
			this.keepaliveWorker.terminate()
			this.keepaliveWorker = null
		}

		await this.disconnect()
	}
}

const serialConnectionManagerClass = new SerialConnectionManagerClass()

export default serialConnectionManagerClass
