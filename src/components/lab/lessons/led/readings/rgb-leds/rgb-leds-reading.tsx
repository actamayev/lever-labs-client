"use client"

import rgbLedsReadingBlocks from "./rgb-leds-reading-blocks"
import LabReadingComponent from "../../../../reading/lab-reading-component"

export default function RGBLedsReading() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/reading/intro-to-code"
			nextPageActivity="Reading"
			nextPageTooltip="Intro to Code"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={rgbLedsReadingBlocks}
			readingName="RGB LEDs"
		/>
	)
}
