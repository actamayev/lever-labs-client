import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import rgbLedsReadingBlocks from "../../../../../src/components/lab/lessons/led/reading-blocks/rgb-leds-reading-blocks"

export const metadata = createMetadata({
	title: "RGB LEDs Explained",
	// eslint-disable-next-line max-len
	description: "Discover how RGB LEDs create millions of colors by combining red, green, and blue light. Learn the principles behind Pip's colorful displays and how to control them in your projects.",
	path: "/lab/led/reading/rgb-leds",
	keywords: ["RGB color theory", "multi-color LEDs", "color mixing technology"]
})

export default function RGBLEDsReadingPage() {
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
