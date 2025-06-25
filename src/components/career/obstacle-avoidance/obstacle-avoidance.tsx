/* eslint-disable max-len */
"use client"

import { Suspense } from "react"
import ViewOnlyDemo from "../view-only-demo"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import { OBSTACLE_AVOIDANCE_CHALLENGE } from "@bluedotrobots/common-ts"

export default function ObstacleAvoidance() {
	return (
		<>
			{/* <div className="w-full min-h-screen p-4">
				<div className="w-2/3 mx-auto mb-8 text-center">
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
							Lets start with my distance sensors. I want you to write a script that measures my
						</div>
						Whenever we run a script, I want you to try sending the code to me for me to run to see if it's successful before writing check code.
						If they press the check code and it isn't the right solution (for simple programs, the solns should be simple (hard-coded)) --/ should send to the LLM, and it should give feedback.
					</div>
				</div>
			</div> */}
			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ViewOnlyDemo
					challengeData={OBSTACLE_AVOIDANCE_CHALLENGE}
					description={OBSTACLE_AVOIDANCE_CHALLENGE.description}
					beforeRunningText={"Make sure your robot is placed on a flat surface with some space in front of it. The ultrasonic sensor should be facing forward to detect obstacles."}
					extraClasses="h-full"
					blocklyJson={{}}
				/>
			</Suspense>
		</>
	)
}
