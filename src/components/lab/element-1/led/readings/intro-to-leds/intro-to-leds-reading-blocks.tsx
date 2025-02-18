/* eslint-disable max-len */
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../../reading/reading-styles"

const introToLedsReadingBlocks: ContentBlock[] = [
	{
		id: "intro-to-leds-1",
		text: (
			<div>
				<ReadingBlockHeader>
                   Introduction to LEDs
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					We'll start our journey with one of the most common electronic components in the world - LEDs. They're not just in the screen you're reading this on, but they're also the "eyes" and indicators of modern robots, including Pip. Pip uses RGB and IR LEDs to communicate its status and interact with its environment. LEDs are revolutionizing everything from robot vision systems to space exploration.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	}
]

export default introToLedsReadingBlocks
