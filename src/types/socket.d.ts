declare global {
	interface PipUUIDInterface {
		pipUUID: PipUUID
	}

	interface MotorControlDataToSend extends PipUUIDInterface {
		motorControl: MotorControlInput
		motorThrottlePercent: number
	}

	interface LedControlDataToSend extends PipUUIDInterface {
		topLeftColor: RGB
		topRightColor: RGB
		middleLeftColor: RGB
		middleRightColor: RGB
		backLeftColor: RGB
		backRightColor: RGB
	}
}

export {}
