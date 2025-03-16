import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import BreathingLEDsWrapper from "../../../../../src/components/lab/lessons/led/code/breathing-leds/breathing-leds-wrapper"

export const metadata = createMetadata({
	title: "Breathing LEDs Code",
	// eslint-disable-next-line max-len
	description: "Learn to code a breathing effect for LEDs with this practical example. Practice writing algorithms that create smooth transitions between different light intensities.",
	path: "/lab/led/code/breathing-leds",
	keywords: ["pulse effect programming", "smooth transition algorithms", "LED animation coding"]
})

export default function BreathingLEDsCodePage() {
	return <BreathingLEDsWrapper />
}
