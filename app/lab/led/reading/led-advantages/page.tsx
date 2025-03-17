import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabReadingComponent from "../../../../../src/components/lab/reading/lab-reading-component"
import advantagesOfLEDsReadingBlocks
	from "../../../../../src/components/lab/lessons/led/reading-blocks/advantages-of-leds-reading-blocks"

export const metadata = createMetadata({
	title: "Advantages of LEDs",
	// eslint-disable-next-line max-len
	description: "Discover the benefits of using LEDs in robotics applications through this reading. Learn about energy efficiency, durability, and versatility of LED technology.",
	path: "/lab/led/reading/led-advantages",
	keywords: ["LED technology benefits", "energy-efficient lighting", "robotics indicator systems"]
})

export default function LEDAdvantagesReadingPage() {
	return (
		<LabReadingComponent
			nextPageLink="/lab/led/reading/leds-in-robotics"
			nextPageActivity="Reading"
			nextPageTooltip="LEDs in Robotics"
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
			readingBlocks={advantagesOfLEDsReadingBlocks}
			readingName="LED Advantages"
		/>
	)
}
