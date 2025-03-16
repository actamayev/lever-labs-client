"use client"

/* eslint-disable max-len */
import { Clapperboard } from "lucide-react"
import DidYouKnow from "../../../reading/did-you-know"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../reading/reading-styles"
import { BulletedList } from "../../../reading/ordered-list"

const ledsAndLoopsReadingBlocks: ContentBlock[] = [
	{
		id: "leds-and-loops-1",
		text: (
			<div>
				<ReadingBlockHeader>
					LEDs and Loops
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					Have you ever noticed how your laptop's power button smoothly fades in and out when it's sleeping? Or how smart home devices have lights that gently pulse? Let's learn how to create these smooth "breathing" effects with Pip's LEDs using something called loops!
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-and-loops-2",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					What are Loops?
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Sometimes we want Pip to repeat actions over and over. Instead of writing the same instruction many times, we use loops - commands that tell Pip to repeat something.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-and-loops-3",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Types of Loops
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<h4 className="font-medium mb-3">There are two main types of loops:</h4>

					<div className="space-y-4">
						<div className="pl-4 border-l-4 border-blue-400">
							<p className="font-medium">For Loop: "Do this X number of times"</p>
							<p className="pl-4 text-lg">Example: Blink the LED 5 times</p>
						</div>

						<div className="pl-4 border-l-4 border-green-400">
							<p className="font-medium">While Loop: "Keep doing this as long as something is true"</p>
							<p className="pl-4 text-lg">Example: Keep the LED on while a button is pressed</p>
						</div>
					</div>
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/led/demo/led-counting-loop"
		}
	},
	{
		id: "leds-and-loops-4",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Creating the Breathing Effect
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					To make LEDs "breathe," we need to:
					Gradually increase brightness from 0% to 100%
					Gradually decrease brightness from 100% to 0%
					Repeat these steps
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/led/demo/led-breathing"
		}
	},
	{
		id: "leds-and-loops-5",
		text: (
			<DidYouKnow
				Icon={Clapperboard}
				tooltipMessage="RGB Alternate"
			>
				The smooth breathing effect we created uses the same principle as movie animation - making small changes quickly to create the illusion of smooth motion!
			</DidYouKnow>
		),
		action: { type: "continue" }
	},
	{
		id: "leds-and-loops-6",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Summary
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Now we know how to:
					<BulletedList
						items={[
							"Use loops to repeat actions",
							"Create smooth animations using small changes",
							"Control LED brightness",
							"Make different types of breathing patterns"
						]}
					/>
					Next, we'll learn how to control each of Pip's LEDs individually to create even more exciting patterns!
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "end" }
	},
]

export default ledsAndLoopsReadingBlocks
