import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import introToCodeReadingBlocks from "../../../../../src/components/lab/lessons/led/reading-blocks/intro-to-code-reading-blocks"

export const metadata = createMetadata({
	title: "Introduction to Code",
	// eslint-disable-next-line max-len
	description: "Begin your coding journey by learning how to program Pip's LEDs. Discover fundamental programming concepts through easy-to-follow examples that bring light displays to life.",
	path: "/lab/led/reading/intro-to-code",
	keywords: ["beginner programming", "LED coding basics", "first robotics code"]
})

export default function IntroToCodeReadingPage() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/code/led-control"
			nextPageActivity="Code"
			nextPageTooltip="LED Control"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={introToCodeReadingBlocks}
			readingName="Introduction to Code"
		/>)
}
