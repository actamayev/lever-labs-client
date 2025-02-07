/* eslint-disable max-len */
import DidYouKnow from "../../../reading/did-you-know"
import { BoldSpanText } from "../../../../bold-span-text"
import { CustomLightbulb } from "../../../../icons/custom-lightbulb"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const ledAdvantagesBlocks: ContentBlock[] = [
	{
		id: "led-advantages-1",
		text: (
			<div>
				<ReadingBlockHeader>
                    Advantages of using LEDs
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					<BoldSpanText noSpaceBefore>Energy Efficiency</BoldSpanText>
					<div className="mt-2">
                        LEDs convert most of their energy directly into light rather than heat. For Pip, this means:
						<ul className="list-inside list-disc mt-2">
							<li>Longer battery life between charges</li>
							<li>Less interference with sensitive sensors</li>
							<li>More stable operation in different temperatures</li>
						</ul>
					</div>
				</ReadingBlockWithImage>
				<DidYouKnow Icon={CustomLightbulb} tooltipMessage="Efficient Lightbulb">
					If Pip used traditional bulbs (which last 750 - 2,000 hours on average) instead of LEDs, they would need to be replaced about 25 times during the same lifespan as a single LED.
				</DidYouKnow>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "led-advantages-3",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>Durability & Size</BoldSpanText>
				<div className="mt-2">
                    The solid-state design of LEDs makes them ideal for robotics:
					<ul className="list-inside list-disc mt-2">
						<li>No moving parts or fragile components</li>
						<li>Resistant to vibration and impact</li>
						<li>Compact size allows for flexible placement</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-advantages-4",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>Smart Features</BoldSpanText>
				<div className="mt-2">
                    Modern LEDs offer capabilities that transform how Pip interacts:
					<ul className="list-inside list-disc mt-2">
						<li>Instant on/off switching for precise timing</li>
						<li>Digital color control</li>
						<li>Adjustable brightness levels</li>
						<li>Programmable patterns and animations</li>
						<li>Ability to emit wide varieties of light (IR, visible)</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-advantages-5",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>Environmental Impact</BoldSpanText>
				<div className="mt-2">
					<ul className="list-inside list-disc mt-2">
						<li>No hazardous materials like mercury</li>
						<li>Lower energy consumption means reduced carbon footprint</li>
						<li>Longer lifespan reduces electronic waste</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	// {
	// 	id: "led-advantages-6",
	// 	text: (
	// 		<ReadingBlockWithImage>
	// 			<BoldSpanText>Demo Connection</BoldSpanText>: Try Pip's "Pulse" demo to see how smoothly LEDs can transition between brightness levels - something traditional bulbs struggle with.
	// 		</ReadingBlockWithImage>
	// 	),
	// 	action: { type: "continue" },
	// }
]

export default ledAdvantagesBlocks
