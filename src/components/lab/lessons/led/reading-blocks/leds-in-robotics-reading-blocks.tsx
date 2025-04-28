"use client"

/* eslint-disable max-len */
import DidYouKnow from "../../../reading/did-you-know"
import { CustomMarsRover } from "../../../../icons/custom-mars-rover"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"
import { BulletedList } from "../../../reading/ordered-list"
import { QuestionUUID } from "@bluedotrobots/common-ts"

const ledsInRoboticsReadingBlocks: ContentBlock[] = [
	{
		id: "leds-in-robotics-1",
		renderText: () => (
			<div>
				<ReadingBlockHeader>LEDs in Robotics</ReadingBlockHeader>
				<ReadingBlockWithImage>
					Now that we've explored the advantages of LEDs over traditional lighting technologies, let's see how these benefits translate into real-world robotics applications.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					We'll examine how Pip and other robots use LED technology not just for illumination, but as essential components that play critical roles in modern robotics - from helping them see and sense their environment to communicating their status and intentions.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-in-robotics-2",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Why LEDs are important in Robotics
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					In robotics, precise control over components is crucial - and LEDs excel at this.
					Unlike traditional light bulbs that slowly warm up or cool down, LEDs can switch on and off in microseconds (millionths of a second)!
					This incredible speed makes them perfect for robot communication and sensing.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					Think about Pip's needs:
					<ul className="list-disc list-inside">
						<li>
							<strong>Status Communication:</strong> Pip needs to show different colors instantly to indicate its status
						</li>
						<li>
							<strong>Pattern Generation:</strong> Pip can create complex light patterns that would be impossible with slower light sources
						</li>
					</ul>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-in-robotics-3",
		renderText: () => (
			<div>
				<ReadingBlockWithImage>
					This precision isn't just about speed - it's also about control. We can:
					<BulletedList
						items={[
							"Adjust brightness with extreme accuracy",
							"Switch between colors instantly",
							"Create complex patterns with microsecond timing",
							"Operate reliably for thousands of hours",
						]}
					/>
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					For example, when Pip needs to indicate it's processing a command, its LEDs can pulse smoothly between different brightness levels. When it detects an obstacle, they can flash instantly to alert you. This level of control helps Pip communicate clearly and operate effectively
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-in-robotics-4",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Perception and Sensing
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Vision Systems",
							"Structured Light Sensing: Infrared LED arrays project invisible patterns",
							"Elevator doors IR beam break",
							"Cameras detect pattern distortion to create 3D maps",
							"Used in robot navigation and object manipulation, similar to how Pip uses infrared LEDs to detect obstacles"
						]}
					/>
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Proximity Detection",
							"Time-of-Flight (ToF) Distance Sensors",
							"High-speed LED pulses measure distance via light reflection",
							"Enable precise obstacle avoidance in varying light conditions",
						]}
					/>
				</ReadingBlockWithImage>
				<DidYouKnow
					Icon={CustomMarsRover}
					tooltipMessage="Mars Rovers"
				>
					The Mars rovers use LED-based instruments to analyze Martian rocks by measuring how they fluoresce under specific wavelengths of light.
				</DidYouKnow>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-in-robotics-5",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Communication and Feedback
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Status Indication: Modern robots use LED patterns to communicate
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Solid Green: Normal operation",
							"Pulsing Blue: Processing",
							"Rotating Pattern: Movement planned",
							"Red Flash: Error detected",
						]}
					/>
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Robot-to-Robot Communication",
							"High-speed data transfer using light pulses",
							"Works in radio-restricted environments",
						]}
					/>
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Human-Robot Interaction",
							"Intuitive status display",
							"Emotional expression through color patterns",
							"Displays",
							"Direction indication for movement",
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Which LED setup works best for manufacturing robots?",
						choices: [
							{
								answerChoiceId: 1,
								text: "Bright, multi-color status indicators",
								correct: false,
								explanation: "Incorrect. While status indicators are useful, they aren't the most critical for precision manufacturing tasks where visual inspection is key."
							},
							{
								answerChoiceId: 2,
								text: "High-power infrared for distance sensing",
								correct: false,
								explanation: "Incorrect. Distance sensing is important for navigation and collision avoidance, but not as critical for precision manufacturing operations."
							},
							{
								answerChoiceId: 3,
								text: "Strobed, monochromatic lighting for machine vision",
								correct: true,
								explanation: "Correct! Strobed monochromatic (single-color) lighting helps manufacturing robots capture clear images without motion blur. This is essential for precise inspection, measurement, and quality control in manufacturing."
							},
							{
								answerChoiceId: 4,
								text: "UV LEDs for material inspection",
								correct: false,
								explanation: "Incorrect. While UV LEDs are useful for specific inspection tasks like detecting certain materials or contaminants, they aren't the most versatile option for general precision manufacturing."
							}
						],
						questionUUID: "3a8d5c1e7b9f" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "leds-in-robotics-6",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Industry Applications
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Machine Vision",
							"LED strobe synchronization with cameras",
							"Consistent lighting for quality control",
							"Different colors for enhanced contrast",
						]}
					/>
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Collaborative Robots",
							"Safety zone indication",
							"Work status communication",
							"Emergency state signaling",
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-in-robotics-7",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Modern Displays
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<BulletedList
						items={[
							"Today's screens use millions of tiny LEDs",
							"Each pixel consists of red, green, and blue LEDs",
							"The screen you're reading this on likely uses LED technology",
						]}
					/>
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Why do factory robots use strobed LED lighting?",
						choices: [
							{
								answerChoiceId: 1,
								text: "To save power consumption",
								correct: false,
								explanation: "Incorrect. While LEDs are energy-efficient, strobing them is mainly for improving vision quality, not saving power."
							},
							{
								answerChoiceId: 2,
								text: "To synchronize with camera captures and reduce motion blur",
								correct: true,
								explanation: "Correct! Strobed lighting flashes precisely when cameras take images, freezing motion and creating clearer pictures without blur. This is essential for accurate inspection of moving parts."
							},
							{
								answerChoiceId: 3,
								text: "To make the workspace brighter",
								correct: false,
								explanation: "Incorrect. Strobed lighting doesn't make the workspace brighter overall - it actually creates brief, intense flashes timed with cameras rather than constant brightness."
							},
							{
								answerChoiceId: 4,
								text: "To communicate with other robots",
								correct: false,
								explanation: "Incorrect. While robots can use light for communication, strobed lighting in manufacturing is primarily used for enhancing machine vision, not for robot-to-robot communication."
							}
						],
						questionUUID: "6b2e9d4f8a7c" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "leds-in-robotics-8",
		renderText: () => (
			<div>
				<ReadingBlockSectionHeader>
					Summary
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					As we've seen, LEDs are much more than just indicator lights in modern robotics.
					They've become fundamental components in robot perception, sensing, communication, and human-robot interaction.
					From helping robots navigate their environments with infrared sensing to providing intuitive status feedback through color patterns, LEDs enable many of the capabilities that make robots like Pip functional and user-friendly.
					The precision control, efficiency, and versatility of LEDs have transformed what's possible in robotics.
					In our next section, we'll put this knowledge into practice by creating our own LED-based systems for Pip, applying what we've learned about both LED technology and programming.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "end" }
	}
]

export default ledsInRoboticsReadingBlocks
