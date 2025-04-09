declare global {
	type DriveDirection =
		| "forward"
		| "backward"
		| "left"
		| "right"
	type LightAnimation =
		| "No animation"
		| "Breathing"
		| "Rainbow"
		| "Strobe"
		// | "Snake"
		// | "Turn off"
		// | "Fade out"
		// | "Pause breathing"

	type MotorDirection = "up" | "down" | "left" | "right"

	type Actions = "horn" | "headlights"

	interface MotorControlInput {
		vertical: -1 | 1 | 0
		horizontal: -1 | 1 | 0
	}

	interface KeyMapping {
		direction: MotorDirection
		axis: "vertical" | "horizontal"
		value: -1 | 0 | 1
		driveDirection: DriveDirection
	}
}

export {}
