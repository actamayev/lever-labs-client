/* eslint-disable max-len */
"use client"

import { Suspense } from "react"
import { OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2 } from "@bluedotrobots/common-ts"
import ChallengeSection from "../challenge-section"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"

export default function ObstacleAvoidance() {
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
				<ChallengeSection challengeData={OBSTACLE_AVOIDANCE_CHALLENGE_1} />
			</Suspense>
			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						Great job! Now, you might be wondering why I asked you to change the color of my LEDs to indicate if there's an object in front of me.
						After all, I'm not going to drive around and avoid obstacle by just changing my LEDs!
						The reason I asked you to use LEDs is that it's always best to test your code in a controlled environment, so that if your code did something unexpected, you can fix it before I start bumping into things.
						Writing code is both straightforward and tricky, because I will follow your instructions exactly as you tell me. So if there's something in your code that you didn't mean for me to do, I have no way of knowing that, and I will do it anyway.
					</div>
					<div>
						Now that we know that your LED solution works, lets try bringing the motors in, and I'll try some basic obstacle avoidance.
						We'll start with the code you just wrote as a template, and I want you to add a couple of blocks.
						First, I need to drive around! Make it so that if I detect an object in front, I stop. Otherwise, I should keep driving forward at 50% speed.
						Second, lets add a start button. Whenever I'm going to drive around, it's a good idea to have a start button. This way, I don't start moving as soon as I get the instructions - I'll wait for you to press my button to begin.
					</div>
				</div>
			</div>
			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ChallengeSection challengeData={OBSTACLE_AVOIDANCE_CHALLENGE_2} />
			</Suspense>
		</div>
	)
}
