export default function InThisElementSection() {
	return (
		<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
					bg-zinc-50 dark:bg-zinc-800/50">
			<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
				In This Element:
			</h2>
			<p className="text-lg text-zinc-600 dark:text-zinc-400">
				We&apos;ll investigate how Pip&apos;s sensors actually work under the surface, their applications,
				and you&apos;ll learn how to control them.
			</p>
			<div className="grid grid-cols-3 gap-4">
				<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
					<li>LEDs</li>
					<li>Motors</li>
				</ul>
				<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
					<li>Buttons</li>
					<li>Distance sensors</li>
				</ul>
				<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
					<li>IR sensors</li>
					<li>And much more</li>
				</ul>
			</div>
		</div>
	)
}
