declare global {
	interface Navigator {
		serial: {
			requestPort: (options?: { filters: Array<{ usbVendorId?: number; usbProductId?: number }> }) => Promise<SerialPort>
			getPorts: () => Promise<SerialPort[]>
			addEventListener: (event: string, callback: (event: Event) => void) => void
		}
	}

	interface Message {
		content: string
		direction: "sent" | "received"
		timestamp: Date
		isBinary?: boolean
		isStructured?: boolean
	}

	interface DetectedDevice {
		port: SerialPort
		info: SerialPortInfo
		displayName: string
		isKnownRobot: boolean
	}
}

export {}
