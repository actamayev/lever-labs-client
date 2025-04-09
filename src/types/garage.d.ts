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

	type GarageControls = MotorDirection | Actions

	interface MotorControlInput {
		vertical: -1 | 1 | 0
		horizontal: -1 | 1 | 0
	}

	interface KeyMapping {
		direction: GarageControls
		axis: "vertical" | "horizontal" | "action"
		value: -1 | 0 | 1
	}
}

export {}
