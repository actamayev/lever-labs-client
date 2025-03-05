import introToCodeReadingBlocks from "./intro-to-code-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function IntroToCodeReading() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/element-1/led/code/led-control"
			nextPageActivity="Code"
			nextPageTooltip="LED Control"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={introToCodeReadingBlocks}
			readingName="Introduction to Code"
		/>
	)
}
