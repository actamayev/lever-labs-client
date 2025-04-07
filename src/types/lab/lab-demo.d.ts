import { LucideIcon } from "lucide-react"

declare global {
	interface Demo {
		demoTitle: DemoNames
		demoDescription: string
		demoIcon: LucideIcon
		// demoOnclickEndpoint: () => Promise<AxiosResponse<AllCommonResponses>>
	}

	type MotorDirection = "up" | "down" | "left" | "right"

	interface MotorControlDataToSend {
		motorControl: MotorControlInput
		pipUUID: PipUUID
	}

	interface LedControlDataToSend {
		topLeftColor: RGB
		topRightColor: RGB
		middleLeftColor: RGB
		middleRightColor: RGB
		backLeftColor: RGB
		backRightColor: RGB
		pipUUID: PipUUID
	}

	type LEDDemo =
	| "LED Solid Color"
	| "LED Rainbow"
	| "LED Pulse"
	| "LED 4"

	type MotorDemo =
	| "Real-time motor control"

	type DemoNames =
	| LEDDemo
	| MotorDemo

	interface MotorControlInput {
		vertical: -1 | 1 | 0
		horizontal: -1 | 1 | 0
	}

	interface KeyMapping {
		direction: MotorDirection
		axis: "vertical" | "horizontal"
		value: -1 | 1 | 0
	}

	type MotorDemoKeys =
	| "w"
	| "arrowup"
	| "s"
	| "arrowdown"
	| "a"
	| "arrowleft"
	| "d"
	| "arrowright"
}

export {}
