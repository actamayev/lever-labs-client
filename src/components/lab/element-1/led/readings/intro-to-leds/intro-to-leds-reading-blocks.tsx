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
	},
	{
		id: "intro-to-leds-3",
		text: (
			<div>
				<ReadingBlockHeader>
				How do LEDs work?
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					Now that we've seen what LEDs can do, let's understand the science that makes this possible.
					To understand how LEDs work, we first need to briefly discuss how semiconductors work.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					A semiconductor is a material that can conduct electricity, but not as easily as a conductor like metal, and not as poorly as an insulator like rubber. It’s somewhere in between, making it really useful for controlling how electricity flows in devices.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					Let's set the stage:
					It's helpful to think of a semiconductor as a cliff. Imagine that the top of the cliff has a reservoir full of water, and the bottom of the cliff is a dry riverbed. Just like how water naturally wants to flow from high to low points, electrons in an LED want to flow from the N-layer to the P-layer - they just need the right push to get started.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In a semiconductor, the reservoir is known as the high-energy N-layer (negative layer). The N-layer is filled with lots of electrons (tiny particles carrying negative charge). The dry riverbed is known as the low-energy P-layer (positive layer). It’s full of empty spaces (called holes), ready to be filled by the electrons from the N-layer.
					This combination of the P and N layers is called P-N junction, the heart of every LED.
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "If cars are like electrons, The N-layer is like:",
						choices: [
							{
								answerChoiceId: 1,
								text: "A parking lot full of cars",
								correct: true,
								explanation: "Correct. The N-layer has an abundance of free electrons, like a parking lot full of cars. The dopant atoms provide extra electrons that can move through the material."
							},
							{
								answerChoiceId: 2,
								text: "An empty parking lot",
								correct: false,
								explanation: "Incorrect. An empty parking lot would represent a P-layer, which has a shortage of electrons. The N-layer has an abundance of electrons, not a shortage."
							},
							{
								answerChoiceId: 3,
								text: "A traffic light",
								correct: false,
								explanation: "Incorrect. While a traffic light controls flow, the N-layer is characterized by having extra electrons, not by controlling their movement. It's more like a storage area for excess electrons."
							},
							{
								answerChoiceId: 4,
								text: "A solar panel",
								correct: false,
								explanation: "Incorrect. A solar panel converts light to electrical energy, unlike the N-layer's function. The N-layer is a region with extra electrons, similar to a parking lot with many available cars."
							}
						],
						questionUUID: "2b5e9c7d4a8f" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "intro-to-leds-4",
		text: (
			<div>
				<ReadingBlockHeader>
					Summary
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					LEDs (Light Emitting Diodes) are fundamental components in modern electronics, using semiconductors to convert electrical energy directly into light. They are essential in applications ranging from robot vision systems to device displays, where their precision and efficiency make them invaluable.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					At the heart of every LED is a P-N junction - think of it as a cliff with a reservoir of electrons (N-layer) at the top and empty spaces called holes (P-layer) at the bottom.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In our next lesson, we'll explore how applying voltage creates the perfect conditions for electrons to flow across this junction, producing the light that makes LEDs work
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "continue"
		}
	},
]

export default introToLedsReadingBlocks
