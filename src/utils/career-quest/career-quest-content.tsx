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
			"Now that I know your name, let's move on.
			<br />
			I want to show you something else.
		</div>
	),

	// Sequence #4 [Speaker]
	"introduction-4-1": () => (
		<div>
			I don't just use lights or screens.
			<br />
			Using my
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				speaker,
			</Highlighter>
			{" "}I can use sound to share signals too.
		</div>
	),
	"introduction-4-2": () => (
		<div>
			In robotics, audio cues are essential
			<br />
			for communicating with people.
		</div>
	),
	"introduction-4-3": () => (
		<div>
			Status tones confirm commands,
			<br />
			error alerts guide troubleshooting,
			<br />
			and warnings improve safety.
		</div>
	),
	"introduction-4-4": () => (
		<div>
			I can make sounds like that too.
			<br />
			Go ahead, try one,
			<br />
			a beep, a chime, even a siren.
		</div>
	),
	"introduction-4-5": () => (
		<div>
			I can also use my speaker
			<br />
			for more than alerts.
			<br />
			Want to hear something fun?
		</div>
	),
	"introduction-4-6": () => (
		<div>
			My lights, screen, and speaker
			<br />
			let me communicate with you.
			<br />
			Now I want to show you how
			<br />
			I sense the world around me.
		</div>
	),

	// Sequence #5 [IMU]
	"introduction-5-1": () => (
		<div>
			I can feel motion and balance with a sensor inside me, kind of like the way you keep your balance when you move or spin.
		</div>
	),
	"introduction-5-2": () => (
		<div>
			This sensor is called an
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				IMU,
			</Highlighter>
			{" "}which means
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				Inertial Measurement Unit.
			</Highlighter>
			<br />
			It tells me when I tilt left or right, tip forward or backward, or turn in a circle.
		</div>
	),
	"introduction-5-3": () => (
		<div>
			IMUs are found in many machines you already know:
			<br />
			• Drones use them to stay level in the air
			<br />
			• Phones use them to flip the screen
			<br />
			• Robots use them to turn and move precisely
		</div>
	),
	"introduction-5-4": () => (
		<div>
			Want to try?
			<br />
			Pick me up gently and tilt me
			<br />
			side to side or forward and back.
			<br />
			You'll see what my IMU feels in real time.
		</div>
	),
	"introduction-5-5": () => (
		<div>
			Here's a fun way to try my IMU.
			<br />
			Tilt me and see if you can roll the ball
			<br />
			into the hole on my screen.
		</div>
	),
	"introduction-5-6": () => (
		<div>
			My IMU translates balance and motion
			<br />
			into signals on the screen,
			<br />
			the same signals I'll use
			<br />
			to guide my movements.
		</div>
	),
	"introduction-5-7": () => (
		<div>
			That's how I stay steady and prepare for challenges where balance and precision matter.
		</div>
	),

	// Sequence #6 [TOF]
	"introduction-6-1": () => (
		<div>
			To stay aware, I need to sense not only motion but also distance.
			<br />
			That's why I use
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				ToF,
			</Highlighter>
			{" "}or Time-of-Flight sensors.
		</div>
	),
	"introduction-6-2": () => (
		<div>
			ToF sensors help factory robots avoid collisions, guide cleaning robots as they map rooms, and let cars detect obstacles to stay safe.
		</div>
	),
	"introduction-6-3": () => (
		<div>
			I have different kinds of ToF sensors. My front sensor sees distance in an 8×8 grid, almost like a low-resolution depth camera.
		</div>
	),
	"introduction-6-4": () => (
		<div>
			Want to see what it looks like? Hold your hand in front of me and move it closer or farther.
		</div>
	),
	"introduction-6-5": () => (
		<div>
			I also have single-beam sensors on my sides.
			<br />
			They check left and right so I know what's beside me.
		</div>
	),
	"introduction-6-6": () => (
		<div>
			Want to test them? Hold your hand to one side, then the other, and I'll show you what those sensors detect.
		</div>
	),
	"introduction-6-7": () => (
		<div>
			With my ToF sensors,
			<br />
			I can notice obstacles, understand spaces,
			<br />
			and stay aware of my surroundings.
		</div>
	),
	"introduction-6-8": () => (
		<div>
			Being able to notice obstacles and understand spaces
			<br />
			prepares me for jobs where safe navigation is essential.
		</div>
	),

	// Sequence #7 [Buttons]
	"introduction-7-1": () => (
		<div>
			My sensors keep me aware,
			<br />
			but I still need your input.
			<br />
			That's why I have
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				buttons.
			</Highlighter>
		</div>
	),
	"introduction-7-2": () => (
		<div>
			In robotics,
			<br />
			buttons give people reliable control.
		</div>
	),
	"introduction-7-3": () => (
		<div>
			From starting robotic arms in factories,
			<br />
			to launching or landing drones,
			<br />
			to setting new tasks for warehouse robots.
		</div>
	),
	"introduction-7-4": () => (
		<div>
			I have two buttons on top.
			<br />
			Try pressing one of them
			<br />
			and see how I respond.
		</div>
	),
	"introduction-7-5": () => (
		<div>
			Each button gives me a different signal.
			<br />
			One could mean yes, the other no.
			<br />
			Or they could trigger completely different actions.
		</div>
	),
	"introduction-7-6": () => (
		<div>
			Let's play a quick game using my buttons.
			<br />
			Press the button when my light flashes
			<br />
			and see how fast you are.
		</div>
	),
	"introduction-7-7": () => (
		<div>
			Buttons are simple,
			<br />
			which is why they're the best way to guide me.
		</div>
	),

	// Sequence #8 [Color + Line Following]
	"introduction-8-1": () => (
		<div>
			I can also sense colors beneath me
			<br />
			using a downward-facing
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				color sensor.
			</Highlighter>
		</div>
	),
	"introduction-8-2": () => (
		<div>
			Robots often use color sensors
			<br />
			to sort objects, read labels,
			<br />
			or detect signals marked on the ground.
		</div>
	),
	"introduction-8-3": () => (
		<div>
			I want to show you.
			<br />
			Move something colorful under me
			<br />
			and I'll show you what I see.
		</div>
	),
	"introduction-8-4": () => (
		<div>
			Alongside my color sensor,
			<br />
			I also have
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				line-following sensors.
			</Highlighter>
			<br />
			They let me detect the difference between
			<br />
			light and dark surfaces on the ground.
		</div>
	),
	"introduction-8-5": () => (
		<div>
			Robots use line-following to stay on track in factories and warehouses.
			<br />
			I'll use mine for jobs where following a marked path is important.
		</div>
	),
	"introduction-8-6": () => (
		<div>
			With sensors like these, I can recognize colors,
			<br />
			detect patterns, and follow paths.
			<br />
			Abilities I'll need for jobs that demand careful navigation.
		</div>
	),

	// Sequence #9 [Driving + Encoders]
	"introduction-9-1": () => (
		<div>
			You have seen how I sense and communicate.
			<br />
			But there is something else I can do.
			<br />
			I can move.
		</div>
	),
	"introduction-9-2": () => (
		<div>
			My
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				motors
			</Highlighter>
			{" "}let me drive forward, turn, and explore.
		</div>
	),
	"introduction-9-3": () => (
		<div>
			I've been working on my dance moves, and I want you to see.
		</div>
	),
	"introduction-9-4": () => (
		<div>
			To keep track of my movement,
			<br />
			each wheel has a sensor called an
			<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
				encoder.
			</Highlighter>
			<br />
			Encoders measure the wheels speed and direction.
		</div>
	),
	"introduction-9-5": () => (
		<div>
			Robots use wheels and encoders for precise movement:
			<br />
			• Delivery robots measure distance to reach their stops
			<br />
			• Warehouse robots count wheel turns to follow routes
			<br />
			• Exploration rovers track their motion across rough terrain
		</div>
	),
	"introduction-9-6": () => (
		<div>
			Give one of my wheels a spin.
			<br />
			My encoders will show you exactly how it moves.
		</div>
	),
	"introduction-9-7": () => (
		<div>
			With wheels and encoders,
			<br />
			I can travel, navigate, and prepare for jobs that require movement through the world.
		</div>
	),

	// Sequence #10 [Conclusion]
	"introduction-10-1": () => (
		<div>
			When we first met, I told you
			<br />
			I didn't know what I was made for.
		</div>
	),
	"introduction-10-2": () => (
		<div>
			Now you have seen
			<br />
			my lights, screen, speaker, sensors, and wheels.
			<br />
			I am a robot built to learn, explore, and help.
		</div>
	),
	"introduction-10-3": () => (
		<div>
			Robots in the world carry supplies,
			<br />
			assist in hospitals, explore oceans, and travel into space.
			<br />
			My Career Quest is about discovering where I belong among them.
		</div>
	),
	"introduction-10-4": () => (
		<div>
			I will try jobs one at a time, each an adventure
			<br />
			that teaches me more about who I can be.
		</div>
	),
	"introduction-10-5": () => (
		<div>
			But I don't have to take this journey alone.
			<br />
			With you beside me,
			<br />
			every challenge feels possible.
		</div>
	),
	"introduction-10-6": () => (
		<div>
			This is where our Career Quest begins.
			<br />
			The world is waiting with jobs to try, challenges to face,
			<br />
			and discoveries to uncover.
			<br />
			The first step of our journey starts now.
		</div>
	),

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
