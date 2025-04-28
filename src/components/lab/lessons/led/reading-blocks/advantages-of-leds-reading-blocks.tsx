"use client"

/* eslint-disable max-len */
import { Wrench } from "lucide-react"
import DidYouKnow from "../../../reading/did-you-know"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"
import { CustomToaster } from "../../../../icons/custom-toaster"
import { CustomUV } from "../../../../icons/custom-uv"
import { BulletedList } from "../../../reading/ordered-list"
import DefinitionText from "../../../reading/definition-text"
import { QuestionUUID } from "@bluedotrobots/common-ts"

const advantagesOfLEDsReadingBlocks: ContentBlock[] = [
	{
		id: "advantages-of-leds-1",
		renderText: () => (
			<div>
				<ReadingBlockHeader>
					Advantages of LEDs
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					Now that we've learned how to control LEDs with loops to create lighting effects, let's explore why LEDs are the preferred lighting technology in robotics and electronics.
					In our previous activities, we’ve seen how responsive and versatile LEDs can be.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In this section, we'll dive into the specific advantages that make LEDs ideal for Pip and other robots, from their energy efficiency and durability to their smart features and environmental benefits.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "advantages-of-leds-2",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Evolution of Lighting
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage svgComponent={<CustomToaster size={150}/>}>
					<strong>Incandescent bulbs:</strong>
					&nbsp;These work by heating a metal filament until it glows - similar to how a toaster's elements glow red when hot. Only about 5% of the energy becomes light, with 95% wasted as heat, making them very inefficient.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage svgComponent={<CustomUV size={150} />}>
					<strong>Fluorescent lights:</strong>
					&nbsp;These contain mercury vapor that produces ultraviolet light when electrified. This UV light hits a phosphor coating inside the tube, causing it to glow. While more efficient than incandescent bulbs, they still convert only about 20% of energy to light.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					<strong>Why they weren't suitable for robotics applications:</strong>
					&nbsp;Both technologies presented major problems for robots.
					<BulletedList
						items={[
							"Incandescent bulbs generate excessive heat that can damage electronics, waste precious battery power, and have fragile filaments that break easily when moved.",
							"Fluorescent lights require high voltage to start, contain hazardous mercury, can't switch on/off quickly, and are too bulky for compact robots like Pip."
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "advantages-of-leds-3",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Direct energy conversion
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Unlike traditional bulbs that waste energy as heat, LEDs directly convert electricity into light through a process called
					<DefinitionText noSpaceAfter>electroluminescence</DefinitionText>.
					When electricity flows through the semiconductor material,
					<DefinitionText noSpaceAfter>electrons release energy as light photons rather than heat</DefinitionText>.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					Think of traditional bulbs as inefficient engines that produce light as a byproduct of heat generation, while LEDs are precision devices that produce light directly. This direct conversion is why LEDs stay cool while producing bright light, making them ideal for robots that need to conserve battery power and maintain stable temperatures during operation.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "advantages-of-leds-4",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Energy Efficiency
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					LEDs convert most of their energy directly into light rather than heat. For Pip, this means:
					<BulletedList
						items={[
							"Longer battery life between charges",
							"Less interference with sensitive sensors",
							"More stable operation in different temperature"
						]}
					/>
				</ReadingBlockWithImage>
				<DidYouKnow
					Icon={Wrench}
					tooltipMessage="Traditional bulbs: bright but short-lived!"
				>
					If Pip used traditional bulbs (which last 750 - 2,000 hours on average) instead of LEDs, they would need to replaced about 25 times during the same lifespan as a single LED.
				</DidYouKnow>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "How do LEDs fundamentally differ from both incandescent and fluorescent lights?",
						choices: [
							{
								answerChoiceId: 1,
								text: "They only work with direct current",
								correct: false,
								explanation: "Incorrect. While LEDs do work with direct current, this isn't their fundamental distinguishing feature. Many LED systems can work with alternating current using adapters."
							},
							{
								answerChoiceId: 2,
								text: "They produce light through chemical reactions",
								correct: false,
								explanation: "Incorrect. LEDs do not use chemical reactions to produce light. Chemical reactions occur in technologies like glow sticks, but not in LEDs."
							},
							{
								answerChoiceId: 3,
								text: "They efficiently convert electrical energy to light using semiconductors",
								correct: true,
								explanation: "Correct! LEDs use semiconductor materials to directly convert electrical energy into light through a process called electroluminescence. This direct conversion is fundamentally different from both incandescent bulbs (which heat a filament) and fluorescent lights (which use UV light and phosphor coatings)."
							},
							{
								answerChoiceId: 4,
								text: "They generate light by heating special gases",
								correct: false,
								explanation: "Incorrect. Heating gases to produce light is characteristic of technologies like neon lights or plasma displays, not LEDs. LEDs use solid semiconductor materials, not gases."
							}
						],
						questionUUID: "4f7e2a1b9c6d" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "advantages-of-leds-5",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Durability & Size
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					The solid-state (no moving parts) design of LEDs makes them ideal for robotics:
					<BulletedList
						items={[
							"No moving parts or fragile components",
							"Resistant to vibration and impact",
							"Compact size allows for flexible placement"
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "advantages-of-leds-6",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Smart Features
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Modern LEDs offer capabilities that transform how Pip interacts:
					<BulletedList
						items={[
							"Instant on/off switching for precise timing",
							"Digital color control",
							"Adjustable brightness levels",
							"Programmable patterns and animations",
							"Ability to emit wide varieties of light (IR, visible)"
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "advantages-of-leds-7",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Environmental Impact
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"No hazardous materials like mercury",
							"Lower energy consumption means reduced carbon footprint",
							"Longer lifespan reduces electronic waste",
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "advantages-of-leds-8",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Summary
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					We've now explored the key advantages that make LEDs essential for modern robotics:
					<BulletedList
						items={[
							"Their exceptional energy efficiency that extends battery life",
							"Their durable design perfect for mobile robots like Pip",
							"And their positive environmental impact"
						]}
					/>
					These benefits explain why LEDs have become fundamental components in robot design.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					In our next section, we'll see how these advantages translate into real-world applications, examining the crucial roles LEDs play in various robotic systems from simple status indicators to sophisticated sensing technologies.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "end" }
	},
]

export default advantagesOfLEDsReadingBlocks
