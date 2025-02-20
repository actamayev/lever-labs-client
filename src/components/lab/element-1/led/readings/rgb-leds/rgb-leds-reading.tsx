import rgbLedsReadingBlocks from "./rgb-leds-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function RGBLedsReading() {
	return (
		<LabReadingComponent
			previousPageLink={null}
			previousPageActivity={null}
			nextPageLink="/lab/element-1/led/reading/intro-to-code"
			nextPageActivity="Reading"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={rgbLedsReadingBlocks}
			readingName="RGB LEDs"
		/>
	)
}
