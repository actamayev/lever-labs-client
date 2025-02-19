import voltageReadingBlocks from "./voltage-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function VoltageReading() {
	return (
		<LabReadingComponent
			previousPageLink={null}
			previousPageActivity={null}
			nextPageLink="/lab/element-1/led/reading/rgb-leds"
			nextPageActivity="Reading"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={voltageReadingBlocks}
		/>
	)
}
