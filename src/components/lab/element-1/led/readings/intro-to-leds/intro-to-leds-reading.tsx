import introToLedsReadingBlocks from "./intro-to-leds-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function IntroToLEDsReading() {
	return (
		<LabReadingComponent
			previousPageLink={null}
			previousPageActivity={null}
			nextPageLink="/lab/element-1/led/reading/voltage"
			nextPageActivity="Reading"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={introToLedsReadingBlocks}
		/>
	)
}
