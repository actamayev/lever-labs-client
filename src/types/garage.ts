declare global {
	type DriveDirection =
		| "forward"
		| "backward"
		| "left"
		| "right"

	type MotorDirection = "up" | "down" | "left" | "right"

	type Actions = "horn" | "headlights"

	interface MotorDriveKeyMapping {
		direction: MotorDirection
		axis: "vertical" | "horizontal"
		value: -1 | 0 | 1
	}
}

export {}
