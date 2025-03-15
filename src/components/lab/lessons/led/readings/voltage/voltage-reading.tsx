"use client"

import voltageReadingBlocks from "./voltage-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function VoltageReading() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/reading/rgb-leds"
			nextPageActivity="Reading"
			nextPageTooltip="RGB LEDs"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={voltageReadingBlocks}
			readingName="Voltage"
		/>
	)
}
