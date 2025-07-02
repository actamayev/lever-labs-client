declare global {
	interface SerialMessage {
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
