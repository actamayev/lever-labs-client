/* eslint-disable max-len */
import { Microchip } from "lucide-react"
import DidYouKnow from "../../../reading/did-you-know"
import { BoldSpanText } from "../../../../bold-span-text"
import { CustomSolar } from "../../../../icons/custom-solar"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const ledSemiconductorBlocks: ContentBlock[] = [
	{
		id: "heart-of-led-semiconductors-1",
		text: (
			<div>
				<ReadingBlockHeader>
                    The Heart of an LED: Understanding Semiconductors
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					<BoldSpanText>The In-Between Material</BoldSpanText>
					<div className="mt-2">
						<p>Most materials in electronics are either conductors (like the copper in wires) or insulators (like the rubber coating around those wires). But semiconductors exist in a fascinating middle ground, offering the ability to shift along the spectrum between conducting and insulating. They're materials whose electrical properties can be precisely controlled, making them perfect for devices like LEDs.</p>
						<p className="mt-2">Think of it this way: If electricity flowing through a wire is like water flowing through a pipe, then a semiconductor is like a smart valve that can control exactly how and when the current flows.</p>
					</div>
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Which best describes a semiconductor's unique property?",
						choices: [
							{
								answerChoiceId: 1,
								text: "It only conducts electricity when heated",
								correct: false,
								explanation: "This is incorrect. While temperature can affect semiconductor behavior, their key property is the ability to be controlled through doping and voltage, not just heat."
							},
							{
								answerChoiceId: 2,
								text: "It can be controlled to conduct or insulate as needed",
								correct: true,
								explanation: "Correct! Semiconductors are unique because their conductivity can be precisely controlled. This property makes them essential for modern electronics like LEDs, where we need to carefully manage how current flows."
							},
							{
								answerChoiceId: 3,
								text: "It never conducts electricity",
								correct: false,
								explanation: "This is incorrect. Semiconductors do conduct electricity - they're not insulators. They can be controlled to conduct more or less depending on how they're designed and used."
							},
							{
								answerChoiceId: 4,
								text: "It conducts electricity better than copper",
								correct: false,
								explanation: "This is incorrect. Semiconductors don't conduct electricity better than copper. Their value lies in their controllable conductivity, not in being the best conductor."
							}
						],
						questionUUID: "3d6f8a2b9c4e" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "heart-of-led-semiconductors-2",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>The P-N Junction: A Review</BoldSpanText>
				<div className="mt-2">
					<p>LEDs use semiconductors</p>
					<details className="mt-2">
						<summary className="cursor-pointer font-medium">Quick re-cap (click to expand)</summary>
						<div className="mt-2 pl-4">
                            Think of a P-N junction like a microscopic waterfall. Electronics fall from a higher energy level (the N-layer), to a lower one (P-layer). Upon reaching the bottom of the waterfall, electrons release energy as photons (a tiny flash of light).
						</div>
					</details>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "heart-of-led-semiconductors-3",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>The Energy Band Gap</BoldSpanText>
				<div className="mt-2">
					<p>But what's actually happening as electrons flow from the N to the P layer (and why is this important)?</p>
					<ul className="mt-2">
						<li>When electrons are at the top of the cliff, they are in a 'high-energy state.' This high-energy state is called the <BoldSpanText noSpaceAfter>conduction band</BoldSpanText>.</li>
						<li className="mt-2">When an electron is 'pushed' off the top of the waterfall (voltage applied), it falls to the P-layer. When it reaches the bottom and recombines with a hole, the electron moves into a low-energy state, known as the valence band.</li>
						<li className="mt-2">This difference in energy states is super important. The band gap is the minimum energy needed to move an electron from the valence band to the conduction band, measured in electron-volts (eV). When an electron drops back down and recombines with a hole, it releases this energy as a single photon.</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "When an electron in an LED moves from the conduction band to the valence band, what happens?",
						choices: [
							{
								answerChoiceId: 1,
								text: "It gradually releases heat as it falls",
								correct: false,
								explanation: "This is incorrect. While some heat is produced in LEDs, the primary energy release happens all at once as a photon, not gradually as heat."
							},
							{
								answerChoiceId: 2,
								text: "It splits into multiple electrons",
								correct: false,
								explanation: "This is incorrect. Electrons don't split during this process. Each electron remains whole and releases its energy as a single photon."
							},
							{
								answerChoiceId: 3,
								text: "It releases a single photon when it recombines with a hole",
								correct: true,
								explanation: "Correct! When an electron drops from the conduction band to the valence band and recombines with a hole, it releases its excess energy as a single photon of light. This is the fundamental process that makes LEDs work."
							},
							{
								answerChoiceId: 4,
								text: "It bounces back to the conduction band",
								correct: false,
								explanation: "This is incorrect. Once an electron falls to the valence band and recombines with a hole, it stays there until new energy is applied. It doesn't bounce back up spontaneously."
							}
						],
						questionUUID: "7b2e5f9c4a8d" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "heart-of-led-semiconductors-4",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>Emitting Color</BoldSpanText>
				<div className="mt-2">
					<p>The band gap determines the color of the light emitted. It defines the energy of the released photon, which corresponds to a specific wavelength.</p>
					<ul className="mt-2">
						<li>Think of wavelengths like ripples in a pond: close-together ripples have a short wavelength, while wider, spread-out ripples have a longer wavelength.</li>
						<li className="mt-2">When photons have a shorter wavelength, they appear as blue light. Longer wavelengths correspond to red light.</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "heart-of-led-semiconductors-5",
		text: (
			<ReadingBlockWithImage>
				<p>Different semiconductor materials have different band gaps, which is why we need different materials to create different colored LEDs:</p>
				<ul className="mt-2">
					<li>Gallium Arsenide (GaAs) → Infrared (invisible to our eyes, we'll discuss it in detail in our IR sensor lesson)</li>
					<li>Gallium Phosphide (GaP) → Red, yellow, or green</li>
					<li>Gallium Nitride (GaN) → Blue and white</li>
				</ul>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "heart-of-led-semiconductors-6",
		text: (
			<DidYouKnow Icon={CustomSolar}>
                The same semiconductor technology that powers LEDs also makes solar panels work - just in reverse! While LEDs convert electricity into light, solar panels convert light into electricity.
			</DidYouKnow>
		),
		action: { type: "continue" },
	},
	{
		id: "heart-of-led-semiconductors-7",
		text: (
			<DidYouKnow Icon={Microchip}>
                'Holes' in semiconductors are places where electrons should be but aren't - like empty seats in a movie theater. They're created during the manufacturing process when we add small amounts of specific materials (called dopants) to the semiconductor.
			</DidYouKnow>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Why can't we make a single semiconductor material produce any color we want?",
						choices: [
							{
								answerChoiceId: 1,
								text: "The manufacturing process is too difficult",
								correct: false,
								explanation: "This is incorrect. While manufacturing semiconductors is complex, the limitation on color isn't due to manufacturing difficulties but rather the fundamental properties of the materials."
							},
							{
								answerChoiceId: 2,
								text: "The band gap is a fixed property of the material",
								correct: true,
								explanation: "Correct! Each semiconductor material has a specific band gap energy that determines the wavelength (color) of light it can emit. This is a fundamental physical property of the material that cannot be changed without using a different material."
							},
							{
								answerChoiceId: 3,
								text: "The power requirements would be too high",
								correct: false,
								explanation: "This is incorrect. Power requirements don't determine the color of light emitted - the band gap of the semiconductor material does."
							},
							{
								answerChoiceId: 4,
								text: "The crystal structure wouldn't be stable",
								correct: false,
								explanation: "This is incorrect. While crystal structure is important for semiconductors, it's not what determines the specific colors they can produce - that's determined by the band gap energy."
							}
						],
						questionUUID: "1c4d7e2b8a9f" as QuestionUUID
					}
				]
			}
		}
	}
]

export default ledSemiconductorBlocks
