import LabReadingComponent from "../../../../reading/lab-reading-component"
import ledsInRoboticsReadingBlocks from "./leds-in-robotics-reading-blocks"

export default function LEDsInRoboticsReading() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/element-1/led/code/warehouse-pip"
			nextPageActivity="Code"
			nextPageTooltip="Warehouse Pip"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={ledsInRoboticsReadingBlocks}
			readingName="LEDs in Robotics"
		/>
	)
}
