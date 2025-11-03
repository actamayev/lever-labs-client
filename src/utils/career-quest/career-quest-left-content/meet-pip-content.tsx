/* eslint-disable max-len */
"use client"

import { ReactNode } from "react"

import { CareerType, MeetPipTriggerType } from "@lever-labs/common-ts/protocol"
import fireConfetti from "../../fire-confetti"
import personalInfoClass from "../../../classes/personal-info-class"
import { Highlighter } from "../../../components/magicui/highlighter"
import AnimatedStateButton from "../../../components/magicui/animated-rainbow-button"
import careerQuestTrigger from "../career-quest-trigger"

// Component registry for content components
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
const MEET_PIP_CONTENT_COMPONENTS: Record<string, (onAdvance?: () => void) => ReactNode> = {
	"meet-pip-1-1": (): ReactNode => (
		<div className="text-4xl" style={{ lineHeight: "1.5" }}>
			Hey there!<br />
			I was starting to think no one
			<br />
			would show up...
			<br />
			but you're here.
			<br />
			And I'm so glad.
		</div>
	),
	"meet-pip-1-2": (): ReactNode => (
		<div>
			My name is {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>Pip</Highlighter>.
			<br />
			I don't know what I was made for,
			<br />
			but I'm excited to find out.
		</div>
	),
	"meet-pip-1-3": (): ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			Everything has a purpose.
			<br />
			Clocks keep time.
			<br />
			Books tell stories.
			<br />
			And robots?
			<br />
			I think our purpose is to help people.
			<br />
			That's what I want to do.
		</div>
	),
	"meet-pip-1-4": (): ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			We learn by trying, failing, and trying again.
			<br />
			Every job, every adventure, is a chance to learn who we are.
		</div>
	),
	// meet-pip-1-5 is morphing text
	"meet-pip-1-6": (onAdvance?: () => void): ReactNode => (
		<div className="shrink-0 flex flex-col gap-4">
			Exploration is better with a friend.
			<br />
			Will you join me?
			<AnimatedStateButton
				buttonText="YES"
				onClick={(event): void => {
					// Fire confetti for visual feedback
					fireConfetti(
						event.currentTarget.getBoundingClientRect(),
						({ particleCount: 300, startVelocity: 30 })
					)

					// Wait 1 second before advancing to the next section
					setTimeout((): void => {
						if (onAdvance) {
							onAdvance()
						}
					}, 500)
				}}
				className="rounded-xl text-4xl h-12"
				needsUploadIcon={false}
			/>
		</div>
	),
	"meet-pip-1-7": (): ReactNode => (
		<div>
			Wonderful!
			<br />
			Before we set off,
			<br />
			I want to show you what I can do.
		</div>
	),
	"meet-pip-2-1": (): ReactNode => (
		<div>
			I have 8 {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				LED lights
			</Highlighter>,
			{" "}each able to glow any color.
			<br />
			I can control them one at a time or all at once.
		</div>
	),
	"meet-pip-2-2": (): ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			Robots often use lights to show charging, waiting, or warnings.
			<br />
			I can do that too, but I can also use my lights to connect with you in ways beyond words.
		</div>
	),
	"meet-pip-2-3": (): ReactNode => (
		<div>
			Go ahead,
			<br />
			pick a color,
			<br />
			and I'll show you I'm listening.
		</div>
	),
	"meet-pip-2-4": (): ReactNode => (
		<div className="flex flex-col gap-4">
			Nice choice.
			<br />
			I think it suits me.
			<br />
			Want to see what I can do with all my lights together?
			<AnimatedStateButton
				buttonText="YES"
				onClick={(): Promise<void> => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P4_ENTER)}
				className="rounded-xl text-4xl h-12"
				needsUploadIcon={false}
			/>
		</div>
	),
	"meet-pip-2-5": (): ReactNode => (
		<div>
			That was fun!
			<br />
			My lights are just one way I can communicate,
			<br />
			but there's more
			<br />
			I want to show you.
		</div>
	),
	"meet-pip-3-1": (): ReactNode => (
		<div>
			My {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				screen
			</Highlighter>
			<br />
			is another way I can communicate with you. Robots often use screens to share what people need to know.
		</div>
	),
	"meet-pip-3-2": (): ReactNode => (
		<div>
			Factory robots show their status, medical robots display patient data, and delivery bots show where they’re headed.
		</div>
	),
	"meet-pip-3-3": (): ReactNode => (
		<div>
			My screen may be small,
			<br />
			but it lets me show words, symbols, even animations.
		</div>
	),
	"meet-pip-3-4": (): ReactNode => (
		<div>
			Wait… I’m showing you all the things I can do, but I don’t even know your name.
			<br />
			What is it? I’ll put it on my screen so I never forget.
		</div>
	),
	"meet-pip-3-5": (): ReactNode => (
		<div>
			Thanks, {personalInfoClass.name || "friend"}. Now it really feels like we're partners.
		</div>
	),
	"meet-pip-3-6": (): ReactNode => (
		<div>
			Now that I know your name,
			<br />
			let's move on.
			<br />
			I want to show you something else.
		</div>
	),

	// Sequence #4 [Speaker]
	"meet-pip-4-1": (): ReactNode => (
		<div>
			I don't just use lights or screens.
			<br />
			Using my {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				speaker
			</Highlighter>,
			{" "}I can use sound to share signals too.
		</div>
	),
	"meet-pip-4-2": (): ReactNode => (
		<div>
			In robotics, audio cues are essential
			<br />
			for communicating with people.
		</div>
	),
	"meet-pip-4-3": (): React.ReactNode => (
		<div>
			Status tones confirm commands,
			<br />
			error alerts guide troubleshooting,
			<br />
			and warnings improve safety.
		</div>
	),
	"meet-pip-4-4": (): React.ReactNode => (
		<div>
			I can make sounds like that too.
			<br />
			Go ahead, try one,
			<br />
			a beep, a chime, even a siren.
		</div>
	),
	"meet-pip-4-5": (): React.ReactNode => (
		<div>
			I can also use
			<br />
			my speaker
			<br />
			for more than alerts.
			<br />
			Want to hear something fun?
			<AnimatedStateButton
				buttonText="YES"
				onClick={(): Promise<void> => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S4_P5_ENTER)}
				className="rounded-xl text-4xl h-12"
				needsUploadIcon={false}
			/>
		</div>
	),
	"meet-pip-4-6": (): React.ReactNode => (
		<div>
			My lights, screen, and speaker
			<br />
			let me communicate with you.
			<br />
			Now I want to
			<br />
			show you how
			<br />
			I sense the world around me.
		</div>
	),

	// Sequence #5 [IMU]
	"meet-pip-5-1": (): React.ReactNode => (
		<div>
			I can feel motion and balance with a sensor inside me, kind of like the way you keep your balance when you move or spin.
		</div>
	),
	"meet-pip-5-2": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			This sensor is called an {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				IMU
			</Highlighter>,
			{" "}which means {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				Inertial Measurement Unit.
			</Highlighter>
			<br />
			It tells me when I tilt left or right, tip forward or backward, or turn in a circle.
		</div>
	),
	// meet-pip-5-3 is morphing text
	"meet-pip-5-4": (): React.ReactNode => (
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
	"meet-pip-5-5": (): React.ReactNode => (
		<div>
			Here's a fun way to try my IMU.
			<br />
			Tilt me and see if you can roll the ball
			<br />
			into the hole on
			<br />
			the screen.
		</div>
	),
	"meet-pip-5-6": (): React.ReactNode => (
		<div>
			My IMU translates balance and motion
			<br />
			into signals on the screen,
			<br />
			the same signals
			<br />
			I'll use to guide
			<br />
			my movements.
		</div>
	),
	"meet-pip-5-7": (): React.ReactNode => (
		<div>
			That's how I stay steady and prepare for challenges where balance and precision matter.
		</div>
	),

	// Sequence #6 [TOF]
	"meet-pip-6-1": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			To stay aware,
			<br />
			I need to sense not only motion but also distance.
			<br />
			That's why I use {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				ToF
			</Highlighter>,
			{" "}or {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				Time-of-Flight sensors
			</Highlighter>.
		</div>
	),
	"meet-pip-6-2": (): React.ReactNode => (
		<div>
			ToF sensors help factory robots avoid collisions, guide cleaning robots as they map rooms, and let cars detect obstacles to stay safe.
		</div>
	),
	"meet-pip-6-3": (): React.ReactNode => (
		<div>
			I have different kinds of ToF sensors. My front sensor sees distance in an 8×8 grid, almost like a low-resolution depth camera.
		</div>
	),
	"meet-pip-6-4": (): React.ReactNode => (
		<div>
			Want to see what it looks like?
			<br />
			Hold your hand in front of me and move it closer or farther.
		</div>
	),
	"meet-pip-6-5": (): React.ReactNode => (
		<div>
			I also have single-beam sensors
			<br />
			on my sides.
			<br />
			They check left and right so I know what's beside me.
		</div>
	),
	"meet-pip-6-6": (): React.ReactNode => (
		<div>
			Want to test them? Hold your hand to one side, then the other, and I'll show you what those sensors detect.
		</div>
	),
	"meet-pip-6-7": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			With my ToF sensors,
			<br />
			I can notice obstacles, understand spaces,
			<br />
			and stay aware of my surroundings.
		</div>
	),
	"meet-pip-6-8": (): React.ReactNode => (
		<div>
			Being able to notice obstacles and understand spaces
			<br />
			prepares me for jobs where safe navigation is essential.
		</div>
	),

	// Sequence #7 [Buttons]
	"meet-pip-7-1": (): React.ReactNode => (
		<div>
			My sensors keep me aware,
			<br />
			but I still need your input.
			<br />
			That's why I have {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				buttons
			</Highlighter>.
		</div>
	),
	// meet-pip-7-2 is morphing text
	// Not including meet-pip-7-3 on purpose
	"meet-pip-7-4": (): React.ReactNode => (
		<div>
			I have two buttons on top.
			<br />
			Try pressing one of them
			<br />
			and see how I respond.
		</div>
	),
	"meet-pip-7-5": (): React.ReactNode => (
		<div>
			Each button gives me a different signal.
			<br />
			One could mean yes, the other no.
			<br />
			Or they could trigger completely different actions.
		</div>
	),
	"meet-pip-7-6": (): React.ReactNode => (
		<div>
			Let's play a quick game using my buttons.
			<br />
			Press the button to jump and help the dino avoid obstacles.
		</div>
	),
	"meet-pip-7-7": (): React.ReactNode => (
		<div>
			Buttons are simple,
			<br />
			which is why they're the best way to guide me.
		</div>
	),

	// Sequence #8 [Color + Line Following]
	"meet-pip-8-1": (): React.ReactNode => (
		<div>
			I can also sense colors beneath me
			<br />
			using a downward-facing {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				color sensor
			</Highlighter>.
		</div>
	),
	"meet-pip-8-2": (): React.ReactNode => (
		<div>
			Robots often use color sensors
			<br />
			to sort objects,
			<br />
			read labels,
			<br />
			or detect signals marked on the ground.
		</div>
	),
	"meet-pip-8-3": (): React.ReactNode => (
		<div>
			I want to show you.
			<br />
			Move something colorful under me
			<br />
			and I'll show you what I see.
		</div>
	),
	"meet-pip-8-4": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			Alongside my
			<br />
			color sensor,
			<br />
			I also have {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				line-following sensors
			</Highlighter>.
			<br />
			They let me detect the difference between
			<br />
			light and dark surfaces on the ground.
		</div>
	),
	"meet-pip-8-5": (): React.ReactNode => (
		<div>
			Robots use line-following to stay on track in factories and warehouses.
			<br />
			I'll use mine for jobs where following a marked path is important.
		</div>
	),
	"meet-pip-8-6": (): React.ReactNode => (
		<div>
			With sensors like these, I can recognize colors,
			<br />
			detect patterns, and follow paths.
			<br />
			Abilities I'll need for jobs that demand careful navigation.
		</div>
	),

	// Sequence #9 [Driving + Encoders]
	"meet-pip-9-1": (): React.ReactNode => (
		<div>
			You have seen how I sense and communicate.
			<br />
			But there is something else I can do.
			<br />
			I can move.
		</div>
	),
	"meet-pip-9-2": (): React.ReactNode => (
		<div>
			My {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				motors
			</Highlighter>
			{" "}let me drive forward, turn, and explore.
		</div>
	),
	"meet-pip-9-3": (): React.ReactNode => (
		<div>
			I've been working on my dance moves, and I want you to see.
			<AnimatedStateButton
				buttonText="DANCE"
				onClick={(): Promise<void> => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S9_P3_ENTER)}
				className="rounded-xl text-4xl h-12"
				needsUploadIcon={false}
			/>
		</div>
	),
	"meet-pip-9-4": (): React.ReactNode => (
		<div>
			To keep track of my movement,
			<br />
			each wheel has a sensor called an {" "}
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				encoder
			</Highlighter>.
			<br />
			Encoders measure the wheels speed and direction.
		</div>
	),
	// meet-pip-9-5 is morphing text
	"meet-pip-9-6": (): React.ReactNode => (
		<div>
			Give one of my wheels a spin.
			<br />
			My encoders will show you exactly how it moves.
		</div>
	),
	"meet-pip-9-7": (): React.ReactNode => (
		<div>
			With wheels and encoders,
			<br />
			I can travel, navigate, and prepare for jobs that require movement through the world.
		</div>
	),

	// Sequence #10 [Conclusion]
	"meet-pip-10-1": (): React.ReactNode => (
		<div>
			When we first met,
			<br />
			I told you
			<br />
			I didn't know
			<br />
			what I was made for.
		</div>
	),
	"meet-pip-10-2": (): React.ReactNode => (
		<div>
			Now you have seen
			<br />
			my lights, screen, speaker, sensors, and wheels.
			<br />
			I am a robot built to learn, explore, and help.
		</div>
	),
	"meet-pip-10-3": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			Robots in the world carry supplies,
			<br />
			assist in hospitals, explore oceans, and travel into space.
			<br />
			My Career Quest is about discovering where I belong among them.
		</div>
	),
	"meet-pip-10-4": (): React.ReactNode => (
		<div>
			I will try jobs one at a time, each an adventure
			<br />
			that teaches me more about who
			<br />
			I can be.
		</div>
	),
	"meet-pip-10-5": (): React.ReactNode => (
		<div>
			But I don't have to take this journey alone.
			<br />
			With you beside me,
			<br />
			every challenge feels possible.
		</div>
	),
	"meet-pip-10-6": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			This is where our {" "}
			<Highlighter action="highlight" color="#FFDE00" strokeWidth={2} isView={true}>
				Career Quest
			</Highlighter> {" "}
			begins.
			<br />
			The world is waiting
			<br />
			with jobs to try,
			<br />
			challenges to face, and
			<br />
			discoveries to uncover.
			<br />
			The first step of our journey starts now.
		</div>
	)
}

export default MEET_PIP_CONTENT_COMPONENTS
