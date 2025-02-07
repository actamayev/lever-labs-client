/* eslint-disable max-len */
import DidYouKnow from "../../../reading/did-you-know"
import { BoldSpanText } from "../../../../bold-span-text"
import { CustomNobel } from "../../../../icons/custom-nobel"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const ledColorsBlocks: ContentBlock[] = [
	{
		id: "led-colors-1",
		text: (
			<div>
				<ReadingBlockHeader>Engineering LED Colors</ReadingBlockHeader>
				<ReadingBlockWithImage>
					<BoldSpanText noSpaceBefore>How Materials Shape Light</BoldSpanText>
					<p className="mt-2">
                        The colors LEDs emit are rooted in the physics of their semiconductor material. Here's how different semiconductor compounds create various colors:
					</p>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "led-colors-2",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>Common LED Materials and Their Colors</BoldSpanText>
				<div className="mt-4">
					<div className="mb-4">
						<h3 className="font-semibold">Gallium Arsenide (GaAs)</h3>
						<ul className="mt-2 list-inside list-disc">
							<li>Produces infrared light (850-940nm)</li>
							<li>Used in remote controls and short-range sensors</li>
							<li>Essential for Pip's line following system</li>
						</ul>
					</div>

					<div className="mb-4">
						<h3 className="font-semibold">Aluminum Gallium Indium Phosphide (AlGaInP)</h3>
						<ul className="mt-2 list-inside list-disc">
							<li>Creates red to yellow light (570-630nm)</li>
							<li>Highly efficient for visible light</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold">Gallium Nitride (GaN)</h3>
						<ul className="mt-2 list-inside list-disc">
							<li>Generates blue light (450-470nm)</li>
							<li>Revolutionary material that enabled white LEDs</li>
						</ul>
					</div>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-colors-4",
		text: (
			<>
				<ReadingBlockWithImage>
					<BoldSpanText noSpaceBefore>Making White Light</BoldSpanText>
					<div className="mt-2">
						<p>White LEDs typically use a blue LED chip coated with a yellow phosphor. When combined, these colors appear white to our eyes. By adjusting the phosphor composition, we can create different "temperatures" of white light:</p>

						<ul className="mt-2 list-inside list-disc">
							<li>Warm white (3000K): More yellow, similar to sunset</li>
							<li>Neutral white (4000K): Similar to midday sun</li>
							<li>Cool white (6000K): Slightly bluish, like overcast sky</li>
						</ul>
					</div>
				</ReadingBlockWithImage>
				<DidYouKnow Icon={CustomNobel} tooltipMessage="Nobel Prize">
							The 2014 Nobel Prize in Physics was awarded for the invention of efficient blue LEDs, which made white LED lighting possible. Before this breakthrough, creating white light with LEDs was impractical.
				</DidYouKnow>
			</>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "When a green LED appears green to our eyes, what's actually happening?",
						choices: [
							{
								answerChoiceId: 1,
								text: "The LED is adding green color to white light",
								correct: false,
								explanation: "This is incorrect. LEDs don't modify existing light - they generate their own light at specific wavelengths. They don't start with white light and add color to it."
							},
							{
								answerChoiceId: 2,
								text: "The LED is absorbing green light and reflecting other colors",
								correct: false,
								explanation: "This is incorrect. Unlike objects that appear green because they reflect green light (like leaves), LEDs actively generate light. They don't rely on reflecting or absorbing external light."
							},
							{
								answerChoiceId: 3,
								text: "The LED is emitting photons with wavelengths that correspond to green light",
								correct: true,
								explanation: "Correct! The LED is actively generating photons at specific wavelengths (around 495-570nm) that our eyes perceive as green. This is a direct result of the semiconductor material's band gap energy, which determines the wavelength of emitted photons."
							},
							{
								answerChoiceId: 4,
								text: "The LED is removing all colors except green from white light",
								correct: false,
								explanation: "This is incorrect. LEDs are light emitters, not filters. They generate specific wavelengths of light directly through electron transitions in the semiconductor material, rather than filtering or removing colors from white light."
							}
						],
						questionUUID: "2b5e9c7d4a8f" as QuestionUUID
					}
				]
			}
		}
	}
]

export default ledColorsBlocks
