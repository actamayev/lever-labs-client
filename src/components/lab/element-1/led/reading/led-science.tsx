/* eslint-disable max-len */
import { BoldSpanText } from "../../../../bold-span-text"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const ledScienceBlocks: ContentBlock[] = [
	{
		id: "led-science-1",
		text: (
			<div>
				<ReadingBlockHeader>
                    Inside an LED: The Science of How LEDs Work
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
                    Let's look at what makes LEDs special and how they create the light that helps illuminate Pip. Unlike traditional bulbs, LEDs are solid-state devices, meaning they have no moving parts and no fragile elements like glass bulbs or filaments.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "led-science-2",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>The Building Blocks</BoldSpanText>
				<div className="mt-2">
					<p>An LED (Light Emitting Diode) is like a one-way street for electricity: a special street that converts electrical energy directly into light.</p>
					<p className="mt-2">At its core is a semiconductor chip made from materials like gallium arsenide (GaAs) or gallium nitride (GaN). Semiconductors consist of two key layers: the N-layer (negative layer), and the P-layer (positive-layer).</p>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-science-3",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>A Helpful Analogy</BoldSpanText>
				<div className="mt-2">
                    Think of a semiconductor as a cliff:
					<ul className="mt-2">
						<li className="mb-2">
							<strong>At the top of the cliff</strong> is a reservoir full of water: that's the N-layer.
							<ul className="mt-1 ml-4">
								<li>The N-layer is filled with lots of electrons (tiny particles carrying negative charge).</li>
							</ul>
						</li>
						<li className="mb-2">
							<strong>The bottom of the cliff</strong> is a dry riverbed; that's the P-layer.
							<ul className="mt-1 ml-4">
								<li>The P-layer is full of empty spaces (called holes), ready to be filled.</li>
							</ul>
						</li>
						<li>
                            A combination of the N and P layers is called P-N junction, the heart of every LED
						</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Match the analogy with the LED part: If cars are like electrons, the N-layer is like:",
						choices: [
							{
								answerChoiceId: 1,
								text: "A parking lot full of cars",
								correct: true,
								explanation: "Correct! Just as a parking lot full of cars represents stored potential movement, the N-layer is full of electrons ready to flow. This matches our cliff analogy where the N-layer is like a full reservoir of water at the top."
							},
							{
								answerChoiceId: 2,
								text: "An empty parking lot",
								correct: false,
								explanation: "This is incorrect. An empty parking lot would be more like the P-layer, which has 'holes' or spaces waiting to be filled. The N-layer is full of electrons, not empty."
							},
							{
								answerChoiceId: 3,
								text: "A traffic light",
								correct: false,
								explanation: "This is incorrect. A traffic light controls flow but doesn't store anything. The N-layer is about storage of electrons, like a parking lot full of cars ready to move."
							},
							{
								answerChoiceId: 4,
								text: "A solar panel",
								correct: false,
								explanation: "This is incorrect. While solar panels do interact with electrons, they generate them from light - the opposite of what an LED does. The N-layer is about storing electrons, not generating them."
							}
						],
						questionUUID: "9b4c2e7d6f1a" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "led-science-4",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>The Light-making Process</BoldSpanText>
				<div className="mt-2">
					<p>Before we dive in, let's understand voltage: Think of voltage as electrical pressure, like water pressure in a pipe. It's what pushes electrons to move through a circuit, measured in volts (V). Pip's LEDs typically use around 3V - just enough pressure to push electrons across the P-N junction.</p>

					<p className="mt-2">When we apply voltage across an LED, it's like giving those electrons on the top of the cliff a push:</p>
					<ul className="mt-2">
						<li>Electrons from the N-layer (top of the cliff) begin falling toward the P-layer (bottom of the cliff)</li>
						<li>When an electron finds a hole in the P-layer, the electron jumps into it: a process called recombination</li>
						<li>During recombination, the electron releases extra energy as a tiny flash of light (a photon)</li>
						<li>Millions of these tiny flashes happen every second, producing the steady light we see</li>
						<li>Electrons fall from a higher energy level to a lower one, and instead of making a sound upon impact like in a real waterfall, they release light</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "A student notices that when they connect an LED backwards in their robot, it doesn't light up. This happens because:",
						choices: [
							{
								answerChoiceId: 1,
								text: "The electrons can't flow from P-layer to N-layer effectively",
								correct: true,
								explanation: "Correct! LEDs are like one-way streets for electrons. When connected backwards, electrons try to flow from P to N, but the semiconductor junction is designed to only allow efficient flow from N to P. This is why LEDs must be connected with the correct polarity to work."
							},
							{
								answerChoiceId: 2,
								text: "The LED is broken",
								correct: false,
								explanation: "This is incorrect. The LED isn't broken - it's just connected backwards. LEDs are diodes, which means they only allow current to flow in one direction. When reversed, they'll work again once properly connected."
							},
							{
								answerChoiceId: 3,
								text: "The battery isn't strong enough",
								correct: false,
								explanation: "This is incorrect. The battery strength isn't the issue here. Even with a stronger battery, an LED connected backwards won't light up because it's designed to only allow current flow in one direction."
							},
							{
								answerChoiceId: 4,
								text: "The light is invisible to human eyes",
								correct: false,
								explanation: "This is incorrect. When an LED is connected backwards, it's not producing any light at all - visible or invisible. The issue is that electrons cannot flow through the semiconductor junction in the reverse direction."
							}
						],
						questionUUID: "5e8f3a2b7c9d" as QuestionUUID
					}
				]
			}
		}
	}
]

export default ledScienceBlocks
