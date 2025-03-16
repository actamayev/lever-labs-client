import LEDControlWrapper from "../../../../../src/components/lab/lessons/led/code/led-control/led-control-wrapper"
import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "LED Control Code",
	// eslint-disable-next-line max-len
	description: "Explore guided code examples for controlling LEDs in robotics applications. Practice writing code that manipulates LED behavior for various outputs and indicators.",
	path: "/lab/led/code/led-control",
	keywords: ["robotics coding examples", "LED programming practice", "hands-on code learning"]
})

export default function LEDControlCodePage() {
	return <LEDControlWrapper />
}
