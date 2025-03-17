import LEDLightShow from "../../../../../src/components/lab/lessons/led/demos/led-light-show"
import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "LED Light Show Demo",
	// eslint-disable-next-line max-len
	description: "Watch Pip's LEDs create dazzling light patterns and sequences in this pre-programmed demonstration. See the exciting possibilities of LED technology before learning how to code it yourself.",
	path: "/lab/led/demo/led-light-show",
	keywords: ["LED light patterns", "robotics demonstration", "visual learning experience"]
})

export default function LEDLightShowDemoPage() {
	return <LEDLightShow />
}
