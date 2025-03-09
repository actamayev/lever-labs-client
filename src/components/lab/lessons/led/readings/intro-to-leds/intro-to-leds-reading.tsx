import introToLedsReadingBlocks from "./intro-to-leds-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function IntroToLEDsReading() {
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
