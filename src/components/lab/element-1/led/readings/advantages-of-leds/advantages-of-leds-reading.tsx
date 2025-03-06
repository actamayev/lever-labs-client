import LabReadingComponent from "../../../../reading/lab-reading-component"
import advantagesOfLEDsReadingBlocks from "./advantages-of-leds-reading-blocks"

export default function AdvantagesofLEDsReading() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/element-1/led/reading/leds-in-robotics"
			nextPageActivity="Reading"
			nextPageTooltip="LEDs in Robotics"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={advantagesOfLEDsReadingBlocks}
			readingName="LED Advantages"
		/>
	)
}
