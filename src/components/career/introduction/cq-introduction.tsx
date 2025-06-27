/* eslint-disable max-len */
"use client"

import Link from "next/link"
import { Suspense } from "react"
import SimpleSandbox from "../simple-sandbox/simple-sandbox"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import introductionBlocklyCode from "../../../utils/constants/career-quest/introduction-blockly-code"

// eslint-disable-next-line max-lines-per-function
export default function CQIntroduction() {
	return (
		<div className="w-full min-h-screen p-4">
			{/* Introduction Text */}
			<div className="w-2/3 mx-auto mb-8 text-center">
				<div className="space-y-4">
					<p>Hi! I'm Pip!</p>
					<p>As you're helping me through careers, you'll be writing code that I'm going to follow.</p>
					<p>You can think of code as a recipe, except instead of making a yummy dish, the recipe you write is going to help me complete various challenges.</p>
					<p>You're going to be writing a set of instructions for me to follow. Let's try it out:</p>
					<p className="font-semibold">-----Please Connect Pip to get started-----</p>
				</div>
			</div>

			{/* Main Content Area - Centered with 1/4 margins */}
			<div className="w-2/3 mx-auto h-52 flex">
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[0]} />
					</Suspense>
				</div>
			</div>

			<div className="w-2/3 mx-auto mb-8 text-center">
				Nice! What you just saw was me reading over and following the simple code.
				The box on the left with the blocks is called the sandbox. Think of this as your kitchen table for preparing the recipe.
				In the sandbox, you can choose the ingredients you want me to use and the tools I'll need to prepare and process your ingredients.
				Ingredients fallen into two categories, actuators, and sensors.
				Actuators are part of me that you can control think motors lights, and the speaker. You already had a chance to use my LEDs.
				Q: which actuator would we use for obstacle avoidance? (MC- duolingo style)
				Next sensors sensors allow me to observe the world around me just like you have five senses site hearing touch smell taste. I also have sensors. I have three sensors in motion sensor a colored detection sensor and black-and-white detection sensor.
				Q: What sensor do you think we'll use for obstacle detection? (MC-duolingo style)
				In order to make use of these ingredients, we need to process them for example if you're making a tomato cucumber salad, you don't just throw the cucumbers and tomatoes into a bowl. You have to wash them and cut them (prepare and process).
				In the sandbox, those preparation and process is done by logic blocks logic block, lettuce, bring together information we get from sensors and control or actuators. They are the glue that holds the instructions together.
				Let's talk about a few logic blocks will be using often.
				1. Delay block
				Whenever I come across a delay block in the instructions, I will pause everything I'm doing for the time that's indicated in the delay block run the two examples below to see the delay block in action.
			</div>

			<div className="w-2/3 mx-auto h-52 flex flex-row space-x-4">
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[1]} />
					</Suspense>
				</div>
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[2]} />
					</Suspense>
				</div>
			</div>

			<div className="w-2/3 mx-auto mb-8 text-center">
				2. Repeat forever block.
				This is a block will be using in almost every program (program is another word for a code will be using them interchangeably). As the name suggests, whatever code is inside, the forever block start starts again after reaching the end.
				Run the code on the left first, and then the code on the right.
			</div>

			<div className="w-2/3 mx-auto h-52 flex flex-row space-x-4">
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[3]} />
					</Suspense>
				</div>
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[4]} />
					</Suspense>
				</div>
			</div>

			<div className="w-2/3 mx-auto mb-8 text-center">
				3. Start block.
				Start block is optional, but we're going to be using it pretty often one place at the beginning of a program. I will not start running the program until you press my start button.
				Run the code on the left first, and then the code on the right to see the start button in action
			</div>

			<div className="w-2/3 mx-auto h-64 flex flex-row space-x-4">
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[5]} />
					</Suspense>
				</div>
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[6]} />
					</Suspense>
				</div>
			</div>

			<div className="w-2/3 mx-auto mb-8 text-center">
				Now, let's see how we can bring together all three types of blocks: logic, sensors, and actuators.
				In the example below, we introduce one more really important logic block: the conditional block.
				Conditional block check if the condition is true, and if it is a certain action is performed if it's not true, then a different action is done.
				People perform conditionals so often you're probably don't even think about it. For example, when you wanna go into your room, you ask yourself is the door open if the door is open, then you walk through the doorway there is an open open and then walk-through conditions are all about asking if something is true for performing and action if it is in a different action if it isn't..
				Let's see conditionals work in action
			</div>

			<div className="w-2/3 mx-auto h-64 flex flex-row space-x-4">
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[7]} />
					</Suspense>
				</div>
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[8]} />
					</Suspense>
				</div>
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={introductionBlocklyCode[9]} />
					</Suspense>
				</div>
			</div>

			<div className="w-2/3 mx-auto flex justify-center mt-10">
				<Link href="/career-quest">
					<BlueTactileButton className="text-xs sm:text-sm font-normal px-3 sm:px-4">
					BACK TO CAREER QUEST
					</BlueTactileButton>
				</Link>
			</div>
		</div>
	)
}
