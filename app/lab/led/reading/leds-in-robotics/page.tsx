import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import ledsInRoboticsReadingBlocks
	from "../../../../../src/components/lab/lessons/led/reading-blocks/leds-in-robotics-reading-blocks"

export const metadata = createMetadata({
	title: "LEDs in Robotics",
	// eslint-disable-next-line max-len
	description: "Explore how LEDs are used in robotics for indicators, displays, and more. Understand the practical applications of light-emitting diodes in modern robotic systems.",
	path: "/lab/led/reading/leds-in-robotics",
	keywords: ["robot status indicators", "machine feedback systems", "visual communication in robots"]
})

export default function LEDsInRoboticsReadingPage() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/code/warehouse-pip"
			nextPageActivity="Code"
			nextPageTooltip="Warehouse Pip"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={ledsInRoboticsReadingBlocks}
			readingName="LEDs in Robotics"
		/>
	)
}
