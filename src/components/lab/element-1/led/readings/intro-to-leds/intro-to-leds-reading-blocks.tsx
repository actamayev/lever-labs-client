/* eslint-disable max-len */
import { Cpu } from "lucide-react"
import DefinitionText from "../../../../reading/definition-text"
import { BlueColoredText, OrangeColoredText } from "../../../../reading/colored-text"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../../reading/reading-styles"

const introToLedsReadingBlocks: ContentBlock[] = [
	{
		id: "intro-to-leds-1",
		text: (
			<div>
				<ReadingBlockHeader>
					Introduction to LEDs
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					We'll start our journey with one of the most common electronic components in the world - LEDs. They're not just in the screen you're reading this on, but they're also the "eyes" and indicators of modern robots, including Pip. Pip uses LEDs to communicate its status and interact with its environment. LEDs are revolutionizing everything from robot vision systems to space exploration.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-leds-2",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					What is an LED?
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<DefinitionText noSpaceBefore={true}>LED</DefinitionText>
					stands for
					<DefinitionText>Light Emitting Diode</DefinitionText>
					- a device that converts electrical energy directly into light. Unlike traditional light sources, LEDs are precise, efficient, and perfect for robotics applications. But before we dive into how they work, let's see what these amazing components can do!
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
				<ReadingBlockSectionHeader>
				How do LEDs work?
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Now that we've seen what LEDs can do, let's understand the science that makes this possible.
					To understand how LEDs work, we should first discuss how semiconductors work.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage svgComponent={<Cpu size={150}/>}>
					A
					<DefinitionText>semiconductor</DefinitionText>
					is like
					<DefinitionText>a door for electricity that can be opened or closed.</DefinitionText>
					Unlike regular materials that are always open (conductors) or always closed (insulators), semiconductors can be switched between states.				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-leds-4",
		text: (
			<div>
				<ReadingBlockWithImage>
					It's helpful to think of a semiconductor as a cliff. Imagine
					<BlueColoredText>a lake</BlueColoredText>
					at the top of the cliff, and a
					<OrangeColoredText noSpaceAfter>dry riverbed</OrangeColoredText> the bottom.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In a semiconductor, the
					<BlueColoredText>lake</BlueColoredText>
					is known as the
					<BlueColoredText noSpaceAfter>high-energy N-layer (negative layer)</BlueColoredText>.
					The N-layer is filled with many
					<DefinitionText noSpaceAfter>electrons</DefinitionText>
					, which are
					<DefinitionText noSpaceAfter>tiny particles carrying negative charge</DefinitionText>.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					The
					<OrangeColoredText>dry riverbed</OrangeColoredText>
					is known as the
					<OrangeColoredText noSpaceAfter>low-energy P-layer (positive layer)</OrangeColoredText>
					. It’s full of empty spaces (called holes), ready to be filled by the electrons from the N-layer.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					This
					<DefinitionText>combination of the P and N layers</DefinitionText>
					is called a
					<DefinitionText noSpaceAfter>P-N junction</DefinitionText>
					, the heart of every LED.
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
		id: "intro-to-leds-5",
		text: (
			<div>
				<ReadingBlockWithImage>
					When voltage is applied across this P-N junction, electrons from the N-layer 'fall' down the cliff into the holes in the P-layer.
					This electron movement releases energy in the form of light - the key principle that makes LEDs work.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue"}
	},
	{
		id: "intro-to-leds-6",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Summary
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					LEDs (Light Emitting Diodes) are fundamental components in modern electronics, using semiconductors to convert electrical energy directly into light. They are essential in applications ranging from robot vision systems to device displays, where their precision and efficiency make them invaluable.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					At the heart of every LED is a P-N junction - think of it as a cliff with a electrons (N-layer) at the top and empty spaces called holes (P-layer) at the bottom.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In our next lesson, we'll explore how applying voltage creates the perfect conditions for electrons to flow across this junction, producing the light that makes LEDs work.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "end" }
	},
]

export default introToLedsReadingBlocks
