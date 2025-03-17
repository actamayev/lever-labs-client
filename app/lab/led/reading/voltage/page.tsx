import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import voltageReadingBlocks from "../../../../../src/components/lab/lessons/led/reading-blocks/voltage-reading-blocks"

export const metadata = createMetadata({
	title: "Understanding Voltage with LEDs",
	// eslint-disable-next-line max-len
	description: "Explore how voltage powers LEDs and affects their brightness. Learn essential electrical concepts for robotics through Pip's interactive examples.",
	path: "/lab/led/reading/voltage",
	keywords: ["voltage concepts", "LED electronics", "electrical fundamentals"]
})

export default function VoltageReadingPage() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/reading/rgb-leds"
			nextPageActivity="Reading"
			nextPageTooltip="RGB LEDs"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={voltageReadingBlocks}
			readingName="Voltage"
		/>
	)
}
