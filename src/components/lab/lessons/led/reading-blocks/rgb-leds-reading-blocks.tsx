"use client"

/* eslint-disable max-len */
import { Eye } from "lucide-react"
import DidYouKnow from "../../../reading/did-you-know"
import { CustomPalette } from "../../../../icons/custom-palette"
import { BulletedList, NumberedList } from "../../../reading/ordered-list"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const rgbLedsReadingBlocks: ContentBlock[] = [
	{
		id: "rgb-leds-1",
		text: (
			<div>
				<ReadingBlockHeader>
					RGB LEDs
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					In our previous lesson, we explored how LEDs create light. An applied voltage causes electrons to move from the N-layer to the P-layer. As electrons recombine with holes in the P-layer, they go from a high-energy state to a low-energy state, and release photons (light particles).
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In this reading, we'll see how this process relates to an LED's ability to emit different colors, and how Pip combines these colors to create beautiful visual effects.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "rgb-leds-2",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					How LEDs emit different colors
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					If we observe two drops of water fall - one from the top of the cliff, and one from a height that’s less than the height of the cliff, which one makes a larger splash?
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					The one that was dropped from the higher point has a larger splash.
					Similarly, P-N junctions made from different materials lead to different ‘splash’ sizes.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					For example, LEDs made from Gallium Phosphide (GaP) emit&nbsp;
					<span className="text-red-600">red</span>,&nbsp;
					<span className="text-yellow-400">yellow</span>, or <span className="text-green-600">green</span>
					&nbsp;light, while LEDs made from Gallium Nitride (GaN) emit&nbsp;
					<span className="text-blue-600">blue</span> and white light.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "rgb-leds-3",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Review
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<NumberedList
						items={[
							"Electron flows from the N-layer to P-layer.",
							"Upon recombining with a hole in the P-layer, the electron goes down in energy level, and releases a photon in the process.",
							"Depending on the material of the P-N junction, the released photon emits a particular color."
						]}
					>
					</NumberedList>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "rgb-leds-4",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					How RGB LEDs work
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Now we understand how single-color LEDs work.
					But what if we wanted to display any color?
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					The answer is: by using RGB LEDs. An&nbsp;
					<span className="text-red-600">R</span>
					<span className="text-green-600">G</span>
					<span className="text-blue-600">B</span> LED contains 3 single-color LEDs: A Red LED, a Green LED, and a Blue LED.
					By varying the brightness of each of the red, green, and blue LEDs, we can create any color.
					{/* Image of arrangement of LEDs in an RGB LED */}
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "rgb-leds-5",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					RGB Codes
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					All colors can be represented by an RGB code. RGB codes consist of 3 numbers that represent the strength of each color: Red (R), Green (G), and Blue (B). These numbers are typically shown as percentages from 0% to 100%, where:
					0% means none of that color is present
					100% means that color is at full brightness
					For example:
					Pure red is: 100%, 0%, 0% (full red, no green, no blue)
					Pure green is: 0%, 100%, 0%
				</ReadingBlockWithImage>
				<DidYouKnow
					Icon={CustomPalette}
					tooltipMessage="RGB Alternate"
				>
					Some systems represent RGB values from 0 to 255 instead of percentages. In these systems, 0 is 0% and 255 is 100%. For example, pure red would be (255, 0, 0).
				</DidYouKnow>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Based on what we've learned about RGB codes for red and green, what would be the color code for blue?",
						choices: [
							{
								answerChoiceId: 1,
								text: "(0, 0, 255)",
								correct: true,
								explanation: "Correct. In RGB color coding, blue uses 0 for red, 0 for green, and 255 for blue, creating pure blue light."
							},
							{
								answerChoiceId: 2,
								text: "(255, 0, 0)",
								correct: false,
								explanation: "Incorrect. This is the RGB code for red. Blue requires the third value (B) to be 255 while others are 0."
							},
							{
								answerChoiceId: 3,
								text: "(0, 255, 0)",
								correct: false,
								explanation: "Incorrect. This is the RGB code for green. Blue requires the third value (B) to be 255 while others are 0."
							},
							{
								answerChoiceId: 4,
								text: "(255, 255, 0)",
								correct: false,
								explanation: "Incorrect. This RGB code creates yellow by combining red and green. Blue requires only the third value to be 255."
							}
						],
						questionUUID: "3c6e8d9f5b2a" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "rgb-leds-6",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Color Mixing
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					If we want the LED to emit a color that isn’t purely red, green, or blue, we have to mix colors, like you would mix paints to create a new color.
					For example, to create purple, we would mix red and blue.
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "If you wanted to create yellow, which two colors would you mix?",
						choices: [
							{
								answerChoiceId: 1,
								text: "Red and Blue",
								correct: false,
								explanation: "Incorrect. Red and blue light combine to create magenta, not yellow."
							},
							{
								answerChoiceId: 2,
								text: "Red and Green",
								correct: true,
								explanation: "Correct. In RGB color mixing, red and green light combine to create yellow. This is why yellow's RGB code is (255, 255, 0)."
							},
							{
								answerChoiceId: 3,
								text: "Blue and Green",
								correct: false,
								explanation: "Incorrect. Blue and green light combine to create cyan, not yellow."
							},
							{
								answerChoiceId: 4,
								text: "All three colors",
								correct: false,
								explanation: "Incorrect. Combining red, green, and blue light at full intensity creates white, not yellow."
							}
						],
						questionUUID: "5e8g0f1h7c4b" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "rgb-leds-7",
		text: (
			<div>
				<ReadingBlockWithImage>
					Lets see color mixing in action.
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/led/demo/color-mixing"
		}
	},
	{
		id: "rgb-leds-8",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Special Cases
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Black and white are special colors in RGB:
					Black (LED off) is created with: 0%, 0%, 0%
					White is created with: 100%, 100%, 100%
				</ReadingBlockWithImage>
				<DidYouKnow
					Icon={Eye}
					tooltipMessage="White LEDs"
				>
					White LEDs are actually blue LEDs with a special coating that converts some of the blue light into yellow light, which combines to appear white to our eyes
				</DidYouKnow>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "To make a color darker, what should you do to its RGB values?",
						choices: [
							{
								answerChoiceId: 1,
								text: "Increase all values",
								correct: false,
								explanation: "Incorrect. Increasing RGB values makes colors brighter by adding more light intensity."
							},
							{
								answerChoiceId: 2,
								text: "Decrease all values",
								correct: true,
								explanation: "Correct. Reducing RGB values decreases light intensity, making the color darker while maintaining its hue."
							},
							{
								answerChoiceId: 3,
								text: "Set all values to 0%",
								correct: false,
								explanation: "Incorrect. Setting all values to 0 creates black, completely removing the original color."
							},
							{
								answerChoiceId: 4,
								text: "Set all values to 100%",
								correct: false,
								explanation: "Incorrect. Setting all values to maximum creates white, losing the original color entirely."
							}
						],
						questionUUID: "4d7f9e0c6b3a" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "rgb-leds-9",
		text: (
			<div>
				<ReadingBlockSectionHeader>Summary</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Now we understand how RGB LEDs work:
					<BulletedList
						items={[
							"Each RGB LED combines three LEDs: red, green, and blue",
							"We can create any single color by turning on just one LED (like red: 100%, 0%, 0%)",
							"We can create mixed colors by combining different LED brightnesses"
						]}
					>
					</BulletedList>
					This is how Pip creates its status indicators and light shows!
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In the next section, we'll discuss the basics of programming, and how we can 'talk' with Pip.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "end" }
	}
]

export default rgbLedsReadingBlocks
