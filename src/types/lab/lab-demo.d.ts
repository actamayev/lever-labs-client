declare global {
	type MotorDirection = -1 | 0 | 1

	interface MotorControl {
		leftMotor: MotorDirection
		rightMotor: MotorDirection
	}

	interface MotorControlDataToSend extends MotorControl {
		pipUUID: PipUUID
	}

	type LEDDemo =
	| "LED Solid Color"
	| "LED Rainbow"
	| "LED Pulse"
	| "LED 4"

	type MotorDemo =
	| "Motor RTC"

	type DemoNames =
	| LEDDemo
	| MotorDemo
}

export {}
