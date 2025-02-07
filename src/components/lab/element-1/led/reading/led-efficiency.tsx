/* eslint-disable max-len */
import { Cog } from "lucide-react"
import DidYouKnow from "../../../reading/did-you-know"
import { BoldSpanText } from "../../../../bold-span-text"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const ledEfficiencyBlocks: ContentBlock[] = [
	{
		id: "led-efficiency-1",
		text: (
			<div>
				<ReadingBlockHeader>
                    Power and Performance: Understanding LED Efficiency
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					<BoldSpanText noSpaceBefore>The Efficiency Equation</BoldSpanText>
					<p className="mt-2">
                        When we power Pip's LEDs, not all electrical energy becomes light - some becomes heat. But LEDs are remarkably efficient at this conversion. To understand LED efficiency, we need to know how we measure both power input and light output.
					</p>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "led-efficiency-2",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>What's a Watt?</BoldSpanText>
				<p className="mt-2">
                    A watt (W) is a measure of power - how much energy is being used per second. Think of it like the rate water flows through a hose. Electronics with higher Watts use more power. When you see that Pip's LEDs use 0.2 watts, that tells us how much electrical power they're consuming.
				</p>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-efficiency-3",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>What's a Lumen?</BoldSpanText>
				<p className="mt-2">
                    A lumen (lm) measures how much visible light a source produces, how bright it appears to human eyes. If wattage measures the flow of water through a hose, lumens are like the size of the puddle that forms. More lumens mean more visible light.
				</p>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-efficiency-4",
		text: (
			<>
				<ReadingBlockWithImage>
					<BoldSpanText noSpaceBefore>Measuring Efficiency</BoldSpanText>
					<div className="mt-2">
						<p>We measure LED efficiency in lumens per watt (lm/W) - how much light we get for each watt of power. Modern LEDs achieve up to 200 lm/W, meaning each watt of power produces 200 lumens of light. Compare this to:</p>

						<ul className="mt-2 list-disc list-inside">
							<li>Incandescent: ~15 lm/W</li>
							<li>Fluorescent: ~60 lm/W</li>
							<li>High-end LED: ~200 lm/W</li>
						</ul>
					</div>
				</ReadingBlockWithImage>
				<DidYouKnow Icon={Cog} tooltipMessage="Efficient">
						The theoretical maximum efficiency for white light production is about 250-300 lm/W. Modern LEDs are approaching this physical limit, making them one of the most optimized technologies in electronics.
				</DidYouKnow>
			</>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "If you have two LEDs that both use 1 watt of power, but one produces 100 lumens and the other produces 150 lumens, which statement is correct?",
						choices: [
							{
								answerChoiceId: 1,
								text: "They are equally efficient since they use the same power",
								correct: false,
								explanation: "This is incorrect. Efficiency is measured by how much light (lumens) is produced per unit of power (watt). Even though they use the same power, they produce different amounts of light."
							},
							{
								answerChoiceId: 2,
								text: "The 150-lumen LED is more efficient at converting electricity to light",
								correct: true,
								explanation: "Correct! Both LEDs use 1 watt, but the second LED produces 150 lumens compared to 100 lumens. This means it converts more electrical energy into light (150 lm/W vs 100 lm/W), making it more efficient."
							},
							{
								answerChoiceId: 3,
								text: "The 100-lumen LED is more efficient at converting electricity to light",
								correct: false,
								explanation: "This is incorrect. With the same power input (1 watt), producing fewer lumens (100 vs 150) means less electrical energy is being converted to light, making it less efficient."
							},
							{
								answerChoiceId: 4,
								text: "Efficiency cannot be determined from just lumens and watts",
								correct: false,
								explanation: "This is incorrect. Efficiency in LEDs is measured in lumens per watt (lm/W), which can be calculated directly from lumens and watts. We have both values, so we can determine efficiency."
							}
						],
						questionUUID: "8c4f2d6e9a3b" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "led-efficiency-7",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText noSpaceBefore>Managing Heat</BoldSpanText>
				<div className="mt-2">
					<p>Despite their high efficiency, LEDs still generate heat. Unlike incandescent bulbs that radiate heat away, LED heat stays concentrated in the semiconductor junction. This requires careful thermal management through:</p>

					<ul className="mt-2 list-disc list-inside">
						<li>Heat Sinks: Metallic structures (usually aluminum) that draw heat away from the LED</li>
						<li>Thermal Interface Materials: Special materials that improve heat transfer (ie. thermal paste)</li>
						<li>Temperature Monitoring: Systems that protect LEDs from overheating</li>
					</ul>
				</div>
			</ReadingBlockWithImage>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Pip's main status LED starts flickering and then gets dimmer after running at full brightness for a long time. What's the most likely explanation?",
						choices: [
							{
								answerChoiceId: 1,
								text: "The battery is running low",
								correct: false,
								explanation: "This is incorrect. A low battery would typically cause a sudden drop in brightness or shutdown, not a gradual dimming and flickering pattern after extended use."
							},
							{
								answerChoiceId: 2,
								text: "The LED has reached the end of its lifespan",
								correct: false,
								explanation: "This is incorrect. LEDs have very long lifespans (typically 50,000+ hours) and don't typically fail suddenly. Gradual dimming after extended use is more likely related to temperature."
							},
							{
								answerChoiceId: 3,
								text: "The LED junction is overheating",
								correct: true,
								explanation: "Correct! When an LED runs at full brightness for a long time, heat can build up in the semiconductor junction. The flickering and dimming are protective responses to prevent damage from overheating. This is why proper heat management is crucial for LED performance."
							},
							{
								answerChoiceId: 4,
								text: "The LED's color is naturally changing",
								correct: false,
								explanation: "This is incorrect. LEDs don't naturally change color or brightness over time during normal operation. The symptoms described are typical of thermal issues, not color changes."
							}
						],
						questionUUID: "5a7d1b9e3c8f" as QuestionUUID
					}
				]
			}
		}
	}
]

export default ledEfficiencyBlocks
