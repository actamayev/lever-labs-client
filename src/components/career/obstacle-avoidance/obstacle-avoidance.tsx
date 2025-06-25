/* eslint-disable max-len */
"use client"

import { Suspense } from "react"
import { OBSTACLE_AVOIDANCE_CHALLENGE } from "@bluedotrobots/common-ts"
import ChallengeSection from "../challenge-section"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import { createFlyoutToolbox } from "../../../utils/blockly/create-flyout-toolbox"
import { LED_BLOCK_TYPES } from "../../../utils/blockly/block-types/led-block-types"
import { CONDITIONAL_BLOCK_TYPES, START_BLOCK_TYPES } from "../../../utils/blockly/block-types/logic-block-types"
import { SENSORS_BLOCK_TYPES } from "../../../utils/blockly/block-types/sensor-block-types"

export default function ObstacleAvoidance() {
	const basicObstacleAvoidanceToolbox = createFlyoutToolbox([
		START_BLOCK_TYPES.BUTTON_PRESS_START,
		SENSORS_BLOCK_TYPES.CENTER_TOF_READ,
		SENSORS_BLOCK_TYPES.SIDE_TOF_READ,
		LED_BLOCK_TYPES.ESP32_LED_CONTROL,
		CONDITIONAL_BLOCK_TYPES.IF,
		CONDITIONAL_BLOCK_TYPES.IF_ELSE
	])

	return (
		<div className="w-full min-h-screen p-4">
			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						Hello! Welcome to your first Career Quest! Today, you're going to show me how to navigate the world. I'm really clumsy and am used to bumping into things, but today, we're going to change all that. Let's get started!
						Whenever we start any new challenge, it's always helpful to break the problem into small, bite-sized pieces, and to make a plan that helps us build to the final solution.
						This will help us figure out what sensors and actuators we'll need to solve the challenge.
					</div>
					<div>
						We'll break this career into two steps:
						1. First, I'll use my distance sensors to 'see'
						2. Then, I'll react to those distance measurements (for example, if there's something to the right, I should turn left so that I don't bump into it).
						Lets get started!
					</div>
					<div>
						Lets start with my distance sensors. I have three distance sensors, or three 'eyes', that let me 'see' the world around me.
						Unlike your eyes, which let you see different colors, my distance sensors only let me see how far objects around me are.
						{/* 6/25/25 TODO: Put a visualization of the distance sensors here. */}
					</div>
					<div>
						Time for your first challenge. To get you familiar with the distance sensors, write a program that turns my lights red if there's something in front of me, and green if there isn't.
						There's two ways to test if your program works. You can send it over to me using the magical 'SEND CODE' button, and see the results in real life.
						Or, you can use the 'check code' button, which reads through your program.
						You can view the challenge details on the left side, and access the coding blocks from within the sandbox. If you have any questions, or if something isn't working, you can use the chat on the side.
					</div>
					{/* If they press the check code and it isn't the right solution (for simple programs, the solns should be simple (hard-coded)) --/ should send to the LLM, and it should give feedback. */}
				</div>
			</div>
			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ChallengeSection
					challengeData={OBSTACLE_AVOIDANCE_CHALLENGE}
					extraClasses="h-full"
					toolboxConfig={basicObstacleAvoidanceToolbox}
					blocklyJson={{}}
				/>
			</Suspense>
		</div>
	)
}
