/* eslint-disable max-len */
import { CustomEgg } from "../../../../../icons/custom-egg"
import { ReadingBlockHeader, ReadingBlockSectionHeader, ReadingBlockWithImage } from "../../../../reading/reading-styles"

const introToCodeReadingBlocks: ContentBlock[] = [
	{
		id: "intro-to-code-1",
		text: (
			<div>
				<ReadingBlockHeader>
					Introduction to Code
				</ReadingBlockHeader>
				<ReadingBlockWithImage>
					Now that we understand how LEDs work, let's learn how to control Pip's LEDs. We'll start with the basics of programming, introducing the building blocks you'll use to create everything from simple light patterns to complex behaviors.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-code-2",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					What is Code?
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Code is like a recipe for computers. Just like a chef follows steps to create a dish, Pip follows code instructions to perform tasks.
				</ReadingBlockWithImage>
				<ReadingBlockWithImage svgComponent={<CustomEgg size={150}/>}>
					For example, here's a simple recipe:
					<ol className="list-decimal list-inside">
						<li>Heat the pan</li>
						<li>Add oil</li>
						<li>Cook the egg</li>
						<li>Flip when brown</li>
						<li>Serve when done</li>
					</ol>
				</ReadingBlockWithImage>
				<ReadingBlockWithImage>
					Similarly, we might tell Pip:
					<ol className="list-decimal list-inside">
						<li>Turn on the LED</li>
						<li>Make it blue</li>
						<li>Wait 1 second</li>
						<li>Turn it off</li>
					</ol>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-code-3",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Speaking Pip's language
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					Before we give Pip instructions, we need to understand two important things about how Pip thinks:
					<ol className="list-inside list-decimal">
						<li>Computers Need Exact Instructions</li>
						<div className="pl-6">
							While a chef knows to "heat the pan until it's hot," Pip needs precise instructions:
							Instead of "make the LED bright," we say "set LED brightness to 100%"
							Instead of "wait a while," we say "wait 2 seconds"
						</div>
						<li>Computers Follow Strict Rules</li>
						<div className="pl-6">
							If you tell someone to "put on a rainjacket" or a "rain jacket," they understand both. But Pip needs instructions in a specific format, just like each language has its own grammar rules.
						</div>
					</ol>
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-code-4",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Basic Coding Commands
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					To control Pip, we'll use a programming language - think of it as Pip's native language. Just as we follow grammar rules when writing English, we follow specific rules when writing code for Pip. We'll learn these rules step by step. Let's start with three basic types of commands.
				</ReadingBlockWithImage>
			</div>
		),
		action: { type: "continue" }
	},
	{
		id: "intro-to-code-5",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					1. Action Commands
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					These tell Pip to do something specific:
					<ul className="list-disc pl-6">
						<li>"Turn LED on"</li>
						<li>"Set LED color to blue"</li>
						<li>"Wait for 2 seconds"</li>
					</ul>
					{/* Show images of the coding blocks */}
					DEMO: Try making Pip's LED turn blue!
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/element-1/led/demo/blue-leds"
		}
	},
	{
		id: "intro-to-code-6",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					2. Reading Commands
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					These tell Pip to check something:
					<ul className="list-disc pl-6">
						<li>"Check if button is pressed"</li>
						<li>"Check LED color"</li>
						<li>"Check if LED is on"</li>
					</ul>
					{/* Show images */}
					DEMO: Watch Pip check if its button is pressed
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/element-1/led/demo/check-button-press"
		}
	},
	{
		id: "intro-to-code-7",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					3. Decision Commands (If/Then)
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<p className="mb-4">This is where the magic happens - Pip can make decisions by combining readings and actions!</p>

					<div className="mb-4">
						<h4 className="font-medium mb-2">If/Then Basics:</h4>
						<ul className="list-disc pl-6 space-y-1">
							<li><strong>Condition:</strong> What Pip checks (the "If" part)</li>
							<li><strong>Action:</strong> What Pip does (the "Then" part)</li>
						</ul>
					</div>

					<div className="mb-4">
						<p className="mb-1">For example:</p>
						<div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md">
							If (button is pressed) Then (turn LED blue)
						</div>
					</div>

					<div className="mt-5">
						<p className="font-medium">DEMO: Simple LED Control</p>
						<p>Try it yourself! Press the button to see Pip use an if/then statement.</p>
					</div>
				</ReadingBlockWithImage>
			</div>
		),
		action: {
			type: "demo",
			demoLink: "/lab/element-1/led/demo/simple-led-control"
		}
	},
	{
		id: "intro-to-code-8",
		text: (
			<ReadingBlockWithImage>
				<h4 className="font-medium mb-3">Making multiple decisions</h4>
				<p className="mb-3">Sometimes one decision isn't enough. Let's see how Pip can handle multiple situations:</p>

				<div className="mb-4">
					<p className="mb-2">Example:</p>
					<div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md space-y-1">
						<p>If (button 1 is pressed) Then (turn LED red)</p>
						<p>Else If (button 2 is pressed) Then (turn LED green)</p>
						<p>Else (turn LED off)</p>
					</div>
				</div>

				<div className="mt-4">
					<p className="font-medium">DEMO: Multi-Button LED Control</p>
					<p>Try pressing different buttons to see how Pip makes decisions</p>
				</div>
			</ReadingBlockWithImage>
		),
		action: {
			type: "demo",
			demoLink: "/lab/element-1/led/demo/multi-button-led-control"
		}
	},
	{
		id: "intro-to-code-9",
		text: (
			<div>
				<ReadingBlockSectionHeader>
					Summary
				</ReadingBlockSectionHeader>
				<ReadingBlockWithImage>
					<p className="mb-3">Now we know how to:</p>
					<ul className="list-disc pl-6 space-y-2 mb-4">
						<li>Give Pip precise instructions using code</li>
						<li>
							Use three types of commands:
							<ul className="list-circle pl-6 mt-2 space-y-1">
								<li>Action Commands to make things happen</li>
								<li>Reading Commands to check conditions</li>
								<li>Decision Commands to make choices</li>
							</ul>
						</li>
						<li>Create multiple-choice behaviors using else/if statements</li>
					</ul>
				</ReadingBlockWithImage>

				<ReadingBlockWithImage>
					<p className="mt-4 font-medium">In the next activity, you'll put these concepts into practice by creating your own LED patterns!</p>
				</ReadingBlockWithImage>
			</div>		),
		action: { type: "end" }
	},
]

export default introToCodeReadingBlocks
