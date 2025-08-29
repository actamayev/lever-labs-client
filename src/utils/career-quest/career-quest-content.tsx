"use client"

import { ReactNode } from "react"
import fireConfetti from "../fire-confetti"
import AnimatedStateButton from "../../components/magicui/animated-rainbow-button"
import { Highlighter } from "../../components/magicui/highlighter"

// Component registry for content components
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CONTENT_COMPONENTS: Record<string, (onAdvance?: () => void) => ReactNode> = {
	// Introduction career content
	"introduction-1-1": () => (
		<div>
			Hey there!<br />
			I was starting to think no one would show up... but you're here. And I'm so glad.
		</div>
	),
	"introduction-1-2": () => (
		<div>
			My name is
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>Pip</Highlighter>
			I don't know what I was made for, but I'm excited to find out.
		</div>
	),
	"introduction-1-3": () => (
		<div>
			Everything has a purpose. Clocks keep time. Books tell stories.
			<br />
			And robots? I think our purpose is to help people. That's what I want to do.
		</div>
	),
	"introduction-1-4": () => (
		<div>
			We learn by trying, failing, and trying again.
			<br />
			Every job, every adventure, is a chance to learn who we are.
		</div>
	),
	// introduction-1-5 is morphing text
	"introduction-1-6": (onAdvance?: () => void) => (
		<div className="flex-shrink-0 flex flex-col gap-4">
			Exploration is better with a friend. Will you join me?
			<AnimatedStateButton
				buttonText="YES"
				onClick={(event) => {
					// Fire confetti for visual feedback
					fireConfetti(
						event.currentTarget.getBoundingClientRect(),
						({ particleCount: 300, startVelocity: 30 })
					)

					// Wait 1 second before advancing to the next section
					setTimeout(() => {
						if (onAdvance) {
							onAdvance()
						}
					}, 500)
				}}
				className="duration-150 rounded-xl text-4xl h-12"
			/>
		</div>
	),
	"introduction-1-7": () => (
		<div>
			Wonderful!
			<br />
			Before we set off, I want to show you what I can do.
		</div>
	),
	"introduction-2-1": () => (
		<div>
			I have 8
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				LED lights,
			</Highlighter>
			{" "}each able to glow any color.
			<br />
			I can control them one at a time or all at once.
		</div>
	),
	"introduction-2-2": () => (
		<div>
			Robots often use lights to show charging, waiting, or warnings.
			<br />
			I can do that too, but I can also use my lights to connect with you in ways beyond words.
		</div>
	),
	"introduction-2-3": () => (
		<div>
			Go ahead, pick a color, and I'll show you I'm listening.
		</div>
	),
	"introduction-2-4": () => (
		<div>
			Nice choice. I think it suits me. Want to see what I can do with all my lights together?
		</div>
	),
	"introduction-2-5": () => (
		<div>
			That was fun!
			<br />
			My lights are just one way I can communicate, but there's more I want to show you.
		</div>
	),
	"introduction-3-1": () => (
		<div>
			My
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				screen
			</Highlighter>
			<br />
			is another way I can communicate with you. Robots often use screens to share what people need to know
		</div>
	),
	"introduction-3-2": () => (
		<div>
			Factory robots show their status, medical robots display patient data, and delivery bots show where they’re headed.
		</div>
	),
	"introduction-3-3": () => (
		<div>
			My screen may be small, but it lets me show words, symbols, even animations.
		</div>
	),
	"introduction-3-4": () => (
		<div>
			Wait… I’m showing you all the things I can do, but I don’t even know your name.
			<br />
			What is it? I’ll put it on my screen so I never forget.”
		</div>
	),
	"introduction-3-5": () => (
		<div>
			Thanks, [User name]. Now it really feels like we’re partners.
		</div>
	),
	"introduction-3-6": () => (
		<div>
			“Now that I know your name, let's move on.
			<br />
			I want to show you something else.
		</div>
	)

	// Obstacle Avoidance career content
	"obstacle-avoidance-1-1": () => (
		<div>
			Test 1
		</div>
	),
	"obstacle-avoidance-1-2": () => (
		<div>
			Test 2
		</div>
	),
	"obstacle-avoidance-1-3": () => (
		<div>
			Test 3
		</div>
	),
	"obstacle-avoidance-1-4": () => (
		<div>
			Test 4
		</div>
	),
	"obstacle-avoidance-1-5": () => (
		<div>
			Test 5
		</div>
	),
	"obstacle-avoidance-2-1": () => (
		<div>
			Test 6
		</div>
	),
	"obstacle-avoidance-2-2": () => (
		<div>
			Test 7
		</div>
	),
	"obstacle-avoidance-3-1": () => (
		<div>
			Test 8
		</div>
	),
	"obstacle-avoidance-4-1": () => (
		<div>
			Test 9
		</div>
	),
	"obstacle-avoidance-5-1": () => (
		<div>
			Test 10
		</div>
	),
	"obstacle-avoidance-6-1": () => (
		<div>
			Test 11
		</div>
	),

	// Morphing text components
	"morphing-stars-component": () => (
		<div className="text-6xl">
			🌟✨💫
		</div>
	),
}

// Helper function to get a content component by key
export function getContentComponent(key: string, onAdvance?: () => void): ReactNode {
	const component = CONTENT_COMPONENTS[key]
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!component) {
		console.warn(`Content component "${key}" not found in registry`)
		return <div>Content not found</div> // fallback
	}
	return component(onAdvance)
}
