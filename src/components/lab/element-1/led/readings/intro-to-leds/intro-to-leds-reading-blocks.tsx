/* eslint-disable max-len */
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../../reading/reading-styles"

const introToLedsReadingBlocks: ContentBlock[] = [
	{
		id: "intro-to-leds-1",
		text: (
			<div>
				<ReadingBlockHeader>
                   Introduction
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					We'll start our journey with one of the most common electronic components in the world - LEDs. They're not just in the screen you're reading this on, but they're also the "eyes" and indicators of modern robots, including Pip. Pip uses RGB and IR LEDs to communicate its status and interact with its environment. LEDs are revolutionizing everything from robot vision systems to space exploration.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-leds-2",
		text: (
			<div>
				<ReadingBlockHeader>
					What is an LED?
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					LED stands for Light Emitting Diode - a device that converts electrical energy directly into light. Unlike traditional light sources, LEDs are precise, efficient, and perfect for robotics applications. But before we dive into how they work, let's see what these amazing components can do!
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/element-1/led/demo/led-light-show"
		}
	}
]

export default introToLedsReadingBlocks
