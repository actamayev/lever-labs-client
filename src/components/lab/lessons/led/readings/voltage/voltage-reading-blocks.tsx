"use client"

/* eslint-disable max-len */
import DidYouKnow from "../../../../reading/did-you-know"
import { NumberedList } from "../../../../reading/ordered-list"
import { CustomSolar } from "../../../../../icons/custom-solar"
import DefinitionText from "../../../../reading/definition-text"
import { CustomBucket } from "../../../../../icons/custom-bucket"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../../reading/reading-styles"

const voltageReadingBlocks: ContentBlock[] = [
	{
		id: "voltage-1",
		text: (
			<div>
				<ReadingBlockHeader>
					Voltage
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					In the previous reading, we learned about what's inside an LED: a semiconductor's P-N junction.
					The N-layer has electrons, while the P-layer holds empty spaces called holes. When electrons move from the N-layer to the P-layer and fill these holes, light is produced.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In this reading, we'll explore how voltage serves as the driving force behind this process. Just as water needs pressure to flow, electrons need voltage to move across the P-N junction. We'll discover how applying the right amount of voltage creates the perfect conditions for electrons to flow, transforming electrical energy into the light that makes LEDs work.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "voltage-2",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					What is Voltage?
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Think of
					<DefinitionText>voltage</DefinitionText>
					as
					<DefinitionText noSpaceAfter>electrical pressure</DefinitionText>
					, like water pressure in a pipe.
					When we apply voltage across an LED, all we're doing is adding more electrons to the N-layer.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage svgComponent={<CustomBucket size={150}/>}>
					Now, let's think back to the cliff analogy, where we had a lake at the top of a cliff.
					Applying a voltage across an LED is like pouring a bucket of water into the lake.
					When we pour water into the lake, the lake overfills, and water begins to fall down the cliff, towards the dry riverbed at the bottom of the cliff.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					Here’s what happens in an LED:
					<NumberedList
						items={[
							"A voltage is applied.",
							"Electrons from the N-layer begin flowing toward the P-layer.",
							"When an electron finds a hole in the P-layer, the electron jumps into it: a process called recombination.",
							"During recombination, the electron releases extra energy as a tiny flash of light (a photon).",
							"Millions of these tiny flashes happen every second, producing the steady light we see."
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions:
				[
					{
						question: "Which statement best describes what happens in an LED's P-N junction?",
						choices: [
							{
								answerChoiceId: 1,
								text: "Electrons move randomly between layers with no energy release",
								correct: false,
								explanation: "Incorrect. Electron movement in an LED is directional (N-layer to P-layer) and releases energy in the form of light."
							},
							{
								answerChoiceId: 2,
								text: "Electrons fall from the N-layer to the P-layer, releasing energy as light",
								correct: true,
								explanation: "Correct. Electrons move from the N-layer to the P-layer, and when they recombine with holes, they release energy as photons of light."
							},
							{
								answerChoiceId: 3,
								text: "Holes move up from the P-layer to the N-layer",
								correct: false,
								explanation: "Incorrect. Holes stay in the P-layer while electrons move from the N-layer to fill them, not the other way around."
							},
							{
								answerChoiceId: 4,
								text: "Electrons and holes repel each other, creating heat",
								correct: false,
								explanation: "Incorrect. Electrons and holes attract rather than repel, and their recombination produces light, not primarily heat."
							}
						],
						questionUUID: "6f9h1i2j8d5c" as QuestionUUID
					},
					{
						question: "Using our cliff analogy, what represents the voltage in an LED?",
						choices: [
							{
								answerChoiceId: 1,
								text: "The water at the bottom of the cliff",
								correct: false,
								explanation: "Incorrect. The water at the bottom represents electrons that have already moved to the P-layer, not the voltage that drives them."
							},
							{
								answerChoiceId: 2,
								text: "The height of the cliff",
								correct: false,
								explanation: "Incorrect. The cliff height represents the energy gap between layers, not the voltage applied to move electrons."
							},
							{
								answerChoiceId: 3,
								text: "The force pushing water over the edge",
								correct: true,
								explanation: "Correct. Voltage acts as the force that pushes electrons from the N-layer to the P-layer, just like a force pushing water over the cliff."
							},
							{
								answerChoiceId: 4,
								text: "The speed of the falling water",
								correct: false,
								explanation: "Incorrect. The water's speed is a result of the force applied, not the force itself, just as electron flow is a result of voltage."
							}
						],
						questionUUID: "7g0i2j3k9e6d" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "voltage-3",
		text: (
			<div>
				<ReadingBlockWithImage>
					Voltage is measured in volts (V). Pip's LEDs require 3.3V - just enough pressure to push electrons across the P-N junction.
					Let's see this process in action.
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/led/demo/first-light"
		}
	},
	{
		id: "voltage-4",
		text: (
			<DidYouKnow
				Icon={CustomSolar}
				tooltipMessage="Solar"
			>
				The same semiconductor technology that powers LEDs also makes solar panels work - just in reverse! While LEDs convert electricity into light, solar panels convert light into electricity.
			</DidYouKnow>
		),
		action: { type: "continue" }
	},
	{
		id: "voltage-5",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Summary
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Voltage acts as the driving force behind LED illumination, providing the necessary "push" to move electrons across the P-N junction. When voltage is applied, electrons flow from the N-layer to the P-layer, where they combine with holes in a process called recombination. Each recombination releases a tiny flash of light, and millions of these flashes per second create the steady glow we see in LEDs.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					These flashes of light aren't just random bursts of energy - their specific characteristics determine the color of light produced. In our next lesson, we'll explore how different semiconductor materials create different colored light, and how combining these colors allows LEDs like those in Pip to produce a full spectrum of visual effects
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "end" }
	},
]

export default voltageReadingBlocks
