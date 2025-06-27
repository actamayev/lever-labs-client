/* eslint-disable max-len */
"use client"

import Link from "next/link"
import { Suspense } from "react"
import { OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2, OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"
import ChallengeSection from "../challenge-section"
import SimpleSandbox from "../simple-sandbox/simple-sandbox"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import obstacleAvoidanceBlocklyCode from "../../../utils/constants/career-quest/obstacle-avoidance-code"

// eslint-disable-next-line max-lines-per-function
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
			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						Great! You've written a basic obstacle avoider program. As you saw, I keep driving forward until I sense something, and then I stop and wait for that obstacle to go away.
						But we're not done just yet! I don't want to get stuck if I detect an obstacle, like a wall - I want to turn and drive somewhere else to keep exploring.
						Whenever you're walking on the street, and something is in your way, you try to go around it - I need you to write a program that makes me do the same thing.
					</div>
				</div>
			</div>
			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ChallengeSection challengeData={OBSTACLE_AVOIDANCE_CHALLENGE_3} />
			</Suspense>
			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						Nice! Now I won't get stuck after detecting something directly in front of me! I'm already noticing that I'm a lot less clumsy than before!
						But, I do feel nervous that I'll be bumping into obstacles that aren't directly in front of me, but into obstacles that are to the front-left and front-right of me.
					</div>
					<div>
						If you want to see how this would be an issue, try running this program. It checks if there's something to my front-left. To see it in action, place an obstacle to my front-left.
					</div>
				</div>
			</div>
			<div className="w-2/3 mx-auto h-52 flex">
				<div className="flex-1 flex flex-col">
					<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
						<SimpleSandbox blocklyJson={obstacleAvoidanceBlocklyCode[0]} />
					</Suspense>
				</div>
			</div>
			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						The program above checks if my left distance sensor detects something. If it detects something is close, my LEDs will turn red. If it doesn't detect anything, my LEDs will turn green.
						I have the same sensor on my right side.
						I want you to write a program that checks if my right-side distance sensor detects something. If it does, lets make my LEDs blue, and if it doesn't, turn my LEDs off.
					</div>
				</div>
			</div>
			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ChallengeSection challengeData={OBSTACLE_AVOIDANCE_CHALLENGE_4} />
			</Suspense>

			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						Great job! Now, we have all the building blocks we need to make me perform obstacle avoidance.
						Lets go back to using just the front sensor, and we'll build up from there using what we know about the side sensors.
					</div>
					<div>
						When we were using the front sensor, we were using a simple 'conditional' block, which we introduced in the 'Introduction to Robotics'.
						Now, we'll use a more complex conditional block. Instead of just checking one condition, we'll check multiple conditions.
						Instead of just checking if there's something in front of me, I want to also check if there's something to my front-right side, and front-left side.
						We'll be using an else-if chain. You can think of an else-if chain like a train that has to choose a track to go on.
						Lets say you're the conductor of a train, and you're told to go to Mango Mansion in the morning, Apple Avenue in the afternoon, and Eggplant Estate in the evening.
						When you start your job, you're going to ask yourself: what time is it?
						If it's the morning, then you'll go to Mango Mansion.
						If it's not the morning, and it's the afternoon, then you'll go to Apple Avenue.
						If it's not the morning, nor the evening, then you'll go to the Eggplant Estate.

						You'll use that same conditional logic for writing my obstacle avoider code, except instead of asking what time of day it is, you'll use the output of my distance sensors.
					</div>
				</div>
			</div>
			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ChallengeSection challengeData={OBSTACLE_AVOIDANCE_CHALLENGE_5} />
			</Suspense>
			<div className="w-2/3 mx-auto text-center">
				<div className="space-y-4">
					<div>
						Great job! Now I can avoid obstacles.
					</div>
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
