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
	type PixelBuffer = boolean[][]

	type GarageStatusType = "driving" | "lights" | "sounds" | "display"

	type GarageStatusValue = "none" | "all-on" | "all-off" | "mixed"
}

export {}
