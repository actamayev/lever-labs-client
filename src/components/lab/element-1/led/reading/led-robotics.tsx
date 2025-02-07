/* eslint-disable max-len */
import DidYouKnow from "../../../reading/did-you-know"
import { BoldSpanText } from "../../../../bold-span-text"
import { CustomMarsRover } from "../../../../icons/custom-mars-rover"
import { ReadingBlockHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"

const ledsRoboticsBlocks: ContentBlock[] = [
	{
		id: "led-robotics-1",
		text: (
			<div>
				<ReadingBlockHeader>
                    LEDs in Modern Robotics: More Than Just Indicators
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					<BoldSpanText>Perception and Sensing</BoldSpanText>
					<div className="mt-2">
						<div className="mb-4">
							<h3 className="font-semibold">Vision Systems</h3>
							<ul className="mt-2 ml-4">
								<li>Structured Light Sensing: Infrared LED arrays project invisible patterns</li>
								<li>Cameras detect pattern distortion to create 3D maps</li>
								<li>Used in robot navigation and object manipulation, similar to how Pip uses infrared LEDs to detect obstacles</li>
							</ul>
						</div>

						<div>
							<h3 className="font-semibold">Proximity Detection</h3>
							<ul className="mt-2 ml-4">
								<li>Time-of-Flight (ToF) Sensors</li>
								<li>High-speed LED pulses measure distance via light reflection</li>
								<li>Enable precise obstacle avoidance in varying light conditions</li>
							</ul>
						</div>
					</div>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "led-robotics-2",
		text: (
			<DidYouKnow Icon={CustomMarsRover}>
                The Mars rovers use LED-based instruments to analyze Martian rocks by measuring how they fluoresce under specific wavelengths of light.
			</DidYouKnow>
		),
		action: { type: "continue" },
	},
	{
		id: "led-robotics-3",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>Communication and Feedback</BoldSpanText>
				<div className="mt-2">
					<div className="mb-4">
						<h3 className="font-semibold">Status Indication</h3>
						<p className="mt-2">Modern robots use LED patterns to communicate:</p>
						<ul className="mt-2 ml-4">
							<li>Solid Green: Normal operation</li>
							<li>Pulsing Blue: Processing</li>
							<li>Rotating Pattern: Movement planned</li>
							<li>Red Flash: Error detected</li>
						</ul>
					</div>

					<div className="mb-4">
						<h3 className="font-semibold">Robot-to-Robot Communication</h3>
						<ul className="mt-2 ml-4">
							<li>High-speed data transfer using light pulses</li>
							<li>Works in radio-restricted environments</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold">Human-Robot Interaction</h3>
						<ul className="mt-2 ml-4">
							<li>Intuitive status display</li>
							<li>Emotional expression through color patterns</li>
							<li>Direction indication for movement</li>
						</ul>
					</div>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-robotics-4",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>Industrial Applications</BoldSpanText>
				<div className="mt-2">
					<div className="mb-4">
						<h3 className="font-semibold">Machine Vision</h3>
						<ul className="mt-2 ml-4">
							<li>LED strobe synchronization with cameras</li>
							<li>Consistent lighting for quality control</li>
							<li>Different colors for enhanced contrast</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold">Collaborative Robots</h3>
						<ul className="mt-2 ml-4">
							<li>Safety zone indication</li>
							<li>Work status communication</li>
							<li>Emergency state signaling</li>
						</ul>
					</div>
				</div>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-robotics-5",
		text: (
			<ReadingBlockWithImage>
				<BoldSpanText>Modern Displays</BoldSpanText>
				<ul className="mt-2 ml-4">
					<li>Today's screens use millions of tiny LEDs</li>
					<li>Each pixel consists of red, green, and blue LEDs</li>
					<li>The screen you're reading this on likely uses LED technology</li>
				</ul>
			</ReadingBlockWithImage>
		),
		action: { type: "continue" },
	},
	{
		id: "led-robotics-6",
		text: null,
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Which LED configuration would be most appropriate for a robot working in a precision manufacturing environment?",
						choices: [
							{
								answerChoiceId: 1,
								text: "Bright, multi-color status indicators",
								correct: false,
								explanation: "While status indicators are useful, they aren't the most critical for precision manufacturing where consistent, controlled lighting for machine vision is more important."
							},
							{
								answerChoiceId: 2,
								text: "High-power infrared for distance sensing",
								correct: false,
								explanation: "While distance sensing is valuable, precision manufacturing typically relies more on precise visual inspection and quality control, making strobed lighting more appropriate."
							},
							{
								answerChoiceId: 3,
								text: "Strobed, monochromatic lighting for machine vision",
								correct: true,
								explanation: "Correct! Strobed, monochromatic lighting is ideal for precision manufacturing because it provides consistent illumination synchronized with camera captures, reducing motion blur and enabling precise quality control inspections."
							},
							{
								answerChoiceId: 4,
								text: "UV LEDs for material inspection",
								correct: false,
								explanation: "While UV LEDs are useful for specific material inspections, they aren't typically the primary lighting choice for general precision manufacturing tasks."
							}
						],
						questionUUID: "4b7e2c9f8d3a" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "led-robotics-7",
		text: null,
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Why do manufacturing robots often use strobed LED lighting instead of constant illumination?",
						choices: [
							{
								answerChoiceId: 1,
								text: "To save power consumption",
								correct: false,
								explanation: "This is incorrect. While strobed lighting may use less power, this is a secondary benefit. The primary reason is related to image capture quality."
							},
							{
								answerChoiceId: 2,
								text: "To synchronize with camera captures and reduce motion blur",
								correct: true,
								explanation: "Correct! Strobed LED lighting synchronizes with camera captures to provide brief, intense illumination that freezes motion and reduces blur. This is crucial for accurate machine vision in manufacturing environments where parts may be moving quickly."
							},
							{
								answerChoiceId: 3,
								text: "To make the workspace brighter",
								correct: false,
								explanation: "This is incorrect. Strobed lighting isn't used to increase overall brightness. Its purpose is to provide precise, timed illumination for image capture."
							},
							{
								answerChoiceId: 4,
								text: "To communicate with other robots",
								correct: false,
								explanation: "This is incorrect. While LEDs can be used for robot-to-robot communication, strobed lighting in manufacturing is primarily used for machine vision and quality control purposes."
							}
						],
						questionUUID: "6a9d1e4b8c2f" as QuestionUUID
					}
				]
			}
		}
	}
]

export default ledsRoboticsBlocks
