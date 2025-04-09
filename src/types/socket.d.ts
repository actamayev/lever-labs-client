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

	interface HornDataToSend extends PipUUID {
		hornStatus: boolean
	}

	interface HeadlightDataToSend extends PipUUID {
		headlightsStatus: boolean
	}

	// Incoming socket events:
	type PipStatusUpdate = {
		pipUUID: PipUUID
		newConnectionStatus: PipConnectionStatus
	}

	interface SensorPayload {
		leftWheelRPM: number
		rightWheelRPM: number
		irSensorData: number[] & { length: 5 }

		redValue: number
		greenValue: number
		blueValue: number

		pitch: number
		yaw: number
		roll: number

		aX: number
		aY: number
		aZ: number

		gX: number
		gY: number
		gZ: number

		mX: number
		mY: number
		mZ: number
	}

	type IncomingSensorData = {
		pipUUID: PipUUID
		sensorPayload: SensorPayload
	}
}

export {}
