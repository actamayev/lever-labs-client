import ledsAndLoopsReadingBlocks from "./leds-and-loops-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function LEDsAndLoopsReading() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/element-1/led/code/breathing-leds"
			nextPageActivity="Code"
			nextPageTooltip="Breathing LEDs"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={ledsAndLoopsReadingBlocks}
			readingName="LEDs and Loops"
		/>
	)
}
