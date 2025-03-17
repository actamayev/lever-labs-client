import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import introToLedsReadingBlocks from "../../../../../src/components/lab/lessons/led/reading-blocks/intro-to-leds-reading-blocks"

export const metadata = createMetadata({
	title: "Intro to LEDs",
	// eslint-disable-next-line max-len
	description: "Learn how LEDs work and how to control Pip's LEDs through basic programming concepts. Discover the fundamentals of digital light control in robotics.",
	path: "/lab/led/reading/intro-to-leds",
	keywords: ["LED programming", "light control basics", "robotics fundamentals"]
})

export default function IntroToLEDsReadingPage() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/reading/voltage"
			nextPageActivity="Reading"
			nextPageTooltip="Voltage"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={introToLedsReadingBlocks}
			readingName="Introduction to LEDs"
		/>
	)
}
