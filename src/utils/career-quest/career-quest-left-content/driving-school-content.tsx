
"use client"

import { ReactNode } from "react"
import { Highlighter } from "../../../components/magicui/highlighter"

// eslint-disable-next-line @typescript-eslint/naming-convention
const DRIVING_SCHOOL_CONTENT_COMPONENTS: Record<string, (onAdvance?: () => void) => ReactNode> = {
	// Sequence 1 - Intro
	"driving-school-1-1": (): React.ReactNode => (
		<div>
			<p>Welcome to Driving School.</p>
			<p>I've got wheels, but I don't yet know how</p>
			<p>to use them well.</p>
			<p>That's where</p>
			<p>you come in.</p>
		</div>
	),
	"driving-school-1-2": (): React.ReactNode => (
		<div>
			<p>I don't make my own choices;</p>
			<p>I follow the</p>
			<p>instructions</p>
			<p>you give me.</p>
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
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>When blocks are stacked,</p>
			<p>they form</p>
			<p>a set of steps</p>
			<p>called a program.</p>
			<p>I always follow them in order:</p>
			<p>first the top block, then the next,</p>
			<p>until I reach the bottom.</p>
		</div>
	),
	"driving-school-1-5": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
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
			<p>Watch:</p>
			<p>this program tells my LEDs to:</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				turn on,
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				wait,
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				turn off.
			</Highlighter>
		</div>
	),
	"driving-school-2-2": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>That was three steps in order:</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				LEDs on,
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				wait,
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				LEDs off.
			</Highlighter>
			<p>The same pattern works for driving:</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				start moving,
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				keep moving,
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				stop.
			</Highlighter>
		</div>
	),
	"driving-school-2-3": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>Programs can also wait for something</p>
			<p>to happen</p>
			<p>before they start.</p>
			This one
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				waits for Button A
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				turns my LEDs on for two seconds
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				turns them off
			</Highlighter>
		</div>
	),
	"5892848a-8334-48a7-82aa-bbbe43d2e92f": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>Your turn.</p>
			<p>Build a program that</p>
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				starts on Button A,
			</Highlighter>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				turns my LEDs blue for two seconds,
			</Highlighter>
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				then switches to red for two seconds,
			</Highlighter>
			<Highlighter action="highlight" color="#2ddc79" strokeWidth={2} isView={true}>
				then turns off
			</Highlighter>
		</div>
	),
	"driving-school-2-5": (): React.ReactNode => (
		<div>
			<p>Nice work.</p>
			<p>You connected</p>
			<p>steps</p>
			<p>I could follow,</p>
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
			<p>It makes me</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true} multiline={true}>
				<p>go forward for</p>
				<p>one second</p>
			</Highlighter>
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				at 15% speed,
			</Highlighter>
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				then stop.
			</Highlighter>
		</div>
	),
	"driving-school-3-3": (): React.ReactNode => (
		<div>
			<p>That was three steps again:</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				start
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				drive
			</Highlighter>
			<br />
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				stop.
			</Highlighter>
			<p>The same steps as the LEDs,</p>
			<p>but now with motors.</p>
		</div>
	),
	"driving-school-3-4": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>Driving by time works, but it isn't always exact.</p>
			<p>With distance, I can be more precise.</p>
			<p>This program</p>
			<p>makes me</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				go forward 8 inches
			</Highlighter>
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				at 15% speed
			</Highlighter>
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				then stop.
			</Highlighter>
		</div>
	),
	"718e291a-1c03-4948-88c4-ef0762cfc4df": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>Your turn.</p>
			<p>Build a program that makes me</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				go forward 8 inches at 15% speed,
			</Highlighter>
			<Highlighter action="highlight" color="#ff7878" strokeWidth={2} isView={true}>
				go backward 8 inches at 15% speed,
			</Highlighter>
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				then stop.
			</Highlighter>
		</div>
	),
	"driving-school-3-6": (): React.ReactNode => (
		<div>
			<p>You've seen me drive using</p>
			<p>time and distance.</p>
			<p>Which one do you think helps me</p>
			<p>be more exact when I stop?</p>
		</div>
	),
	"driving-school-3-7": (): React.ReactNode => (
		<div>
			<p>Great!</p>
			<p>With that</p>
			<p>sorted out,</p>
			<p>we can move on</p>
			<p>to the next skill…</p>
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				Turning!
			</Highlighter>
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
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
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
			<p>This one tells me to</p>
			<p>turn clockwise</p>
			<p>90 degrees.</p>
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
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				turn 180 degrees clockwise
			</Highlighter>
			<Highlighter action="highlight" color="#ffdc50" strokeWidth={2} isView={true}>
				wait two seconds
			</Highlighter>
			<Highlighter action="highlight" color="#e6aaff" strokeWidth={2} isView={true}>
				turn 180 degrees counterclockwise
			</Highlighter>
		</div>
	),
	"driving-school-4-6": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>Awesome!</p>
			<p>Now I can</p>
			<p>drive straight,</p>
			<p>make small turns,</p>
			<p>big turns,</p>
			<p>and even combine them.</p>
			<p>That's the foundation</p>
			<p>of real navigation.</p>
		</div>
	),

	// Sequence 5
	"driving-school-5-1": (): React.ReactNode => (
		<div>
			<p>I've got the basics.</p>
			<p>Now let's see</p>
			<p>if I can</p>
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
			<Highlighter action="highlight" color="#64c9ff" strokeWidth={2} isView={true}>
				<p>drive clockwise</p>
				<p>in an</p>
				<p>8 inch square</p>
				<p>at 15% speed.</p>
			</Highlighter>
		</div>
	),
	"driving-school-5-5": (): React.ReactNode => (
		<div>
			<p>Yes!</p>
			<p>That's a</p>
			<p>perfect square.</p>
			<p>With straight driving and turning,</p>
			<p>I can follow paths and return to</p>
			<p>the start.</p>
		</div>
	),
	"driving-school-5-6": (): React.ReactNode => (
		<div className="text-3xl" style={{ lineHeight: "1.5" }}>
			<p>Driving School</p>
			<p>is complete!</p>
			<p>I can handle straight lines and turns,</p>
			<p>and bring them together to get around.</p>
			<p>I'm excited to see where the road</p>
			<p>takes us.</p>
		</div>
	),
}

export default DRIVING_SCHOOL_CONTENT_COMPONENTS
