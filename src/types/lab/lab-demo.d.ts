import { LucideIcon } from "lucide-react"

declare global {
	interface Demo {
		demoTitle: DemoNames
		demoDescription: string
		demoIcon: LucideIcon
		// demoOnclickEndpoint: () => Promise<AxiosResponse<AllCommonResponses>>
	}

	type LEDDemo =
	| "LED Solid Color"
	| "LED Light Show"
	| "LED Pulse"
	| "LED 4"

	type MotorDemo =
	| "Real-time motor control"

	type DemoNames =
	| LEDDemo
	| MotorDemo
}

export {}
