import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import ledsAndLoopsReadingBlocks from "../../../../../src/components/lab/lessons/led/reading-blocks/leds-and-loops-reading-blocks"

export const metadata = createMetadata({
	title: "LEDs and Loops",
	// eslint-disable-next-line max-len
	description: "Understand how to use programming loops to control LEDs in robotics. Learn efficient coding techniques to create patterns and sequences with multiple LEDs.",
	path: "/lab/led/reading/leds-and-loops",
	keywords: ["programming loops tutorial", "sequential LED control", "pattern programming techniques"]
})

export default function LEDsAndLoopsReadingPage() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/code/breathing-leds"
			nextPageActivity="Code"
			nextPageTooltip="Breathing LEDs"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={ledsAndLoopsReadingBlocks}
			readingName="LEDs and Loops"
		/>
	)
}
