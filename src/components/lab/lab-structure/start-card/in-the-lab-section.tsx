"use client"

export default function InTheLabSection() {
	return (
		<div className="space-y-2 p-4 border-2 border-disabledLilypadBackground rounded-lg bg-inherit">
			<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
				In the Lab:
			</h2>
			<p className="text-lg text-gray-600 dark:text-gray-400">
				We'll investigate how Pip's sensors actually work under the surface, their applications,
				and you'll learn how to control them.
			</p>
			<div className="grid grid-cols-3 gap-4">
				<ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-400">
					<li>LEDs</li>
					<li>Motors</li>
				</ul>
				<ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-400">
					<li>Buttons</li>
					<li>Distance sensors</li>
				</ul>
				<ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-400">
					<li>IR sensors</li>
					<li>And much more</li>
				</ul>
			</div>
			<p className="text-lg text-gray-600 dark:text-gray-400">
				You'll master reading sensor data, controlling each component, and understanding core robotics principles
			</p>
		</div>
	)
}
