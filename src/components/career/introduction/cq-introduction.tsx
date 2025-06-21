/* eslint-disable max-len */
"use client"

import { Suspense } from "react"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import { cn } from "@/lib/shadcn/utils"
import SimpleSandbox from "../simple-sandbox/simple-sandbox"
import careerQuestCode from "../../../utils/constants/career-quest/career-quest-code"

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
			<div className="w-2/3 mx-auto h-52">
				<div className="flex gap-4 h-full">
					{/* SimpleSandbox - Left Half */}
					<div className="flex-1 flex flex-col">
						<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
							<SimpleSandbox
								blocklyJson={careerQuestCode[0].blocklyJson}
								cppCode={careerQuestCode[0].cppCode}
							/>
						</Suspense>
					</div>

					{/* Code Display - Right Half */}
					<div className="flex-1 flex flex-col">
						<div className="flex-1 border-2 border-swan rounded-lg overflow-hidden">
							<div className="h-full flex flex-col">
								{/* Header */}
								<div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-swan">
									<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Generated C++ Code
									</h3>
								</div>

								{/* Code Content */}
								<div className="flex-1 overflow-auto">
									<pre className={cn(
										"h-full w-full p-4 text-sm font-mono",
										"bg-white dark:bg-gray-900",
										"text-gray-800 dark:text-gray-200",
										"whitespace-pre-wrap break-words",
										"resize-none outline-none"
									)}>
										{careerQuestCode[0].cppCode}
									</pre>
								</div>
							</div>
						</div>
					</div>
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

			<div className="w-2/3 mx-auto h-52">
				<div className="flex gap-4 h-full">
					{/* SimpleSandbox - Left Half */}
					<div className="flex-1 flex flex-col">
						<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
							<SimpleSandbox
								blocklyJson={careerQuestCode[1].blocklyJson}
								cppCode={careerQuestCode[1].cppCode}
							/>
						</Suspense>
					</div>

					{/* Code Display - Right Half */}
					<div className="flex-1 flex flex-col">
						<div className="flex-1 border-2 border-swan rounded-lg overflow-hidden">
							<div className="h-full flex flex-col">
								{/* Header */}
								<div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-swan">
									<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Generated C++ Code
									</h3>
								</div>

								{/* Code Content */}
								<div className="flex-1 overflow-auto">
									<pre className={cn(
										"h-full w-full p-4 text-sm font-mono",
										"bg-white dark:bg-gray-900",
										"text-gray-800 dark:text-gray-200",
										"whitespace-pre-wrap break-words",
										"resize-none outline-none"
									)}>
										{careerQuestCode[1].cppCode}
									</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-2/3 mx-auto h-52">
				<div className="flex gap-4 h-full">
					{/* SimpleSandbox - Left Half */}
					<div className="flex-1 flex flex-col">
						<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
							<SimpleSandbox
								blocklyJson={careerQuestCode[2].blocklyJson}
								cppCode={careerQuestCode[2].cppCode}
							/>
						</Suspense>
					</div>

					{/* Code Display - Right Half */}
					<div className="flex-1 flex flex-col">
						<div className="flex-1 border-2 border-swan rounded-lg overflow-hidden">
							<div className="h-full flex flex-col">
								{/* Header */}
								<div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-swan">
									<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Generated C++ Code
									</h3>
								</div>

								{/* Code Content */}
								<div className="flex-1 overflow-auto">
									<pre className={cn(
										"h-full w-full p-4 text-sm font-mono",
										"bg-white dark:bg-gray-900",
										"text-gray-800 dark:text-gray-200",
										"whitespace-pre-wrap break-words",
										"resize-none outline-none"
									)}>
										{careerQuestCode[2].cppCode}
									</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
