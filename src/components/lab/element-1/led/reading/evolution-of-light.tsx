/* eslint-disable max-len */
import { CustomLightbulb } from "../../../../icons/custom-lightbulb"
import DidYouKnow from "../../../reading/did-you-know"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const evolutionOfLightReadingBlocks: ContentBlock[] = [
	{
		id: "evolution-of-light-1",
		text: (
			<div>
				<ReadingBlockHeader>
                    The Evolution of Light: From Hot Wires to Smart LEDs
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
                    Understanding how different light sources work helps us appreciate why LEDs are such a revolutionary choice for robotics.
                    Here are three key technologies that changed how we illuminate our world.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "evolution-of-light-2",
		text: (
			<div>
				<ReadingBlockHeader>
                    Incandescent Bulbs: The Classic Approach
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
                    Picture a toaster's glowing elements. That's essentially how an incandescent bulb works - electricity heats a tungsten wire to around 2,500°C until it glows white-hot.
                    While simple, about 95% of the energy is lost as heat rather than light. Pip would quickly overheat if it used these.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "evolution-of-light-3",
		text: (
			<div>
				<ReadingBlockHeader>
                    Fluorescent Lights: A Step Forward
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
                    Next came fluorescent lights - those long tubes you might see in school hallways.
                    Fluorescent tubes use mercury vapor and phosphor coatings to create light.
                    When electricity excites mercury vapor, it produces ultraviolet light.
                    The phosphor coating then converts this invisible UV light into visible light.
                    While more efficient than incandescent bulbs, these tubes are fragile and contain hazardous materials - not ideal for robots that might bump into things.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "evolution-of-light-4",
		text: (
			<div>
				<ReadingBlockHeader>
                    LEDs: The Digital Age of Light
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
                    LEDs (light emitting diodes) represent a fundamental shift in how we create light.
                    Instead of heating materials or exciting gases, LEDs use semiconductors - the same materials that power the computer chips inside of Pip.
                    When electricity flows through semiconductors, they directly convert electrical energy into light through a process called electroluminescence.
				</ReadingBlockWithImage>
				<DidYouKnow Icon={CustomLightbulb} tooltipMessage="Efficient Lightbulb">
                    The first practical incandescent bulb lasted 13.5 hours. Modern LEDs can last for 50,000 hours - that's nearly 6 years of continuous use.
				</DidYouKnow>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "What is the main reason incandescent bulbs would be impractical for Pip?",
						choices: [
							{
								answerChoiceId: 1,
								text: "They require too much voltage to operate",
								correct: false,
								explanation: "While voltage requirements are a consideration, this isn't the main reason."
							},
							{
								answerChoiceId: 2,
								text: "They convert 95% of energy into heat instead of light",
								correct: true,
								explanation: "The inefficiency and heat generation would make them unsuitable for Pip."
							},
							{
								answerChoiceId: 3,
								text: "They only produce yellow-tinted light",
								correct: false,
								explanation: "Color temperature isn't the main concern here."
							},
							{
								answerChoiceId: 4,
								text: "They take too long to turn on and off",
								correct: false,
								explanation: "Response time isn't the primary issue with incandescent bulbs."
							}
						],
						questionUUID: "7h2k9l4m5n6p" as QuestionUUID
					},
					{
						question: "What makes fluorescent lights particularly unsuitable for robots like Pip?",
						choices: [
							{
								answerChoiceId: 1,
								text: "Their slow startup time in cold conditions",
								correct: false,
								explanation: "While this is a characteristic of fluorescent lights, it's not the main safety concern."
							},
							{
								answerChoiceId: 2,
								text: "Their fragile tubes and hazardous mercury content",
								correct: true,
								explanation: "The combination of fragility and harmful materials makes them unsafe for robotics."
							},
							{
								answerChoiceId: 3,
								text: "Their limited color options for indicators",
								correct: false,
								explanation: "Color options aren't the primary concern for safety and practicality."
							},
							{
								answerChoiceId: 4,
								text: "Their high operating temperature",
								correct: false,
								explanation: "While temperature is a consideration, it's not the main safety issue."
							}
						],
						questionUUID: "8j3k4n5p6q7r" as QuestionUUID
					},
					{
						question: "How do LEDs fundamentally differ from both incandescent and fluorescent lights?",
						choices: [
							{
								answerChoiceId: 1,
								text: "They only work with direct current",
								correct: false,
								explanation: "While LEDs do use DC power, this isn't their fundamental difference."
							},
							{
								answerChoiceId: 2,
								text: "They produce light through chemical reactions",
								correct: false,
								explanation: "LEDs don't rely on chemical reactions for light production."
							},
							{
								answerChoiceId: 3,
								text: "They directly convert electrical energy to light using semiconductors",
								correct: true,
								explanation: "This is the key technological difference that sets LEDs apart."
							},
							{
								answerChoiceId: 4,
								text: "They generate light by heating special gases",
								correct: false,
								explanation: "LEDs don't use heated gases to produce light."
							}
						],
						questionUUID: "9k4m5n6p7q8r" as QuestionUUID
					}
				]
			}
		}
	}
]

export default evolutionOfLightReadingBlocks
