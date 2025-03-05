import LabReadingComponent from "../../../../reading/lab-reading-component"
import ledsInRoboticsReadingBlocks from "./leds-in-robotics-reading-blocks"

export default function LEDsInRoboticsReading() {
	return (
		<LabReadingComponent
			previousPageLink="/lab/element-1/led/reading/led-advantages"
			previousPageActivity="Reading"
			previousPageTooltip="LED Advantages"
			nextPageLink="/lab/element-1/led/code/warehouse-pip"
			nextPageActivity="Code"
			nextPageTooltip="Warhouse Pip"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={ledsInRoboticsReadingBlocks}
			readingName="LEDs in Robotics"
		/>
	)
}
