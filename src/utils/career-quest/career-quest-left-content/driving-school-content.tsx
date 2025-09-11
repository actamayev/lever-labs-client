
"use client"

import { ReactNode } from "react"

// eslint-disable-next-line @typescript-eslint/naming-convention
const DRIVING_SCHOOL_CONTENT_COMPONENTS: Record<string, (onAdvance?: () => void) => ReactNode> = {
	// Sequence 1 - Intro
	"driving-school-1-1": (): React.ReactNode => (
		<div>
			<p>Welcome to Driving School.</p>
			<p>I've got wheels, but I don't yet know how to use them well.</p>
			<p>That's where you come in.</p>
		</div>
	),
	"driving-school-1-2": (): React.ReactNode => (
		<div>
			<p>I don't make my own choices;</p>
			<p>I follow the instructions you give me.</p>
		</div>
	),
	"driving-school-1-3": (): React.ReactNode => (
		<div>
			<p>Each instruction is written as a block.</p>
			<p>One block might tell me to</p>
			<p>turn on my lights,</p>
			<p>wait for a moment,</p>
			<p>or move forward.</p>
		</div>
	),
	"driving-school-1-4": (): React.ReactNode => (
		<div>
			<p>When blocks are stacked,</p>
			<p>they form a set of steps called a program.</p>
			<p>I always follow them in order:</p>
			<p>first the top block, then the next,</p>
			<p>until I reach the bottom.</p>
		</div>
	),
	"driving-school-1-5": (): React.ReactNode => (
		<div>
			<p>Before we practice driving,</p>
			<p>let's start with my lights.</p>
			<p>They're an easy way to try out instructions.</p>
			<p>Once we get the hang of that,</p>
			<p>we'll use the same steps to control my wheels.</p>
		</div>
	),

	// Sequence 2
	"driving-school-2-1": (): React.ReactNode => (
		<div>
			<p>Watch: this program tells my LEDs to</p>
			<p>turn on, wait, then turn off.</p>
		</div>
	),
	"driving-school-2-2": (): React.ReactNode => (
		<div>
			<p>That was three clear steps in order:</p>
			<p>LEDs on. Hold. LEDs off.</p>
			<p>The same pattern works for driving:</p>
			<p>start moving, keep moving, then stop.</p>
		</div>
	),
	"driving-school-2-3": (): React.ReactNode => (
		<div>
			<p>Programs can also wait for something</p>
			<p>to happen before they start.</p>
			<p>This one waits for Button A,</p>
			<p>then turns my LEDs on for two seconds,</p>
			<p>and finally turns them off.</p>
		</div>
	),
	"5892848a-8334-48a7-82aa-bbbe43d2e92f": (): React.ReactNode => (
		<div>
			<p>Your turn.</p>
			<p>Build a program that</p>
			<p>Starts on Button A,</p>
			<p>Turns my LEDs blue for two second,</p>
			<p>Then switches to red for two second,</p>
			<p>Then turns off</p>
		</div>
	),
	"driving-school-2-5": (): React.ReactNode => (
		<div>
			<p>Nice work.</p>
			<p>You connected steps I could follow,</p>
			<p>and it worked perfectly.</p>
			<p>Now it's time to roll forward with my wheels.</p>
		</div>
	),

	// Sequence 3
	"driving-school-3-1": (): React.ReactNode => (
		<div>
			<p>Great work!</p>
			<p>Those steps ran perfectly on my LEDs.</p>
			<p>Now let's see if my wheels can do the same.</p>
		</div>
	),
	"driving-school-3-2": (): React.ReactNode => (
		<div>
			<p>Here's my first driving program.</p>
			<p>It makes me go forward for two seconds</p>
			<p>at 20% speed, then stop.</p>
		</div>
	),
	"driving-school-3-3": (): React.ReactNode => (
		<div>
			<p>That was three steps again:</p>
			<p>1. Start</p>
			<p>2. Drive</p>
			<p>3. Stop</p>
			<p>The same steps as the LEDs,</p>
			<p>but now with motors.</p>
		</div>
	),
	"driving-school-3-4": (): React.ReactNode => (
		<div>
			<p>Driving by time works, but it isn't always exact.</p>
			<p>With distance, I can be more precise.</p>
			<p>This program makes me go forward 5 centimeters</p>
			<p>at 20% speed, then stop.</p>
		</div>
	),
	"718e291a-1c03-4948-88c4-ef0762cfc4df": (): React.ReactNode => (
		<div>
			<p>Your turn.</p>
			<p>Build a program that makes me</p>
			<p>go forward 5 centimeters</p>
			<p>at 20% speed, then stop.</p>
		</div>
	),
	"driving-school-3-6": (): React.ReactNode => (
		<div>
			<p>You've seen me drive using</p>
			<p>time and using distance.</p>
			<p>Which one do you think helps me</p>
			<p>be more exact when I stop?</p>
		</div>
	),
	"driving-school-3-7": (): React.ReactNode => (
		<div>
			<p>Great!</p>
			<p>With that sorted out,</p>
			<p>we can move on to the next skill…</p>
			<p>Turning!</p>
		</div>
	),

	// Sequence 4
	"driving-school-4-1": (): React.ReactNode => (
		<div>
			<p>I can drive straight now.</p>
			<p>But to get around,</p>
			<p>I need to turn too.</p>
		</div>
	),
	"driving-school-4-2": (): React.ReactNode => (
		<div>
			<p>Here's how I do it:</p>
			<p>if one wheel moves forward</p>
			<p>and the other backward,</p>
			<p>I spin in place.</p>
			<p>That's the trick behind</p>
			<p>how robots like me turn.</p>
		</div>
	),
	"driving-school-4-3": (): React.ReactNode => (
		<div>
			<p>Instead of controlling each wheel separately,</p>
			<p>you can use a turning block.</p>
			<p>This one tells me to turn</p>
			<p>clockwise 90 degrees.</p>
		</div>
	),
	"driving-school-4-4": (): React.ReactNode => (
		<div>
			<p>Turns don't stop at 90 degrees.</p>
			<p>Watch me spin all the way around</p>
			<p>in a full 360 degree turn.</p>
		</div>
	),
	"b9114111-48f1-4589-bc10-5030f2d9621f": (): React.ReactNode => (
		<div>
			<p>Your turn!</p>
			<p>Build a program that makes me:</p>
			<p>1. turn 180 degrees clockwise</p>
			<p>2. wait two seconds</p>
			<p>3. turn 180 degrees counterclockwise</p>
		</div>
	),
	"driving-school-4-6": (): React.ReactNode => (
		<div>
			<p>Awesome!</p>
			<p>Now I can drive straight,</p>
			<p>make small turns, big turns,</p>
			<p>and even combine them.</p>
			<p>That's the foundation</p>
			<p>of real navigation.</p>
		</div>
	),

	// Sequence 5
	"driving-school-5-1": (): React.ReactNode => (
		<div>
			<p>I've got the basics.</p>
			<p>Now let's see if I can</p>
			<p>handle a real challenge.</p>
		</div>
	),
	"driving-school-5-2": (): React.ReactNode => (
		<div>
			<p>Watch this.</p>
			<p>I can go forward,</p>
			<p>make a turn,</p>
			<p>then go forward again and stop.</p>
		</div>
	),
	"driving-school-5-3": (): React.ReactNode => (
		<div>
			<p>Not bad.</p>
			<p>What if I kept going and</p>
			<p>turned this path into a shape</p>
		</div>
	),
	"d7eb2c2f-da43-4f6a-96e5-cffa51c51531": (): React.ReactNode => (
		<div>
			<p>Here's your challenge.</p>
			<p>Build a program that makes me</p>
			<p>drive in a square</p>
			<p>and return to where I started.</p>
		</div>
	),
	"driving-school-5-5": (): React.ReactNode => (
		<div>
			<p>Yes!</p>
			<p>That's a perfect square.</p>
			<p>With straight driving and turning together,</p>
			<p>I can follow paths and return to the start.</p>
		</div>
	),
	"driving-school-5-6": (): React.ReactNode => (
		<div>
			<p>Driving School is complete!</p>
			<p>I can handle straight lines and turns,</p>
			<p>and bring them together to get around.</p>
			<p>I'm ready for what comes next</p>
			<p>and excited to see where the road takes us.</p>
		</div>
	),
}

export default DRIVING_SCHOOL_CONTENT_COMPONENTS
